import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "./redux/actions";

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-black">
          Close
        </button>
        <img
          className="w-full mb-4 h-60 object-cover rounded-lg"
          src={product.image}
          alt={product.title}
        />
        <h3 className="text-lg font-bold mb-2">{product.title}</h3>
        <p className="text-md font-bold mb-2">Price: ${product.price}</p>
      </div>
    </div>
  );
};

function Trending() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

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
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

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
                  {product.id in cart ? (
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
