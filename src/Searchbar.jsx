import React, { useState, useEffect } from 'react';

import { FaSearch } from "react-icons/fa";

const placeholders = ["'products'", "'electronics'", "'fashion'"];

const Search = () => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 2000); // Change placeholder every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="relative w-full  md:w-96 lg:w-[32rem]">
    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
      <FaSearch className="h-5 w-5" />
    </span>
    <input
      type="text"
      className="pl-10 pr-4 py-2  border-blue-900 border-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      placeholder={`search: ${placeholders[placeholderIndex]}`}
    />
  </div>
  );
};
export default Search;