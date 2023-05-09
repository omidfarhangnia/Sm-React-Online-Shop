import React, { useEffect, useState } from "react";
import { GiveData } from "../context/AuthContext";
import { ItemStars, givePriceData } from "../components/ItemsCard";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";

const Item = () => {
  const { selectedItem, user } = GiveData();
  const [color, setColor] = useState({ selected: "", allColors: [] });
  const [size, setSize] = useState({ selected: "", allSizes: [] });
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    let sizes = [];
    for (var i = 0; i < selectedItem.sizeAndColor.length; i++) {
      sizes.push(selectedItem.sizeAndColor[i].sizeName);
    }
    setSize({ selected: sizes[0], allSizes: sizes });
  }, []);

  useEffect(() => {
    let filteredValue = selectedItem.sizeAndColor.filter(
      (member) => member.sizeName === size.selected
    );
    setColor({
      selected: filteredValue[0]?.colors[0],
      allColors: filteredValue[0]?.colors,
    });
  }, [size]);

  // const priceData = givePriceData(
  //   selectedItem.price,
  //   selectedItem.discount.discountValue
  // );

  function handleSelectSize(selectedSize) {
    setSize({
      ...size,
      selected: selectedSize,
    });
  }

  function handleSelectColor(selectedColor) {
    setColor({
      ...color,
      selected: selectedColor,
    });
  }

  function handleAddToCard() {
    if (user) {
    } else {
      alert("please log in to your account first");
    }
  }

  function handleLikeItem() {
    setIsLiked(!isLiked);
  }

  if (Object.keys(selectedItem).length === 0) {
    return "";
  } else {
    return (
      <div className="flex flex-col">
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center w-full p-5 lg:p-10 bg-[#f8f8f8]">
          <span className="flex w-[45%] md:w-auto md:order-none order-2 opacity-70 justify-center">
            <ItemStars grade={selectedItem.grade} />
          </span>
          <h1 className="text-2xl mb-5 w-full md:w-auto md:order-none md:mb-0 text-center order-1 select-none lg:text-4xl lg:tracking-[5px] font-bebasNeue">
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
              alt={selectedItem.moreInfo.description}
            />
          </div>
          <div className="w-full md:w-[50%] p-5">
            <div>
              <p className="text-[20px] font-bold capitalize text-black/80 font-openSans">
                Size : {size.selected}
              </p>
              <div className="flex gap-3 my-3">
                {size.allSizes.map((item, index) => (
                  <span
                    className="w-[35px] h-[35px] relative font-bold uppercase flex justify-center items-center border-2 border-solid"
                    key={index}
                    onClick={() => handleSelectSize(item)}
                  >
                    {size.selected === item && (
                      <GrCheckbox
                        size={35}
                        className="absolute [&>rect]:stroke-zinc-400"
                      />
                    )}
                    <span className="text-[17px]">{item}</span>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[20px] font-bold capitalize text-black/80 font-openSans">
                Color : {color.selected}
              </p>
              <div className="flex gap-3 my-3">
                {color.allColors?.map((item, index) => (
                  <span
                    style={{ background: item }}
                    key={index}
                    onClick={() => handleSelectColor(item)}
                    className="w-[35px] h-[35px] relative flex justify-center items-center"
                  >
                    {color.selected === item ? (
                      <GrCheckboxSelected
                        size={35}
                        className="absolute [&>path]:stroke-zinc-400"
                      />
                    ) : (
                      <GrCheckbox
                        size={35}
                        className="absolute [&>rect]:stroke-zinc-400"
                      />
                    )}
                  </span>
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
                  {/* <div className="text-[23px] font-bold ">{`$${priceData.dollar}.${priceData.cent}`}</div> */}
                </span>
              ) : (
                <div className="text-[23px] font-bold">
                  {selectedItem.price}
                </div>
              )}
              <button
                className="bg-[#121212] font-light font-openSans tracking-[2.5px] uppercase text-white/80 px-5 py-5"
                onClick={handleAddToCard}
              >
                add to card
              </button>
              <div onClick={handleLikeItem}>
                {isLiked ? (
                  <AiFillHeart size={30} />
                ) : (
                  <AiOutlineHeart size={30} />
                )}
              </div>
            </div>
            <hr />
            <div className="my-3">
              <h3 className="text-[20px] font-medium text-black/80 uppercase mb-2">
                description
              </h3>
              <p className="capitalize text-[14px]">
                {selectedItem.moreInfo.description}
              </p>
              {selectedItem.moreInfo.material && (
                <p className="capitalize text-[14px]">
                  {" "}
                  material : {selectedItem.moreInfo.material}
                </p>
              )}
            </div>
            <hr />
            <div className="my-3">
              <h3 className="text-[20px] font-medium text-black/80 uppercase mb-2">
                additional information
              </h3>
              <p className="text-[17px] text-black/75 font-openSans capitalize">
                color :{" "}
                {color.allColors?.map(
                  (member, index) =>
                    `${member}${
                      color.allColors?.length !== index + 1 ? ", " : ""
                    }`
                )}
              </p>
              <p className="text-[17px] text-black/75 font-openSans capitalize">
                size :{" "}
                {size.allSizes?.map(
                  (member, index) =>
                    `${member}${
                      size.allSizes?.length !== index + 1 ? ", " : ""
                    }`
                )}
              </p>
              <p className="text-[17px] text-black/75 font-openSans capitalize">
                score : {selectedItem.grade.ones}.{selectedItem.grade.tenths} /
                5.0
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Item;
