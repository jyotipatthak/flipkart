// Importing action types
import { ADD_TO_CART, UPDATE_CART, REMOVE_FROM_CART, LOGIN, LOGOUT } from './types';

// Action creator for user login
export const login = (token) => (dispatch) => {
  // Log the token for debugging purposes
  console.log(token);
  // Dispatch an action to update the state with the token
  dispatch({ type: LOGIN, payload: token });
};

// Action creator for user logout
export const logout = () => (dispatch) => {
  // Dispatch an action to update the state to logout
  dispatch({ type: LOGOUT });
};

// Action creator to update the quantity of an item in the cart
export const updateItemQuantityInCart = (productId, quantity) => (dispatch) => {
  // Dispatch an action to update the quantity of an item in the cart
  dispatch({ type: UPDATE_CART, payload: { productId: productId, quantity: quantity } });
};

// Action creator to add an item to the cart
export const addItemToCart = (product) => (dispatch) => {
  // Dispatch an action to add an item to the cart
  dispatch({ type: ADD_TO_CART, payload: { product: product } });
};

// Action creator to remove an item from the cart
export const removeItemFromCart = (productId) => (dispatch) => {
  // Dispatch an action to remove an item from the cart
  dispatch({ type: REMOVE_FROM_CART, payload: { productId: productId } });
};
