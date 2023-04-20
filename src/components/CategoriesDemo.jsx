import React, { useEffect, useState } from "react";
import { GiveData } from "../context/AuthContext";

const CategoriesDemo = ({ categoryName }) => {
  const [items, setItems] = useState({});
  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.json())
      .then((data) => {
        let cleanedData = {
          clothes: [],
          electronics: [],
          furniture: [],
          shoes: [],
          others: [],
        };

        for (var i = 0; i < data.length; i++) {
          switch (data[i].category.name) {
            case "Clothes":
              cleanedData.clothes.push(data[i]);
              break;
            case "Electronics":
              cleanedData.electronics.push(data[i]);
              break;
            case "Furniture":
              cleanedData.furniture.push(data[i]);
              break;
            case "Shoes":
              cleanedData.shoes.push(data[i]);
              break;
            case "Others":
              cleanedData.others.push(data[i]);
              break;
            default:
          }
        }

        setItems(cleanedData);
      });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold">{categoryName}</h1>
      <div>
      </div>
    </div>
  );
};

export default CategoriesDemo;
