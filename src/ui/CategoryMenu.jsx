import React, { useState, useEffect } from 'react';

const CategoryMenu = () => {
  // State variables
  const [categories, setCategories] = useState([]); // Store categories
  const [openCategory, setOpenCategory] = useState(null); // Store index of opened category
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Detect mobile view

  // Hardcoded items for each category
  const items = {
    "electronics": ['Laptop', 'Smartphone', 'Headphones'],
    "jewelery": ['Necklace', 'Earrings', 'Bracelet'],
    "men's clothing": ['Shirt', 'Pants', 'Jacket'],
    "women's clothing": ['Dress', 'Skirt', 'Blouse']
  };

  // Hardcoded category logos
  const categoryLogos = {
    "electronics": "th.jpg",
    "jewelery": "jwellery.png",
    "men's clothing": "mens.png",
    "women's clothing": "women.jpg"
  };

  // Fetch categories from API and handle window resize
  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(json => {
        setCategories(json);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Loading and error handling
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Render category menu
  return (
    <div className="flex justify-around  sm:mt-20 lg:mt-16 p-2">
      {categories.map((category, index) => (
        <div key={index} className="relative">
          {/* Button to toggle category dropdown */}
          <button
            onClick={() => setOpenCategory(openCategory === index ? null : index)}
            className="flex flex-col items-center p-2 hover:bg-gray-200 rounded"
          >
            <img src={categoryLogos[category]} alt={category} className="w-20 h-20 mb-1" />
            <span>{category}</span>
          </button>
          {/* Dropdown for each category */}
          {openCategory === index && (
            <div
              className={`absolute top-full mt-2 p-2 bg-white border rounded shadow-lg ${isMobile ? 'w-full' : 'w-40'}`}
              style={{ zIndex: 1000 }}
            >
              <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 '} p-2`}>
                {(items[category] || []).map((item, itemIndex) => (
                  <div key={itemIndex} className="p-2 hover:bg-gray-100 text-center">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryMenu;
