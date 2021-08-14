import React from "react";
import { User } from "../interfaces/user";
import storage from "../storage";

interface Props {
  children: React.ReactElement;
}

interface IContext {
  user: User | null;
  signIn: (access_token: string, user: any) => void;
  signOut: () => void;
}

export const AuthContext = React.createContext({} as IContext);

export function AuthProvider({ children }: Props) {
  const [user, setUser] = React.useState<User | null>(null);

  const signIn = async (access_token: string, user: any) => {
    await storage.save("access_token", access_token);
    setUser(user);
  };

  const signOut = async () => {
    await storage.del("access_token");
    setUser(null);
  };

  // React.useEffect(() => {
  //   async function checkToken() {
  //     const access_token = await storage.get("access_token");
  //     return access_token ? signIn(access_token) : signOut();
  //   }

  //   checkToken();
  // }, []);

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
