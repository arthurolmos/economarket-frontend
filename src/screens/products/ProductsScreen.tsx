import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { DefaultBottomTabScreenProps } from "../../interfaces/navigation";
import { EmptyListComponent } from "../../components/list-items";
import { ProductsContext } from "../../contexts";
import { DefaultSafeAreaContainer } from "../../components/layout/DefaultSafeAreaContainer";
import { Product } from "../../interfaces/product";
import { ListItem } from "./ListItem";

function ProductsScreen({
  navigation,
}: DefaultBottomTabScreenProps<"Products">) {
  const { products, refetch, loading } = useProductsContext();

  return (
    <DefaultSafeAreaContainer>
      <FlatList
        refreshing={loading}
        onRefresh={refetch}
        data={products}
        renderItem={({ item }: { item: Product }) => {
          return <ListItem product={item} />;
        }}
        keyExtractor={(item: Product) => item.id}
        ListEmptyComponent={() => <EmptyListComponent loading={loading} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </DefaultSafeAreaContainer>
  );
}

export default ProductsScreen;

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },

  container: {
    display: "flex",
    padding: 15,
    borderWidth: 1,
    borderColor: "purple",
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  left: {
    display: "flex",
    flex: 2,
    justifyContent: "flex-start",
  },
  right: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    color: "red",
    textTransform: "uppercase",
    flexWrap: "nowrap",
  },
});
