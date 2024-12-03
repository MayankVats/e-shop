export const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // Calculate Item's price
  state.itemsPrice = addDecimal(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Calculate Shipping Price
  state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 100);

  // Calculate Tax Price
  state.taxPrice = addDecimal(Number(0.15 * state.itemsPrice));

  // Calculate Total Price
  state.totalPrice = addDecimal(
    Number(state.itemsPrice) +
      Number(state.shippingPrice) +
      Number(state.taxPrice)
  );

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
