import { createContext, ReactNode, useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import { CustomerInfo } from 'react-native-purchases';

type AuthContextDataProps = {
  user: FirebaseAuthTypes.User | null;
  setUserContext: (user: FirebaseAuthTypes.User | null) => void;
  resetIsAdmin: () => void;
  setValidSubscriptionAction: (value: boolean) => void;
  setCustomerInfoAction: (value: CustomerInfo) => void;
  isAdmin: boolean;
  validSubscription: boolean;
  isLoadingApplication: boolean;
  customerInfo: CustomerInfo | null;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isLoadingApplication, setIsLoadingApplication] = useState(false);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [validSubscription, setValidSubscription] = useState(true);

  function setUserContext(user: FirebaseAuthTypes.User | null) {
    setUser(user)
  }

  function resetIsAdmin() {
    setIsAdmin(false);
  }

  function setValidSubscriptionAction(value: boolean) {
    setValidSubscription(value);
  }

  function setCustomerInfoAction(value: CustomerInfo) {
    setCustomerInfo(value);
  }

  async function monitorAuth() {
    setIsLoadingApplication(true);
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
            })
            .catch(error => console.log(error))
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoadingApplication(false);
      }
    });

    return subscriber;
  }

  useEffect(() => {
    monitorAuth();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      setUserContext,
      isAdmin,
      validSubscription,
      isLoadingApplication,
      resetIsAdmin,
      setValidSubscriptionAction,
      setCustomerInfoAction,
      customerInfo
    }}>
      {children}
    </AuthContext.Provider>
  )
}