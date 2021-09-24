import React from "react";
import {
  Button,
  Modal,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DefaultTitle } from "../texts";

interface Props {
  isOpen: boolean;
  close: () => void;
  children: React.ReactElement[] | React.ReactElement;
  submit: () => void;
  loading: boolean;
  title: string;
}

export function DefaultModalLayout(props: Props) {
  const { isOpen, close, children, submit, loading, title } = props;

  return (
    <Modal visible={isOpen} transparent={true}>
      <View style={styles.modal}>
        <View style={styles.backdrop} />

        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <DefaultTitle>{title}</DefaultTitle>
            </View>

            <View style={styles.close}>
              <TouchableOpacity onPress={close}>
                <Ionicons name="close" size={24} />
              </TouchableOpacity>
            </View>
          </View>

          {children}

          {loading ? (
            <ActivityIndicator size="small" color="lightgreen" />
          ) : (
            <Button title="Confirmar" onPress={submit} />
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

  header: {
    display: "flex",
    flexDirection: "row",
  },

  titleContainer: {
    display: "flex",
    flex: 2,
    justifyContent: "center",
  },

  title: {
    textTransform: "uppercase",
    fontWeight: "bold",
  },

  close: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
