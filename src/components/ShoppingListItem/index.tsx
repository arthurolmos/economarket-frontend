import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ShoppingList } from "../../interfaces/shoppingList";
import { AuthContext } from "../../contexts/AuthContext";

interface Props {
  shoppingList: ShoppingList;
}

function ShoppingListItem(props: Props) {
  const { user } = React.useContext(AuthContext);

  const { shoppingList } = props;

  const navigation = useNavigation();

  const owner = shoppingList?.user?.id === user?.id ? "OWNER" : "Shared";

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("ShoppingList", { id: shoppingList.id })
      }
    >
      <View style={styles.left}>
        <Text style={styles.title}>{shoppingList.name}</Text>
        <Text>
          Criado por{" "}
          {`${shoppingList?.user?.firstName} ${shoppingList?.user?.lastName}`}
        </Text>
        <Text>{owner}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.price}>R$ 10,00</Text>
      </View>
    </TouchableOpacity>
  );
}

export default ShoppingListItem;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
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
