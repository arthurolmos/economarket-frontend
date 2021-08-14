import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import DefaultScreenProp from "../interfaces/navigation/DefaultScreenProp";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql";
import { showToast } from "../components/Toast";
import { DefaultInput } from "../components/Inputs";
import { SafeAreaView } from "react-native-safe-area-context";

function LoginScreen({ navigation }: DefaultScreenProp) {
  const { signIn } = React.useContext(AuthContext);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [doLogin, { data, loading }] = useMutation(LOGIN, {
    fetchPolicy: "no-cache",
  });

  async function login() {
    doLogin({ variables: { username, password } }).catch((err) => {
      console.log(err.message);
      showToast(err.message);
    });
  }

  if (data) {
    const { token, user } = data.login;
    signIn(token, user);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ textTransform: "uppercase", margin: 25, fontSize: 30 }}>
        Login
      </Text>
      <DefaultInput
        value={username}
        onChangeText={setUsername}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <DefaultInput
        value={password}
        onChangeText={setPassword}
        placeholder="Senha"
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "60%",
          padding: 15,
        }}
      >
        <>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <>
              <Button title="Entrar" onPress={() => login()} />
              <Button
                title="Registrar"
                onPress={() => navigation.navigate("Register")}
              />
              <Button
                onPress={() => {
                  setUsername("mc@gmail.com");
                  setPassword("123");
                }}
                title="Fill"
              />
            </>
          )}
        </>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 15,
  },
});
