import React from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import DefaultScreenProp from "../interfaces/navigation/DefaultScreenProp";
import { ShoppingListsContext } from "../contexts";
import { DefaultSafeAreaContainer } from "../components/layout/DefaultSafeAreaContainer";
import { FloatingButton } from "../components/buttons";
import { EmptyListComponent } from "../components/list-items";
import { TotalListItem } from "../components/list-items/TotalListItem";

function HomeScreen({ navigation }: DefaultScreenProp) {
  const { shoppingLists, loading, refetch } =
    React.useContext(ShoppingListsContext);

  const getTotalByMonth = (month: number, year: number) => {
    const total = shoppingLists.reduce((accumulator, currentValue) => {
      const listMonth = new Date(currentValue.date).getMonth();
      const listYear = new Date(currentValue.date).getFullYear();

      return listMonth === month && listYear === year
        ? accumulator + currentValue.totalPrice
        : accumulator;
    }, 0);

    return total;
  };

  const currentMonthTotal = React.useMemo(() => {
    const currentMonth = new Date().getMonth();

    return getTotalByMonth(currentMonth, 2021);
  }, [shoppingLists]);

  const previousMonthTotal = React.useMemo(() => {
    const previousMonth = new Date().getMonth() - 1;

    return getTotalByMonth(previousMonth, 2021);
  }, [shoppingLists]);

  return (
    <DefaultSafeAreaContainer>
      <FlatList
        refreshing={loading}
        onRefresh={refetch}
        data={shoppingLists}
        renderItem={({ item }) => {
          return <TotalListItem item={item} />;
        }}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => <EmptyListComponent loading={loading} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={() => {
          return (
            <View style={{ display: "flex", paddingBottom: 30 }}>
              <Text>TOTAL MÊS ATUAL: R${currentMonthTotal.toFixed(2)}</Text>
              <Text>TOTAL MÊS ANTERIOR: R${previousMonthTotal.toFixed(2)}</Text>
            </View>
          );
        }}
      />

      <FloatingButton
        action={() => navigation.navigate("CreateShoppingList")}
      />
    </DefaultSafeAreaContainer>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});
