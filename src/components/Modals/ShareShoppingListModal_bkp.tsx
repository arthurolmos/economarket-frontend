import { useMutation } from "@apollo/client";
import React from "react";
import { Button, Modal, Text, View, StyleSheet } from "react-native";
import { SHARE_SHOPPING_LIST } from "../../apollo/graphql";
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

  const [email, setEmail] = React.useState("");

  const [doShareShoppingList, sharingShoppingList] =
    useMutation(SHARE_SHOPPING_LIST);

  async function shareShoppingList() {
    try {
      //TODO: melhorar validações e tela
      if (userId === "" || shoppingListId === "")
        throw new Error("Dados inválidos!");

      if (email === "") throw new Error("Dados inválidos!");
      const emails = email.split(";").map((email) => email.trim());

      await doShareShoppingList({
        variables: {
          userId,
          id: shoppingListId,
          sharedUsersEmail: emails,
        },
      });

      showToast("Lista compartilhada com sucesso!");
    } catch (err) {
      console.log(err.message);
      showToast(err.message);
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

          {sharingShoppingList.loading ? (
            <Text>Loading...</Text>
          ) : (
            <Button title="Share!" onPress={shareShoppingList} />
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
