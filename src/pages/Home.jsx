import CategoriesDemo from "../components/CategoriesDemo";
import GiveMyData from "../memo/myWork";

const Home = () => {

  
  return (
    <>
      <CategoriesDemo categoryName={"women"} items={""} />
      <CategoriesDemo categoryName={"men"} items={""} />
      <CategoriesDemo categoryName={"children"} items={""} />
    </>
  );
};

export default Home;
