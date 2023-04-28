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
  // i should clean thheheswee
  // i should clean thheheswee
  // i should clean thheheswee
  // i should clean thheheswee
  const [filterValue, setFilterValue] = useState({
    ordering: "bestSold",
    filter: {
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
    },
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
      filter: {
        ...filterValue.filter,
        color: colorsData,
      },
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
      filter: {
        ...filterValue.filter,
        size: {
          ...filterValue.filter.size,
          [e.target.name]: !filterValue.filter.size[e.target.name],
        },
      },
    });
  }

  function handleChangePriceFilter(e) {
    const startPrice = e.target.getAttribute("startPrice");
    const endPrice = e.target.getAttribute("endPrice");
    setFilterValue({
      ...filterValue,
      filter: {
        ...filterValue.filter,
        price: {
          start: startPrice,
          end: endPrice,
        },
      },
    });
  }

  function handleChangeColorFilter(e, selectStatus) {
    setFilterValue({
      ...filterValue,
      filter: {
        ...filterValue.filter,
        color: {
          ...filterValue.filter.color,
          [e.target.name]: selectStatus,
        },
      },
    });
  }

  return (
    <div onLoad={() => {handleSortItems("bestSold")}}>
      <div>
        <h1>Women</h1>
        <div className="flex" onClick={() => setIsFiltered(!isFiltered)}>
          {isFiltered ? <RxCross1 /> : <RiFilter2Fill />}
          Filter
        </div>
        <select onChange={(e) => handleSortItems(e.target.value)}>
          <option value="bestSold">best sellers</option>
          <option value="bestDiscount">higher discount</option>
          <option value="cheapestPrice">cheapest</option>
          <option value="HighestPrice">most expensive</option>
          <option value="bestScore">best score</option>
        </select>
      </div>
      {isFiltered && (
        <form>
          <div>
            <input
              checked={filterValue.filter.size.Xl}
              name="Xl"
              type="checkbox"
              id="filter__size__XL"
              onChange={handleChangeSizeFilter}
            />
            <label for="filter__size__XL">XL</label>
            <input
              checked={filterValue.filter.size.L}
              name="L"
              type="checkbox"
              id="filter__size__L"
              onChange={handleChangeSizeFilter}
            />
            <label for="filter__size__L">L</label>
            <input
              checked={filterValue.filter.size.M}
              name="M"
              type="checkbox"
              id="filter__size__M"
              onChange={handleChangeSizeFilter}
            />
            <label for="filter__size__M">M</label>
            <input
              checked={filterValue.filter.size.S}
              name="S"
              type="checkbox"
              id="filter__size__S"
              onChange={handleChangeSizeFilter}
            />
            <label for="filter__size__S">S</label>
            <input
              checked={filterValue.filter.size.Sx}
              name="Sx"
              type="checkbox"
              id="filter__size__XS"
              onChange={handleChangeSizeFilter}
            />
            <label for="filter__size__XS">XS</label>
          </div>
          <div>
            <input
              type="radio"
              name="filterPrice"
              id="price__1200"
              startPrice={1200}
              endPrice={Infinity}
              onChange={handleChangePriceFilter}
            />
            <label for="price__1200">$1200+</label>
            <input
              type="radio"
              name="filterPrice"
              id="price__600__1200"
              startPrice={600}
              endPrice={1200}
              onChange={handleChangePriceFilter}
            />
            <label for="price__600__1200">$600-$1200</label>
            <input
              type="radio"
              name="filterPrice"
              id="price__300__600"
              startPrice={300}
              endPrice={600}
              onChange={handleChangePriceFilter}
            />
            <label for="price__300__600">$300-$600</label>
            <input
              type="radio"
              name="filterPrice"
              id="price__150__300"
              startPrice={150}
              endPrice={300}
              onChange={handleChangePriceFilter}
            />
            <label for="price__150__300">$150-$300</label>
            <input
              type="radio"
              name="filterPrice"
              id="price__50__150"
              startPrice={50}
              endPrice={150}
              onChange={handleChangePriceFilter}
            />
            <label for="price__50__150">$50-$150</label>
            <input
              type="radio"
              name="filterPrice"
              id="price__7__50"
              startPrice={7}
              endPrice={50}
              onChange={handleChangePriceFilter}
            />
            <label for="price__7__50">$7-$50</label>
          </div>
          <div>
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
    <div className="flex items-center gap-1">
      <span
        style={{ background: color }}
        className="w-[30px] h-[30px] inline-block rounded-full"
      ></span>
      <input
        type="checkbox"
        id={`filter__color__${color}`}
        name={color}
        checked={isSelected}
        onChange={(e) => {
          handleChangeColor(e, !isSelected);
          setIsSelected(!isSelected);
        }}
      />
      <label for={`filter__color__${color}`}>{color}</label>
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
