import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import DefaultScreenProp from "../interfaces/navigation/DefaultScreenProp";
import { ShoppingListItem } from "../components/list-items";
import { FloatingButton } from "../components/buttons/FloatingButton";
import { EmptyListComponent } from "../components/list-items";
import { ShoppingListsContext } from "../contexts";
import { DefaultSafeAreaContainer } from "../components/layout/DefaultSafeAreaContainer";
import { ShoppingList } from "../interfaces/shoppingList";

function MyListsScreen({ navigation }: DefaultScreenProp) {
  const { shoppingLists, loading, refetch } =
    React.useContext(ShoppingListsContext);

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
          return <ShoppingListItem shoppingList={item} />;
        }}
        keyExtractor={(item: ShoppingList) => item.id}
        ListEmptyComponent={() => <EmptyListComponent loading={loading} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      {/* 
      <FloatingButton
        action={() => navigation.navigate("CreateShoppingList")}
      /> */}
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
