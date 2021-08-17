import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DefaultInput } from "../components/Inputs";
import { showToast } from "../components/Toast";
import {
  GET_LIST_PRODUCT_BY_SHOPPING_LIST,
  GET_SHOPPING_LIST,
  UPDATE_LIST_PRODUCT,
} from "../apollo/graphql";
import { ListProductUpdateInput } from "../interfaces/listProduct";
import ParamScreenProp from "../interfaces/navigation/ParamScreenProp";

function EditListProductScreen({
  navigation,
  route,
}: ParamScreenProp<"EditListProduct">) {
  const id = route.params?.id;
  const shoppingListId = route.params?.shoppingListId
    ? route.params?.shoppingListId
    : "";

  const { loading, error, data } = useQuery(GET_LIST_PRODUCT_BY_SHOPPING_LIST, {
    variables: { id, shoppingListId },
  });

  const product = data?.listProductByShoppingList;

  const [productName, setProductName] = React.useState("");
  const [productQuantity, setProductQuantity] = React.useState("");
  const [productPrice, setProductPrice] = React.useState("");
  const [productBrand, setProductBrand] = React.useState("");
  const [productMarket, setProductMarket] = React.useState("");

  React.useEffect(() => {
    if (product) {
      setProductName(product.name);
      setProductQuantity(product.quantity.toString());
      setProductPrice(product.price.toString());
      setProductBrand(product?.brand ? product?.brand : "");
      setProductMarket(product?.market ? product?.market : "");
    }
  }, [product]);

  const [doUpdateListProduct, updating] = useMutation(UPDATE_LIST_PRODUCT, {
    refetchQueries: [
      {
        query: GET_SHOPPING_LIST,
        variables: { id: product?.shoppingList?.id },
      },
    ],
  });

  function updateListProduct() {
    const values: ListProductUpdateInput = {
      name: productName,
      quantity: parseFloat(productQuantity),
      price: parseFloat(productPrice),
      brand: productBrand,
      market: productMarket,
      purchased: true,
    };

    doUpdateListProduct({
      variables: {
        id: product.id,
        shoppingListId: product.shoppingList.id,
        values,
      },
    })
      .then(() => {
        showToast("Produto atualizado com sucesso!");
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
          <Button title="Edit" onPress={() => navigation.goBack()} />

          <Text>IM EDITING</Text>

          <DefaultInput
            value={productName}
            onChangeText={setProductName}
            placeholder="Nome"
          />
          <DefaultInput
            placeholder="Quantidade"
            value={productQuantity}
            onChangeText={setProductQuantity}
            keyboardType="numeric"
          />
          <DefaultInput
            placeholder="Preço"
            value={productPrice}
            onChangeText={setProductPrice}
            keyboardType="numeric"
          />
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
          {updating.loading ? (
            <Text>Loading...</Text>
          ) : (
            <Button title="Save" onPress={updateListProduct} />
          )}
        </>
      )}
    </SafeAreaView>
  );
}

export default EditListProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 15,
  },
});
