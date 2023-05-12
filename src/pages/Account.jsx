import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { db } from "../firebase";
import { GiveData } from "../context/AuthContext";
import ItemsCard from "../components/ItemsCard";

const Account = () => {
  const { user } = GiveData();
  const [likedItems, setLikedItems] = useState([]);

  useLayoutEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      if (doc.data()?.likedItems === undefined) {
        setLikedItems([]);
      } else {
        setLikedItems(doc.data()?.likedItems);
      }
    });
  }, [user?.email]);

  return (
    <>
      <div className="flex flex-wrap justify-around gap-[80px] my-24 w-[90%] mx-auto transition-all">
        <h1 className="w-[90%] text-2xl md:text-4xl lg:text-5xl font-openSans capitalize px-10 py-10 text-white bg-gradient-to-r from-[#000000] to-[#a7a7a7]">
          liked items
        </h1>
        {likedItems?.map((item, index) => {
          return <ItemsCard key={index} item={item} />;
        })}
      </div>
    </>
  );
};

export default Account;
