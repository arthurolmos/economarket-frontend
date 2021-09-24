import React from "react";
import { StyleSheet, View, Button, FlatList, Text } from "react-native";
import DefaultScreenProp from "../interfaces/navigation/DefaultScreenProp";
import { FloatingButton } from "../components/buttons";
import { EmptyListComponent, ProductListItem } from "../components/list-items";
import { ProductsContext } from "../contexts";
import { DefaultSafeAreaContainer } from "../components/layout/DefaultSafeAreaContainer";

function ProductsScreen({ navigation }: DefaultScreenProp) {
  const { products, refetch, loading } = React.useContext(ProductsContext);

  return (
    <DefaultSafeAreaContainer>
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
    </DefaultSafeAreaContainer>
  );
}

export default ProductsScreen;

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});
