import React, { useState } from "react";
import { GiveData } from "../context/AuthContext";
import { ItemStars, givePriceData } from "../components/ItemsCard";
import { GrCheckboxSelected } from "react-icons/gr";
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
      <div>
        <div>
          <ItemStars score={selectedItem.score} />
          <h1>{selectedItem.title}</h1>
          <p>sold number : {selectedItem.soldNum}</p>
        </div>
        <div>
          <div>
            <img src={selectedItem.imgPath} alt={selectedItem.description} />
          </div>
          <div>
            <div>
              <p>Color : {selectedColor}</p>
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
            <div>
              <p>Size : {selectedSize}</p>
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
            <hr />
            <div>
              {selectedItem.discount.hasDiscount ? (
                <span className="flex items-center gap-[10px]">
                  <div className="text-[16px] line-through decoration-red-500 decoration-[2px]">
                    {selectedItem.price}
                  </div>
                  <div className="text-[20px] font-bold ">{`$${priceData.dollar}.${priceData.cent}`}</div>
                </span>
              ) : (
                <div className="text-[20px] font-bold">
                  {selectedItem.price}
                </div>
              )}
              <div>
                <button>add to card</button>
                <div onClick={() => setIsLiked(!isLiked)}>
                  {isLiked ? (
                    <AiFillHeart size={25} />
                  ) : (
                    <AiOutlineHeart size={25} />
                  )}
                </div>
              </div>
            </div>
            <hr />
            <div>
              <h3>description</h3>
              {selectedItem.description}
            </div>
            <hr />
            <div>
              <h3>additional information</h3>
              <p>color: {selectedItem.color.map((color) => `${color}, `)}</p>
              <p>size: {selectedItem.size.map((size) => `${size}, `)}</p>
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
      style={{ background: category === "color" ? item : "green" }}
      className="w-[20px] h-[20px] inline-block relative"
      onClick={() => handleSelectColor(item)}
    >
      {selectedItem === item && (
        <GrCheckboxSelected size={20} className="absolute" />
      )}
      {category === "size" && <span className="absolute top-0">{item}</span>}
    </span>
  );
}
