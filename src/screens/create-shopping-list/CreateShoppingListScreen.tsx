import React from "react";
import { DefaultStackScreenProps } from "../../interfaces/navigation";
import { DefaultSafeAreaContainer } from "../../components/layout/DefaultSafeAreaContainer";
import { loadingCreation } from "./model";
import Form from "./components/Form";

function CreateShoppingListScreen({}: DefaultStackScreenProps<"CreateShoppingList">) {
  return (
    <DefaultSafeAreaContainer loading={loadingCreation}>
      <Form />
    </DefaultSafeAreaContainer>
  );
}

export default CreateShoppingListScreen;
