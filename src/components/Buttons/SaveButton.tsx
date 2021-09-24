import React from "react";
import { RoundButton } from "./RoundButton";

interface Props {
  action: () => void;
}

export function SaveButton(props: Props) {
  const { action } = props;

  return (
    <RoundButton
      action={action}
      name="checkmark"
      backgroundColor="lightgreen"
      textColor="green"
    />
  );
}
