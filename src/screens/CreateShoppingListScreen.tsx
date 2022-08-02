import React from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { DefaultStackScreenProps } from "../interfaces/navigation";
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
import {
  ShoppingListsContext,
  useAuthContext,
  useShoppingListsContext,
} from "../contexts";
import { EmptyListComponent } from "../components/list-items";
import Checkbox from "expo-checkbox";

interface Props {
  item: ShoppingList;
  cb: (id: string, action: string) => void;
}

enum OptionsEnum {
  USE_PENDING_PRODUCTS = "usePendingProducts",
  USE_SHOPPING_LISTS = "useShoppingLists",
}

type Options = Record<OptionsEnum, boolean>;

export function ListItem(props: Props) {
  const { item, cb } = props;

  const [selected, setSelected] = React.useState(false);

  React.useEffect(() => {
    if (selected) {
      cb(item.id, "add");
    } else {
      cb(item.id, "delete");
    }
  }, [selected]);

  return (
    <View style={styles.wrapper}>
      <Checkbox
        value={selected}
        onValueChange={setSelected}
        style={{ marginRight: 10 }}
      />
      <Text>{item.name}</Text>
    </View>
  );
}

function CreateShoppingListScreen({
  navigation,
}: DefaultStackScreenProps<"CreateShoppingList">) {
  const { user } = useAuthContext();
  const { shoppingLists, loading } = useShoppingListsContext();

  const openShoppingLists = shoppingLists?.filter(
    (shoppingList) => !shoppingList.done
  );

  const [name, setName] = React.useState("");
  const [date, setDate] = React.useState(new Date());
  const [options, setOptions] = React.useState<Options>({
    usePendingProducts: false,
    useShoppingLists: false,
  });

  const handleSelect = (option: OptionsEnum) => {
    console.log({ option });
    const isSelected = options[option];

    if (
      option === OptionsEnum.USE_PENDING_PRODUCTS &&
      options.useShoppingLists === true &&
      isSelected === false
    ) {
      return setOptions({
        usePendingProducts: true,
        useShoppingLists: false,
      });
    }

    if (
      option === OptionsEnum.USE_SHOPPING_LISTS &&
      options.usePendingProducts === true &&
      isSelected === false
    ) {
      return setOptions({
        usePendingProducts: false,
        useShoppingLists: true,
      });
    }

    return setOptions((prevState) => ({ ...prevState, [option]: !isSelected }));
  };

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

      if (options.usePendingProducts) {
        await createShoppingListFromPendingProducts({
          variables: {
            userId: user?.id,
            ids: selectedListsIds,
            remove: removeProductsFromSelectedLists,
            data,
          },
        });
      } else if (options.useShoppingLists) {
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
    } catch (err: any) {
      console.log("Error on creating Shopping List", err);
      showToast(err.message);
    }
  }

  return (
    <DefaultSafeAreaContainer loading={loadingCreation}>
      <DefaultInput value={name} onChangeText={setName} placeholder="Nome" />

      <DefaultDatePicker cb={cb} date={date} />

      <View style={styles.checkboxWrapper}>
        <Checkbox
          style={{
            marginRight: 5,
          }}
          value={options.usePendingProducts}
          onValueChange={() => handleSelect(OptionsEnum.USE_PENDING_PRODUCTS)}
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
          value={options.useShoppingLists}
          onValueChange={() => handleSelect(OptionsEnum.USE_SHOPPING_LISTS)}
        />

        <Text
          style={{
            display: "flex",
          }}
        >
          Criar a partir de outras listas?
        </Text>
      </View>

      {(options.usePendingProducts || options.useShoppingLists) && (
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
              <ListItem cb={addOrRemoveFromSelected} item={item} />
            )}
            keyExtractor={(item: ShoppingList) => item.id}
            ListEmptyComponent={() => <EmptyListComponent loading={loading} />}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            style={{
              height: 300,
            }}
          />
          {options.usePendingProducts && (
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

  wrapper: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
  },
});
