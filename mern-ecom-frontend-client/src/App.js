import "./App.css";
import Layout from "./components/Layout";
import About from "./pages/user/About";
import Contact from "./pages/user/Contact";
import Home from "./pages/user/Home/Home";
import CompareProduct from "./pages/user/CompareProduct";
import Wishlist from "./pages/user/Wishlist";
import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";
import Resetpassword from "./pages/user/Resetpassword";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import OurStore from "./pages/user/OurStore/OurStore";
import Blogs from "./pages/user/Blogs";
import SingleBlog from "./pages/user/SingleBlog";
import ForgotPassword from "./pages/user/ForgotPassword";
import PrivacyPolicy from "./pages/user/PrivacyPolicy";
import RefundPolicy from "./pages/user/RefundPolicy";
import ShippingPolicy from "./pages/user/ShippingPolicy";
import TermAndConditions from "./pages/user/TermAndConditions";
import SingleProduct from "./pages/user/SingleProduct/SingleProduct";
import Cart from "./pages/user/Cart";
import Checkout from "./pages/user/Checkout/Checkout";
import { PrivateRoutes } from "./routing/PrivateRoutes";
import { OpenRoutes } from "./routing/OpenRoutes";
import MyOrders from "./pages/user/MyOrders";
import Profile from "./pages/user/Profile";
import AdminRoutes from "./routing/AdminRoutes";
import AdminLayout from "./components/Admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Customers from "./pages/admin/Customers";
import AddProduct from "./pages/admin/AddProduct";
import Productlist from "./pages/admin/Productlist";
import AddBrand from "./pages/admin/AddBrand";
import Brandlist from "./pages/admin/Brandlist";
import AddProductCategory from "./pages/admin/AddProductCategory";
import ProductCategoriesList from "./pages/admin/ProductCategorieslist";
import AddColor from "./pages/admin/AddColor";
import Colorlist from "./pages/admin/Colorlist";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="product" element={<OurStore />} />
            <Route path="product/:id" element={<SingleProduct />} />

            {/* <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blog/:id" element={<SingleBlog />} />
            <Route path="compare-product" element={<CompareProduct />} /> */}
            {/* <Route
              path="wishlist"
              element={
                <PrivateRoutes>
                  <Wishlist />
                </PrivateRoutes>
              }
            /> */}
            <Route
              path="login"
              element={
                <OpenRoutes>
                  <Login />
                </OpenRoutes>
              }
            />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route
              path="signup"
              element={
                <OpenRoutes>
                  <Signup />
                </OpenRoutes>
              }
            />
            <Route path="reset-password/:token" element={<Resetpassword />} />
            {/* <Route
              path="cart"
              element={
                <PrivateRoutes>
                  <Cart />
                </PrivateRoutes>
              }
            />
            <Route
              path="checkout"
              element={
                <PrivateRoutes>
                  <Checkout />
                </PrivateRoutes>
              }
            />
            <Route
              path="/my-orders"
              element={
                <PrivateRoutes>
                  <MyOrders />
                </PrivateRoutes>
              }
            /> */}
            <Route path="/profile" element={<Profile />} />
            {/* <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="refund-policy" element={<RefundPolicy />} />
            <Route path="shipping-policy" element={<ShippingPolicy />} />
            <Route path="term-conditions" element={<TermAndConditions />} /> */}
          </Route>
          <Route path="" element={<AdminRoutes />}>
            <Route path="/dashboard" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="customers" element={<Customers />} />
              <Route path="product" element={<AddProduct />} />
              <Route path="product/:id" element={<AddProduct />} />
              <Route path="list-product" element={<Productlist />} />
              <Route path="brand" element={<AddBrand />} />
              <Route path="brand/:id" element={<AddBrand />} />
              <Route path="list-brand" element={<Brandlist />} />
              <Route path="product-category" element={<AddProductCategory />} />
              <Route
                path="product-category/:id"
                element={<AddProductCategory />}
              />
              <Route
                path="list-categories"
                element={<ProductCategoriesList />}
              />
              <Route path="color" element={<AddColor />} />
              <Route path="color/:id" element={<AddColor />} />
              <Route path="list-color" element={<Colorlist />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
