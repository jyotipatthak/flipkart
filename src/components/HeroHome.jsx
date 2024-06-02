import React, { useEffect, useState } from "react";
import ImageCarousel from "../filters/Carousel";
import Footer from "../ui/Footer";
import Disclaimer from "../ui/desc";
import Trending from "./shopNow";
import CategoryMenu from "../ui/CategoryMenu";
import CategoryProducts from "../filters/categoryProducts";

const HeroHome = () => {
  // State for storing categories data
  const [categories, setCategories] = useState([]);
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  // State for error handling
  const [error, setError] = useState(null);

  // Fetch categories data from API on component mount
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((json) => {
        // Set categories data and turn off loading indicator
        setCategories(json);
        setLoading(false);
      })
      .catch((err) => {
        // Handle errors and turn off loading indicator
        setError(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      {/* Display error message if an error occurred during fetching */}
      {error && <div className="text-red-500 text-center">Error: {error.message}</div>}
      {/* Render category menu */}
      <CategoryMenu />
      {/* Render image carousel */}
      <ImageCarousel />
      {/* Display loading indicator while fetching categories */}
      {loading ? (
        <div className="text-center text-lg">Loading...</div>
      ) : (
        // Render category products for each category
        categories.map((category) => <CategoryProducts key={category} category={category} />)
      )}
      {/* Render trending section */}
      <Trending />
      {/* Render disclaimer section */}
      <Disclaimer />
      {/* Render footer */}
      <Footer />
    </div>
  );
};

export default HeroHome;
