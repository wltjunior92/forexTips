import { createContext, ReactNode, useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

type AuthContextDataProps = {
  user: FirebaseAuthTypes.User | null;
  setUserContext: (user: FirebaseAuthTypes.User | null) => void;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  function setUserContext(user: FirebaseAuthTypes.User | null) {
    setUser(user)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(userInfo => {
      setUser(userInfo);
    });

    return subscriber;
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUserContext }}>
      {children}
    </AuthContext.Provider>
  )
}