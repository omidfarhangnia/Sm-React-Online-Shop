import { faker } from "@faker-js/faker";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

export default function GiveMyData({ number }) {
  const chartOne = number / 3, chartTwo = number / 3 * 2 , chartThree = number / 3 * 3;
  // i used this loop for giving test data
  for (let i = 0; i <= number; i++) {
    if (i <= chartOne && i > 0) {
      addDoc(collection(db, "products"), {
        category: "men",
        availableNum: faker.random.numeric(),
        sizeAndColor: giveRandomData(),
        imgPath:
          "https://i.pinimg.com/236x/78/d3/7c/78d37ccd2a563476b328b92123c3eaf1--mannequin-display-mannequins.jpg",
        price: `$${faker.commerce.price(20, 1200, 2)}`,
        discount: giveDiscountData(),
        grade: giveScoreData(),
        soldNum: giveSoldNumData(),
        title: `${faker.commerce.productAdjective()} ${faker.commerce.productName()}`,
        moreInfo: {
          description: faker.commerce.productDescription(),
          material: faker.commerce.productMaterial(),
        },
        isLiked: false,
        isInShoppingCard: false,
        overviews: giveOverviewData(),
        id: giveItemsId(i),
      });
    } else if (i >= chartOne && i < chartTwo) {
      addDoc(collection(db, "products"), {
        category: "women",
        availableNum: faker.random.numeric(),
        sizeAndColor: giveRandomData(),
        imgPath:
          "https://product-images.therealreal.com/WDI405059_1_enlarged.jpg",
        price: `$${faker.commerce.price(20, 1200, 2)}`,
        discount: giveDiscountData(),
        grade: giveScoreData(),
        soldNum: giveSoldNumData(),
        title: `${faker.commerce.productAdjective()} ${faker.commerce.productName()}`,
        moreInfo: {
          description: faker.commerce.productDescription(),
          material: faker.commerce.productMaterial(),
        },
        isLiked: false,
        isInShoppingCard: false,
        overviews: giveOverviewData(),
        id: giveItemsId(i),
      });
    } else if (i >= chartThree) {
      addDoc(collection(db, "products"), {
        category: "children",
        availableNum: faker.random.numeric(),
        sizeAndColor: giveRandomData(),
        imgPath:
          "https://cdn.shopify.com/s/files/1/0272/3820/3444/products/Jingle-Bells-Long-Sleeve-Zipsuit-Back_600x.jpg?v=1635151382",
        price: `$${faker.commerce.price(20, 1200, 2)}`,
        discount: giveDiscountData(),
        grade: giveScoreData(),
        soldNum: giveSoldNumData(),
        title: `${faker.commerce.productAdjective()} ${faker.commerce.productName()}`,
        moreInfo: {
          description: faker.commerce.productDescription(),
          material: faker.commerce.productMaterial(),
        },
        isLiked: false,
        isInShoppingCard: false,
        overviews: giveOverviewData(),
        id: giveItemsId(i),
      });
    }
  }
  return <h1>hello there</h1>;
}

function giveRandomData() {
  const colors = [
    "green",
    "blue",
    "red",
    "white",
    "black",
    "pink",
    "purple",
    "orange",
    "brown",
    "cyan",
    "yellow",
  ];
  const sizes = ["xl", "lg", "l", "m", "s", "xs"];
  const selectedSize = giveRandomSize(sizes);
  const data = [{ sizeName: "xl", colors: ["green", "red", "blue"] }];

  for (var i = 0; i < selectedSize.length; i++) {
    const selectedColor = giveRandomColor(colors);
    data.push({ sizeName: selectedSize[i], colors: selectedColor });
  }

  return data;
}

function giveRandomSize(arr) {
  const selectedSize = new Set();
  const howManySize = Math.floor(Math.random() * arr.length + 1);

  while (selectedSize.size !== howManySize) {
    const randomSizeNumber = Math.floor(Math.random() * arr.length);
    selectedSize.add(arr[randomSizeNumber]);
  }

  return [...selectedSize];
}

function giveRandomColor(arr) {
  const selectedColor = new Set();
  const howManyColor = Math.floor(Math.random() * arr.length + 1);

  while (selectedColor.size !== howManyColor) {
    const randomSizeNumber = Math.floor(Math.random() * arr.length);
    selectedColor.add(arr[randomSizeNumber]);
  }

  return [...selectedColor];
}

function giveDiscountData() {
  const itHasDiscount = Math.round(Math.random()) ? true : false;
  if (!itHasDiscount) {
    return {
      hasDiscount: false,
      discountValue: 0,
    };
  } else {
    const discountValue = Math.floor(Math.random() * 60) + 1;
    return {
      hasDiscount: true,
      discountValue: discountValue,
    };
  }
}

function giveScoreData() {
  const randomOnes = Math.floor(Math.random() * 5);
  const randomTenth = Math.floor(Math.random() * 9);

  return {
    ones: randomOnes,
    tenths: randomTenth,
  };
}

function giveSoldNumData() {
  const randomSoldNum = Math.floor(Math.random() * 1000) + 50;
  return randomSoldNum;
}

function giveOverviewData() {
  const overviews = {};
  const numOfOverviews = Math.floor(Math.random() * 10) + 2;
  overviews.number = numOfOverviews;
  overviews.overview = [];

  for (var i = 0; i < numOfOverviews; i++) {
    const randomMonthPast = Math.floor(Math.random() * 50) + 1;
    const randomOnes = Math.floor(Math.random() * 5);
    const randomTenth = Math.floor(Math.random() * 9);

    overviews.overview.push({
      userName: faker.name.fullName(),
      userOverview: faker.lorem.paragraph(),
      time: randomMonthPast,
      userGrade: {
        ones: randomOnes,
        tenths: randomTenth,
      },
    });
  }

  return overviews;
}

function giveItemsId(num) {
  return num.toString().padStart(7, "0");
}
