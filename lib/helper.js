const handleError = (msg) => {
  const errors = [];
  for (let key in msg) {
    errors.push(msg[key]);
  }
  let textError = [];
  errors.forEach((errors) => {
    errors.forEach((e) => {
      textError.push(e);
    });
  });
  return textError.join(",");
};

const numberFormat = (number) => {
  return new Intl.NumberFormat().format(number);
};

const salePercent = (price, salePrice) => {
  return Math.round(((price - salePrice) / price) * 100);
};
const totalPrice = (carts) => {
  return carts.reduce((total, cart) => {
    return cart.is_sale
      ? total + cart.sale_price * cart.qty
      : total + cart.price * cart.qty;
  }, 0);
};
const discountAmount = (carts, percent) => {
  return (totalPrice(carts) * percent) / 100;
};
const pricePaid = (carts, percent) => {
  return totalPrice(carts) - discountAmount(carts, percent);
};
export {
  handleError,
  numberFormat,
  salePercent,
  totalPrice,
  discountAmount,
  pricePaid,
};
