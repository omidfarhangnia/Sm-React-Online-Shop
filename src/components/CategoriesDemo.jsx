
const CategoriesDemo = ({ categoryName, items }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">{categoryName}</h1>
      <div>
      {items[categoryName]?.map((item, index) => {
        if(item === undefined) {
          return "";
        }else{
          return(<li key={index}>{item.title}</li>)
        }
      })}
      </div>
    </div>
  );
};

export default CategoriesDemo;
