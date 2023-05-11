import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { GiveData } from "../context/AuthContext";
import ItemsCard from "../components/ItemsCard";

const Account = () => {
  const { user } = GiveData();
  const [likedItems, setLikedItems] = useState([]);
  const [shoppingCardItems, setShoppingCardItems] = useState([]);

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setLikedItems(doc.data()?.likedItems);
    });
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setShoppingCardItems(doc.data()?.shoppingCardItems);
    });
  }, [user?.email]);

  return (
    <>
      <div>
        <h1>liked items</h1>
        {likedItems.map((item, index) => {
          return <ItemsCard key={index} item={item} />;
        })}
      </div>
      <div>
      <h1>shopping card items</h1>
        {shoppingCardItems.map((item, index) => {
          return <ItemsCard key={index} item={item} />;
        })}
      </div>
    </>
  );
};

export default Account;
