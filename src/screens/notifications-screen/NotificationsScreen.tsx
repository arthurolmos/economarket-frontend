import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { DefaultStackScreenProps } from "../../interfaces/navigation";
import { NotificationsContext } from "../../contexts/NotificationsContext";
import { EmptyListComponent } from "../../components/list-items";
import { DefaultSafeAreaContainer } from "../../components/layout/DefaultSafeAreaContainer";
import { Notification } from "../../interfaces/notification";
import { ListItem } from "./ListItem";

function NotificationsScreen({
  navigation,
}: DefaultStackScreenProps<"Notifications">) {
  const { notifications, loading, refetch } =
    React.useContext(NotificationsContext);

  return (
    <DefaultSafeAreaContainer>
      <FlatList
        refreshing={loading}
        onRefresh={refetch}
        data={notifications}
        renderItem={({ item }: { item: Notification }) => {
          return <ListItem notification={item} />;
        }}
        keyExtractor={(item: Notification) => item.id}
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
