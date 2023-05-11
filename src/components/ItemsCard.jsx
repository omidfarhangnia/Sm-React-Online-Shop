import React from "react";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import { GiveData } from "../context/AuthContext";
import { Link } from "react-router-dom";

const ItemsCard = ({ item }) => {
  const { setSelectedItem } = GiveData();
  const priceData = givePriceData(item.price, item.discount.discountValue);

  return (
    <Link to="/Item">
      <div
        onClick={() => {
          setSelectedItem(item);
        }}
        className="min-w-[300px] w-[30%] max-w-[350px] flex flex-col mx-auto select-none relative p-5 cursor-pointer"
      >
        <div className="w-[104%] h-[104%] bg-gradient-to-br from-[#000000] to-[#434343] absolute top-[-2%] left-[-2%] rounded-md opacity-90 blur-[1px]"></div>
        <div className="relative text-white flex flex-col justify-around">
          <div>
            {item.sizeAndColor.map((item) => (
              <span className="inline-block mx-2 text-[7px]">{item.sizeName} === {JSON.stringify(item.colors)}</span>
            ))}
          </div>
          {item.discount.hasDiscount ? (
            <span
              after={item.discount.discountValue + "%"}
              className={`w-[100%] h-[70%] after:content-[attr(after)] after:absolute after:top-[10px] after:right-[-20px] after:w-[30%] after:text-[20px] after:text-center after:rotate-[45deg] after:bg-red-600 after:rounded-sm`}
            >
              <img
                className="object-cover object-top w-[100%] h-[100%]"
                src={item.imgPath}
                alt={item.description}
              />
            </span>
          ) : (
            <img
              className="object-cover object-top w-[100%] h-[70%]"
              src={item.imgPath}
              alt={item.description}
            />
          )}
          <h5 className="text-[20px] text-white/70 capitalize font-spartan mt-6 mb-3">
            {item.title}
          </h5>
          <div className="flex justify-between items-center">
            {item.discount.hasDiscount ? (
              <span className="flex items-center gap-[10px]">
                <div className="text-[16px] line-through decoration-red-500 decoration-[2px]">
                  {item.price}
                </div>
                <div className="text-[20px] font-bold ">{`$${priceData.dollar}.${priceData.cent}`}</div>
              </span>
            ) : (
              <div className="text-[20px] font-bold">{item.price}</div>
            )}
            <ItemStars grade={item.grade} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ItemsCard;

export function ItemStars({ grade, size = 20 }) {
  let stars = [];

  for (var i = 1; i <= 5; i++) {
    if (i <= grade.ones) {
      stars.push(<IoIosStar size={size} />);
    } else if (i === grade.ones + 1) {
      stars.push(<IoIosStarHalf size={size} />);
    } else {
      stars.push(<IoIosStarOutline size={size} />);
    }
  }

  return (
    <div className="flex justify-between items-center">
      {stars.map((item, index) => (
        <span key={index}>{item}</span>
      ))}
    </div>
  );
}

export function givePriceData(price, discountValue) {
  let priceDollar = price.match(/((?<=\$)\d+)/gm)[0],
    priceCent = price.match(/((?<=\.)\d+)/gm)[0];
  let priceWithDiscount = Math.round(
    Number(`${priceDollar}${priceCent}`) -
      (Number(`${priceDollar}${priceCent}`) / 100) * discountValue
  );
  priceWithDiscount = String(priceWithDiscount);
  let priceWithDiscountDollar = priceWithDiscount.match(/\d+(?=\d{2})/g)[0],
    priceWithDiscountCent = priceWithDiscount.match(/\d{2}$/g)[0];

  return {
    dollar: Number(priceWithDiscountDollar),
    cent: priceWithDiscountCent,
    centWithoutLeading: parseInt(priceWithDiscountCent, 10),
  };
}
