import React from "react";
import { StyleSheet, View, Button, ActivityIndicator } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import DefaultScreenProp from "../interfaces/navigation/DefaultScreenProp";
import { useMutation } from "@apollo/client";
import { CREATE_SHOPPING_LIST } from "../apollo/graphql";
import { showToast } from "../components/Toast";
import { DefaultInput } from "../components/Inputs";
import { ShoppingListCreateInput } from "../interfaces/shoppingList";

function CreateShoppingListScreen({ navigation }: DefaultScreenProp) {
  const { user } = React.useContext(AuthContext);

  const [name, setName] = React.useState("");

  const [createShoppingList, { loading }] = useMutation(CREATE_SHOPPING_LIST, {
    refetchQueries: ["GetShoppingListsByUser"],
  });

  async function submit() {
    try {
      const data: ShoppingListCreateInput = {
        name,
        date: new Date(),
      };

      await createShoppingList({
        variables: { userId: user?.id, data },
      });

      showToast("Criado com sucesso!");
      navigation.goBack();
    } catch (err) {
      console.log("Error on creating Shopping List", err);
      showToast("Erro ao criar a lista!");
    }
  }

  return (
    <View style={styles.container}>
      <DefaultInput value={name} onChangeText={setName} placeholder="Name" />

      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 15,
        }}
      >
        <>
          {loading ? (
            <ActivityIndicator size="large" color="green" />
          ) : (
            <>
              <Button title="Salvar" onPress={() => submit()} />
            </>
          )}
        </>
      </View>
    </View>
  );
}

export default CreateShoppingListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
});
