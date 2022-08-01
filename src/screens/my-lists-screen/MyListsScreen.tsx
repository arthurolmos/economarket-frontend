import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { DefaultBottomTabScreenProps } from "../../interfaces/navigation";
import { ListItem } from "../../components/list-items";
import { EmptyListComponent } from "../../components/list-items";
import { ShoppingListsContext } from "../../contexts";
import { DefaultSafeAreaContainer } from "../../components/layout/DefaultSafeAreaContainer";
import { ShoppingList } from "../../interfaces/shoppingList";

function MyListsScreen({ navigation }: DefaultBottomTabScreenProps<"MyLists">) {
  const { shoppingLists, loading, refetch } = useShoppingListsContext();

  const openShoppingLists = shoppingLists.filter(
    (shoppingList: ShoppingList) => !shoppingList.done
  );

  return (
    <DefaultSafeAreaContainer>
      <FlatList
        refreshing={loading}
        onRefresh={refetch}
        data={openShoppingLists}
        renderItem={({ item }: { item: ShoppingList }) => {
          return <ListItem shoppingList={item} />;
        }}
        keyExtractor={(item: ShoppingList) => item.id}
        ListEmptyComponent={() => <EmptyListComponent loading={loading} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </DefaultSafeAreaContainer>
  );
}

export default MyListsScreen;

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
