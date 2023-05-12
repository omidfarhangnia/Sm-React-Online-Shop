import React, { useEffect, useLayoutEffect, useState } from "react";
import { GiveData } from "../context/AuthContext";
import { ItemStars, givePriceData } from "../components/ItemsCard";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const Item = () => {
  const { selectedItem, user } = GiveData();
  const [color, setColor] = useState({ selected: "", allColors: [] });
  const [size, setSize] = useState({ selected: "", allSizes: [] });
  const [isLiked, setIsLiked] = useState(false);
  const [isInCard, setIsInCard] = useState(false);
  const userId = doc(db, "users", `${user?.email}`);
  const [seeMoreOverview, setSeeMoreOverview] = useState(false);
  const [shoppingCardItems, setShoppingCardItems] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const priceData = givePriceData(
    selectedItem.price,
    selectedItem.discount.discountValue
  );
  const itemRef = doc(db, "users", `${user?.email}`)


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

  useLayoutEffect(() => {
    if(user){
      onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
        setLikedItems(doc.data()?.likedItems);
      });
      onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
        setShoppingCardItems(doc.data()?.shoppingCardItems);
      });
    }
  }, [user?.email]);

  useEffect(() => {
    const result = likedItems.filter((item) => item.id === selectedItem.id);
    if(result.length === 1){
      setIsLiked(true);
    }
  }, [likedItems])

  useEffect(() => {
    const result = shoppingCardItems.filter((item) => item.id === selectedItem.id);
    if(result.length === 1){
      setIsInCard(true);
    }
  }, [shoppingCardItems]);

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

  const toggleLikeItem = async (itemId) => {
    if (user?.email) {
      if(isLiked === true) {
        setIsLiked(false);
        const result = likedItems.filter((item) => item.id !== itemId);
        await updateDoc(itemRef, {
          likedItems: result
        })
      }else{
        setIsLiked(true);
        await updateDoc(userId, {
          likedItems: arrayUnion(selectedItem),
        });
      }
    } else {
      alert("please log in first");
    }
  };

  const toggleAddToCard = async (itemId) => {
    if (user?.email) {
      if(isInCard === true) {
        setIsInCard(false);
        const result = shoppingCardItems.filter((item) => item.id !== itemId);
        await updateDoc(itemRef, {
          shoppingCardItems: result
        })
      }else{
        setIsInCard(true);
        await updateDoc(userId, {
          shoppingCardItems: arrayUnion(selectedItem),
        });
      }
    } else {
      alert("please log in first");
    }
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
                  <div className="text-[23px] font-bold">{`$${priceData.dollar}.${priceData.cent}`}</div>
                </span>
              ) : (
                <div className="text-[23px] font-bold">
                  {selectedItem.price}
                </div>
              )}
              <button
                className="bg-[#121212] font-light font-openSans tracking-[2.5px] uppercase text-white/80 px-5 py-5"
                onClick={() => toggleAddToCard(selectedItem.id)}
              >
                {isInCard ? "remove from card" : "add to card"}
              </button>
              <div onClick={() => toggleLikeItem(selectedItem.id)}>
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
          <div className="w-full flex flex-col p-6">
            <div
              id="OverViews"
              className="w-full flex flex-wrap justify-around gap-[20px]"
            >
              {selectedItem.overviews.number === 0 ? (
                <p className="capitalize text-[35px] text-gray-500  border-2 border-solid border-gray-500 px-5 py-3 rounded-2xl">there is no overview</p>
              ) : (
                selectedItem.overviews.overview.map((overview, index) => {
                  if (seeMoreOverview) {
                    return <ShowOverView key={index} overview={overview} />;
                  } else if (index < 2) {
                    return <ShowOverView key={index} overview={overview} />;
                  }
                })
              )}
            </div>
            {selectedItem.overviews.number !== 0 && (
              <a
                onClick={() => {
                  setSeeMoreOverview(!seeMoreOverview);
                }}
                href="#OverViews"
                className="bg-black/75 text-center w-[50%] min-w-[350px] max-w-[450px] mx-auto text-[25px] text-white font-openSans py-3 rounded-xl mt-5"
              >
                <button>show {seeMoreOverview ? "less" : "more"}</button>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }
};

function ShowOverView({ overview }) {
  return (
    <>
      <div className="flex flex-col my-5 min-w-[300px] w-[50%] max-w-[500px]">
        <div className="flex flex-wrap justify-between items-center mb-3">
          <h5 className="capitalize font-openSans text-[25px]">
            {overview.userName}
          </h5>
          <div className="inline-flex justify-between mt-3 gap-3 w-full md:w-auto md:mt-0">
            <p className="text-gray-400 text-[15px] font-bold">
              {overview.time} months ago
            </p>
            <ItemStars grade={overview.userGrade} size={17} />
          </div>
        </div>
        <p className="text-justify">{overview.userOverview}</p>
      </div>
    </>
  );
}
export default Item;
