import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import firebase from "firebase/app";

import { auth } from "../data/firebase";

export type User = firebase.User | null;

const signin = (email: string, password: string) => {
  return auth.signInWithEmailAndPassword(email, password);
};

const resetPassword = (email: string) => {
  return auth.sendPasswordResetEmail(email);
};

const confirmPasswordReset = (actionCode: string, newPassword: string) => {
  return auth.confirmPasswordReset(actionCode, newPassword);
};

// const signout = () => {
//     auth.signOut();
//   };

const useUserHook = (initial: User = null) => {
  const [user, userSet] = useState<User>(initial);
  const [loading, loadingSet] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        userSet(user);
      } else {
        userSet(null);
      }
      loadingSet(false);
    });
    return unsubscribe;
  }, [user]);

  const signout = () => {
    const unsubscribe = auth.signOut();
    userSet(null);
    return unsubscribe;
  };

  const handleLoadingSet = (value: boolean) => {
    loadingSet(value);
  };

  return {
    handleLoadingSet,
    loading,
    user,
    signin,
    resetPassword,
    confirmPasswordReset,
    signout,
  };
};

type UseUserType = ReturnType<typeof useUserHook>;

const UserContext = createContext<UseUserType | null>(null);

export const useUser = () => useContext(UserContext)!;

export const UserProvider = ({ children }: { children: ReactNode }) => (
  <UserContext.Provider value={useUserHook()}>{children}</UserContext.Provider>
);
