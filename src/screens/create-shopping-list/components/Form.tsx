import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import { Formik } from "formik";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SaveButton } from "../../../components/buttons";
import { DefaultDatePicker, DefaultInput } from "../../../components/inputs";
import { EmptyListComponent } from "../../../components/list-items";
import { showToast } from "../../../components/toast";
import { useAuthContext, useShoppingListsContext } from "../../../contexts";
import { ShoppingList } from "../../../interfaces/shoppingList";
import { Options, OptionsEnum, useSubmit } from "../model";
import { ListItem } from "./ListItem";

export default function Form() {
  const navigation = useNavigation();
  const { user } = useAuthContext();
  const { shoppingLists, loading } = useShoppingListsContext();
  const openShoppingLists = shoppingLists?.filter(
    (shoppingList) => !shoppingList.done
  );

  const [activeTab, setActiveTab] = React.useState(0);
  const switchTab = (activeTab: number) => setActiveTab(activeTab);

  const [options, setOptions] = React.useState<Options>({
    usePendingProducts: false,
    useShoppingLists: false,
  });
  const handleSelect = (option: OptionsEnum) => {
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

  return (
    <Formik
      initialValues={{ name: "", date: new Date() }}
      onSubmit={(values) => {
        try {
          useSubmit({
            data: {
              date: values.date,
              name: values.name,
              done: false,
            },
            user: user!,
            options,
            selectedListsIds,
            removeProductsFromSelectedLists,
          });

          showToast("Criado com sucesso!");
          navigation.goBack();
        } catch (err: any) {
          console.log("Error on creating Shopping List", err);
          showToast(err.message);
        }
      }}
    >
      {({ handleChange, handleSubmit, setFieldValue, values }) => (
        <>
          <DefaultInput
            value={values.name}
            onChangeText={handleChange("values")}
            placeholder="Nome"
          />

          <DefaultDatePicker
            cb={(date: Date) => setFieldValue("date", date)}
            date={values.date}
          />

          <View style={styles.checkboxWrapper}>
            <Checkbox
              style={{
                marginRight: 5,
              }}
              value={options.usePendingProducts}
              onValueChange={() =>
                handleSelect(OptionsEnum.USE_PENDING_PRODUCTS)
              }
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
                ListEmptyComponent={() => (
                  <EmptyListComponent loading={loading} />
                )}
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
            <SaveButton action={handleSubmit} />
          </View>
        </>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
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
