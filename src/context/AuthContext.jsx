import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import { collection, doc, onSnapshot, query, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState({});
  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    const q = query(collection(db, "products"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];
      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });

      setItems(itemsArr);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  });

  function SignUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password);
    setDoc(doc(db, "users", email), {
      email: email,
      password: password,
      likedItems: [],
      shoppingCardItems: [],
    });
  }

  function LogIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function LogOut() {
    return signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ items, user, selectedItem, SignUp, LogIn, LogOut, setSelectedItem }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export function GiveData() {
  return useContext(AuthContext);
}
