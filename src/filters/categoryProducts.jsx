import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart, updateItemQuantityInCart } from '../redux/actions';
import { FaTrash } from 'react-icons/fa';

const CategoryProducts = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Keep track of the current product index

  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  // Function to handle adding a product to the cart
  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
  };
  
  // Function to handle removing a product from the cart
  const handleRemoveFromCart = (productId) => {
    dispatch(removeItemFromCart(productId));
  };

  // Function to handle updating the quantity of a product in the cart
  const handleUpdateQuantityCart = (productId, quantity) => {
    dispatch(updateItemQuantityInCart(productId, quantity));
  };

  // Fetch products from the API when the component mounts or the category changes
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(json => {
        setProducts(json);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [category]);

  // Function to handle showing the next set of products
  const handleNextProduct = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, products.length - 1));
  };

  // Function to handle showing the previous set of products
  const handlePrevProduct = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-lg text-red-500">Error: {error.message}</div>;

  const selectedProducts = products.slice(currentIndex, currentIndex + 4);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-semibold p-4 underline text-blue-900">
          Trending {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
        </h1>
        <div className="flex gap-2 items-center">
          <button 
            onClick={handlePrevProduct} 
            className={`sm:text-3xl font-bold border-2 rounded-full border-blue-700 px-2 pb-1 ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentIndex === 0}
          >
            &lt;
          </button>
          <button 
            onClick={handleNextProduct} 
            className={`sm:text-3xl font-bold rounded-full border-2 pb-1 border-blue-700 px-2 ${currentIndex + 4 >= products.length ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentIndex + 4 >= products.length}
          >
            &gt;
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {selectedProducts.map(product => (
          <div key={product.id} className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-4 rounded-lg" />
            <h2 className="text-lg font-semibold mb-2 text-gray-800">{product.title}</h2>
            <div className="flex gap-8">
              <p className="text-xl font-bold text-indigo-600">${product.price}</p>
              {product.id in cart ? (
                <div className="flex items-center space-x-2">
                  {cart[product.id].quantity === 1 ? (
                    <button 
                      onClick={() => handleRemoveFromCart(product.id)} 
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded-full transition-colors duration-300"
                    >
                      <FaTrash className="text-white" />
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleUpdateQuantityCart(product.id, cart[product.id].quantity - 1)} 
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded-full transition-colors duration-300"
                    >
                      -1
                    </button>
                  )}
                  <input 
                    id="quantity-input" 
                    type="number" 
                    min={0} 
                    value={cart[product.id].quantity} 
                    onChange={(e) => handleUpdateQuantityCart(product.id, parseInt(e.target.value, 10))}
                    className="text-center border border-gray-300 rounded py-2 px-4 w-16" 
                  />
                  <button 
                    onClick={() => handleUpdateQuantityCart(product.id, cart[product.id].quantity + 1)} 
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-full transition-colors duration-300"
                  >
                    +1
                  </button>
                </div>
              ) : (
                <button 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-1 px-4 rounded-lg transition-colors duration-300" 
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
