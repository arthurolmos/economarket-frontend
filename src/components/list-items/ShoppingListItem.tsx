import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ShoppingList } from "../../interfaces/shoppingList";
import { AuthContext } from "../../contexts/AuthContext";
import { useMutation } from "@apollo/client";
import {
  DELETE_SHOPPING_LIST,
  FINISH_SHOPPING_LIST,
  GET_SHOPPING_LISTS_BY_USER,
  LEAVE_SHARED_SHOPPING_LIST,
} from "../../apollo/graphql";
import { showToast } from "../toast";
import ScreenNavigationProp from "../../interfaces/navigation/ScreenNavigationProp";
import { Swipeable } from "react-native-gesture-handler";
import { DefaultIcon } from "../icons";

interface Props {
  shoppingList: ShoppingList;
}

export function ShoppingListItem(props: Props) {
  const { user } = React.useContext(AuthContext);

  const { shoppingList } = props;

  const navigation = useNavigation<ScreenNavigationProp>();

  const swipeRef = React.useRef<Swipeable>(null);

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

  async function leaveShoppingList() {
    try {
      await doLeaveShoppingList({
        variables: { id: shoppingList.id, userId: user?.id },
      });

      showToast("Saida com sucesso!");
    } catch (err) {
      console.log("Error on leaing Shopping List", err);
      console.log(err.message);
    }
  }

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
        variables: { id: shoppingList.id, userId: user?.id },
      });

      showToast("Lista excluída com sucesso!");
    } catch (err) {
      console.log("Error on deleting Shopping List!", err);
    }
  }

  const [doFinishShoppingList, finishingShoppingList] = useMutation(
    FINISH_SHOPPING_LIST,
    {
      refetchQueries: [
        {
          query: GET_SHOPPING_LISTS_BY_USER,
          variables: { userId: user?.id },
        },
      ],
    }
  );

  async function finishShoppingList() {
    try {
      await doFinishShoppingList({
        variables: { id: shoppingList.id, userId: user?.id },
      });

      showToast("Lista finalizada com sucesso!");
    } catch (err) {
      console.log("Error on finishing Shopping List!", err);
    }
  }

  const renderLeftActions = () => {
    return (
      <TouchableOpacity
        style={styles.leftActionPanel}
        onPress={async () => {
          shoppingList.isOwner
            ? await deleteShoppingList()
            : await leaveShoppingList();
        }}
      >
        {deletingShoppingList.loading ? (
          <ActivityIndicator size="small" color="darkred" />
        ) : (
          <DefaultIcon
            name={shoppingList.isOwner ? "trash" : "exit"}
            size={32}
            color="pink"
          />
        )}
      </TouchableOpacity>
    );
  };

  const renderRightActions = () => {
    return (
      <TouchableOpacity
        style={[styles.rightActionPanel]}
        onPress={async () => {
          await finishShoppingList();
          swipeRef?.current?.close();
        }}
      >
        {finishingShoppingList.loading ? (
          <ActivityIndicator size="small" color="green" />
        ) : (
          <DefaultIcon name="checkmark" size={32} color="green" />
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
      <TouchableWithoutFeedback
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
            </View>
            <View style={styles.right}>
              <Text style={styles.price}>
                R$ {shoppingList.totalPrice.toFixed(2)}
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
              deletingShoppingList.loading ? (
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
      </TouchableWithoutFeedback>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    padding: 15,
    borderWidth: 1,
    borderColor: "purple",
    borderRadius: 5,
    backgroundColor: "white",
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
    width: "30%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
