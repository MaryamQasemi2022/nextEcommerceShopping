import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT,
  DECREMENT,
  CLEAR_CART,
} from "./actionType";
import { updateLocalStorage, getStorage } from "./localStorage";

const initialState = {
  cart: getStorage(),
};

const cartReducer = (state = initialState, action) => {
  let newCart = [];
  switch (action.type) {
    case ADD_TO_CART:
      const hasProduct = state.cart.find(
        (p) => p.id.toString() === action.payload.product.id.toString()
      )
        ? true
        : false;

      newCart = hasProduct
        ? state.cart.map((p) =>
            p.id.toString() === action.payload.product.id.toString()
              ? { ...p, qty: action.payload.qty }
              : p
          )
        : [
            ...state.cart,
            { ...action.payload.product, qty: action.payload.qty },
          ];
      updateLocalStorage(newCart);
      return {
        ...state,
        cart: newCart,
      };
    case REMOVE_FROM_CART:
      newCart = state.cart.filter(
        (p) => p.id.toString() !== action.payload.id.toString()
      );
      updateLocalStorage(newCart);
      return {
        ...state,
        cart: newCart,
      };
    case INCREMENT:
      newCart = state.cart.map((p) =>
        p.id.toString() === action.payload.id.toString()
          ? { ...p, qty: p.qty + 1 }
          : p
      );

      updateLocalStorage(newCart);
      return {
        ...state,
        cart: newCart,
      };
    case DECREMENT:
      newCart = state.cart.map((p) =>
        p.id.toString() === action.payload.id.toString()
          ? { ...p, qty: p.qty - 1 }
          : p
      );

      updateLocalStorage(newCart);
      return {
        ...state,
        cart: newCart,
      };
    case CLEAR_CART:
      updateLocalStorage([]);
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};
export default cartReducer;
