import { Route, Routes, json } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AuthContextProvider from "./context/AuthContext";
import WomenPage from "./pages/WomenPage";
import MenPage from "./pages/MenPage";
import BabyPage from "./pages/BabyPage";

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
        </Routes>
        <Footer />
      </AuthContextProvider>
    </>
  );
}

export default App;
