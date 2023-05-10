import React, { useEffect, useState } from "react";
import { GiveData } from "../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const ShoppingCardPage = () => {
  const [items, setItems] = useState([]);
  const { user } = GiveData();

  
  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setItems(doc.data()?.savedShows);
    });
  }, [user?.email]);

  return (
    <>
      <p className="bg-green-500">helloo tere</p>
    </>
  );
};

export default ShoppingCardPage;
