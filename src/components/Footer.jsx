import React from "react";
import { FaFacebook, FaPinterest, FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { BsTelephone, BsClock } from "react-icons/bs";
import { RiMapPin2Line } from "react-icons/ri";
import StripeImage from "../images/Stripe_x42.png";
import AESImage from "../images/AES256_x42.png";
import PayPalImage from "../images/paypal_2_x42.png";
import VisaImage from "../images/visa_x42.png";
import MasterCardImage from "../images/mastercard_x42.png";
import DiscoverImage from "../images/discover_x42.png";
import AmericanExpressImage from "../images/american-express_x42.png";

const Footer = () => {
  return (
    <footer className="mt-10">
      <div className="bg-[#121212] py-10 px-4 md:flex md:items-center md:justify-between md:py-15 md:px-20">
        <div className="flex flex-col lg:flex-row lg:gap-16 lg:items-center lg:w-[70%]">
          <label
            htmlFor="footerInTouch"
            className="text-white text-3xl text-center font-bebasNeue lg:text-4xl"
          >
            be in touch with us
          </label>
          <input
            id="footerInTouch"
            className="bg-white/20 lg:w-[50%] p-3 border-solid border-2 border-white/20 text-2xl my-5 text-white focus-within:outline-none focus-within:border-white placeholder:text-white/50"
            placeholder="Enter your email"
          />
        </div>
        <nav>
          <ul className="flex justify-center text-white gap-6 lg:gap-6">
            <li>
              <a href="#">
                <FaFacebook size={25} className="fill-white" />
              </a>
            </li>
            <li>
              <a href="#">
                <FaTwitter size={25} className="fill-white" />
              </a>
            </li>
            <li>
              <a href="#">
                <RiInstagramFill size={25} className="fill-white" />
              </a>
            </li>
            <li>
              <a href="#">
                <FaPinterest size={25} className="fill-white" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex flex-wrap justify-between p-5 lg:px-14 lg:py-10">
        <div className="flex flex-col min-w-[300px] w-[25%] max-w-[400px] mt-5">
          <h6 className="font-bebasNeue uppercase text-3xl tracking-[6px]">
            Categories
          </h6>
          <ul className="my-3">
            <li>
              <Link
                to="/"
                className="font-openSans text-black/60 capitalize text-[15px] md:text-[17px] my-2 inline-block"
              >
                women
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="font-openSans text-black/60 capitalize text-[15px] md:text-[17px] my-2 inline-block"
              >
                men
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="font-openSans text-black/60 capitalize text-[15px] md:text-[17px] my-2 inline-block"
              >
                Children
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col min-w-[300px] w-[25%] max-w-[400px] mt-5">
          <h6 className="font-bebasNeue uppercase text-3xl tracking-[6px]">
            information
          </h6>
          <ul className="my-3">
            <li>
              <a
                href="#"
                className="font-openSans text-black/60 capitalize text-[15px] md:text-[17px] my-2 inline-block"
              >
                about us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-openSans text-black/60 capitalize text-[15px] md:text-[17px] my-2 inline-block"
              >
                contact us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-openSans text-black/60 capitalize text-[15px] md:text-[17px] my-2 inline-block"
              >
                blog
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-openSans text-black/60 capitalize text-[15px] md:text-[17px] my-2 inline-block"
              >
                FAQs
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col min-w-[300px] w-[25%] max-w-[400px] mt-5">
          <h6 className="font-bebasNeue uppercase text-3xl tracking-[6px]">
            useful links
          </h6>
          <ul className="my-3">
            <li>
              <a
                href="#"
                className="font-openSans text-black/60 capitalize text-[15px] md:text-[17px] my-2 inline-block"
              >
                terms & conditions
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-openSans text-black/60 capitalize text-[15px] md:text-[17px] my-2 inline-block"
              >
                returns & exchange
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-openSans text-black/60 capitalize text-[15px] md:text-[17px] my-2 inline-block"
              >
                shipping & delivery
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-openSans text-black/60 capitalize text-[15px] md:text-[17px] my-2 inline-block"
              >
                privacy policy
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col min-w-[300px] w-[25%] max-w-[400px] mt-5">
          <h6 className="font-bebasNeue uppercase text-3xl tracking-[6px]">
            contact us
          </h6>
          <ul className="my-3">
            <li className="flex items-center gap-2">
              <RiMapPin2Line size={21} />
              <a
                href="#"
                className="font-openSans text-black/60 capitalize text-[15px] md:text-[17px] my-2 inline-block"
              >
                somewhere in the milky way
              </a>
            </li>
            <li className="flex items-center gap-2">
              <BsTelephone size={21} />
              <a
                href="#"
                className="font-openSans text-black/60 capitalize text-[15px] md:text-[17px] my-2 inline-block"
              >
                +38 (050) 12 34 567
              </a>
            </li>
            <li className="flex items-center gap-2">
              <BsClock size={21} />
              <a
                href="#"
                className="font-openSans text-black/60 capitalize text-[15px] md:text-[17px] my-2 inline-block"
              >
                All week 24/7
              </a>
            </li>
            <li className="flex items-center gap-2">
              <HiOutlineMail size={21} />
              <a
                href="#"
                className="font-openSans text-black/60 capitalize text-[15px] md:text-[17px] my-2 inline-block"
              >
                random@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-5 p-5 bg-black/10">
        <p className="w-full lg:w-[20%] text-center">
          Copyright © 2032 all rights reserved
        </p>
        <div className="flex w-full lg:w-[50%] justify-around">
          <img
            className="max-w-[60px] object-contain"
            src={AESImage}
            alt="AES logo image"
          />
          <img
            className="max-w-[60px] object-contain"
            src={StripeImage}
            alt="stripe logo image"
          />
          <img
            className="max-w-[60px] object-contain"
            src={PayPalImage}
            alt="paypal logo image"
          />
          <img
            className="max-w-[60px] object-contain"
            src={VisaImage}
            alt="visa logo image"
          />
          <img
            className="max-w-[60px] object-contain"
            src={MasterCardImage}
            alt="master card logo image"
          />
          <img
            className="max-w-[60px] object-contain"
            src={DiscoverImage}
            alt="discover logo image"
          />
          <img
            className="max-w-[60px] object-contain"
            src={AmericanExpressImage}
            alt="american express logo image"
          />
        </div>
        <a href="#" className="inline-block mx-auto lg:20% lg:mx-0">
          Developed By Omid Farhangnia
        </a>
      </div>
    </footer>
  );
};

export default Footer;
