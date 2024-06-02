import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";

const Search = ({ onSearch }) => {
  // State to store the search input value
  const [searchInput, setSearchInput] = useState("");

  // Handler function to update search input state
  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Handler function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Pass the search input value to the parent component
    onSearch(searchInput);
  };

  return (
    // Search form
    <form onSubmit={handleSubmit} className="relative w-full md:w-96 lg:w-[32rem]">
      {/* Search icon */}
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
        <FaSearch className="h-5 w-5" />
      </span>
      {/* Input field */}
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
