import { Route, Routes, json } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AuthContextProvider from "./context/AuthContext";
import { useEffect } from "react";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  useEffect(() => {
    const q = query(collection(db, "items"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log(querySnapshot)
      //       querySnapshot.forEach((doc) => {
      // console.log(doc)
      // });
    });
    return () => unsubscribe();
  }, []);
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
