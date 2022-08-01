import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { DefaultStackScreenProps } from "../interfaces/navigation";
import { useMutation } from "@apollo/client";
import { showToast } from "../components/toast";
import { REGISTER } from "../apollo/graphql";
import { DefaultInput } from "../components/inputs";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserCreateInput } from "../interfaces/user";
import DefaultButton from "../components/buttons/DefaultButton";
import { validate } from "../lib/validations";
import { useAuthContext } from "../contexts";

function RegisterScreen({ navigation }: DefaultStackScreenProps<"Register">) {
  const { signIn } = useAuthContext();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [register, { loading }] = useMutation(REGISTER, {
    fetchPolicy: "no-cache",
  });

  async function submit() {
    try {
      const input: UserCreateInput = {
        firstName,
        lastName,
        email,
        password,
      };

      if (!validate(input)) throw new Error("Preencha todos os campos!");

      const { data } = await register({ variables: { data: input } });

      const { token, user } = data.register;

      signIn(token, user);
    } catch (err: any) {
      console.log("Error on Register!", err);
      showToast("Erro ao se registrar!");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>iMarket</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={{ textTransform: "uppercase", fontSize: 20 }}>
          Register
        </Text>
        <DefaultInput
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Nome"
        />
        <DefaultInput
          value={lastName}
          onChangeText={setLastName}
          placeholder="Sobrenome"
        />
        <DefaultInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <DefaultInput
          value={password}
          onChangeText={setPassword}
          placeholder="Senha"
        />
        <View>
          {loading ? (
            <ActivityIndicator size="large" color="lightgreen" />
          ) : (
            <>
              <View style={{ marginBottom: 15, marginTop: 15 }}>
                <DefaultButton
                  title="Criar conta"
                  action={submit}
                  color="white"
                  bgColor="lightgreen"
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
                onPress={() => navigation.navigate("Login")}
              >
                <Text>Fazer login!</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 15,
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
