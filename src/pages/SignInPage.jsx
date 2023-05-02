import React from "react";
import { Link } from "react-router-dom";

const SignInPage = () => {
  return (
    <>
      <h1 className="text-5xl select-none md:text-6xl lg:text-8xl text-center mb-[30px] uppercase font-bebasNeue tracking-[3px]">sign in</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="max-w-[700px] w-[50%] min-w-[400px] p-[25px] bg-[#121212] rounded-lg mx-auto flex-col"
      >
        <input placeholder="email" type="email" className="w-full placeholder:text-white/50 focus-within:outline-none border-solid border-white/20 border-2 focus-within:border-white max-w-[500px] px-4 py-2 my-5 bg-white/40 text-white rounded-sm text-[20px]"/>
        <input placeholder="password" type="password" className="w-full placeholder:text-white/50 focus-within:outline-none border-solid border-white/20 border-2 focus-within:border-white max-w-[500px] px-4 py-2 my-5 bg-white/40 text-white rounded-sm text-[20px]"/>
        <div>
          <input type="checkbox" id="rememberMyAuth" />
          <label htmlFor="rememberMyAuth">remember me</label>
        </div>
        <input type="submit" value={"sign in"} />
        <p>
          if you are new user please <Link to={"/SignUpPage"}>sign up</Link>
          first
        </p>
      </form>
    </>
  );
};

export default SignInPage;
