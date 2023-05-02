import CategoriesDemo from "../components/CategoriesDemo";

const Home = () => {

  return (
    <>
      <CategoriesDemo categoryName={"women"} items={""} />
      <CategoriesDemo categoryName={"man"} items={""} />
      <CategoriesDemo categoryName={"baby"} items={""} />
    </>
  );
};

export default Home;
