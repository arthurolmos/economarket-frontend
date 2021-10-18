import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import { useQuery } from "@apollo/client";
import { GET_SHOPPING_LIST_BY_USER } from "../../apollo/graphql";
import ParamScreenProp from "../../interfaces/navigation/ParamScreenProp";
import { ListProductListItem } from "../../components/list-items";
import { ShoppingList } from "../../interfaces/shoppingList";
import { ListProduct } from "../../interfaces/list-product";
import { DefaultSubtitle, DefaultTitle } from "../../components/texts";
import { EmptyListComponent } from "../../components/list-items";
import { ShareShoppingListModal } from "../../components/modals";
import { Product } from "../../interfaces/product";
import { CreateProductModal } from "../../components/modals/CreateProductModal";
import { DefaultSafeAreaContainer } from "../../components/layout/DefaultSafeAreaContainer";
import { DefaultIcon } from "../../components/icons";
import AddListProductPanel from "./AddListProductPanel";

function ShoppingListScreen({
  route,
  navigation,
}: ParamScreenProp<"ShoppingList">) {
  const { user } = React.useContext(AuthContext);

  const shoppingListId = route.params.id;

  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [shareModalVisible, setShareModalVisible] = React.useState(false);
  const openShareModal = () => setShareModalVisible(true);
  const closeShareModal = () => setShareModalVisible(false);

  const [modalProduct, setModalProduct] =
    React.useState<Partial<Product> | null>(null);
  const [addProductModalVisible, setFavProductModalVisible] =
    React.useState(false);
  const openFavProductModal = (product: Partial<Product>) => {
    setModalProduct(product);
    setFavProductModalVisible(true);
  };
  const closeFavProductModal = () => {
    setModalProduct(null);
    setFavProductModalVisible(false);
  };

  const { startPolling, stopPolling, ...getShoppingListResult } = useQuery(
    GET_SHOPPING_LIST_BY_USER,
    {
      variables: { id: shoppingListId, userId: user?.id },
    }
  );

  React.useEffect(() => {
    if (user) startPolling(2000);

    return () => stopPolling();
  }, [user]);

  const shoppingList: ShoppingList =
    getShoppingListResult.data?.shoppingListByUser;
  const username = `${shoppingList?.user?.firstName} ${shoppingList?.user?.lastName}`;
  // const sharedWith =
  //   shoppingList?.sharedUsers && shoppingList?.sharedUsers.length > 1
  //     ? `Compartilhado com ${shoppingList?.sharedUsers?.length} pessoas`
  //     : "";
  const purchasedListItemsTotal = shoppingList?.listProducts?.filter(
    (product) => product.purchased === true
  ).length;
  const listProductsTotal = shoppingList?.listProducts?.length;

  return (
    <DefaultSafeAreaContainer loading={getShoppingListResult.loading}>
      <View>
        <View style={styles.header}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={{ display: "flex", flex: 1 }}>
              <DefaultTitle>{shoppingList?.name}</DefaultTitle>
              <Text>Criada por {username}</Text>
            </View>

            {shoppingList?.isOwner && (
              <TouchableOpacity
                style={styles.shareButton}
                onPress={openShareModal}
              >
                <DefaultIcon name="person-add" />
              </TouchableOpacity>
            )}
          </View>

          <View style={{ display: "flex" }}>
            <Text>TOTAL: R$ {shoppingList?.totalPrice.toFixed(2)}</Text>
            <Text>
              Produtos: {purchasedListItemsTotal} / {listProductsTotal}
            </Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={{ display: "flex", flex: 1 }}>
              <DefaultSubtitle>Adicionar Produtos</DefaultSubtitle>
            </View>
            <View
              style={{
                display: "flex",
                flex: 1,
                alignItems: "flex-end",
                paddingRight: 5,
              }}
            >
              <TouchableOpacity onPress={toggle}>
                <DefaultIcon name={isOpen ? "caret-up" : "caret-down"} />
              </TouchableOpacity>
            </View>
          </View>

          {isOpen && <AddListProductPanel shoppingListId={shoppingListId} />}
        </View>
      </View>

      <FlatList
        refreshing={getShoppingListResult.loading}
        data={shoppingList?.listProducts}
        renderItem={({ item }: { item: ListProduct }) => {
          const product = { ...item };

          return (
            <ListProductListItem
              product={product}
              openModal={openFavProductModal}
            />
          );
        }}
        keyExtractor={(item: ListProduct) => {
          return item.id;
        }}
        ListHeaderComponentStyle={styles.listHeader}
        ListEmptyComponent={() => (
          <EmptyListComponent loading={getShoppingListResult.loading} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <ShareShoppingListModal
        isOpen={shareModalVisible}
        close={closeShareModal}
        shoppingList={shoppingList}
      />

      <CreateProductModal
        isOpen={addProductModalVisible}
        close={closeFavProductModal}
        product={modalProduct}
      />
    </DefaultSafeAreaContainer>
  );
}

export default ShoppingListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 15,
  },
  header: {
    display: "flex",
    marginBottom: 20,
  },
  separator: {
    height: 1,
    borderColor: "black",
    borderWidth: 0.5,
  },
  inputContainer: {
    display: "flex",
    overflow: "hidden",
    marginBottom: 40,
  },
  listHeader: {
    display: "flex",
    flex: 1,
    margin: 0,
    padding: 5,
    marginBottom: 20,
  },
  shareButton: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 15,
  },
});
