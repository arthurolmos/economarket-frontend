import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ListProduct } from "../../interfaces/listProduct";

interface Props {
  product: Partial<ListProduct>;
  action: (product: Partial<ListProduct>) => void;
}

export function ListHintProductListItem(props: Props) {
  const { product, action } = props;

  return (
    <TouchableOpacity style={styles.container} onPress={() => action(product)}>
      <View style={{ display: "flex", flex: 1 }}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text>Mercado: {product.market}</Text>
        <Text>Marca: {product.brand}</Text>
        <Text>Preço: R${product.price?.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: 15,
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  leftActionPanel: {
    backgroundColor: "red",
    display: "flex",
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  rightActionPanel: {
    backgroundColor: "lightgreen",
    display: "flex",
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    width: "30%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
