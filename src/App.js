import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AuthContextProvider from "./context/AuthContext";
import Women from "./pages/Women";
import MenPage from "./pages/Men";
import Baby from "./pages/Baby";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ShoppingCartPage from "./pages/ShoppingCart";
import Account from "./pages/Account";
import ProtectedRoute from "./components/ProtectedRoute";
import SelectedItem from "./pages/Item";
import { faker } from "@faker-js/faker";

function App() {
  const createdItem = [];

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
      data.push({ size: selectedSize[i], color: selectedColor });
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

  for (var i = 0; i < 91; i++) {
    if (i <= 30 && i > 0) {
      createdItem.push({
        category: "men",
        availableNum: faker.random.numeric(),
        sizeAndColor: giveRandomData(),
        imgPath: "",
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
        isInShoppingCart: false,
        overviews: giveOverviewData(),
      });
    } else if (i >= 30 && i < 60) {
      createdItem.push({
        category: "women",
        availableNum: faker.random.numeric(),
        sizeAndColor: giveRandomData(),
        imgPath: "",
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
        isInShoppingCart: false,
        overviews: giveOverviewData(),
      });
    } else if (i >= 60) {
      createdItem.push({
        category: "children",
        availableNum: faker.random.numeric(),
        sizeAndColor: giveRandomData(),
        imgPath: "",
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
        isInShoppingCart: false,
        overviews: giveOverviewData(),
      });
    }
  }

  // you should add an speciefic id for every item think about it
  console.log(createdItem)

  return (
    <>
      <AuthContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Women" element={<Women />} />
          <Route path="/MenPage" element={<MenPage />} />
          <Route path="/Baby" element={<Baby />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/ShoppingCartPage" element={<ShoppingCartPage />} />
          <Route path="/Item" element={<SelectedItem />} />
          <Route
            path="/Account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </AuthContextProvider>
    </>
  );
}

export default App;
