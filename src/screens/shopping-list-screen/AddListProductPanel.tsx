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
import { AuthContext } from "../../contexts/AuthContext";
import { useMutation } from "@apollo/client";
import {
  CREATE_LIST_PRODUCT,
  READ_PRODUCTS_BY_USER,
} from "../../apollo/graphql";
import { showToast } from "../../components/toast";
import { DefaultInput } from "../../components/inputs";
import { ListHintProductListItem } from "../../components/list-items";
import {
  ListProduct,
  ListProductCreateInput,
} from "../../interfaces/list-product";
import { Product } from "../../interfaces/product";
import { validate } from "../../lib/validations";
import { client } from "../../apollo/client";
import { DefaultIcon } from "../../components/icons";

interface Props {
  shoppingListId: string;
}

function AddListProductPanel(props: Props) {
  const { user } = React.useContext(AuthContext);

  const { shoppingListId } = props;

  const [name, setName] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [market, setMarket] = React.useState("");

  const [hints, setHints] = React.useState<Product[]>([]);
  const clearHints = () => setHints([]);

  const quantityInputRef = React.createRef<TextInput>();

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

      if (!validate({ name, quantity, price }))
        throw new Error("Preencha todos os campos!");

      await createListProduct({
        variables: { data: input, shoppingListId },
      });

      showToast("Produto inserido com sucesso!");
      clear();
    } catch (err: any) {
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
      const matches = productsByUser.filter((product: Product) => {
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
    <View>
      <DefaultInput
        value={name}
        onChangeText={(text: string) => {
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
              <DefaultIcon name="close" size={20} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={hints}
            renderItem={({ item }: { item: Product }) => {
              return (
                <ListHintProductListItem product={item} action={fillProduct} />
              );
            }}
            keyExtractor={(item: Product) => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
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
      <DefaultInput value={brand} onChangeText={setBrand} placeholder="Marca" />

      <DefaultInput
        value={market}
        onChangeText={setMarket}
        placeholder="Mercado"
      />

      {createListProductResult.loading ? (
        <ActivityIndicator size="small" color="lightgreen" />
      ) : (
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            addProductToShoppingList();
          }}
          style={styles.addButton}
        >
          <Text style={{ color: "green" }}>Adicionar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default AddListProductPanel;

const styles = StyleSheet.create({
  inputRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addButton: {
    borderWidth: 1,
    borderColor: "green",
    backgroundColor: "lightgreen",
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
  separator: {
    height: 1,
    borderColor: "black",
    borderWidth: 0.5,
  },
});
