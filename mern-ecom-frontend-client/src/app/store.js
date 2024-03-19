import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import productReducer from "../features/product/productSlice";
import blogReducer from "../features/blog/blogSlice";
import contactReducer from "../features/contact/contactSlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/order/orderSlice";
import productCategoriesReducer from "../features/productCategories/productCategoriesSlice";
import brandsReducer from "../features/barnds/brandsSlice";
import colorReducer from "../features/color/colorSlice";
import cloudinaryImageReducer from "../features/cloudinaryImage/cloudinaryImageSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    blogs: blogReducer,
    contact: contactReducer,
    cart: cartReducer,
    order: orderReducer,
    productCategories: productCategoriesReducer,
    brands: brandsReducer,
    colors: colorReducer,
    cloudinaryImages: cloudinaryImageReducer,
  },
});
