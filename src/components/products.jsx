import React, { useEffect, useState } from 'react';
import PriceFilter from '../filters/pricefilter';
import Search from '../ui/Searchbar';
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart,removeItemFromCart } from '../redux/actions';
import Footer from '../ui/Footer';
import ProductModal from '../filters/ProductModal';


function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const fetchProducts = async (category = null, title = "") => {
    try {
      setIsLoading(true);
      let url = 'https://fakestoreapi.com/products';
      if (category) {
        url = `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`;
      } else if (title) {
        url = `https://fakestoreapi.com/products?title=${title}`;
      }
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products/categories');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(prevCategory => prevCategory === category ? null : category);
  };

  const handleSearch = (title) => {
    const filtered = products.filter(product => product.title.toLowerCase().includes(title.toLowerCase()));
    setFilteredProducts(filtered);
  };

  const handlePriceFilter = (minPrice, maxPrice) => {
    const filtered = products.filter(product => {
      const price = product.price;
      return (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice);
    });
    setFilteredProducts(filtered);
  };

  const handleImageClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeItemFromCart(productId));
  };

  return (
    <div className="min-h-screen flex flex-col  mt-20">
     <nav className="bg-blue-700 text-white py-2">
  <div className="container mx-auto flex justify-center md:justify-center">
    <div className="flex gap-4 overflow-x-auto p-1 md:p-0">
      {categories.map((category, index) => (
        <div key={index} className="flex-shrink-0">
          <p
            className={`text-lg  cursor-pointer px-4 rounded-lg transition-colors ${
              category === selectedCategory ? 'bg-[#1a2259] text-white' : 'bg-white text-blue-700 hover:bg-blue-200'
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </p>
        </div>
      ))}
    </div>
  </div>
</nav>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mt-4 px-4">
        <PriceFilter onFilter={handlePriceFilter} />
        <Search onSearch={handleSearch} />
        <div className="flex ml-4 mt-4 md:mt-0 text-2xl text-blue-900 space-x-4">
          <a href="https://github.com" className="hover:text-blue-600"><FaGithub /></a>
          <a href="https://instagram.com" className="hover:text-blue-600"><FaInstagram /></a>
          <a href="https://linkedin.com" className="hover:text-blue-600"><FaLinkedin /></a>
        </div>
      </div>
      <div className="flex flex-wrap justify-center mt-6 gap-6 px-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
              <div className="bg-white border rounded-lg shadow-lg p-4 flex flex-col items-center">
                <img
                  className="w-full h-60 object-cover mb-4 rounded cursor-pointer"
                  src={product.image}
                  alt={product.title}
                  onClick={() => handleImageClick(product)}
                />
                <h3 className="text-md font-bold text-gray-800 mb-2">{product.title}</h3>
                <p className="text-lg font-semibold text-gray-900 mb-4">Price: ${product.price}</p>
                {product.id in cart ? (
                  <button
                    className="bg-blue-900 text-white px-4 py-1 rounded-lg hover:bg-blue-900 transition"
                    onClick={() => handleRemoveFromCart(product.id)}
                  >
                    Remove Item
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {isModalOpen && <ProductModal product={selectedProduct} onClose={handleCloseModal} />}
      <Footer className="mt-auto" />
    </div>
  );
}

export default Product;
