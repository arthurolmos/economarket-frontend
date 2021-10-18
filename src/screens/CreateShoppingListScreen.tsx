import React from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import DefaultScreenProp from "../interfaces/navigation/DefaultScreenProp";
import { useMutation } from "@apollo/client";
import {
  CREATE_SHOPPING_LIST,
  CREATE_SHOPPING_LIST_FROM_PENDING_PRODUCTS,
  CREATE_SHOPPING_LIST_FROM_SHOPPING_LISTS,
} from "../apollo/graphql";
import { showToast } from "../components/toast";
import { DefaultDatePicker, DefaultInput } from "../components/inputs";
import {
  ShoppingList,
  ShoppingListCreateInput,
} from "../interfaces/shoppingList";
import { validate } from "../lib/validations";
import { SaveButton } from "../components/buttons";
import { DefaultSafeAreaContainer } from "../components/layout/DefaultSafeAreaContainer";
import Checkbox from "expo-checkbox";
import { ShoppingListsContext } from "../contexts";
import {
  CreateShoppingListListItem,
  EmptyListComponent,
} from "../components/list-items";

function CreateShoppingListScreen({ navigation }: DefaultScreenProp) {
  const { user } = React.useContext(AuthContext);
  const { shoppingLists, loading } = React.useContext(ShoppingListsContext);

  const openShoppingLists = shoppingLists?.filter(
    (shoppingList) => !shoppingList.done
  );

  const [name, setName] = React.useState("");
  const [date, setDate] = React.useState(new Date());

  const [usePendingProducts, setUsePendingProducts] = React.useState(false);
  const [useShoppingLists, setUseShoppingLists] = React.useState(false);

  const [activeTab, setActiveTab] = React.useState(0);
  const switchTab = (activeTab: number) => setActiveTab(activeTab);

  const [selectedListsIds, setSelectedListsIds] = React.useState<string[]>([]);
  const addOrRemoveFromSelected = (id: string, action: string) => {
    const selected = new Set([...selectedListsIds]);

    if (action === "add") {
      selected.add(id);
    } else {
      selected.delete(id);
    }

    setSelectedListsIds([...selected]);
  };

  const [removeProductsFromSelectedLists, setRemoveProductsFromSelectedLists] =
    React.useState(false);

  const cb = (date: Date) => setDate(date);

  const [createShoppingList, creatingShoppingList] = useMutation(
    CREATE_SHOPPING_LIST,
    {
      refetchQueries: ["GetShoppingListsByUser"],
    }
  );

  const [
    createShoppingListFromPendingProducts,
    creatingShoppingListFromPendingProducts,
  ] = useMutation(CREATE_SHOPPING_LIST_FROM_PENDING_PRODUCTS, {
    refetchQueries: ["GetShoppingListsByUser"],
  });

  const [
    createShoppingListFromShoppingLists,
    creatingShoppingListFromShoppingLists,
  ] = useMutation(CREATE_SHOPPING_LIST_FROM_SHOPPING_LISTS, {
    refetchQueries: ["GetShoppingListsByUser"],
  });

  const loadingCreation =
    creatingShoppingListFromPendingProducts.loading ||
    creatingShoppingListFromShoppingLists.loading ||
    creatingShoppingList.loading;

  async function submit() {
    try {
      const data: ShoppingListCreateInput = {
        name,
        date: date,
      };

      if (!validate(data)) throw new Error("Preencha os campos corretamente!");

      if (usePendingProducts) {
        await createShoppingListFromPendingProducts({
          variables: {
            userId: user?.id,
            ids: selectedListsIds,
            remove: removeProductsFromSelectedLists,
            data,
          },
        });
      } else if (useShoppingLists) {
        await createShoppingListFromShoppingLists({
          variables: {
            userId: user?.id,
            ids: selectedListsIds,
            data,
          },
        });
      } else {
        await createShoppingList({
          variables: { userId: user?.id, data },
        });
      }

      showToast("Criado com sucesso!");
      navigation.goBack();
    } catch (err) {
      console.log("Error on creating Shopping List", err);
      showToast(err.message);
    }
  }

  React.useEffect(() => {
    if (usePendingProducts && useShoppingLists) setUseShoppingLists(false);
  }, [usePendingProducts, useShoppingLists]);

  return (
    <DefaultSafeAreaContainer loading={loadingCreation}>
      <DefaultInput value={name} onChangeText={setName} placeholder="Nome" />

      <DefaultDatePicker cb={cb} date={date} />

      <View style={styles.checkboxWrapper}>
        <Checkbox
          style={{
            marginRight: 5,
          }}
          value={usePendingProducts}
          onValueChange={setUsePendingProducts}
        />

        <Text
          style={{
            display: "flex",
          }}
        >
          Inserir produtos pendentes?
        </Text>
      </View>

      <View style={styles.checkboxWrapper}>
        <Checkbox
          style={{
            marginRight: 5,
          }}
          value={useShoppingLists}
          onValueChange={setUseShoppingLists}
        />

        <Text
          style={{
            display: "flex",
          }}
        >
          Criar a partir de outras listas?
        </Text>
      </View>

      {(usePendingProducts || useShoppingLists) && (
        <View style={{ marginTop: 15 }}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                { backgroundColor: activeTab === 0 ? "red" : "blue" },
              ]}
              onPress={() => switchTab(0)}
            >
              <Text>Listas Abertas</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                { backgroundColor: activeTab === 1 ? "red" : "blue" },
              ]}
              onPress={() => switchTab(1)}
            >
              <Text>Todas as Listas</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={activeTab === 0 ? openShoppingLists : shoppingLists}
            renderItem={({ item }) => (
              <CreateShoppingListListItem
                cb={addOrRemoveFromSelected}
                item={item}
              />
            )}
            keyExtractor={(item: ShoppingList) => item.id}
            ListEmptyComponent={() => <EmptyListComponent loading={loading} />}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            style={{
              height: 300,
            }}
          />
          {usePendingProducts && (
            <View style={styles.checkboxWrapper}>
              <Checkbox
                style={{
                  marginRight: 5,
                }}
                value={removeProductsFromSelectedLists}
                onValueChange={setRemoveProductsFromSelectedLists}
              />

              <Text
                style={{
                  display: "flex",
                }}
              >
                Remover produtos pendentes das listas originais?
              </Text>
            </View>
          )}
        </View>
      )}

      <View style={styles.buttonWrapper}>
        <SaveButton action={submit} />
      </View>
    </DefaultSafeAreaContainer>
  );
}

export default CreateShoppingListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    position: "relative",
  },

  separator: {
    height: 10,
  },

  checkboxWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },

  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },

  tabContainer: {
    display: "flex",
    flexDirection: "row",
  },

  tab: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
