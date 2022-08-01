import React from "react";
import { User } from "../../interfaces/user";

interface IContext {
  user: User | null;
  signIn: (access_token: string, user: any) => void;
  signOut: () => void;
}

export const AuthContext = React.createContext({} as IContext);

export const useAuthContext = () => React.useContext(AuthContext);
