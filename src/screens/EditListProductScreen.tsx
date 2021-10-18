import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DefaultInput } from "../components/inputs";
import { showToast } from "../components/toast";
import {
  GET_LIST_PRODUCT_BY_SHOPPING_LIST,
  GET_SHOPPING_LIST,
  UPDATE_LIST_PRODUCT,
} from "../apollo/graphql";
import { ListProductUpdateInput } from "../interfaces/list-product";
import ParamScreenProp from "../interfaces/navigation/ParamScreenProp";
import DefaultButton from "../components/buttons/DefaultButton";

function EditListProductScreen({
  navigation,
  route,
}: ParamScreenProp<"EditListProduct">) {
  const id = route.params.id;
  const shoppingListId = route.params.shoppingListId;

  const { loading, data, startPolling, stopPolling } = useQuery(
    GET_LIST_PRODUCT_BY_SHOPPING_LIST,
    {
      variables: { id, shoppingListId },
      fetchPolicy: "network-only",
    }
  );

  // React.useEffect(() => {
  //   startPolling(1000);

  //   return () => stopPolling();
  // }, []);

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

  const [updateListProduct, updateListProductResult] = useMutation(
    UPDATE_LIST_PRODUCT,
    {
      refetchQueries: [
        {
          query: GET_SHOPPING_LIST,
          variables: { id: product?.shoppingList?.id },
        },
      ],
    }
  );

  async function submit() {
    try {
      const values: ListProductUpdateInput = {
        name: productName,
        quantity: parseFloat(productQuantity),
        price: parseFloat(productPrice),
        brand: productBrand,
        market: productMarket,
      };

      await updateListProduct({
        variables: {
          id: product.id,
          shoppingListId: product.shoppingList.id,
          values,
        },
      });

      showToast("Produto atualizado com sucesso!");
      navigation.goBack();
    } catch (err) {
      console.log("Error on updating product!", err);
      showToast("Erro ao atualizar o produto!");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="lightgreen" />
      ) : (
        <>
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
            placeholder="Preço Unitário"
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
          {updateListProductResult.loading ? (
            <ActivityIndicator size="large" color="lightgreen" />
          ) : (
            <DefaultButton
              title="Atualizar"
              action={submit}
              color="green"
              bgColor="lightgreen"
            />
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
    padding: 15,
  },
});
