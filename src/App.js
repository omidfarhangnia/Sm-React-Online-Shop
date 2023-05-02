import { Route, Routes, json } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AuthContextProvider from "./context/AuthContext";
import WomenPage from "./pages/WomenPage";
import MenPage from "./pages/MenPage";
import BabyPage from "./pages/BabyPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/WomenPage" element={<WomenPage />} />
          <Route path="/MenPage" element={<MenPage />} />
          <Route path="/BabyPage" element={<BabyPage />} />
          <Route path="/SignInPage" element={<SignInPage />} />
          <Route path="/SignUpPage" element={<SignUpPage />} />
        </Routes>
        <Footer />
      </AuthContextProvider>
    </>
  );
}

export default App;
