import React from "react";
import { View, Platform, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { DefaultInput } from "./DefaultInput";
import { DefaultIcon } from "../icons";

interface Props {
  date: Date;
  cb: (date: Date) => void;
}

export function DefaultDatePicker(props: Props) {
  const { date, cb } = props;

  const [mode, setMode] = React.useState();
  const [show, setShow] = React.useState(false);

  function pad(n: number) {
    return n < 10 ? "0" + n : n;
  }
  const formattedDate = [
    pad(date.getDate()),
    pad(date.getMonth() + 1),
    pad(date.getFullYear()),
  ].join("/");

  const onChange = (event: Event, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    cb(currentDate);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <>
      <TouchableOpacity onPress={showDatepicker}>
        <DefaultIcon name="calendar" style={styles.icon} />
        <View style={styles.overlay} />
        <DefaultInput
          placeholder="Data da Compra"
          value={formattedDate.toString()}
        />
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    right: 10,
    top: 20,
    zIndex: 3,
  },

  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    margin: "auto",
    zIndex: 2,
  },
});
