import { useState } from "react";
import { GiveData } from "../context/AuthContext";
import ItemsCard from "./ItemsCard";

const CategoriesDemo = ({ categoryName }) => {
  const [isShowMore, setIsShowMore] = useState(false);
  const { items } = GiveData();
  const filteredItem = items.filter((item) => item.category === categoryName);

  return (
    <div className="flex flex-col my-10 px-10">
      <div className="w-[100%] mb-10 flex justify-between items-center">
        <h1 className="text-3xl font-bold mr-10 md:ml-10 lg:text-5xl font-spartan uppercase text-black/80">
          {categoryName}
        </h1>

        <div className="h-[3px] w-full bg-black/30"></div>
      </div>
      <div className="flex flex-wrap justify-around gap-[50px]">
        {isShowMore
          ? filteredItem.map((item, index) => {
              return <ItemsCard key={index} item={item} />;
            })
          : filteredItem.map((item, index) => {
              if (index < 6) {
                return <ItemsCard key={index} item={item} />;
              } else {
                return "";
              }
            })}
      </div>

      {isShowMore ? (
        <button
          className="w-[100%] bg-green-500"
          onClick={() => {
            setIsShowMore(false);
          }}
        >
          show less
        </button>
      ) : (
        <button
          className="w-[100%] bg-green-500"
          onClick={() => {
            setIsShowMore(true);
          }}
        >
          show more
        </button>
      )}
    </div>
  );
};

export default CategoriesDemo;
