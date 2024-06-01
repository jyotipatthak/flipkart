import React, { useEffect, useState } from "react";
import ImageCarousel from "./Carousel";
import Footer from "./Footer";
import Disclaimer from "./desc";
import Trending from "./trending";
import CategoryProducts from "./categoryProducts";
import CategoryMenu from "./CategoryMenu";

const HeroHome = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((json) => {
        setCategories(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      {error && <div className="text-red-500 text-center">Error: {error.message}</div>}
      <CategoryMenu />
      <ImageCarousel />
      {loading ? (
        <div className="text-center text-lg">Loading...</div>
      ) : (
        categories.map((category) => <CategoryProducts key={category} category={category} />)
      )}
      <Trending />
      <Disclaimer />
      <Footer />
    </div>
  );
};

export default HeroHome;
