import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function Cart() {
  const cartItems = useSelector(state => state.cartItems); // Accessing cart items from the Redux store
  

  

  return (
    <div className="bg-[#bdd2e8] text-white min-h-screen flex flex-col mt-10 p-8">
      <h2 className="text-3xl font-bold mb-4 text-center text-black">Shopping Cart</h2>
     {cartItems}
      <div className="mt-auto text-center">
        <Link to="/signup">
          <button
            type="submit"
            className="hover:bg-pink-500 bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
