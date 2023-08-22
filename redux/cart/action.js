import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT,
  DECREMENT,
  CLEAR_CART,
} from "./actionType";

const addToCart = (product, qty) => {
  return {
    type: ADD_TO_CART,
    payload: { product, qty },
  };
};
const removeFromCart = (product) => {
  return {
    type: REMOVE_FROM_CART,
    payload: product,
  };
};
const increment = (product) => {
  return {
    type: INCREMENT,
    payload: product,
  };
};
const decrement = (product) => {
  return {
    type: DECREMENT,
    payload: product,
  };
};
const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

export { addToCart, removeFromCart, clearCart, increment, decrement };
