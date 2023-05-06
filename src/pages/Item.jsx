import React, { useState } from "react";
import { GiveData } from "../context/AuthContext";
import { ItemStars, givePriceData } from "../components/ItemsCard";
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const Item = () => {
  const { selectedItem } = GiveData();
  const [selectedColor, setSelectedColor] = useState(selectedItem.color[0]);
  const [selectedSize, setSelectedSize] = useState(selectedItem.size[0]);
  const [isLiked, setIsLiked] = useState(false);
  const priceData = givePriceData(
    selectedItem.price,
    selectedItem.discount.discountValue
  );

  function handleSelectColor(color) {
    setSelectedColor(color);
  }

  function handleSelectSize(size) {
    setSelectedSize(size);
  }

  if (Object.keys(selectedItem).length === 0) {
    return "";
  } else {
    return (
      <div className="flex flex-col">
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center w-full p-5 lg:p-10 bg-[#f8f8f8]">
          <span className="flex w-[45%] md:w-auto md:order-none order-2 opacity-70 justify-center">
            <ItemStars score={selectedItem.score} />
          </span>
          <h1 className="text-4xl mb-5 w-full md:w-auto md:order-none md:mb-0 text-center order-1 select-none md:text-5xl lg:text-7xl lg:tracking-[5px] font-bebasNeue">
            {selectedItem.title}
          </h1>
          <p className="text-[16px] md:text-[18px] lg:text-[20px] w-[45%] md:w-auto md:order-none order-2 text-black/70 uppercase font-openSans font-light">
            sold number : {selectedItem.soldNum}
          </p>
        </div>
        <div className="flex flex-wrap justify-center mt-5">
          <div className="w-full md:w-[50%] py-6 grid place-items-center">
            <img
              className="max-w-[350px] border-2 border-solid border-black p-5 object-cover object-center"
              src={selectedItem.imgPath}
              alt={selectedItem.description}
            />
          </div>
          <div className="w-full md:w-[50%] p-5">
            <div>
              <p className="text-[20px] font-bold capitalize text-black/80 font-openSans">
                Color : {selectedColor}
              </p>
              <div className="flex gap-3 my-3">
                {selectedItem.color.map((color, index) => (
                  <SetItemsForChoose
                    key={index}
                    handleSelectColor={handleSelectColor}
                    item={color}
                    selectedItem={selectedColor}
                    category={"color"}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="text-[20px] font-bold capitalize text-black/80 font-openSans">
                Size : {selectedSize}
              </p>
              <div className="flex gap-3 my-3">
                {selectedItem.size.map((size, index) => (
                  <SetItemsForChoose
                    key={index}
                    handleSelectColor={handleSelectSize}
                    item={size}
                    selectedItem={selectedSize}
                    category={"size"}
                  />
                ))}
              </div>
            </div>
            <hr />
            <div className="my-3 flex items-center gap-5 lg:gap-10 px-10">
              {selectedItem.discount.hasDiscount ? (
                <span className="flex items-center gap-[10px]">
                  <div className="text-[16px] line-through decoration-red-500 decoration-[2px]">
                    {selectedItem.price}
                  </div>
                  <div className="text-[23px] font-bold ">{`$${priceData.dollar}.${priceData.cent}`}</div>
                </span>
              ) : (
                <div className="text-[23px] font-bold">
                  {selectedItem.price}
                </div>
              )}
              <button className="bg-[#121212] font-light font-openSans tracking-[2.5px] uppercase text-white/80 px-5 py-5">add to card</button>
              <div onClick={() => setIsLiked(!isLiked)}>
                {isLiked ? (
                  <AiFillHeart size={30} />
                ) : (
                  <AiOutlineHeart size={30} />
                )}
              </div>
            </div>
            <hr />
            <div className="my-3">
              <h3 className="text-[20px] font-medium text-black/80 uppercase mb-2">description</h3>
              <p className="capitalize text-[14px]">{selectedItem.description}</p>
            </div>
            <hr />
            <div className="my-3">
              <h3 className="text-[20px] font-medium text-black/80 uppercase mb-2">additional information</h3>
              <p className="text-[17px] text-black/75 font-openSans capitalize">color : {selectedItem.color.map((color, index) => `${color}${(selectedItem.color.length !== index + 1) ? ", " : ""}`)}</p>
              <p className="text-[17px] text-black/75 font-openSans capitalize">size : {selectedItem.size.map((size, index) => `${size}${(selectedItem.color.length !== index + 1) ? ", " : ""}`)}</p>
              <p className="text-[17px] text-black/75 font-openSans capitalize">score : {selectedItem.score} / 5.0</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Item;

function SetItemsForChoose({
  item,
  selectedItem,
  handleSelectColor,
  category,
}) {
  return (
    <span
      style={{ background: category === "color" ? item : "" }}
      className={`w-[35px] h-[35px] relative font-bold uppercase flex justify-center items-center border-2 border-solid ${
        category === "color" ? "border-black" : ""
      }`}
      onClick={() => handleSelectColor(item)}
    >
      {selectedItem === item &&
        (category === "color" ? (
          <GrCheckboxSelected
            size={35}
            className="absolute [&>path]:stroke-zinc-400"
          />
        ) : (
          <GrCheckbox size={35} className="absolute [&>rect]:stroke-zinc-400" />
        ))}
      {category === "size" && <span className="text-[17px]">{item}</span>}
    </span>
  );
}
