import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  name: any;
  color?: string;
  size?: number;
  style?: any;
}

export function DefaultIcon(props: Props) {
  const { name, size = 24, color = "gray", ...rest } = props;

  return <Ionicons name={name} {...rest} size={size} color={color} />;
}
