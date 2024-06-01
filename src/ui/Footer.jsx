import React from 'react';
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="text-sm py-8 px-10 bg-slate-950 w-full">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-8">
            <div className="w-full md:w-1/4 px-4 mb-8 md:mb-0">
              <div className="flex">
                <img src='/flip.jpg' alt='error' className='h-10 w-20'></img>
              </div>
              
              <p className="text-white text-left w-[90%]">
                India's biggest online marketplace for products
              </p>
              <div className="flex space-x-4 mt-12">
                <a href="#" className="text-cyan-400  text-2xl">
                  <FaGithub />
                </a>
                <a href="#" className="text-cyan-400  text-2xl">
                  <FaInstagram />
                </a>
                <a href="www.linkedin.com/injyoti-pathak-5648712a6" className="text-cyan-400  text-2xl">
                  <FaLinkedin />
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/4 px-4 mb-8 md:mb-0">
              <h5 className="text-lg font-bold gap-12 text-cyan-400  mb-4">About</h5>
              <ul className="space-y-6">
                <li><a href="#" className="text-white  hover:text-blue-600">About us</a></li>
                <li><a href="#" className="text-white  hover:text-blue-600">Contact us</a></li>
                <li><a href="#" className="text-white  hover:text-blue-600">FAQ</a></li>
                <li><a href="#" className="text-white  hover:text-blue-600">Careers</a></li>
                <li><a href="#" className="text-white  hover:text-blue-600">Investor Relations</a></li>
                <li><a href="#" className="text-white  hover:text-blue-600">Suppliers Relations</a></li>
                <li><a href="#" className="text-white  hover:text-blue-600">Discovery Points</a></li>
                <li><a href="#" className="text-white  hover:text-blue-600">Become a Vendor</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 px-4 mb-8 md:mb-0">
              <h5 className="text-lg font-bold text-cyan-400 mb-4">Policy</h5>
              <ul className="space-y-6">
                <li><a href="#" className="text-white  hover:text-blue-600">Return Policy</a></li>
                <li><a href="#" className="text-white  hover:text-blue-600">Privacy Policy</a></li>
                <li><a href="#" className="text-white  hover:text-blue-600">Disclaimer</a></li>
                <li><a href="#" className="text-white  hover:text-blue-600">Terms of Use</a></li>
                <li><a href="#" className="text-white  hover:text-blue-600">Buyers Policy</a></li>
                <li><a href="#" className="text-white  hover:text-blue-600">Sellers Policy</a></li>
                <li><a href="#" className="text-white  hover:text-blue-600">Anti-corruption Policy</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 px-4 mb-8 md:mb-0">
              <h5 className="text-lg font-bold text-cyan-400 mb-4">Useful links</h5>
              <ul className="space-y-6">
                <li><a href="#" className="text-white  hover:text-blue-600">Articles</a></li>
                <li><a href="#" className="text-white  hover:text-blue-600">Brands</a></li>
                <li><a href="#" className="text-white  hover:text-blue-600">Catalogues</a></li>
                <li><a href="#" className="text-white  hover:text-blue-600">Car Makers</a></li>
                <li><a href="#" className="text-white  hover:text-blue-600">Sitemap</a></li>
                <li><a href="#" className="text-white  hover:text-blue-600">Sitemap2</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <div className="flex flex-wrap mt-12 items-center justify-center">
        <div className="text-black  text-center w-full md:w-auto text-xs md:mb-0">
          © 2015-2024 Smart Parts Online Pvt. Ltd. (v7.0.9 build 240513.1623)
        </div>
      </div>
    </>
  );
};

export default Footer;
