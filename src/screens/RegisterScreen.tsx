import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import DefaultScreenProp from "../interfaces/navigation/DefaultScreenProp";
import { useMutation } from "@apollo/client";
import { showToast } from "../components/Toast";
import { REGISTER } from "../apollo/graphql";
import { DefaultInput } from "../components/Inputs";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserCreateInput } from "../interfaces/user";

function RegisterScreen({ navigation }: DefaultScreenProp) {
  const { signIn } = React.useContext(AuthContext);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [doRegister, { data, loading, error }] = useMutation(REGISTER, {
    fetchPolicy: "no-cache",
  });

  async function register() {
    if (email === "") return;

    const data: UserCreateInput = {
      firstName,
      lastName,
      email,
      password,
    };

    doRegister({ variables: { data } }).catch((err) => {
      console.log(err.message);
      showToast(err.message);
    });
  }

  if (data) {
    const { token, user } = data.register;
    signIn(token, user);
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
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "60%",
          padding: 15,
        }}
      >
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <Button title="Criar conta" onPress={() => register()} />
            <Button
              title="Login"
              onPress={() => navigation.navigate("Login")}
            />
            <Button
              title="Fill"
              onPress={() => {
                setFirstName("James");
                setLastName("Bond");
                setEmail(`jb${new Date()}@gmail.com`);
                setPassword("123");
              }}
            />
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
