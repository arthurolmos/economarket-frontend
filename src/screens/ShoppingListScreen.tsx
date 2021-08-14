import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { gql, useMutation, useQuery } from "@apollo/client";
import { GET_SHOPPING_LIST, SHARE_SHOPPING_LIST } from "../graphql";
import { showToast } from "../components/Toast";
import { DefaultInput } from "../components/Inputs";
import { SafeAreaView } from "react-native-safe-area-context";
import ParamScreenProp from "../interfaces/navigation/ParamScreenProp";
import ListProductItem from "../components/ListProductItem";
import { CREATE_LIST_PRODUCT } from "../graphql/CREATE_LIST_PRODUCT";
import { ShoppingList } from "../interfaces/shoppingList";
import { ListProductUpdateInput } from "../interfaces/listProduct";
import { DefaultSubtitle, DefaultTitle } from "../components/Text";

function ShoppingListScreen({
  route,
  navigation,
}: ParamScreenProp<"ShoppingList">) {
  const { user } = React.useContext(AuthContext);

  const shoppingListId = route.params?.id;

  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [shareModalVisible, setShareModalVisible] = React.useState(false);
  const openShareModal = () => setShareModalVisible(true);
  const closeShareModal = () => setShareModalVisible(false);
  const [email, setEmail] = React.useState("");

  const [productName, setProductName] = React.useState("");
  const [productQuantity, setProductQuantity] = React.useState("");
  const [productPrice, setProductPrice] = React.useState("");
  const [productBrand, setProductBrand] = React.useState("");
  const [productMarket, setProductMarket] = React.useState("");

  const { data, loading, error } = useQuery(GET_SHOPPING_LIST, {
    variables: { id: shoppingListId },
  });

  const shoppingList: ShoppingList = data?.shoppingList;
  const username = `${shoppingList?.user?.firstName} ${shoppingList?.user?.lastName}`;
  const sharedWith =
    shoppingList?.sharedUsers && shoppingList?.sharedUsers.length > 1
      ? `Compartilhado com ${shoppingList?.sharedUsers?.length} pessoas`
      : "";
  const owner = shoppingList?.user?.id === user?.id;
  const totalPrice: number | undefined = shoppingList?.listProducts?.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue.quantity * currentValue.price;
    },
    0
  );

  const [doCreateListProduct, createListProduct] = useMutation(
    CREATE_LIST_PRODUCT,
    {
      refetchQueries: [
        {
          query: GET_SHOPPING_LIST,
          variables: { id: shoppingListId },
        },
      ],
    }
  );

  function addProductToShoppingList() {
    if (!productName || !productQuantity || !productPrice)
      return showToast("Preencha todos os campos!");

    const data: ListProductUpdateInput = {
      name: productName,
      quantity: parseFloat(productQuantity),
      price: parseFloat(productPrice),
      brand: productBrand,
      market: productMarket,
      purchased: false,
    };

    doCreateListProduct({
      variables: { data, shoppingListId },
    })
      .then(() => {
        showToast("Produto inserido com sucesso!");
      })
      .catch((err) => {
        console.log(err.message);
        showToast(err.message);
      });
  }

  const [doShareShoppingList, sharingShoppingList] =
    useMutation(SHARE_SHOPPING_LIST);

  function shareShoppingList() {
    const emails = email.split(";").map((email) => email.trim());

    doShareShoppingList({
      variables: {
        userId: user?.id,
        id: shoppingListId,
        sharedUsersEmail: emails,
      },
    })
      .then(() => {
        showToast("Lista compartilhada com sucesso!");
      })
      .catch((err) => {
        console.log(err.message);
        showToast(err.message);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <View>
            <View style={styles.header}>
              <DefaultTitle>{shoppingList?.name}</DefaultTitle>
              <Text>Criada por {username}</Text>
              <Text>{sharedWith}</Text>
              <Text>{owner ? "OWNER" : "Shared"}</Text>
              {owner && <Button title="Share!" onPress={openShareModal} />}
              <Text>Total: R$ {totalPrice}</Text>
            </View>

            <View style={styles.inputView}>
              <DefaultSubtitle>Adicionar Produtos</DefaultSubtitle>

              <DefaultInput
                value={productName}
                onChangeText={setProductName}
                placeholder="Nome"
              />
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ display: "flex", flex: 1, marginRight: 10 }}>
                  <DefaultInput
                    placeholder="Quantidade"
                    value={productQuantity}
                    onChangeText={setProductQuantity}
                    keyboardType="numeric"
                  />
                </View>
                <View style={{ display: "flex", flex: 1, marginLeft: 10 }}>
                  <DefaultInput
                    placeholder="Preço"
                    value={productPrice}
                    onChangeText={setProductPrice}
                    keyboardType="numeric"
                  />
                </View>
              </View>
              {isOpen && (
                <>
                  <DefaultInput
                    value={productBrand}
                    onChangeText={setProductBrand}
                    placeholder="Marca"
                  />

                  <DefaultInput
                    value={productMarket}
                    onChangeText={setProductMarket}
                    placeholder="Mercado"
                  />
                </>
              )}
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ display: "flex", flex: 1, marginRight: 10 }}>
                  <TouchableOpacity
                    onPress={toggle}
                    style={{
                      borderWidth: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: 5,
                      borderRadius: 15,
                      height: 30,
                    }}
                  >
                    <Text>{isOpen ? "...Menos" : "Mais..."}</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ display: "flex", flex: 1, marginRight: 10 }}>
                  {createListProduct.loading ? (
                    <Text>Loading...</Text>
                  ) : (
                    <Button onPress={addProductToShoppingList} title="Add" />
                  )}
                </View>
              </View>
            </View>
          </View>

          <FlatList
            refreshing={loading}
            data={shoppingList?.listProducts}
            renderItem={({ item }) => {
              const product = { ...item };
              return <ListProductItem product={product} />;
            }}
            keyExtractor={(item) => item.id}
            ListHeaderComponentStyle={{
              display: "flex",
              flex: 1,
              margin: 0,
              padding: 5,
              marginBottom: 20,
              backgroundColor: "yellow",
            }}
            ListEmptyComponent={() => (
              <View>
                <Text>
                  {loading ? "Carregando" : "Lista vazia! Adicione produtos!"}
                </Text>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />

          <Modal visible={shareModalVisible} transparent={true}>
            <View
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: "black",
                  opacity: 0.6,
                }}
              />
              <View
                style={{
                  display: "flex",
                  padding: 15,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "white",
                }}
              >
                <Button title="Close!" onPress={closeShareModal} />
                <DefaultInput
                  placeholder="Insira o email do usuário"
                  value={email}
                  onChangeText={setEmail}
                />

                {sharingShoppingList.loading ? (
                  <Text>Loading...</Text>
                ) : (
                  <Button title="Share!" onPress={shareShoppingList} />
                )}
              </View>
            </View>
          </Modal>
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
    height: 10,
  },
  inputView: {
    display: "flex",
    overflow: "hidden",
    marginBottom: 40,
  },
});
