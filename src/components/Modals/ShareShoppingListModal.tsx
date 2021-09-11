import { useMutation } from "@apollo/client";
import React from "react";
import { Button, Modal, Text, View, StyleSheet } from "react-native";
import { CREATE_SHARE_SHOPPING_LIST_NOTIFICATION } from "../../apollo/graphql";
import { AuthContext } from "../../contexts";
import { NotificationsCreateInput } from "../../interfaces/notification";
import { DefaultInput } from "../Inputs";
import { showToast } from "../Toast";

interface Props {
  isOpen: boolean;
  close: () => void;
  userId: string;
  shoppingListId: string;
}

export function ShareShoppingListModal(props: Props) {
  const { isOpen, close, userId = "", shoppingListId = "" } = props;

  const { user } = React.useContext(AuthContext);

  const [email, setEmail] = React.useState("");

  const [doCreateShareShoppingListNotification, { loading }] = useMutation(
    CREATE_SHARE_SHOPPING_LIST_NOTIFICATION
  );
  async function createShareShoppingListNotification() {
    try {
      await doCreateShareShoppingListNotification({
        variables: {
          userId,
          email,
        },
      });

      showToast("Lista compartilhada com sucesso!");

      close();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Modal visible={isOpen} transparent={true}>
      <View style={styles.modal}>
        <View style={styles.backdrop} />
        <View style={styles.container}>
          <Button title="Close!" onPress={close} />
          <DefaultInput
            placeholder="Insira o email do usuário"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <Button
              title="Share!"
              onPress={createShareShoppingListNotification}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  backdrop: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "black",
    opacity: 0.6,
  },

  container: {
    display: "flex",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
