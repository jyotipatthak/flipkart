import React, { useState, useEffect } from 'react';

const CategoryMenu = () => {
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const items = {
    "electronics": ['Laptop', 'Smartphone', 'Headphones'],
    "jewelery": ['Necklace', 'Earrings', 'Bracelet'],
    "men's clothing": ['Shirt', 'Pants', 'Jacket'],
    "women's clothing": ['Dress', 'Skirt', 'Blouse']
  };

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
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex justify-around mt-16 p-2">
      {categories.map((category, index) => (
        <div key={index} className="relative">
          <button
            onClick={() => setOpenCategory(openCategory === index ? null : index)}
            className="flex flex-col items-center p-2 hover:bg-gray-200 rounded"
          >
            <span>{category}</span>
          </button>
          {openCategory === index && (
            <div
              className="absolute top-full mt-2 p-2 w-40 bg-white border rounded shadow-lg z-10"
              style={{ zIndex: 1000 }}
            >
              {(items[category] || []).map((item, itemIndex) => (
                <div key={itemIndex} className="p-2 hover:bg-gray-100">
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryMenu;
