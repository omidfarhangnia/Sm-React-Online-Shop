import { useId, useState } from "react";
import { GiveData } from "../context/AuthContext";
import ItemsCard from "./ItemsCard";

const CategoriesDemo = ({ categoryName }) => {
  const [isShowMore, setIsShowMore] = useState(false);
  const { items } = GiveData();
  const filteredItem = items.filter((item) => item.category === categoryName);
  const demoId = useId();

  return (
    <div className="flex flex-col items-center my-10 px-10">
      <div className="w-[100%] mb-10 flex justify-between items-center">
        <h1 className="text-3xl font-bold mr-10 md:ml-10 lg:text-5xl font-spartan uppercase text-black/80">
          {categoryName}
        </h1>

        <div className="h-[3px] w-full bg-black/30"></div>
      </div>
      <div
        id={demoId}
        className="flex flex-wrap justify-around items-center gap-[50px] my-24 transition-all"
      >
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

      <a href={`#${demoId}`}>
        {isShowMore ? (
          <button
            className="min-w-[200px] w-[40%] max-w-[450px] bg-black/70 text-white p-2 md:p-5 rounded-full text-[20px] md:text-2xl xl:text-3xl"
            onClick={() => {
              setIsShowMore(false);
            }}
          >
            show less
          </button>
        ) : (
          <button
            className="min-w-[200px] w-[40%] max-w-[450px] bg-black/70 text-white p-2 md:p-5 rounded-full text-[20px] md:text-2xl xl:text-3xl"
            onClick={() => {
              setIsShowMore(true);
            }}
          >
            show more
          </button>
        )}
      </a>
    </div>
  );
};

export default CategoriesDemo;
