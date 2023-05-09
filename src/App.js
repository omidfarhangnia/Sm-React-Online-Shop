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

function App() {
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
