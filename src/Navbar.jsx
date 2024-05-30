import React from 'react';
import { useSelector } from 'react-redux';
import { PiShoppingCartFill } from "react-icons/pi";
import Search from './Searchbar';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const cart = useSelector(state => state.cart);

  const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed top-0 w-full flex flex-col md:flex-row  h-16 gap-8 bg-white shadow-md p-4 z-10">
      <div className="flex items-center justify-center ml-40 w-full gap-4 md:w-auto ">
        <div className="p-2">
          <Link to="/"> <img src='./src/assets/flip.jpg' className='h-14 w-20 py-2' alt='Logo' /></Link>
        </div>
        <Search className="w-full md:w-auto " />
      </div>
      <div className="flex mr-26 items-center justify-center w-full md:w-auto gap-12 mt-4 md:mt-0">
        <Link to="/signup" className="py-2 pr-4 text-md text-blue-950 px-4 gap-2 hover:border-none flex items-center rounded hover:bg-blue-700 hover:text-white">
          <img src='https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg' alt="Profile Icon" className="h-6 w-6" /> Login
        </Link>
        <div className="relative text-lg flex items-center gap-2">
          <Link to="/cart" className='flex items-center'>
            <PiShoppingCartFill className='h-6 w-6 text-black ' />
            Cart
            <span className='ml-2 mb-4 text-red-700 rounded-full'>
              {totalItems}
            </span>
          </Link>
        </div>
        <div className="relative text-lg hover:bg-blue-700 py-1 px-4 hover:text-white rounded-lg flex items-center ml-10 gap-2">
          <Link to="/product">Shop</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
