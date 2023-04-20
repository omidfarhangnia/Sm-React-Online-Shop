import Categories from "../components/Categories";
import CategoriesDemo from "../components/CategoriesDemo";


const Home = () => {
  return (
    <>
      <Categories />
      <CategoriesDemo categoryName={"clothes"} />
      <CategoriesDemo categoryName={"electronics"} />
      <CategoriesDemo categoryName={"furniture"} />
      <CategoriesDemo categoryName={"shoes"} />
      <CategoriesDemo categoryName={"others"} />
    </>
  );
};

export default Home;
