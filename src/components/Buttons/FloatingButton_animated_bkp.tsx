import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { DefaultIcon } from "../icons";

interface Props {
  action: () => void;
}

export function FloatingButton(props: Props) {
  const { action } = props;

  const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);

  const expandAnimX1 = React.useRef(new Animated.Value(0)).current;
  const expandAnimY1 = React.useRef(new Animated.Value(0)).current;
  const fadeAnim1 = React.useRef(new Animated.Value(0)).current;
  const expandAnimX2 = React.useRef(new Animated.Value(0)).current;
  const expandAnimY2 = React.useRef(new Animated.Value(0)).current;
  const fadeAnim2 = React.useRef(new Animated.Value(0)).current;

  const expand = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim1, {
          toValue: 1,
          duration: 100,
          useNativeDriver: false,
        }),

        Animated.timing(expandAnimY1, {
          toValue: 120,
          duration: 100,
          useNativeDriver: false,
        }),

        Animated.timing(expandAnimX1, {
          toValue: 80,
          duration: 100,
          useNativeDriver: false,
        }),
      ]),

      Animated.timing(fadeAnim2, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }),

      Animated.parallel([
        Animated.timing(expandAnimY2, {
          toValue: 10,
          duration: 80,
          useNativeDriver: false,
        }),
        Animated.timing(expandAnimX2, {
          toValue: 120,
          duration: 80,
          useNativeDriver: false,
        }),
      ]),
    ]).start();
  };

  const shrink = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(expandAnimX1, {
          toValue: 5,
          duration: 80,
          useNativeDriver: false,
        }),
        Animated.timing(expandAnimY1, {
          toValue: 5,
          duration: 80,
          useNativeDriver: false,
        }),
      ]),
      Animated.timing(fadeAnim1, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }),

      Animated.parallel([
        Animated.timing(expandAnimX2, {
          toValue: 5,
          duration: 80,
          useNativeDriver: false,
        }),
        Animated.timing(expandAnimY2, {
          toValue: 5,
          duration: 80,
          useNativeDriver: false,
        }),
      ]),

      Animated.timing(fadeAnim2, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const [open, setOpen] = React.useState(false);
  const toggle = () => setOpen(!open);

  React.useEffect(() => {
    if (open) {
      expand();
    } else {
      shrink();
    }
  }, [open]);

  return (
    <View
      style={[
        styles.container,
        { width: open ? 200 : "auto", height: open ? 200 : "auto" },
      ]}
    >
      <View style={styles.wrapper}>
        <AnimatedTouchableOpacity style={styles.button} onPress={toggle}>
          <DefaultIcon name="add-circle-outline" size={44} color="white" />
        </AnimatedTouchableOpacity>

        <AnimatedTouchableOpacity
          style={[
            styles.smallButton,
            { bottom: expandAnimY1, right: expandAnimX1, opacity: fadeAnim1 },
          ]}
          onPress={toggle}
        >
          <Animated.Text style={{ opacity: fadeAnim1 }}>
            Lista em branco
          </Animated.Text>
        </AnimatedTouchableOpacity>

        <AnimatedTouchableOpacity
          style={[
            styles.smallButton,
            { bottom: expandAnimY2, right: expandAnimX2, opacity: fadeAnim2 },
          ]}
          onPress={toggle}
        >
          <Animated.Text
            style={{
              opacity: fadeAnim2,
            }}
          >
            Lista pendente
          </Animated.Text>
        </AnimatedTouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 80,
    right: 20,
    padding: 10,
    display: "flex",
    flex: 1,

    justifyContent: "flex-end",
    alignItems: "flex-end",
  },

  wrapper: {
    position: "relative",
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "100%",
  },

  button: {
    position: "relative",
    backgroundColor: "purple",
    elevation: 5,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9,
    width: 80,
    height: 80,
  },

  smallButton: {
    padding: 10,
    backgroundColor: "red",
    elevation: 5,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 8,
    width: 70,
    height: 70,
  },

  backdrop: {
    position: "absolute",
    top: 0,
    bottom: 20,
    left: 0,
    right: 0,
    margin: 0,
    backgroundColor: "black",
    opacity: 0.4,
  },
});
