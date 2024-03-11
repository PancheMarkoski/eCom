import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import productReducer from "../features/product/productSlice";
import blogReducer from "../features/blog/blogSlice";
import contactReducer from "../features/contact/contactSlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/order/orderSlice";
import ProductCategoriesReducer from "../features/ProductCategories/ProductCategoriesSlice";
import BrandsReducer from "../features/Barnds/BrandsSlice";
import colorReducer from "../features/color/colorSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    blogs: blogReducer,
    contact: contactReducer,
    cart: cartReducer,
    order: orderReducer,
    productCategories: ProductCategoriesReducer,
    brands: BrandsReducer,
    colors: colorReducer,
  },
});
