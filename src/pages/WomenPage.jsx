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
    ordering: "bestSold",
  });
  const [pageItems, setPageItems] = useState([]);

  useEffect(() => {
    setPageItems(items.filter((item) => item.category === "women"));
    let colors = new Set();
    for (var i = 0; i < pageItems.length; i++) {
      for (var j = 0; j < pageItems[i].color.length; j++) {
        if (!colors.has(pageItems[i].color[j])) {
          colors.add(pageItems[i].color[j]);
        }
      }
    }
    setAvailableColors(Array.from(colors));
  }, [items]);

  useEffect(() => {
    let Ordered;
    if(filterValue.ordering === "bestSold"){
      Ordered = pageItems.sort(
        (a, b) => Number(b.soldNum) - Number(a.soldNum)
      );
    }else if(filterValue.ordering === "bestDiscount"){
      Ordered = pageItems.sort(
        (a, b) =>
          Number(b.discount.discountValue) - Number(a.discount.discountValue)
      );
    }else if(filterValue.ordering === "cheapestPrice"){
        Ordered = pageItems.sort((a, b) => {
          let APriceData = givePriceData(a.price, a.discount.discountValue);
          let BPriceData = givePriceData(b.price, b.discount.discountValue);

          if (APriceData.dollar > BPriceData.dollar) {
            return 1;
          }

          if (APriceData.dollar < BPriceData.dollar) {
            return -1;
          }

          if (APriceData.dollar === BPriceData.dollar) {
            if (APriceData.centWithoutLeading > BPriceData.centWithoutLeading) {
              return 1;
            }
            if (APriceData.centWithoutLeading < BPriceData.centWithoutLeading) {
              return -1;
            }

            return 0;
          }
        });
    }

    setPageItems(Ordered);
  }, [filterValue, items, pageItems]);

  return (
    <div>
      <div>
        <h1>Women</h1>
        <div className="flex" onClick={() => setIsFiltered(!isFiltered)}>
          {isFiltered ? <RxCross1 /> : <RiFilter2Fill />}
          Filter
        </div>
        <select
          onChange={(e) =>
            setFilterValue({
              ...filterValue,
              ordering: e.target.value,
            })
          }
        >
          <option value="bestSold">best sellers</option>
          <option value="bestDiscount">higher discount</option>
          <option value="cheapestPrice">cheapest</option>
          <option value="HighestPrice">most expensive</option>
        </select>
      </div>
      {isFiltered && (
        <form>
          <div>
            <input type="checkbox" id="filter__size__XL" />
            <label for="filter__size__XL">XL</label>
            <input type="checkbox" id="filter__size__L" />
            <label for="filter__size__L">L</label>
            <input type="checkbox" id="filter__size__M" />
            <label for="filter__size__M">M</label>
            <input type="checkbox" id="filter__size__S" />
            <label for="filter__size__S">S</label>
            <input type="checkbox" id="filter__size__XS" />
            <label for="filter__size__XS">XS</label>
          </div>
          <div>
            <input type="radio" name="filterPrice" id="price__1200" />
            <label for="price__1200">$1200+</label>
            <input type="radio" name="filterPrice" id="price__600__1200" />
            <label for="price__600__1200">$600-$1200</label>
            <input type="radio" name="filterPrice" id="price__300__600" />
            <label for="price__300__600">$300-$600</label>
            <input type="radio" name="filterPrice" id="price__150__300" />
            <label for="price__150__300">$150-$300</label>
            <input type="radio" name="filterPrice" id="price__50__150" />
            <label for="price__50__150">$50-$150</label>
            <input type="radio" name="filterPrice" id="price__7__50" />
            <label for="price__7__50">$7-$50</label>
          </div>
          <div>
            {availableColors.map((color, index) => (
              <div key={index} className="flex items-center gap-1">
                <span
                  style={{ background: color }}
                  className="w-[30px] h-[30px] inline-block rounded-full"
                ></span>
                <input type="checkbox" id={`filter__color__${color}`} />
                <label for={`filter__color__${color}`}>{color}</label>
              </div>
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

export default WomenPage;
