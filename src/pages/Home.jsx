import { useEffect, useState } from "react";
import Categories from "../components/Categories";
import CategoriesDemo from "../components/CategoriesDemo";

const Home = () => {
  const [items, setItems] = useState({
    clothes: [],
    electronics: [],
    furniture: [],
    shoes: [],
    others: [],
  });  

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
    <>
      <Categories />
      <CategoriesDemo categoryName={"clothes"} items={items} />
      <CategoriesDemo categoryName={"electronics"} items={items} />
      <CategoriesDemo categoryName={"furniture"} items={items} />
      <CategoriesDemo categoryName={"shoes"} items={items} />
      <CategoriesDemo categoryName={"others"} items={items} />
    </>
  );
};

export default Home;
