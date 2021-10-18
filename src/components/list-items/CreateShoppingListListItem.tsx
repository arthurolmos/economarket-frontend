import Checkbox from "expo-checkbox";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { ShoppingList } from "../../interfaces/shoppingList";

interface Props {
  item: ShoppingList;
  cb: (id: string, action: string) => void;
}

export function CreateShoppingListListItem(props: Props) {
  const { item, cb } = props;

  const [selected, setSelected] = React.useState(false);

  React.useEffect(() => {
    if (selected) {
      cb(item.id, "add");
    } else {
      cb(item.id, "delete");
    }
  }, [selected]);

  return (
    <View style={styles.wrapper}>
      <Checkbox
        value={selected}
        onValueChange={setSelected}
        style={{ marginRight: 10 }}
      />
      <Text>{item.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
  },
  separator: {
    height: 10,
  },
});
