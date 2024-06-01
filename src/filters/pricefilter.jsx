import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const PriceFilter = ({ onFilter }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const handleSliderChange = (value) => {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  };

  const handleMinPriceChange = (e) => {
    const newMinPrice = Number(e.target.value);
    setMinPrice(newMinPrice);
    setMaxPrice((prevMaxPrice) => Math.max(newMinPrice, prevMaxPrice));
  };

  const handleMaxPriceChange = (e) => {
    const newMaxPrice = Number(e.target.value);
    setMaxPrice(newMaxPrice);
    setMinPrice((prevMinPrice) => Math.min(prevMinPrice, newMaxPrice));
  };

  const handleApplyFilter = () => {
    onFilter(minPrice, maxPrice);
  };

  return (
    <div className="flex flex-col md:flex-row items-center px-4 py-2 bg-blue-950 text-white gap-4 rounded-xl shadow-lg w-full md:w-auto mx-4 md:mx-0">
      <h2 className="text-xl text-center md:text-left p-2 font-semibold">Filter by Price</h2>
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
      <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-4">
        <div className="flex gap-2 items-center">
          <label htmlFor="min-price" className="mr-2">Min Price:</label>
          <select
            id="min-price"
            value={minPrice}
            onChange={handleMinPriceChange}
            className="p-2 rounded-md text-black"
          >
            {[0, 50, 100, 200, 300, 500, 700, 1000].map((value) => (
              <option key={value} value={value}>
                {value === 1000 ? `${value}+` : `${value}`}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="max-price" className="mr-2">Max Price:</label>
          <select
            id="max-price"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="p-2 rounded-md text-black"
          >
            {[50, 100, 200, 300, 500, 700, 1000].map((value) => (
              <option key={value} value={value}>
                {value === 1000 ? `${value}` : `${value}`}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleApplyFilter}
          className="bg-blue-700 hover:bg-blue-800 text-white p-2 rounded-md"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default PriceFilter;
