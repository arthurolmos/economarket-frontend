import React from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import DefaultScreenProp from "../interfaces/navigation/DefaultScreenProp";
import { AuthContext } from "../contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { FloatingButton } from "../components/Buttons";
import { EmptyListComponent, ProductListItem } from "../components/ListItems";
import { ProductsContext } from "../contexts";

function ProductsScreen({ navigation }: DefaultScreenProp) {
  const { products, refetch, loading } = React.useContext(ProductsContext);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshing={loading}
        onRefresh={refetch}
        data={products}
        renderItem={({ item }) => {
          return <ProductListItem product={item} />;
        }}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => <EmptyListComponent loading={loading} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <FloatingButton
        action={() => navigation.navigate("CreateShoppingList")}
      />
    </SafeAreaView>
  );
}

export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    position: "relative",
  },
  separator: {
    height: 10,
  },
});
