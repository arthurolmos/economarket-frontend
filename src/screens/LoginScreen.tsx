import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import DefaultScreenProp from "../interfaces/navigation/DefaultScreenProp";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../apollo/graphql";
import { showToast } from "../components/Toast";
import { DefaultInput } from "../components/Inputs";
import { SafeAreaView } from "react-native-safe-area-context";
import DefaultButton from "../components/Buttons/DefaultButton";

function LoginScreen({ navigation }: DefaultScreenProp) {
  const { signIn } = React.useContext(AuthContext);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [doLogin, { loading }] = useMutation(LOGIN, {
    fetchPolicy: "no-cache",
  });

  async function login() {
    try {
      if (username === "" || password === "")
        throw new Error("Preencha os campos corretmente!");

      const { data } = await doLogin({ variables: { username, password } });

      if (data) {
        const { token, user } = data.login;
        signIn(token, user);
      }
    } catch (err) {
      console.log(err.message);
      showToast(err.message);
    }
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
          justifyContent: "center",
        }}
      >
        <>
          {loading ? (
            <ActivityIndicator size="large" color="green" />
          ) : (
            <>
              <View style={{ marginBottom: 15, marginTop: 15 }}>
                <DefaultButton
                  title="Entrar"
                  action={login}
                  color="lightgreen"
                  bgColor="green"
                />
              </View>

              <TouchableOpacity
                style={{
                  marginBottom: 15,
                  marginTop: 15,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => navigation.navigate("Register")}
              >
                <Text>Criar uma conta!</Text>
              </TouchableOpacity>

              {/* <Button
                onPress={() => {
                  setUsername("mc@gmail.com");
                  setPassword("123");
                }}
                title="Fill"
              /> */}
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
