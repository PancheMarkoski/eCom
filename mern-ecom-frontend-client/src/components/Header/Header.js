import React, { useEffect } from "react";
import { getCart } from "../../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { calculateCartSubtotal } from "../../utils/helperFunctions/calculateCartSubtotal";
import { useNavigate } from "react-router-dom";
import PromoHeader from "./Components/PromoHeader";
import NavigationHeader from "./Components/NavigationHeader/NavigationHeader";
import MenuHeader from "./Components/MenuHeader";
import { userLogout } from "../../features/user/userSlice";
import { toast } from "react-toastify";
import { clearCart } from "../../features/cart/cartSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    if (user !== null) {
      console.log("USER LOG IN CART");
      dispatch(getCart());
    } else {
      console.log("USER LOG OUT IN CART");

      dispatch(clearCart());
    }
  }, [user]);

  const subtotal = calculateCartSubtotal(cart);

  const handleLogout = () => {
    dispatch(userLogout())
      .unwrap()
      .then(() => {
        // Dispatch the clearCart action right after a successful logout
        dispatch(clearCart());

        // Handle successful logout, e.g., show a toast notification
        toast.success("You have been successfully logged out.");
      })
      .catch((error) => {
        // Handle logout error, e.g., show an error toast notification
        console.error("Logout failed:", error);
        toast.error(
          "Oops! Something went wrong, and we couldn't log you out. Please try again or contact support if the issue persists."
        );
      });
  };

  return (
    <>
      <PromoHeader />
      <NavigationHeader
        products={products}
        navigate={navigate}
        user={user}
        cart={cart}
        subtotal={subtotal}
        handleLogout={handleLogout}
      />
      <MenuHeader user={user} handleLogout={handleLogout} />
    </>
  );
};

export default Header;
