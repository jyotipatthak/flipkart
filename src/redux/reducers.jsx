
import { createReducer } from '@reduxjs/toolkit';
import { ADD_TO_CART, REMOVE_FROM_CART, LOGIN, LOGOUT, UPDATE_CART } from './types';

const initialState = {
  isAuthenticated: false,
  cart: {},
  token: null,
};

const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(LOGIN, (state) => {
      state.isAuthenticated = true;
    })
    .addCase(LOGOUT, (state) => {
      state.isAuthenticated = false;
      state.token = null;
    })
    .addCase(ADD_TO_CART, (state,action) => {
      let key = action.payload.product.id;
      state.cart[`${key}`] = {
        ...action.payload,
       quantity: 1
      }
    })
    .addCase(UPDATE_CART, (state,action) => {
      let key = action.payload.productId;
      if(action.payload.quantity <= 0){
        delete state.cart[`${key}`];
      }
      state.cart[`${key}`].quantity = action.payload.quantity
    })
    .addCase(REMOVE_FROM_CART, (state,action) => {
      let key = action.payload.productId;
      delete state.cart[key];
    });
});

export default rootReducer;
