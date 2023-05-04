import React from "react";
import { GiveData } from "../context/AuthContext";

const SelectedItem = ({ item }) => {
  const { selectedItem } = GiveData();
  return (
    <div>
      <h1>{selectedItem.title}</h1>
    </div>
  );
};

export default SelectedItem;
