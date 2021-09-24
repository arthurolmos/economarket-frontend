import React from "react";
import { View } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import DefaultScreenProp from "../interfaces/navigation/DefaultScreenProp";
import { useMutation } from "@apollo/client";
import { CREATE_SHOPPING_LIST } from "../apollo/graphql";
import { showToast } from "../components/toast";
import { DefaultDatePicker, DefaultInput } from "../components/inputs";
import { ShoppingListCreateInput } from "../interfaces/shoppingList";
import { validateCreateShoppingList } from "../lib/validations/validateCreateShoppingList";
import { SaveButton } from "../components/buttons";
import { DefaultSafeAreaContainer } from "../components/layout/DefaultSafeAreaContainer";

function CreateShoppingListScreen({ navigation }: DefaultScreenProp) {
  const { user } = React.useContext(AuthContext);

  const [name, setName] = React.useState("");
  const [date, setDate] = React.useState(new Date());

  const cb = (date: Date) => setDate(date);

  const [createShoppingList, { loading }] = useMutation(CREATE_SHOPPING_LIST, {
    refetchQueries: ["GetShoppingListsByUser"],
  });

  async function submit() {
    try {
      const data: ShoppingListCreateInput = {
        name,
        date: date,
      };

      if (!validateCreateShoppingList(data))
        throw new Error("Preencha os campos corretamente!");

      await createShoppingList({
        variables: { userId: user?.id, data },
      });

      showToast("Criado com sucesso!");
      navigation.goBack();
    } catch (err) {
      console.log("Error on creating Shopping List", err);
      showToast(err.message);
    }
  }

  return (
    <DefaultSafeAreaContainer loading={loading}>
      <DefaultInput value={name} onChangeText={setName} placeholder="Nome" />

      <DefaultDatePicker cb={cb} date={date} />

      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 15,
        }}
      >
        <SaveButton action={submit} />
      </View>
    </DefaultSafeAreaContainer>
  );
}

export default CreateShoppingListScreen;
