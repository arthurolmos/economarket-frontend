import React from "react";
import { User } from "../../interfaces/user";
import storage from "../../storage";
import { useLazyQuery } from "@apollo/client";
import { WHO_AM_I } from "../../apollo/graphql";
import { AuthContext } from "./AuthContext";

interface Props {
  children: React.ReactElement[] | React.ReactElement;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = React.useState<User | null>(null);

  const [getSignedUser, { loading, data, error }] = useLazyQuery(WHO_AM_I, {
    fetchPolicy: "no-cache",
  });

  const signedUser = data?.whoAmI;

  React.useEffect(() => {
    getSignedUser();
  }, []);

  React.useEffect(() => {
    if (signedUser) {
      setUser(signedUser);
    }
  }, [signedUser]);

  const signIn = async (access_token: string, user: any) => {
    await storage.save("access_token", access_token);
    await storage.save("username", user.email);
    setUser(user);
  };

  const signOut = async () => {
    await storage.del("access_token");
    await storage.del("username");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
