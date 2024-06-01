import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";

const Search = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchInput);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full md:w-96 lg:w-[32rem]">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
        <FaSearch className="h-5 w-5" />
      </span>
      <input
        type="text"
        className="pl-10  py-1 border-blue-900 border-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        placeholder="Search products..."
        value={searchInput}
        onChange={handleChange}
      />
    </form>
  );
};

export default Search;
