import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AuthContextProvider from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </AuthContextProvider>
    </>
  );
}

export default App;
