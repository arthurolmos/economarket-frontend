import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Keyboard,
} from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_SHOPPING_LIST_BY_USER,
  CREATE_LIST_PRODUCT,
  READ_PRODUCTS_BY_USER,
  GET_SHOPPING_LIST,
} from "../apollo/graphql";
import { showToast } from "../components/Toast";
import { DefaultInput } from "../components/Inputs";
import { SafeAreaView } from "react-native-safe-area-context";
import ParamScreenProp from "../interfaces/navigation/ParamScreenProp";
import {
  ListHintProductListItem,
  ListProductListItem,
} from "../components/ListItems";
import { ShoppingList } from "../interfaces/shoppingList";
import { ListProduct, ListProductCreateInput } from "../interfaces/listProduct";
import { DefaultSubtitle, DefaultTitle } from "../components/Text";
import { EmptyListComponent } from "../components/ListItems";
import { ShareShoppingListModal } from "../components/Modals";
import { Ionicons } from "@expo/vector-icons";
import { Product } from "../interfaces/product";
import { CreateProductModal } from "../components/Modals/CreateProductModal";
import { validateListProduct } from "../lib/validations";
import { client } from "../apollo/client";

function ShoppingListScreen({
  route,
  navigation,
}: ParamScreenProp<"ShoppingList">) {
  const { user } = React.useContext(AuthContext);

  const shoppingListId = route.params.id;

  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [shareModalVisible, setShareModalVisible] = React.useState(false);
  const openShareModal = () => setShareModalVisible(true);
  const closeShareModal = () => setShareModalVisible(false);

  const [modalProduct, setModalProduct] =
    React.useState<Partial<Product> | null>(null);
  const [addProductModalVisible, setAddProductModalVisible] =
    React.useState(false);
  const openAddProductModal = (product: Partial<Product>) => {
    setModalProduct(product);
    setAddProductModalVisible(true);
  };
  const closeAddProductModal = () => {
    setModalProduct(null);
    setAddProductModalVisible(false);
  };
  const [name, setName] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [market, setMarket] = React.useState("");

  const [hints, setHints] = React.useState<Product[]>([]);
  const clearHints = () => setHints([]);

  const quantityInputRef = React.createRef<TextInput>();

  const { startPolling, stopPolling, ...getShoppingListResult } = useQuery(
    GET_SHOPPING_LIST_BY_USER,
    {
      variables: { id: shoppingListId, userId: user?.id },
    }
  );

  React.useEffect(() => {
    startPolling(500);

    return () => stopPolling();
  }, []);

  const shoppingList: ShoppingList =
    getShoppingListResult.data?.shoppingListByUser;
  const username = `${shoppingList?.user?.firstName} ${shoppingList?.user?.lastName}`;
  // const sharedWith =
  //   shoppingList?.sharedUsers && shoppingList?.sharedUsers.length > 1
  //     ? `Compartilhado com ${shoppingList?.sharedUsers?.length} pessoas`
  //     : "";
  const purchasedListItemsTotal = shoppingList?.listProducts?.filter(
    (product) => product.purchased === true
  ).length;
  const listProductsTotal = shoppingList?.listProducts?.length;

  const clear = () => {
    setName("");
    setQuantity("");
    setPrice("");
    setBrand("");
    setMarket("");
  };

  const [createListProduct, createListProductResult] =
    useMutation(CREATE_LIST_PRODUCT);

  async function addProductToShoppingList() {
    try {
      const input: ListProductCreateInput = {
        name: name,
        quantity: parseFloat(quantity),
        price: parseFloat(price),
        brand: brand,
        market: market,
        purchased: false,
      };

      if (!validateListProduct(input))
        throw new Error("Preencha todos os campos!");

      await createListProduct({
        variables: { data: input, shoppingListId },
      });

      showToast("Produto inserido com sucesso!");
      clear();
    } catch (err) {
      console.log("Error on adding Product!", err);
      showToast("Erro ao inserir Produto!");
    }
  }

  const readProductsByUser = client.readQuery<{
    productsByUser: Product[];
  }>({
    query: READ_PRODUCTS_BY_USER,
    variables: {
      userId: user?.id,
    },
  });
  const productsByUser = readProductsByUser?.productsByUser;

  function getHints(text: string) {
    if (text.length < 3) return clearHints();

    if (productsByUser) {
      const matches = productsByUser.filter((product) => {
        return product.name.toLowerCase().includes(text.toLowerCase());
      });

      setHints(matches);
    }
  }

  const fillProduct = (product: Partial<ListProduct>) => {
    setName(product?.name ? product.name : "");
    setBrand(product?.brand ? product.brand : "");
    setMarket(product?.market ? product.market : "");
    setPrice(product?.price ? product.price.toString() : "");

    clearHints();
    quantityInputRef?.current?.focus();
  };

  return (
    <SafeAreaView style={styles.container}>
      {getShoppingListResult.loading ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <>
          <View>
            <View style={styles.header}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View style={{ display: "flex", flex: 1 }}>
                  <DefaultTitle>{shoppingList?.name}</DefaultTitle>
                  <Text>Criada por {username}</Text>
                </View>

                {shoppingList?.isOwner && (
                  <TouchableOpacity style={styles.shareButton}>
                    <Ionicons
                      name="share-social"
                      size={32}
                      color="gray"
                      onPress={openShareModal}
                    />
                  </TouchableOpacity>
                )}
              </View>

              <View style={{ display: "flex" }}>
                {/* <Text>{sharedWith}</Text> */}
                <Text>TOTAL: R$ {shoppingList?.totalPrice?.toFixed(2)}</Text>
                <Text>
                  Produtos: {purchasedListItemsTotal} / {listProductsTotal}
                </Text>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <DefaultSubtitle>Adicionar Produtos</DefaultSubtitle>

              <DefaultInput
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  getHints(text);
                }}
                placeholder="Nome"
              />
              {hints?.length > 0 && (
                <View style={styles.hintContainer}>
                  <View
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                    }}
                  >
                    <TouchableOpacity onPress={clearHints}>
                      <Ionicons name="close" size={20} />
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    data={hints}
                    renderItem={({ item }) => {
                      return (
                        <ListHintProductListItem
                          product={item}
                          action={fillProduct}
                        />
                      );
                    }}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => (
                      <View style={styles.separator} />
                    )}
                  />
                </View>
              )}

              <View style={styles.inputRow}>
                <View style={styles.inputRight}>
                  <DefaultInput
                    placeholder="Quantidade"
                    value={quantity}
                    onChangeText={setQuantity}
                    keyboardType="numeric"
                    ref={quantityInputRef}
                  />
                </View>
                <View style={styles.inputLeft}>
                  <DefaultInput
                    placeholder="Preço Unitário"
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="numeric"
                  />
                </View>
              </View>
              {isOpen && (
                <>
                  <DefaultInput
                    value={brand}
                    onChangeText={setBrand}
                    placeholder="Marca"
                  />

                  <DefaultInput
                    value={market}
                    onChangeText={setMarket}
                    placeholder="Mercado"
                  />
                </>
              )}
              <View style={styles.inputRow}>
                <View style={styles.inputRight}>
                  <TouchableOpacity
                    onPress={toggle}
                    style={styles.toggleButton}
                  >
                    <Text>{isOpen ? "...Menos" : "Mais..."}</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.inputLeft}>
                  {createListProductResult.loading ? (
                    <ActivityIndicator size="small" color="green" />
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        Keyboard.dismiss();
                        addProductToShoppingList();
                      }}
                      style={styles.addButton}
                    >
                      <Text style={{ color: "lightgreen" }}>Add</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>

          <FlatList
            refreshing={getShoppingListResult.loading}
            data={shoppingList?.listProducts}
            renderItem={({ item }) => {
              const product = { ...item };

              return (
                <ListProductListItem
                  product={product}
                  openModal={openAddProductModal}
                />
              );
            }}
            keyExtractor={(item) => {
              return item.id;
            }}
            ListHeaderComponentStyle={styles.listHeader}
            ListEmptyComponent={() => (
              <EmptyListComponent loading={getShoppingListResult.loading} />
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />

          <ShareShoppingListModal
            isOpen={shareModalVisible}
            close={closeShareModal}
            shoppingListId={shoppingList?.id ? shoppingList.id : ""}
          />

          <CreateProductModal
            isOpen={addProductModalVisible}
            close={closeAddProductModal}
            product={modalProduct}
          />
        </>
      )}
    </SafeAreaView>
  );
}

export default ShoppingListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 15,
  },
  header: {
    display: "flex",
    marginBottom: 20,
  },
  separator: {
    height: 1,
    borderColor: "black",
    borderWidth: 0.5,
  },
  inputContainer: {
    display: "flex",
    minHeight: 220,
    overflow: "hidden",
    marginBottom: 40,
  },
  inputRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  toggleButton: {
    borderWidth: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 15,
    height: 30,
  },
  addButton: {
    borderWidth: 1,
    borderColor: "lightgreen",
    backgroundColor: "green",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 15,
    height: 30,
  },
  inputRight: {
    display: "flex",
    flex: 1,
    marginRight: 10,
    justifyContent: "center",
  },
  inputLeft: {
    display: "flex",
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  listHeader: {
    display: "flex",
    flex: 1,
    margin: 0,
    padding: 5,
    marginBottom: 20,
  },
  shareButton: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 15,
  },
  hintContainer: {
    display: "flex",
    height: 140,
    overflow: "hidden",
    position: "absolute",
    top: 80,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: "lightblue",
    padding: 5,
  },
});
