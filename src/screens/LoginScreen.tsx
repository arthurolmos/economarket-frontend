import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../apollo/graphql";
import { showToast } from "../components/toast";
import { DefaultInput } from "../components/inputs";
import { SafeAreaView } from "react-native-safe-area-context";
import DefaultButton from "../components/buttons/DefaultButton";
import { validate } from "../lib/validations";
import storage from "../storage";
import { DefaultStackScreenProps } from "../interfaces/navigation";
import { useAuthContext } from "../contexts";

function LoginScreen({ navigation }: DefaultStackScreenProps<"Login">) {
  const { signIn } = useAuthContext();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [login, { loading }] = useMutation(LOGIN, {
    fetchPolicy: "no-cache",
  });

  async function submit() {
    try {
      if (!validate({ username, password }))
        throw new Error("Preencha os campos corretmente!");

      const { data } = await login({
        variables: { username, password },
      });

      const { token, user } = data.login;

      console.log({ user });

      signIn(token, user);
    } catch (err: any) {
      console.log("Error on Login!", err);
      showToast("Erro ao logar!");
    }
  }

  React.useEffect(() => {
    getUsername();
  }, []);

  const getUsername = async () => {
    const username = await storage.get("username");

    if (username) setUsername(username);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>iMarket</Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={{ textTransform: "uppercase", fontSize: 20 }}>Login</Text>
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
              <ActivityIndicator size="large" color="lightgreen" />
            ) : (
              <>
                <View style={{ marginBottom: 15, marginTop: 15 }}>
                  <DefaultButton
                    title="Entrar"
                    action={submit}
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
              </>
            )}
          </>
        </View>
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
    display: "flex",
  },
  titleContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
  },
  fieldContainer: {
    display: "flex",
    flex: 3,
    justifyContent: "center",
  },
});
