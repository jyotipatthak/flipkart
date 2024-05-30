import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Search from './Searchbar';

const PriceFilter = ({ onFilter }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(25000);

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
    <div className="flex  w-full bg-blue-950 text-white gap-10 rounded-xl ">
      <h2 className="text-xl flex  text-center  p-4">Price</h2>
      <div className="mt-6 w-96  flex">
        <Slider
          range
          min={0}
          max={1000}
          step={10}
          value={[minPrice, maxPrice]}
          onChange={handleSliderChange}
          className="text-blue-700"
        />
      </div>
      <div className="flex items-center  m-4">
        <select
          value={minPrice}
          onChange={handleMinPriceChange}
          className="p-2 rounded-md text-black"
        >
          {[0, 10, 100, 300, 400, 1000].map((value) => (
            <option key={value} value={value}>
              {value === 1000 ? `${value}+` : `${value}`}
            </option>
          ))}
        </select>
        <span className="mx-2">to</span>
        <select
          value={maxPrice}
          onChange={handleMaxPriceChange}
          className="p-2 rounded-md text-black"
        >
          {[50, 200, 300, 500, 1000].map((value) => (
            <option key={value} value={value}>
              {value === 1000 ? `${value}` : `${value}`}
            </option>
          ))}
        </select>
        <button
          onClick={handleApplyFilter}
          className="bg-blue-700 hover:bg-blue-800 text-white p-2 rounded-md ml-4"
        >
          Apply
        </button>
        
      </div>
    </div>
  );
};

export default PriceFilter;
