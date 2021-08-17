import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import DefaultScreenProp from "../interfaces/navigation/DefaultScreenProp";
import { gql, useMutation } from "@apollo/client";
import { CREATE_SHOPPING_LIST } from "../apollo/graphql";
import { showToast } from "../components/Toast";
import { DefaultInput } from "../components/Inputs";
import { ShoppingListCreateInput } from "../interfaces/shoppingList";

function CreateShoppingListScreen({ navigation }: DefaultScreenProp) {
  const { user } = React.useContext(AuthContext);

  const [name, setName] = React.useState("");

  const [doCreate, { loading }] = useMutation(CREATE_SHOPPING_LIST, {
    refetchQueries: ["GetShoppingListsByUser"],
  });

  async function create() {
    const data: ShoppingListCreateInput = {
      name,
      date: new Date(),
    };

    doCreate({
      variables: { userId: user?.id, data },
    })
      .then(() => {
        navigation.goBack();
        showToast("Criado com sucesso!");
      })
      .catch((err) => {
        console.log(err.message);
        showToast(err.message);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={{ textTransform: "uppercase", margin: 25, fontSize: 30 }}>
        Criar Shopping List
      </Text>
      <DefaultInput value={name} onChangeText={setName} placeholder="Name" />

      <View
        style={{
          display: "flex",
          justifyContent: "center",
          width: "60%",
          padding: 15,
        }}
      >
        <>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <>
              <Button title="Salvar" onPress={() => create()} />
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
    justifyContent: "center",
    padding: 15,
  },
});
