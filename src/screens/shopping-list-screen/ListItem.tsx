import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  GET_SHOPPING_LIST,
  DELETE_LIST_PRODUCT,
  UPDATE_LIST_PRODUCT,
} from "../../apollo/graphql";
import { ListProduct } from "../../interfaces/list-product";
import { showToast } from "../../components/toast";
import { Swipeable } from "react-native-gesture-handler";
import { Product } from "../../interfaces/product";
import { DefaulScreenNavigationProp } from "../../interfaces/navigation";
import { DefaultIcon } from "../../components/icons";
import { useNavigation } from "@react-navigation/core";
import { useMutation } from "@apollo/client";

interface Props {
  product: ListProduct;
  openFavModal: (product: Partial<Product>) => void;
  openCopyModal: (product: Partial<ListProduct>) => void;
}

export function ListItem(props: Props) {
  const { product, openFavModal, openCopyModal } = props;

  const navigation = useNavigation<DefaulScreenNavigationProp>();

  const swipeRef = React.useRef<Swipeable>(null);

  const totalPrice = product.price * product.quantity;

  const [doDeleteListProduct, deleting] = useMutation(DELETE_LIST_PRODUCT, {
    refetchQueries: [
      {
        query: GET_SHOPPING_LIST,
        variables: { id: product.shoppingList?.id },
      },
    ],
  });

  async function deleteListProduct() {
    try {
      await doDeleteListProduct({
        variables: { id: product.id, shoppingListId: product.shoppingList?.id },
      });

      showToast("Produto removido com sucesso!");
    } catch (err: any) {
      console.log("Error on removing product", err);
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
          shoppingListId: product.shoppingList?.id,
          values: values,
          id: product.id,
        },
      });

      if (values.purchased) {
        showToast("Produto comprado com sucesso!");
      } else {
        showToast("Produto retornado com sucesso!");
      }
    } catch (err: any) {
      console.log("Error on purchasing product", err);
      showToast(err.message);
    }
  }

  const renderLeftActions = () => {
    return (
      <TouchableOpacity
        style={styles.leftActionPanel}
        onPress={async () => {
          await deleteListProduct();
        }}
      >
        {deleting.loading ? (
          <ActivityIndicator size="small" color="lightpink" />
        ) : (
          <DefaultIcon name="trash" size={32} color="lightpink" />
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
            : { backgroundColor: "lightgreen" },
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
              <DefaultIcon name="close" size={32} color="blue" />
            ) : (
              <DefaultIcon name="cart" size={32} color="green" />
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
            : { backgroundColor: "white" },
        ]}
      >
        <View style={{ display: "flex", flex: 2 }}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text>R$ {product.price?.toFixed(2)}</Text>
          <Text>Qtd: {product.quantity}</Text>
          <Text>Total: R$ {totalPrice.toFixed(2)}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => openCopyModal(product)}>
            <DefaultIcon name="copy" size={26} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("EditListProduct", {
                id: product.id,
                shoppingListId: product.shoppingList?.id,
              })
            }
          >
            <DefaultIcon name="create" size={26} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => openFavModal(product)}>
            <DefaultIcon name="star" size={26} color="gray" />
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
    borderRadius: 5,
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
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  rightActionPanel: {
    backgroundColor: "lightgreen",
    display: "flex",
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },

  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
});
