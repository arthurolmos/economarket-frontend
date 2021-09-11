import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  GET_SHOPPING_LIST,
  DELETE_LIST_PRODUCT,
  UPDATE_LIST_PRODUCT,
  CREATE_PRODUCT,
} from "../../apollo/graphql";
import { ListProduct } from "../../interfaces/listProduct";
import { showToast } from "../Toast";
import { Swipeable } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../contexts";
import { Product } from "../../interfaces/product";

interface Props {
  product: ListProduct;
  openModal: (product: Partial<Product>) => void;
}

export function ListProductListItem(props: Props) {
  const { product, openModal } = props;

  const navigation = useNavigation();

  const totalPrice = product.price * product.quantity;

  const [doDeleteListProduct, deleting] = useMutation(DELETE_LIST_PRODUCT, {
    refetchQueries: [
      {
        query: GET_SHOPPING_LIST,
        variables: { id: product.shoppingList.id },
      },
    ],
  });

  async function deleteListProduct() {
    try {
      await doDeleteListProduct({
        variables: { id: product.id, shoppingListId: product.shoppingList.id },
      });

      showToast("Produto removido com sucesso!");
    } catch (err) {
      console.log(err.message);
      showToast(err.message);
    }
  }

  const [doPurchaseListProduct, purchasing] = useMutation(UPDATE_LIST_PRODUCT);

  async function purchaseListProduct() {
    try {
      const values = {
        purchased: !product.purchased,
      };

      await doPurchaseListProduct({
        variables: {
          shoppingListId: product.shoppingList.id,
          values: values,
          id: product.id,
        },
      });

      showToast("Produto comprado com sucesso!");
    } catch (err) {
      console.log(err.message);
      showToast(err.message);
    }
  }

  const swipeRef = React.useRef<Swipeable>(null);

  const renderLeftActions = () => {
    return (
      <TouchableOpacity
        style={styles.leftActionPanel}
        onPress={async () => {
          await deleteListProduct();
        }}
      >
        {deleting.loading ? (
          <ActivityIndicator size="small" color="darkred" />
        ) : (
          <Ionicons name="trash" size={32} />
        )}
      </TouchableOpacity>
    );
  };

  const renderRightActions = () => {
    return (
      <TouchableOpacity
        style={[
          styles.rightActionPanel,
          product.purchased
            ? { backgroundColor: "lightblue" }
            : { backgroundColor: "green" },
        ]}
        onPress={async () => {
          await purchaseListProduct();
          swipeRef?.current?.close();
        }}
      >
        {purchasing.loading ? (
          <ActivityIndicator size="small" color="green" />
        ) : (
          <Text>
            {product.purchased ? (
              <Ionicons name="close" size={32} />
            ) : (
              <Ionicons name="cart" size={32} />
            )}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      overshootLeft={false}
      overshootRight={false}
      ref={swipeRef}
    >
      <View
        style={[
          styles.container,
          product.purchased
            ? { backgroundColor: "lightgreen" }
            : { backgroundColor: "lightgray" },
        ]}
      >
        <View style={{ display: "flex", flex: 1 }}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text>R$ {product.price.toFixed(2)}</Text>
          <Text>Qtd: {product.quantity}</Text>
          <Text>Total: R$ {totalPrice.toFixed(2)}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("EditListProduct", {
                id: product.id,
                shoppingListId: product.shoppingList.id,
              })
            }
          >
            <Ionicons name="create" size={32} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => openModal(product)}>
            <Ionicons name="star" size={32} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: 15,
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  leftActionPanel: {
    backgroundColor: "red",
    display: "flex",
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  rightActionPanel: {
    backgroundColor: "lightgreen",
    display: "flex",
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    width: "30%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
