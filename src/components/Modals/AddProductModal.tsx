import { useMutation } from "@apollo/client";
import React from "react";
import {
  Button,
  Modal,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { CREATE_PRODUCT, SHARE_SHOPPING_LIST } from "../../apollo/graphql";
import { AuthContext } from "../../contexts";
import { Product } from "../../interfaces/product";
import { DefaultInput } from "../Inputs";
import { showToast } from "../Toast";

interface Props {
  isOpen: boolean;
  close: () => void;
  product: Partial<Product> | null;
}

export function AddProductModal(props: Props) {
  const { user } = React.useContext(AuthContext);

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

  const [doCreateProduct, { loading, error }] = useMutation(CREATE_PRODUCT);

  async function createProduct() {
    try {
      const data = {
        name,
        price: parseFloat(price),
        market,
        brand,
      };

      await doCreateProduct({ variables: { data, userId: user?.id } });

      showToast("Produto criado com sucesso!");
      close();
    } catch (err) {
      console.log(err);
      showToast("Erro ao criar produto!");
    }
  }

  return (
    <Modal visible={isOpen} transparent={true}>
      <View style={styles.modal}>
        <View style={styles.backdrop} />

        <View style={styles.container}>
          <Button title="Close!" onPress={close} />

          <DefaultInput
            value={name}
            onChangeText={setName}
            placeholder="Nome"
          />

          <DefaultInput
            placeholder="Preço Unitário"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />

          <DefaultInput
            value={brand}
            onChangeText={setBrand}
            placeholder="Marca"
          />

          <DefaultInput
            value={market}
            onChangeText={setMarket}
            placeholder="Mercado"
          />

          {loading ? (
            <ActivityIndicator size="small" color="green" />
          ) : (
            <Button title="Criar Produto!" onPress={createProduct} />
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
    margin: 15,
    justifyContent: "center",
    backgroundColor: "white",
  },
});
