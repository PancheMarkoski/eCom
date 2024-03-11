export const calculateCartSubtotal = (cartItems) => {
  return cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
};
