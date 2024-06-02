import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

// Component for filtering products by price
const PriceFilter = ({ onFilter }) => {
  // State variables for minimum and maximum price range
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  // Function to handle slider change event
  const handleSliderChange = (value) => {
    setMinPrice(value[0]); // Update minimum price
    setMaxPrice(value[1]); // Update maximum price
  };

  // Function to handle change in minimum price input
  const handleMinPriceChange = (e) => {
    const newMinPrice = Number(e.target.value);
    setMinPrice(newMinPrice); // Update minimum price
    // Ensure that the maximum price is not less than the new minimum price
    setMaxPrice((prevMaxPrice) => Math.max(newMinPrice, prevMaxPrice));
  };

  // Function to handle change in maximum price input
  const handleMaxPriceChange = (e) => {
    const newMaxPrice = Number(e.target.value);
    setMaxPrice(newMaxPrice); // Update maximum price
    // Ensure that the minimum price is not greater than the new maximum price
    setMinPrice((prevMinPrice) => Math.min(prevMinPrice, newMaxPrice));
  };

  // Function to apply the price filter
  const handleApplyFilter = () => {
    onFilter(minPrice, maxPrice); // Pass filtered price range to parent component
  };

  // Render the PriceFilter component
  return (
    <div className="flex flex-col md:flex-row items-center px-4 p-2 bg-blue-950 text-white gap-4 rounded-xl shadow-lg w-full md:w-auto mx-4 md:mx-0">
      {/* Title for the price filter */}
      <h2 className="text-lg text-center md:text-left font-semibold"> Price</h2>
      {/* Slider for selecting price range */}
      <div className="w-full md:w-96 flex flex-col items-center">
        <Slider
          range
          min={0}
          max={1000}
          step={10}
          value={[minPrice, maxPrice]}
          onChange={handleSliderChange}
          trackStyle={[{ backgroundColor: '#2563eb' }]}
          handleStyle={[
            { borderColor: '#2563eb', backgroundColor: '#2563eb' },
            { borderColor: '#2563eb', backgroundColor: '#2563eb' }
          ]}
          railStyle={{ backgroundColor: '#3b82f6' }}
        />
      </div>
      {/* Inputs for manually entering minimum and maximum price */}
      <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-4">
        {/* Input for minimum price */}
        <div className="flex gap-2 items-center">
          <select
            id="min-price"
            value={minPrice}
            onChange={handleMinPriceChange}
            className="rounded-md text-black"
          >
            {/* Dropdown options for minimum price */}
            {[0, 50, 100, 200, 300, 500, 700, 1000].map((value) => (
              <option key={value} value={value}>
                {/* Display the selected value or '1000+' if maximum value is selected */}
                {value === 1000 ? `${value}+` : `${value}`}
              </option>
            ))}
          </select>
        </div>
        {/* Input for maximum price */}
        <div className="flex gap-2 items-center">
          <select
            id="max-price"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="rounded-md text-black"
          >
            {/* Dropdown options for maximum price */}
            {[50, 100, 200, 300, 500, 700, 1000].map((value) => (
              <option key={value} value={value}>
                {/* Display the selected value */}
                {value === 1000 ? `${value}` : `${value}`}
              </option>
            ))}
          </select>
        </div>
        {/* Button to apply the price filter */}
        <button
          onClick={handleApplyFilter}
          className="bg-blue-700 hover:bg-blue-800 text-white p-1 rounded-md text-sm"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default PriceFilter;
