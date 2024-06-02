import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../redux/actions";
import ProductModal from "../filters/ProductModal";

function Trending() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Fetch trending products on component mount
  useEffect(() => {
    fetch(
      "https://fakestoreapi.com/products/category/women%27s%20clothing?limit=4"
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((json) => {
        setProducts(json);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
      });
  }, []);

  // Handler for opening product modal
  const handleImageClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Handler for closing product modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Handler for adding product to cart
  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
  };

  // Handler for removing product from cart
  const handleRemoveFromCart = (productId) => {
    dispatch(removeItemFromCart(productId));
  };

  // Convert cart object to an array of values
  const cartItems = Object.values(cart);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-left p-2 text-green-900 underline mb-6">
        Shop Now
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-36 object-cover mb-4 rounded-lg cursor-pointer"
                onClick={() => handleImageClick(product)}
              />
              <div className="flex flex-col flex-grow justify-between">
                <h2 className="text-md font-semibold mb-2">{product.title}</h2>
                <div className="flex justify-between items-center mt-auto">
                  <p className="text-xl font-semibold">${product.price}</p>
                  {cartItems.some(item => item.product.id === product.id) ? (
                    <button
                      className="hover:bg-red-600 bg-red-500 text-white font-semibold py-1 px-4 rounded-lg transition-colors duration-300"
                      onClick={() => handleRemoveFromCart(product.id)}
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      className="hover:bg-green-600 bg-green-500 text-white font-semibold py-1 px-4 rounded-lg transition-colors duration-300"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img
              src="/wp.webp"
              alt="Banner 1"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img
              src="/shop.webp"
              alt="Banner 2"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default Trending;
