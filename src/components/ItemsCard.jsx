import React from "react";
import {IoIosStar, IoIosStarHalf, IoIosStarOutline} from "react-icons/io"

const ItemsCard = ({ item }) => {
  console.log(item.score);
  return (
    <div className="min-w-[300px] w-[30%] max-w-[350px] flex flex-col mx-auto select-none relative p-5">
      <div className="w-[104%] h-[104%] bg-gradient-to-br from-[#000000] to-[#434343] absolute top-[-2%] left-[-2%] rounded-md opacity-90 blur-[1px]"></div>
      <div className="relative text-white flex flex-col justify-around">
        <img
          className="object-cover object-top w-[100%] h-[70%]"
          src={item.imgPath}
          alt={item.description}
        />
        <h5 className="text-[30px] capitalize font-spartan my-3">
          {item.title}
        </h5>
        <div className="flex justify-between">
          <div className="text-[20px] font-bold">{item.price}</div>
          <ItemStars score={item.score} />
        </div>
      </div>
    </div>
  );
};

export default ItemsCard;

function ItemStars({ score }) {

  // IoIosStarOutline IoIosStar IoIosStarHalf
  return(

  );
}
