import { useEffect, useState } from "react";
import Categories from "../components/Categories";
import CategoriesDemo from "../components/CategoriesDemo";
import { GiveData } from "../context/AuthContext";


const Home = () => {  
  const {items} = GiveData();

  console.log(items)
  return (
    <>
      <Categories />
      {/* <CategoriesDemo categoryName={"clothes"} items={items} />
      <CategoriesDemo categoryName={"electronics"} items={items} />
      <CategoriesDemo categoryName={"furniture"} items={items} />
      <CategoriesDemo categoryName={"shoes"} items={items} />
      <CategoriesDemo categoryName={"others"} items={items} /> */}
    </>
  );
};

export default Home;
