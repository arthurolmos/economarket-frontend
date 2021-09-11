import React from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import DefaultScreenProp from "../interfaces/navigation/DefaultScreenProp";
import { ShoppingListItem } from "../components/ListItems";
import { FloatingButton } from "../components/Buttons/FloatingButton";
import { AuthContext } from "../contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmptyListComponent } from "../components/ListItems";
import { getShoppingListsByUser } from "../apollo/queries";

function MyListsScreen({ navigation }: DefaultScreenProp) {
  const { user } = React.useContext(AuthContext);

  const { loading, data, refetch } = getShoppingListsByUser(user?.id);

  const shoppingLists = data?.shoppingListsByUser;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshing={loading}
        onRefresh={refetch}
        data={shoppingLists}
        renderItem={({ item }) => {
          return <ShoppingListItem shoppingList={item} />;
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
