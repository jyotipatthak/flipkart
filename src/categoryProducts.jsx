import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart, updateItemQuantityInCart } from './redux/actions';
import { FaTrash } from 'react-icons/fa';


const CategoryProducts = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
  }
  const handleRemoveFromCart = (productId) => {
    dispatch(removeItemFromCart(productId));
  }

  const handleUpdateQuantityCart = (productId, quantity) => {
    dispatch(updateItemQuantityInCart(productId, quantity));
  }

  const showElements = 4;

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
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1 className='text-2xl font-semibold p-2 underline text-blue-950'>Trending {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">

        {products.map((product, index) => index < showElements ? (
          <div key={product.id} className="border p-4 rounded shadow">
            <img src={product.image} alt={product.title} className="w-full h-60 object-cover mb-4" />
            <h2 className="text-sm ">{product.title}</h2>

            <p className="text-xl flex font-semibold mt-2">${product.price}</p>
            {
              product.id in cart ?
                <div className="flex items-center space-x-2">
                  {
                    cart[product.id].quantity === 1 ?
                    <button onClick={() => handleRemoveFromCart(product.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded">
                      <FaTrash className='text-white'/>
                    </button>
                    :
                    <button onClick={() => handleUpdateQuantityCart(product.id, cart[product.id].quantity - 1)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">
                      -1
                    </button>
                  }

                  <input id="quantity-input" type="number" min={0} value={cart[product.id].quantity} onChange={(e) => handleUpdateQuantityCart(product.id, e.target.value)}
                    className="text-center border border-gray-300 rounded py-2 px-4 w-16" />

                  <button onClick={() => handleUpdateQuantityCart(product.id, cart[product.id].quantity + 1)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                    +1
                  </button>
                </div>

                :
                <button className="hover:bg-black bg-[#1d1952] text-white font-serif py-1 px-2 ml-2 mt-4 rounded-xl" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
            }
          </div>
        ) : <></>)}
      </div>
    </div>
  );
};

export default CategoryProducts;
