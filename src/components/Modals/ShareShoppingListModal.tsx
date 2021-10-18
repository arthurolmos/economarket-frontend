import { useMutation } from "@apollo/client";
import React from "react";
import { CREATE_NOTIFICATION } from "../../apollo/graphql";
import { AuthContext } from "../../contexts";
import { ShoppingList } from "../../interfaces/shoppingList";
import { validate } from "../../lib/validations";
import { DefaultInput } from "../inputs";
import { showToast } from "../toast";
import { DefaultModalLayout } from "./DefaultModalLayout";

interface Props {
  isOpen: boolean;
  close: () => void;
  shoppingList: ShoppingList;
}

export function ShareShoppingListModal(props: Props) {
  const { isOpen, close, shoppingList } = props;

  const { user } = React.useContext(AuthContext);

  const [email, setEmail] = React.useState("");

  const [createNotification, { loading }] = useMutation(CREATE_NOTIFICATION);
  async function submit() {
    try {
      if (!validate(email)) throw new Error("Preencha os dados corretamente!");

      if (email === user.email) return;

      const input = {
        shoppingListId: shoppingList.id,
        title: "Olha só!",
        body: `O usuário ${user?.firstName} ${user?.lastName} compartilhou a lista ${shoppingList.name} com você!`,
      };

      await createNotification({
        variables: {
          email,
          data: input,
        },
      });

      showToast("Lista compartilhada com sucesso!");

      close();
    } catch (err) {
      console.log("Error on sharing Shopping List!", err);
      showToast("Erro ao compartilhar a lista!");
    }
  }

  return (
    <DefaultModalLayout
      close={close}
      isOpen={isOpen}
      loading={loading}
      submit={submit}
      title="Compartilhar Lista"
    >
      <>
        <DefaultInput
          placeholder="Insira o email do usuário"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </>
    </DefaultModalLayout>
  );
}
