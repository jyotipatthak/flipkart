import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PiShoppingCartFill } from "react-icons/pi";
import { FaBars, FaTimes } from 'react-icons/fa';
import Search from '../ui/Searchbar';
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions';

const Navbar = () => {
  // State for managing the menu open/close state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Redux hooks for accessing state and dispatch
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const isAuthenticated = useSelector(state => state.isAuthenticated);

  // Function to handle logout
  const handleLogout = () => {
    dispatch(logout());
  };

  // Calculate the total number of items in the cart
  const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md p-2 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          {/* Button to toggle the menu */}
          <button
            className="md:hidden p-2 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {/* Conditional rendering of menu icon */}
            {isMenuOpen ? <FaTimes className="h-6 w-6 text-black" /> : <FaBars className="h-6 w-6 text-black" />}
          </button>
          {/* Logo link */}
          <Link to="/" className="md:hidden">
            <img src='/flip.jpg' className='h-14 w-20 py-2' alt='Logo' />
          </Link>
        </div>
        <div className="flex-1 flex gap-8 items-center justify-center">
          <Link to="/" className="hidden md:block">
            <img src='/flip.jpg' className='h-14 w-20 py-2' alt='Logo' />
          </Link>
          {/* Search component */}
          <Search className="w-full md:w-auto mx-4" />
        </div>
        <div className="flex items-center">
          {/* Menu items */}
          <div className={`flex-col md:flex-row items-center w-full md:w-auto gap-4 md:gap-8 ${isMenuOpen ? 'flex' : 'hidden'} md:flex`}>
            {/* Conditional rendering of login/logout button */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="py-2 px-4 text-md text-blue-950 hover:bg-blue-700 hover:text-white rounded flex items-center gap-2"
              >
                <img
                  src='https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg'
                  alt="Profile Icon"
                  className="h-6 w-6"
                />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="py-2 px-4 text-md text-blue-950 hover:bg-blue-700 hover:text-white rounded flex items-center gap-2"
              >
                <img
                  src='https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg'
                  alt="Profile Icon"
                  className="h-6 w-6"
                />
                Login
              </Link>
            )}
            {/* Cart link with total items count */}
            <div className="relative flex items-center gap-2">
              <Link to="/cart" className='flex items-center hover:text-blue-700'>
                <PiShoppingCartFill className='h-6 w-6 text-black' />
                <span className="ml-2">Cart</span>
                {totalItems > 0 && (
                  <span className='ml-2 text-red-700 rounded-full'>
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
            {/* Shop link */}
            <div className="relative flex items-center hover:bg-blue-700 hover:text-white py-2 px-4 rounded-lg">
              <Link to="/product">Shop</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
