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
      Xl: true,
      L: true,
      M: true,
      S: true,
      Sx: true,
    },
    price: {
      start: 0,
      end: Infinity,
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
          colorsData[filteredItems[i].color[j]] = true;
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

  return (
    <div
      onLoad={() => {
        handleSortItems("bestSold");
      }}
    >
      <div className="flex flex-wrap justify-between px-5 md:px-10">
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
          className="text-[19px]"
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
        <form className="flex flex-col gap-5 p-5">
          <div className="flex gap-3 pb-4 border-b-2 border-b-black border-b-solid">
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
                name="Sx"
                type="checkbox"
                id="filter__size__XS"
                onChange={handleChangeSizeFilter}
              />
              <label htmlFor="filter__size__XS" className="ml-1">
                XS
              </label>
            </span>
          </div>
          <div className="flex flex-wrap justify-between gap-5 pb-4 border-b-2 border-b-black border-b-solid">
            <span>
              <input
                type="radio"
                name="filterPrice"
                id="price__1200"
                startprice={1200}
                endprice={Infinity}
                onChange={handleChangePriceFilter}
              />
              <label className="font-spartan ml-1" htmlFor="price__1200">$1200+</label>
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
              <label className="font-spartan ml-1" htmlFor="price__600__1200">$600-$1200</label>
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
              <label className="font-spartan ml-1" htmlFor="price__300__600">$300-$600</label>
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
              <label className="font-spartan ml-1" htmlFor="price__150__300">$150-$300</label>
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
              <label className="font-spartan ml-1" htmlFor="price__50__150">$50-$150</label>
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
              <label className="font-spartan ml-1" htmlFor="price__7__50">$7-$50</label>
            </span>
          </div>
          <div className="flex flex-wrap justify-between gap-5">
            {availableColors.map((color, index) => (
              <GiveColorsForFilter
                key={index}
                color={color}
                handleChangeColor={handleChangeColorFilter}
              />
            ))}
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
  const [isSelected, setIsSelected] = useState(true);

  return (
    <div className="flex items-center gap-1 select-none">
      <span
        style={{ background: color }}
        className="w-[30px] h-[30px] inline-block rounded-full border-solid border-[1px] border-black"
      ></span>
      <input
        type="checkbox"
        id={`filter__color__${color}`}
        name={color}
        checked={isSelected}
        className="translate-x-[-24.5px]"
        onChange={(e) => {
          handleChangeColor(e, !isSelected);
          setIsSelected(!isSelected);
        }}
      />
      <label htmlFor={`filter__color__${color}`} className="-translate-x-2">{color}</label>
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

export default WomenPage;
