import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import { ShoppingList } from "../../../interfaces/shoppingList";

interface Props {
  item: ShoppingList;
  cb: (id: string, action: string) => void;
}

export function ListItem(props: Props) {
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
});
