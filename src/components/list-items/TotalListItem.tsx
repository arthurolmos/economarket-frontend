import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { ShoppingList } from "../../interfaces/shoppingList";

interface Props {
  item: ShoppingList;
}

export function TotalListItem(props: Props) {
  const { item } = props;

  const date = new Date(item.date);
  function pad(n: number) {
    return n < 10 ? "0" + n : n;
  }
  const formattedDate = [
    pad(date.getDate()),
    pad(date.getMonth() + 1),
    pad(date.getFullYear()),
  ].join("/");

  return (
    <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "purple",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
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
