import { GiveData } from "../context/AuthContext";

const CategoriesDemo = ({ categoryName }) => {
  const { items } = GiveData();
  const filteredItem = items.filter((item) => item.category === categoryName);

  return (
    <div className="flex flex-wrap justify-between">
      <h1 className="text-3xl font-bold w-[100vw] text-center">{categoryName}</h1>
      {filteredItem.map((item) =>  (
        <div className="w-[30%] select-none">
          <img className="object-cover object-top w-[80%] h-[60%]" src={item.imgPath} alt={item.description}/>
          <h5>{item.title}</h5>
          <div>{item.price}</div>
          <div>{item.score}</div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesDemo;
