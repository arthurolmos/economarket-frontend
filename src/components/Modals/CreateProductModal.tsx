import { useMutation } from "@apollo/client";
import React from "react";
import { CREATE_PRODUCT } from "../../apollo/graphql";
import { AuthContext } from "../../contexts";
import { Product } from "../../interfaces/product";
import { DefaultInput } from "../inputs";
import { showToast } from "../toast";
import { DefaultModalLayout } from "./DefaultModalLayout";

interface Props {
  isOpen: boolean;
  close: () => void;
  product: Partial<Product> | null;
}

export function CreateProductModal(props: Props) {
  const { user } = useAuthContext();

  const { isOpen, close, product } = props;

  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [market, setMarket] = React.useState("");

  React.useEffect(() => {
    setName(product?.name ? product.name : "");
    setPrice(product?.price ? product.price.toString() : "");
    setBrand(product?.brand ? product.brand : "");
    setMarket(product?.market ? product.market : "");
  }, [product]);

  const [createProduct, { loading, error }] = useMutation(CREATE_PRODUCT);

  async function submit() {
    try {
      const data = {
        name,
        price: parseFloat(price),
        market,
        brand,
      };

      await createProduct({ variables: { data, userId: user?.id } });

      showToast("Produto criado com sucesso!");
      close();
    } catch (err: any) {
      console.log("Error on creating Product!", err);
      showToast("Erro ao criar produto!");
    }
  }

  return (
    <DefaultModalLayout
      isOpen={isOpen}
      close={close}
      loading={loading}
      submit={submit}
      title="Criar produto"
    >
      <DefaultInput value={name} onChangeText={setName} placeholder="Nome" />

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
