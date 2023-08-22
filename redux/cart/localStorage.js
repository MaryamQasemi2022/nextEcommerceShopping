const updateLocalStorage = (cart) => {
  if (typeof window !== "undefined") {
    return localStorage.setItem("shoppingCart", JSON.stringify(cart));
  }
};

const getStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("shoppingCart")
      ? JSON.parse(localStorage.getItem("shoppingCart"))
      : [];
  } else {
    return [];
  }
};

export { updateLocalStorage, getStorage };
