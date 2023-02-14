import { createContext, ReactNode, useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';

type AuthContextDataProps = {
  user: FirebaseAuthTypes.User | null;
  setUserContext: (user: FirebaseAuthTypes.User | null) => void;
  isAdmin: boolean;
  validSubscription: boolean;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [validSubscription, setValidSubscription] = useState(false);

  function setUserContext(user: FirebaseAuthTypes.User | null) {
    setUser(user)
  }

  async function monitorAuth() {
    const subscriber = auth().onAuthStateChanged(userInfo => {
      setUser(userInfo);

      try {
        if (userInfo?.uid) {
          firestore()
            .collection('users')
            .where('userUid', '==', userInfo?.uid || '')
            .limit(1)
            .get()
            .then(response => {
              const [foundUser] = response.docs.map(doc => doc.data())

              setIsAdmin(foundUser.isAdmin);
              setValidSubscription(foundUser.validSubscriptiopn);
            })
            .catch(error => console.log(error))
        }
      } catch (error) {
        console.log(error)
      }
    });

    return subscriber;
  }

  useEffect(() => {
    monitorAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUserContext, isAdmin, validSubscription }}>
      {children}
    </AuthContext.Provider>
  )
}