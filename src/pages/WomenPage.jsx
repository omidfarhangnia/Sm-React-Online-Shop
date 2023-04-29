import React, { useEffect, useState } from "react";
import { GiveData } from "../context/AuthContext";
import ItemsCard from "../components/ItemsCard";
import { RxCross1 } from "react-icons/rx";
import { RiFilter2Fill } from "react-icons/ri";
import { givePriceData } from "../components/ItemsCard";

const WomenPage = () => {
  const { items } = GiveData();
  const [isFiltered, setIsFiltered] = useState(false);
  const [availableColors, setAvailableColors] = useState([]);
  const [filterValue, setFilterValue] = useState({
    size: {
      Xl: false,
      L: false,
      M: false,
      S: false,
      Xs: false,
    },
    price: {
      start: null,
      end: null,
    },
    color: {},
  });
  const [pageItems, setPageItems] = useState([]);
  const filteredItems = items.filter((item) => item.category === "women");

  useEffect(() => {
    setPageItems(filteredItems);
    // giving values for filtering colors
    let colors = new Set();
    let colorsData = {};
    for (var i = 0; i < filteredItems.length; i++) {
      for (var j = 0; j < filteredItems[i].color.length; j++) {
        if (!colors.has(filteredItems[i].color[j])) {
          colors.add(filteredItems[i].color[j]);
          colorsData[filteredItems[i].color[j]] = false;
        }
      }
    }

    // making an object for filter data
    setFilterValue({
      ...filterValue,
      color: colorsData,
    });
    setAvailableColors(Array.from(colors));
  }, [items]);

  function handleSortItems(status) {
    let items = [...pageItems];

    switch (status) {
      case "bestSold": {
        setPageItems(
          items.sort((a, b) => Number(b.soldNum) - Number(a.soldNum))
        );
        break;
      }
      case "bestDiscount": {
        setPageItems(
          items.sort(
            (a, b) =>
              Number(b.discount.discountValue) -
              Number(a.discount.discountValue)
          )
        );
        break;
      }
      case "cheapestPrice": {
        setPageItems(
          items.sort((a, b) => {
            let APriceData = givePriceData(a.price, a.discount.discountValue);
            let BPriceData = givePriceData(b.price, b.discount.discountValue);

            if (APriceData.dollar > BPriceData.dollar) {
              return 1;
            }
            if (APriceData.dollar < BPriceData.dollar) {
              return -1;
            }
            if (APriceData.dollar === BPriceData.dollar) {
              if (
                APriceData.centWithoutLeading > BPriceData.centWithoutLeading
              ) {
                return 1;
              }
              if (
                APriceData.centWithoutLeading < BPriceData.centWithoutLeading
              ) {
                return -1;
              }
            }
          })
        );
        break;
      }
      case "HighestPrice": {
        setPageItems(
          items.sort((a, b) => {
            let APriceData = givePriceData(a.price, a.discount.discountValue);
            let BPriceData = givePriceData(b.price, b.discount.discountValue);

            if (APriceData.dollar > BPriceData.dollar) {
              return -1;
            }
            if (APriceData.dollar < BPriceData.dollar) {
              return 1;
            }
            if (APriceData.dollar === BPriceData.dollar) {
              if (
                APriceData.centWithoutLeading > BPriceData.centWithoutLeading
              ) {
                return -1;
              }
              if (
                APriceData.centWithoutLeading < BPriceData.centWithoutLeading
              ) {
                return 1;
              }
            }
          })
        );
        break;
      }
      case "bestScore": {
        setPageItems(
          items.sort((a, b) => {
            const AScore = giveScore(a.score);
            const BScore = giveScore(b.score);

            if (AScore.major > BScore.major) {
              return -1;
            }
            if (AScore.major < BScore.major) {
              return 1;
            }
            if (AScore.major === BScore.major) {
              if (AScore.minor > BScore.minor) {
                return -1;
              }
              if (AScore.minor < BScore.minor) {
                return 1;
              }
            }
          })
        );
        break;
      }
      default: {
        return "";
      }
    }
  }

  function handleChangeSizeFilter(e) {
    setFilterValue({
      ...filterValue,
      size: {
        ...filterValue.size,
        [e.target.name]: !filterValue.size[e.target.name],
      },
    });
  }

  function handleChangePriceFilter(e) {
    const startPrice = e.target.getAttribute("startprice");
    const endPrice = e.target.getAttribute("endprice");
    setFilterValue({
      ...filterValue,
      price: {
        start: startPrice,
        end: endPrice,
      },
    });
  }

  function handleChangeColorFilter(e, selectStatus) {
    setFilterValue({
      ...filterValue,
      color: {
        ...filterValue.color,
        [e.target.name]: selectStatus,
      },
    });
  }

  function handleSetFilter() {
    let sizeFilter = returnFilteredValue("size", filterValue),
      priceFilter = returnFilteredValue("price", filterValue),
      colorFilter = returnFilteredValue("color", filterValue);
    console.log(sizeFilter);
    console.log(priceFilter);
    console.log(colorFilter);
  }

  return (
    <div>
      <div className="flex flex-wrap justify-between px-5 my-10 md:px-10">
        <h1 className="text-center font-bold font-spartan text-4xl uppercase md:text-5xl py-5 mb-5 w-full">
          Women
        </h1>
        <div
          className="flex text-[19px] gap-2 items-center"
          onClick={() => setIsFiltered(!isFiltered)}
        >
          {isFiltered ? <RxCross1 /> : <RiFilter2Fill />}
          Filter
        </div>
        <select
          className="text-[19px] px-10 py-4 uppercase"
          onChange={(e) => handleSortItems(e.target.value)}
        >
          <option value="bestSold">best sellers</option>
          <option value="bestDiscount">higher discount</option>
          <option value="cheapestPrice">cheapest</option>
          <option value="HighestPrice">most expensive</option>
          <option value="bestScore">best score</option>
        </select>
      </div>
      {isFiltered && (
        <form
          className="flex flex-col flex-wrap gap-5 p-5 bg-slate-100 rounded-lg lg:flex-row lg:p-10 lg:mx-10"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-wrap lg:flex-col lg:w-[30%] gap-3 pb-4 border-b-2 border-b-black border-b-solid lg:border-0">
            <h1 className="w-full text-2xl uppercase mb-5 font-bold lg:text-3xl lg:mb-10">
              Size
            </h1>
            <span>
              <input
                checked={filterValue.size.Xl}
                name="Xl"
                type="checkbox"
                id="filter__size__XL"
                onChange={handleChangeSizeFilter}
              />
              <label htmlFor="filter__size__XL" className="ml-1">
                XL
              </label>
            </span>
            <span>
              <input
                checked={filterValue.size.L}
                name="L"
                type="checkbox"
                id="filter__size__L"
                onChange={handleChangeSizeFilter}
              />
              <label htmlFor="filter__size__L" className="ml-1">
                L
              </label>
            </span>
            <span>
              <input
                checked={filterValue.size.M}
                name="M"
                type="checkbox"
                id="filter__size__M"
                onChange={handleChangeSizeFilter}
              />
              <label htmlFor="filter__size__M" className="ml-1">
                M
              </label>
            </span>
            <span>
              <input
                checked={filterValue.size.S}
                name="S"
                type="checkbox"
                id="filter__size__S"
                onChange={handleChangeSizeFilter}
              />
              <label htmlFor="filter__size__S" className="ml-1">
                S
              </label>
            </span>
            <span>
              <input
                checked={filterValue.size.Sx}
                name="Xs"
                type="checkbox"
                id="filter__size__XS"
                onChange={handleChangeSizeFilter}
              />
              <label htmlFor="filter__size__XS" className="ml-1">
                XS
              </label>
            </span>
          </div>
          <div className="flex lg:flex-col lg:w-[30%] flex-wrap justify-between lg:justify-normal gap-5 pb-4 border-b-2 border-b-black border-b-solid lg:border-0">
            <h1 className="w-full text-2xl uppercase mb-5 font-bold lg:text-3xl lg:mb-10">
              Price
            </h1>
            <span>
              <input
                type="radio"
                name="filterPrice"
                id="price__1200"
                startprice={1200}
                endprice={Infinity}
                onChange={handleChangePriceFilter}
              />
              <label className="font-spartan ml-1" htmlFor="price__1200">
                $1200+
              </label>
            </span>
            <span>
              <input
                type="radio"
                name="filterPrice"
                id="price__600__1200"
                startprice={600}
                endprice={1200}
                onChange={handleChangePriceFilter}
              />
              <label className="font-spartan ml-1" htmlFor="price__600__1200">
                $600-$1200
              </label>
            </span>
            <span>
              <input
                type="radio"
                name="filterPrice"
                id="price__300__600"
                startprice={300}
                endprice={600}
                onChange={handleChangePriceFilter}
              />
              <label className="font-spartan ml-1" htmlFor="price__300__600">
                $300-$600
              </label>
            </span>
            <span>
              <input
                type="radio"
                name="filterPrice"
                id="price__150__300"
                startprice={150}
                endprice={300}
                onChange={handleChangePriceFilter}
              />
              <label className="font-spartan ml-1" htmlFor="price__150__300">
                $150-$300
              </label>
            </span>
            <span>
              <input
                type="radio"
                name="filterPrice"
                id="price__50__150"
                startprice={50}
                endprice={150}
                onChange={handleChangePriceFilter}
              />
              <label className="font-spartan ml-1" htmlFor="price__50__150">
                $50-$150
              </label>
            </span>
            <span>
              <input
                type="radio"
                name="filterPrice"
                id="price__7__50"
                startprice={7}
                endprice={50}
                onChange={handleChangePriceFilter}
              />
              <label className="font-spartan ml-1" htmlFor="price__7__50">
                $7-$50
              </label>
            </span>
          </div>
          <div className="flex lg:flex-col lg:w-[30%] flex-wrap justify-between lg:justify-normal gap-5">
            <h1 className="w-full text-2xl uppercase mb-5 font-bold lg:text-3xl lg:mb-10">
              Color
            </h1>
            {availableColors.map((color, index) => (
              <GiveColorsForFilter
                key={index}
                color={color}
                handleChangeColor={handleChangeColorFilter}
              />
            ))}
          </div>
          <div className="w-full mt-10 flex justify-center">
            <button
              className="uppercase text-1xl lg:text-3xl bg-gradient-to-br rounded-full from-[#000000] to-[#434343] text-white py-3 px-10 lg:py-5 lg:px-16"
              onClick={handleSetFilter}
            >
              set Filter
            </button>
          </div>
        </form>
      )}
      <div className="flex flex-wrap justify-around gap-[50px] my-24 transition-all">
        {pageItems.map((item, index) => {
          return <ItemsCard key={index} item={item} />;
        })}
      </div>
    </div>
  );
};

