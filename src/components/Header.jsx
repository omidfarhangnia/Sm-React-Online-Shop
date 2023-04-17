import React from "react";
import Navbar from "./Navbar";
import { BsFillTelephoneFill } from "react-icons/bs";
import {
  FaFacebook,
  FaMapMarkerAlt,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";
import { BsClockFill } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";

const Header = () => {
  return (
    <header className="font-spartan">
      <TopNav />
      <Navbar />
    </header>
  );
};

const TopNav = () => {
  return (
    <nav className="bg-black/90 flex px-[10vw] py-3 hidden md:flex justify-between items-center">
      <div className="flex gap-4">
        <div className="flex items-center text-white">
          <BsFillTelephoneFill className="mr-1" /> +00 (000) 00 00 000
        </div>
        <div className="flex items-center text-white">
          <FaMapMarkerAlt className="mr-1" />
          Iran, Tehran
        </div>
        <div className="flex items-center text-white">
          <BsClockFill className="mr-1" />
          All week 24/7
        </div>
      </div>
      <div className="flex text-white gap-3 lg:gap-6">
        <a href="#">
          <FaFacebook size={20} />
        </a>
        <a href="#">
          <FaTwitter size={20} />
        </a>
        <a href="#">
          <RiInstagramFill size={20} />
        </a>
        <a href="#">
          <FaPinterest size={20} />
        </a>
      </div>
    </nav>
  );
};
export default Header;
