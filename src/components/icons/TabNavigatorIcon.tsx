import React from "react";
import { DefaultIcon } from "./DefaultIcon";

interface Props {
  name: any;
  focused: boolean;
  color?: string;
  size?: number;
}

export function TabNavigatorIcon(props: Props) {
  const { focused, name } = props;

  return <DefaultIcon name={name} color={focused ? "lightgray" : "gray"} />;
}
