import React, { useEffect, useState } from 'react';
import PriceFilter from '../filters/pricefilter';
import Search from '../ui/Searchbar';
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart,removeItemFromCart } from '../redux/actions';
import Footer from '../ui/Footer';

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full relative shadow-lg">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-gray-800">✖</button>
        <img className="w-full h-64 object-cover mb-4 rounded-lg" src={product.image} alt={product.title} />
        <h3 className="text-2xl font-bold mb-3">{product.title}</h3>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-xl font-semibold mb-4">Price: ${product.price}</p>
      </div>
    </div>
  );
};

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
    <div className="min-h-screen flex flex-col mt-20">
      <nav className="bg-blue-700 text-white py-2">
        <div className="flex justify-center overflow-x-auto p-2 space-x-4">
          {categories.map((category, index) => (
            <div key={index} className="flex-shrink-0">
              <p
                className={`text-lg font-semibold cursor-pointer px-4  rounded-lg transition-colors ${
                  category === selectedCategory ? 'bg-[#1a2259] text-white' : 'bg-white text-blue-700 hover:bg-blue-200'
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </p>
            </div>
          ))}
        </div>
      </nav>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mt-4 px-4">
        <PriceFilter onFilter={handlePriceFilter} />
        <Search onSearch={handleSearch} />
       
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
