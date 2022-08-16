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

  return (
    <Formik
      initialValues={{
        name: "",
        date: new Date(),
        options: {
          usePendingProducts: false,
          useShoppingLists: false,
        },
        selectedListsIds: new Array<string>(),
        removeProductsFromSelectedLists: false,
      }}
      onSubmit={(values) => {
        try {
          useSubmit({
            data: {
              values: {
                date: values.date,
                name: values.name,
                done: false,
              },
              options: values.options,
              selectedListsIds: values.selectedListsIds,
              removeProductsFromSelectedLists:
                values.removeProductsFromSelectedLists,
            },
            user: user!,
          });

          showToast("Criado com sucesso!");
          navigation.goBack();
        } catch (err: any) {
          console.log("Error on creating Shopping List", err);
          showToast(err.message);
        }
      }}
    >
      {({ handleChange, handleSubmit, setFieldValue, values }) => {
        const handleSelect = (option: OptionsEnum) => {
          const isSelected = values.options[option];
          let selection = {
            ...values.options,
            [option]: !isSelected,
          };

          if (
            option === OptionsEnum.USE_PENDING_PRODUCTS &&
            values.options.useShoppingLists === true &&
            isSelected === false
          ) {
            selection = {
              usePendingProducts: true,
              useShoppingLists: false,
            };
          }

          if (
            option === OptionsEnum.USE_SHOPPING_LISTS &&
            values.options.usePendingProducts === true &&
            isSelected === false
          ) {
            selection = {
              usePendingProducts: false,
              useShoppingLists: true,
            };
          }

          return setFieldValue("options", selection);
        };

        const addOrRemoveFromSelected = (id: string, action: string) => {
          const selected = new Set([...values.selectedListsIds]);

          if (action === "add") {
            selected.add(id);
          } else {
            selected.delete(id);
          }

          setFieldValue("selectedListsIds", [...selected]);
        };

        return (
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
                value={values.options.usePendingProducts}
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
                value={values.options.useShoppingLists}
                onValueChange={() =>
                  handleSelect(OptionsEnum.USE_SHOPPING_LISTS)
                }
              />

              <Text
                style={{
                  display: "flex",
                }}
              >
                Criar a partir de outras listas?
              </Text>
            </View>

            {(values.options.usePendingProducts ||
              values.options.useShoppingLists) && (
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
                  ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                  )}
                  style={{
                    height: 300,
                  }}
                />
                {values.options.usePendingProducts && (
                  <View style={styles.checkboxWrapper}>
                    <Checkbox
                      style={{
                        marginRight: 5,
                      }}
                      value={values.removeProductsFromSelectedLists}
                      onValueChange={(value: boolean) =>
                        setFieldValue("removeProductsFromSelectedLists", value)
                      }
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
        );
      }}
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
