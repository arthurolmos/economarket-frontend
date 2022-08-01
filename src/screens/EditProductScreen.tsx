import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DefaultInput } from "../components/inputs";
import { showToast } from "../components/toast";
import {
  GET_PRODUCT,
  GET_PRODUCTS_BY_USER,
  UPDATE_PRODUCT,
} from "../apollo/graphql";
import { ListProductUpdateInput } from "../interfaces/list-product";
import { DefaultStackScreenProps } from "../interfaces/navigation";
import DefaultButton from "../components/buttons/DefaultButton";
import { AuthContext } from "../contexts";

function EditProductScreen({
  navigation,
  route,
}: DefaultStackScreenProps<"EditProduct">) {
  const id = route.params.id;

  const { user } = useAuthContext();

  const { loading, data, error } = useQuery(GET_PRODUCT, {
    variables: { id },
    fetchPolicy: "network-only",
  });

  const product = data?.product;
  if (error) console.log(error);

  const [productName, setProductName] = React.useState("");
  const [productPrice, setProductPrice] = React.useState("");
  const [productBrand, setProductBrand] = React.useState("");
  const [productMarket, setProductMarket] = React.useState("");

  React.useEffect(() => {
    if (product) {
      setProductName(product.name);
      setProductPrice(product.price.toString());
      setProductBrand(product?.brand ? product?.brand : "");
      setProductMarket(product?.market ? product?.market : "");
    }
  }, [product]);

  const [updateProduct, updateProductResult] = useMutation(UPDATE_PRODUCT, {
    refetchQueries: [
      {
        query: GET_PRODUCTS_BY_USER,
        variables: { userId: user?.id },
      },
    ],
  });

  async function submit() {
    try {
      const values: ListProductUpdateInput = {
        name: productName,
        price: parseFloat(productPrice),
        brand: productBrand,
        market: productMarket,
      };

      await updateProduct({
        variables: {
          id: product.id,
          values,
        },
      });

      showToast("Produto atualizado com sucesso!");
      navigation.goBack();
    } catch (err: any) {
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
          {updateProductResult.loading ? (
            <ActivityIndicator size="large" color="green" />
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

export default EditProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
});
