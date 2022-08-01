import { useMutation } from "@apollo/client";
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import {
  DELETE_SHOPPING_LIST,
  GET_SHOPPING_LISTS_BY_USER,
  RESTORE_SHOPPING_LIST,
} from "../../apollo/graphql";
import { AuthContext } from "../../contexts";
import { ShoppingList } from "../../interfaces/shoppingList";
import { showToast } from "../../components/toast";

interface Props {
  item: ShoppingList;
}

export function ListItem(props: Props) {
  const { item } = props;

  const { user } = useAuthContext();

  const [consider, setConsider] = React.useState(true);
  const toggle = () => setConsider(!consider);

  const date = new Date(item.date);
  function pad(n: number) {
    return n < 10 ? "0" + n : n;
  }
  const formattedDate = [
    pad(date.getDate()),
    pad(date.getMonth() + 1),
    pad(date.getFullYear()),
  ].join("/");

  const [doDeleteShoppingList, deletingShoppingList] = useMutation(
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

  async function deleteShoppingList() {
    try {
      await doDeleteShoppingList({
        variables: { id: item.id, userId: user?.id },
      });

      showToast("Lista excluída com sucesso!");
    } catch (err: any) {
      console.log("Error on deleting Shopping List!", err);
    }
  }

  const [doRestoreShoppingList, restoreingShoppingList] = useMutation(
    RESTORE_SHOPPING_LIST,
    {
      refetchQueries: [
        {
          query: GET_SHOPPING_LISTS_BY_USER,
          variables: { userId: user?.id },
        },
      ],
    }
  );

  async function restoreShoppingList() {
    try {
      await doRestoreShoppingList({
        variables: { id: item.id, userId: user?.id },
      });

      showToast("Lista reaberta com sucesso!");
    } catch (err: any) {
      console.log("Error on restore Shopping List!", err);
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ display: "flex", marginBottom: 10 }}>
        <View style={styles.date}>
          <Text>{formattedDate}</Text>
        </View>
        <View style={styles.info}>
          <View style={styles.title}>
            <Text>{item.name}</Text>
          </View>
          <View style={styles.price}>
            <Text>R$ {item.totalPrice.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {deletingShoppingList.loading ? (
          <ActivityIndicator size="small" color="green" />
        ) : (
          <Button onPress={deleteShoppingList} title="Excluir" />
        )}
        {item.done &&
          (restoreingShoppingList.loading ? (
            <ActivityIndicator size="small" color="green" />
          ) : (
            <Button onPress={restoreShoppingList} title="Reabrir" />
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "purple",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    display: "flex",
    flexDirection: "column",
  },

  date: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  info: { display: "flex", flexDirection: "row", flex: 1 },

  title: { display: "flex", flex: 1 },

  price: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});
