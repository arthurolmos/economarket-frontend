import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import DefaultScreenProp from "../interfaces/navigation/DefaultScreenProp";
import ProductItem from "../components/ListProductItem";
import * as data from "../data/data";

function ProductsScreen({ navigation }: DefaultScreenProp) {
  return (
    <View style={{ flex: 1, alignItems: "center", padding: 15 }}>
      <Text>Meus Produtos</Text>
      {/* <View>
        {data.products.map((product) => {
          return <ProductItem key={product.id} product={product} />;
        })}
      </View> */}
    </View>
  );
}

export default ProductsScreen;
