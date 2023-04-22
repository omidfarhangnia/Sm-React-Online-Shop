import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [items, setItems] = useState([]);

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
  return (
    <AuthContext.Provider value={{ items }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export function GiveData() {
  return useContext(AuthContext);
}
