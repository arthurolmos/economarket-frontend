import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import DefaultScreenProp from "../interfaces/navigation/DefaultScreenProp";
import { useMutation } from "@apollo/client";
import { showToast } from "../components/Toast";
import { REGISTER } from "../apollo/graphql";
import { DefaultInput } from "../components/Inputs";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserCreateInput } from "../interfaces/user";
import DefaultButton from "../components/Buttons/DefaultButton";

function RegisterScreen({ navigation }: DefaultScreenProp) {
  const { signIn } = React.useContext(AuthContext);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [doRegister, { loading }] = useMutation(REGISTER, {
    fetchPolicy: "no-cache",
  });

  async function register() {
    try {
      if (
        firstName === "" ||
        lastName === "" ||
        email === "" ||
        password === ""
      )
        throw new Error("Preencha todos os campos!");

      const input: UserCreateInput = {
        firstName,
        lastName,
        email,
        password,
      };

      const { data } = await doRegister({ variables: { data: input } });

      if (data) {
        const { token, user } = data.register;
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
          <ActivityIndicator size="large" color="green" />
        ) : (
          <>
            <View style={{ marginBottom: 15, marginTop: 15 }}>
              <DefaultButton
                title="Criar conta"
                action={register}
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

            {/* <Button
              title="Fill"
              onPress={() => {
                setFirstName("James");
                setLastName("Bond");
                setEmail(`jb${new Date()}@gmail.com`);
                setPassword("123");
              }}
            /> */}
          </>
        )}
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
});
