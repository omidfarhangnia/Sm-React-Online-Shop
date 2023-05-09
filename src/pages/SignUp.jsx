import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiveData } from "../context/AuthContext";

const SignUp = () => {
  const { SignUp } = GiveData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    if (email === "" || password === "") {
      setStatus("emptyInput");
    } else if (password.length < 8) {
      setStatus("shortPassword");
    } else {
      setStatus("");
      SignUp(email, password);
      navigate("/");
    }
  }

  return (
    <>
      <h1 className="text-5xl select-none md:text-6xl lg:text-8xl text-center mb-[30px] uppercase font-bebasNeue tracking-[3px]">
        sign up
      </h1>
      <div className="max-w-[700px] w-[50%] min-w-[400px] p-[25px] bg-[#121212] rounded-lg mx-auto flex flex-col items-center">
        <input
          placeholder="email"
          value={email}
          onChange={(e) => {
            setStatus("");
            setEmail(e.target.value);
          }}
          type="email"
          className="w-full placeholder:text-white/50 focus-within:outline-none border-solid border-white/20 border-2 focus-within:border-white max-w-[500px] px-4 py-2 mt-5 bg-white/40 text-white rounded-sm text-[20px]"
        />
        {status === "emptyInput" && (
          <p className="w-full max-w-[500px] text-red-600 capitalize">
            please write your email.
          </p>
        )}
        {(status === "" || status === "shortPassword") && (
          <p className="w-full max-w-[500px] select-none opacity-0">
            text for fill size
          </p>
        )}
        <input
          placeholder="password"
          value={password}
          onChange={(e) => {
            setStatus("");
            setPassword(e.target.value);
          }}
          type="password"
          className="w-full placeholder:text-white/50 focus-within:outline-none border-solid border-white/20 border-2 focus-within:border-white max-w-[500px] px-4 py-2 mt-5 bg-white/40 text-white rounded-sm text-[20px]"
        />
        {status === "emptyInput" && (
          <p className="w-full max-w-[500px] text-red-600 capitalize">
            please write your password.
          </p>
        )}
        {status === "shortPassword" && (
          <p className="w-full max-w-[500px] text-red-600 capitalize">
            at least 8 characters long
          </p>
        )}
        {status === "" && (
          <p className="w-full max-w-[500px] select-none opacity-0">
            text for fill size
          </p>
        )}
        <div className="text-white flex items-center mt-5 gap-3 w-full max-w-[500px] select-none">
          <input
            type="checkbox"
            id="rememberMyAuth"
            className="w-[15px] h-[15px]"
          />
          <label
            htmlFor="rememberMyAuth"
            className="cursor-pointer capitalize font-spartan"
          >
            remember me.
          </label>
        </div>
        <button
          onClick={handleSubmit}
          className="w-[50%] max-w-[300px] my-5 text-3xl text-white bg-white/40 py-3 uppercase rounded-md"
        >
          sign up
        </button>
        <p className="text-white/50 w-full max-w-[500px] capitalize font-spartan">
          if you already have an account{" "}
          <Link
            to={"/SignUp"}
            className="bg-white/70 px-3 py-1 rounded-sm text-black font-bold"
          >
            sign in
          </Link>{" "}
          .
        </p>
      </div>
    </>
  );
};

export default SignUp;
