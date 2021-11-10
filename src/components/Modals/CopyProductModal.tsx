import { useMutation } from "@apollo/client";
import React from "react";
import { CREATE_LIST_PRODUCT } from "../../apollo/graphql";
import {
  ListProduct,
  ListProductCreateInput,
} from "../../interfaces/list-product";
import { DefaultInput } from "../inputs";
import { showToast } from "../toast";
import { DefaultModalLayout } from "./DefaultModalLayout";

interface Props {
  isOpen: boolean;
  close: () => void;
  product: Partial<ListProduct> | null;
  shoppingListId: string;
}

export function CopyProductModal(props: Props) {
  const { isOpen, close, product, shoppingListId } = props;

  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [market, setMarket] = React.useState("");
  const [quantity, setQuantity] = React.useState("");

  React.useEffect(() => {
    setName(product?.name ? product.name : "");
    setQuantity(product?.quantity ? product.quantity.toString() : "");
    setPrice(product?.price ? product.price.toString() : "");
    setBrand(product?.brand ? product.brand : "");
    setMarket(product?.market ? product.market : "");
  }, [product]);

  const [copyProduct, { loading, error }] = useMutation(CREATE_LIST_PRODUCT);

  async function submit() {
    try {
      const data: ListProductCreateInput = {
        name,
        price: parseFloat(price),
        market,
        brand,
        quantity: parseFloat(quantity),
        purchased: false,
      };

      await copyProduct({
        variables: { data, shoppingListId },
      });

      showToast("Produto copiado com sucesso!");
      close();
    } catch (err: any) {
      console.log("Error on copying Product!", err);
      showToast("Erro ao criar produto!");
    }
  }

  return (
    <DefaultModalLayout
      isOpen={isOpen}
      close={close}
      loading={loading}
      submit={submit}
      title="Copiar produto"
    >
      <DefaultInput value={name} onChangeText={setName} placeholder="Nome" />

      <DefaultInput
        placeholder="Quantidade"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />

      <DefaultInput
        placeholder="Preço Unitário"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <DefaultInput value={brand} onChangeText={setBrand} placeholder="Marca" />

      <DefaultInput
        value={market}
        onChangeText={setMarket}
        placeholder="Mercado"
      />
    </DefaultModalLayout>
  );
}
