import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import DefaultScreenProp from "../interfaces/navigation/DefaultScreenProp";
import { NotificationsContext } from "../contexts/NotificationsContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import {
  EmptyListComponent,
  NotificationListItem,
} from "../components/ListItems";

function NotificationsScreen({ navigation }: DefaultScreenProp) {
  const { notifications, loading, refetch } =
    React.useContext(NotificationsContext);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshing={loading}
        onRefresh={refetch}
        data={notifications}
        renderItem={({ item }) => {
          return <NotificationListItem notification={item} />;
        }}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => <EmptyListComponent loading={loading} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    position: "relative",
  },
  separator: {
    height: 10,
  },
});
