import React, { useState, useEffect } from "react";
import Categories from "../components/Categories";
import CategoriesDemo from "../components/CategoriesDemo";

const Home = () => {
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
            default:;
          }
        }

        setItems(cleanedData);
      });
  }, []);

  return (
    <>
      <Categories />
      <CategoriesDemo categoryName={"clothes"} categoryData={items.clothes}/>
      <CategoriesDemo categoryName={"electronics"} categoryData={items.electronics}/>
      <CategoriesDemo categoryName={"furniture"} categoryData={items.furniture}/>
      <CategoriesDemo categoryName={"shoes"} categoryData={items.shoes}/>
      <CategoriesDemo categoryName={"others"} categoryData={items.others}/>
    </>
  );
};

export default Home;