function GiveColorsForFilter({ color, handleChangeColor }) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="flex items-center gap-1 select-none">
      <span
        style={{ background: color }}
        className="w-[30px] h-[30px] inline-block border-solid border-[1px] border-black"
      ></span>
      <input
        type="checkbox"
        id={`filter__color__${color}`}
        name={color}
        checked={isSelected}
        className="translate-x-[-34px] color__checkBox"
        onChange={(e) => {
          handleChangeColor(e, !isSelected);
          setIsSelected(!isSelected);
        }}
      />
      <label htmlFor={`filter__color__${color}`} className="-translate-x-2">
        {color}
      </label>
    </div>
  );
}

function giveScore(score) {
  let major = score.match(/\d(?=\.)/g)[0];
  let minor = score.match(/(?<=\.)\d/g)[0];
  return {
    major: Number(major),
    minor: Number(minor),
  };
}

function returnFilteredValue(status, filterValue) {
  if (status === "size") {
    let selectedSize = [];
    for (let member in filterValue.size) {
      if (filterValue.size[member] === true) {
        selectedSize.push(member);
      }
    }
    return selectedSize;
  } else if (status === "price") {
    return {
      start: Number(filterValue.price.start),
      end: Number(filterValue.price.end),
    };
  } else if (status === "color") {
    let selectedColor = [];
    for (let member in filterValue.color) {
      if (filterValue.color[member] === true) {
        selectedColor.push(member);
      }
    }
    return selectedColor;
  }
}

export default WomenPage;
