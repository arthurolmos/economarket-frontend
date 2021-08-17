import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Button, StyleSheet, Modal, TextInput } from "react-native";
import {
  GET_SHOPPING_LIST,
  DELETE_LIST_PRODUCT,
  UPDATE_LIST_PRODUCT,
} from "../../apollo/graphql";
import { ListProduct } from "../../interfaces/listProduct";
import { showToast } from "../Toast";

interface Props {
  product: ListProduct;
}

function ListProductItem(props: Props) {
  const { product } = props;

  const navigation = useNavigation();

  const totalPrice = product.price * product.quantity;

  const [doDeleteListProduct, deleting] = useMutation(DELETE_LIST_PRODUCT, {
    refetchQueries: [
      {
        query: GET_SHOPPING_LIST,
        variables: { id: product.shoppingList.id },
      },
    ],
  });

  function deleteListProduct() {
    doDeleteListProduct({
      variables: { id: product.id, shoppingListId: product.shoppingList.id },
    })
      .then(() => {
        showToast("Produto removido com sucesso!");
      })
      .catch((err) => {
        console.log(err.message);
        showToast(err.message);
      });
  }

  const [doPurchaseListProduct, purchasing] = useMutation(UPDATE_LIST_PRODUCT, {
    refetchQueries: [
      {
        query: GET_SHOPPING_LIST,
        variables: { id: product.shoppingList.id },
      },
    ],
  });

  function purchaseListProduct() {
    const values = {
      purchased: !!!product.purchased,
    };

    doPurchaseListProduct({
      variables: {
        shoppingListId: product.shoppingList.id,
        values: values,
        id: product.id,
      },
    })
      .then(() => {
        showToast("Produto comprado com sucesso!");
      })
      .catch((err) => {
        console.log(err.message);
        showToast(err.message);
      });
  }

  return (
    <>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          padding: 5,
          backgroundColor: product.purchased ? "lightgreen" : "transparent",
        }}
      >
        <View style={{ display: "flex", flex: 1 }}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text>R$ {product.price.toFixed(2)}</Text>
          <Text>Qtd: {product.quantity}</Text>
          <Text>Total: R$ {totalPrice.toFixed(2)}</Text>
          <Text>{product.purchased ? "COMPRADO" : "NAO"}</Text>
        </View>
        <View style={{ display: "flex", flex: 1 }}>
          <Button
            title="Edit"
            onPress={() =>
              navigation.navigate("EditListProduct", {
                id: product.id,
                shoppingListId: product.shoppingList.id,
              })
            }
          />
          {purchasing.loading ? (
            <Text>Loading...</Text>
          ) : (
            <Button
              title={product.purchased ? "Return" : "Purchase"}
              onPress={purchaseListProduct}
            />
          )}
          {deleting.loading ? (
            <Text>Loading...</Text>
          ) : (
            <Button title="X" onPress={deleteListProduct} />
          )}
        </View>
      </View>
    </>
  );
}

export default ListProductItem;

const styles = StyleSheet.create({
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
