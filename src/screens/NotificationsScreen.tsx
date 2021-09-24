import React from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import DefaultScreenProp from "../interfaces/navigation/DefaultScreenProp";
import { NotificationsContext } from "../contexts/NotificationsContext";
import {
  EmptyListComponent,
  NotificationListItem,
} from "../components/list-items";
import { DefaultSafeAreaContainer } from "../components/layout/DefaultSafeAreaContainer";

function NotificationsScreen({ navigation }: DefaultScreenProp) {
  const { notifications, loading, refetch } =
    React.useContext(NotificationsContext);

  return (
    <DefaultSafeAreaContainer>
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
    </DefaultSafeAreaContainer>
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
