import { useEffect, useState } from "react";
import Categories from "../components/Categories";
import CategoriesDemo from "../components/CategoriesDemo";

const Home = () => {

  return (
    <>
      <Categories />
      <CategoriesDemo categoryName={"women"} items={""} />
      <CategoriesDemo categoryName={"man"} items={""} />
      <CategoriesDemo categoryName={"baby"} items={""} />
    </>
  );
};

export default Home;
