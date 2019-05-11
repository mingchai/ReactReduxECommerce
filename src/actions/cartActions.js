import { ADD_TO_CART, REMOVE_FROM_CART } from "./types";

export const addToCart = (itemsInCart, itemToAdd) => dispatch => {
  const cartItems = itemsInCart.slice();
  let isProductInCart = false;

  cartItems.forEach(item => {
    if (item.id === itemToAdd.id) {
      item.count += 1;
      isProductInCart = true;
    }
  });

  if (!isProductInCart) {
    cartItems.push({ ...itemToAdd, count: 1 });
    console.log(`${itemToAdd.title} added to cart`);
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  return dispatch({
    type: ADD_TO_CART,
    payload: {
      cartItems: cartItems
    }
  });
};

export const removeFromCart = (itemsInCart, itemToRemove) => (dispatch) => {
  console.log("from cartActions", typeof itemsInCart, itemToRemove);
  const cartItems = itemsInCart.cartItems.slice().filter(item => item.id !== itemToRemove.id);
  localStorage.setItem("cartItem", JSON.stringify(cartItems));
  return dispatch({ type: REMOVE_FROM_CART, payload: { items: cartItems } });
};
