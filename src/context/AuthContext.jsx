import React, { createContext, useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    const q = query(collection(db, "items"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });

      setItems(todosArr);
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
    });
  }

  function LogIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function LogOut() {
    return signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ items, user, SignUp, LogIn, LogOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export function GiveData() {
  return useContext(AuthContext);
}
