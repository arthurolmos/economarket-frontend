import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ShoppingList } from "../../interfaces/shoppingList";
import { AuthContext } from "../../contexts/AuthContext";
import { useMutation } from "@apollo/client";
import {
  DELETE_PRODUCT,
  DELETE_SHOPPING_LIST,
  GET_PRODUCTS_BY_USER,
  GET_SHOPPING_LISTS_BY_USER,
  LEAVE_SHARED_SHOPPING_LIST,
} from "../../apollo/graphql";
import { showToast } from "../toast";
import { Product } from "../../interfaces/product";
import { Ionicons } from "@expo/vector-icons";
import ScreenNavigationProp from "../../interfaces/navigation/ScreenNavigationProp";

interface Props {
  product: Product;
}

export function ProductListItem(props: Props) {
  const { user } = React.useContext(AuthContext);

  const { product } = props;

  const navigation = useNavigation<ScreenNavigationProp>();

  const [doDeleteProduct, { loading }] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [
      {
        query: GET_PRODUCTS_BY_USER,
        variables: { userId: user?.id },
      },
    ],
  });

  async function deleteProduct() {
    try {
      await doDeleteProduct({
        variables: { id: product.id },
      });

      showToast("Produto excluído com sucesso!");
    } catch (err) {
      console.log("Error on deleting product!", err);
      showToast(err.message);
    }
  }

  const showConfirmAlert = () => {
    return Alert.alert(
      "Confirmação",
      `Deseja excluir o produto ${product.name} ?`,
      [
        {
          text: "Confirmar",
          onPress: deleteProduct,
          style: "default",
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View style={styles.left}>
          <Text style={styles.title}>{product.name}</Text>
          <Text>{product.price}</Text>
          <Text>{product.market}</Text>
          <Text>{product.brand}</Text>
        </View>
        <View style={styles.right}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("EditProduct", {
                id: product.id,
              })
            }
          >
            <Ionicons name="create" size={32} color="gray" />
          </TouchableOpacity>
          {loading ? (
            <ActivityIndicator size="small" color="lightgreen" />
          ) : (
            <TouchableOpacity onPress={showConfirmAlert}>
              <Ionicons name="trash" size={32} color="gray" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
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
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    color: "red",
    textTransform: "uppercase",
    flexWrap: "nowrap",
  },
});
