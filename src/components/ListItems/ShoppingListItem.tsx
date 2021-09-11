import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ShoppingList } from "../../interfaces/shoppingList";
import { AuthContext } from "../../contexts/AuthContext";
import { useMutation } from "@apollo/client";
import {
  DELETE_SHOPPING_LIST,
  GET_SHOPPING_LISTS_BY_USER,
  LEAVE_SHARED_SHOPPING_LIST,
} from "../../apollo/graphql";
import { showToast } from "../Toast";

interface Props {
  shoppingList: ShoppingList;
}

export function ShoppingListItem(props: Props) {
  const { user } = React.useContext(AuthContext);

  const { shoppingList } = props;

  const navigation = useNavigation();

  const [doLeaveShoppingList, leavingShoppingList] = useMutation(
    LEAVE_SHARED_SHOPPING_LIST,
    {
      refetchQueries: [
        {
          query: GET_SHOPPING_LISTS_BY_USER,
          variables: { userId: user?.id },
        },
      ],
    }
  );

  function leaveShoppingList() {
    doLeaveShoppingList({
      variables: { id: shoppingList.id, userId: user?.id },
    })
      .then(() => showToast("Saida com sucesso!"))
      .catch((err) => console.log(err));
  }

  const [doDeleteShoppingList, deletingShoppinList] = useMutation(
    DELETE_SHOPPING_LIST,
    {
      refetchQueries: [
        {
          query: GET_SHOPPING_LISTS_BY_USER,
          variables: { userId: user?.id },
        },
      ],
    }
  );

  function deleteShoppingList() {
    doDeleteShoppingList({
      variables: { id: shoppingList.id, userId: user?.id },
    })
      .then(() => showToast("Lista excluída com sucesso!"))
      .catch((err) => console.log(err));
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ShoppingList", { id: shoppingList.id })
      }
    >
      <View style={styles.container}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={styles.left}>
            <Text style={styles.title}>{shoppingList.name}</Text>
            <Text>
              Criado por{" "}
              {`${shoppingList?.user?.firstName} ${shoppingList?.user?.lastName}`}
            </Text>
            <Text>{shoppingList.isOwner ? "OWNER" : "SHARED"}</Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.price}>
              R$ {shoppingList.totalPrice?.toFixed(2)}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button title="Editar" onPress={() => console.log("EDIT!")} />
          {shoppingList.isOwner ? (
            deletingShoppinList.loading ? (
              <Text>Loading...</Text>
            ) : (
              <Button title="Excluir" onPress={deleteShoppingList} />
            )
          ) : leavingShoppingList.loading ? (
            <Text>Loading...</Text>
          ) : (
            <Button title="Sair" onPress={leaveShoppingList} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    color: "red",
    textTransform: "uppercase",
    flexWrap: "nowrap",
  },
});
