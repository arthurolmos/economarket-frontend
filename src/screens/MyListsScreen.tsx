import React from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import DefaultScreenProp from "../interfaces/navigation/DefaultScreenProp";
import ShoppingList from "../components/ShoppingListItem";
import { useQuery } from "@apollo/client";
import { FloatingButton } from "../components/Buttons/FloatingButton";
import { AuthContext } from "../contexts/AuthContext";
import { GET_SHOPPING_LISTS_BY_USER } from "../graphql";
import { SafeAreaView } from "react-native-safe-area-context";

function MyListsScreen({ navigation }: DefaultScreenProp) {
  const { user } = React.useContext(AuthContext);

  const { loading, error, data, refetch } = useQuery(
    GET_SHOPPING_LISTS_BY_USER,
    {
      variables: { userId: user?.id },
    }
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshing={loading}
        onRefresh={refetch}
        data={data?.shoppingListsByUser}
        renderItem={({ item }) => {
          return <ShoppingList shoppingList={item} />;
        }}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <View>
            <Text>{loading ? "Carregando" : "Sem listas para exibir!"}</Text>
          </View>
        )}
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
