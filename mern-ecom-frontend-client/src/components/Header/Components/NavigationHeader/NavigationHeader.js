// NavigationHeader.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import MobileMenuButton from "./MobileMenuButton";
import NavigationLinks from "./NavigationLinks";
import MobileNavigationLinks from "./MobileNavigationLinks";

const NavigationHeader = ({
  products,
  navigate,
  user,
  cart,
  subtotal,
  handleLogout,
}) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <header className="header-upper py-3">
      <div className="container-xxl">
        <div className="row align-items-center">
          <Logo />
          <SearchBar products={products} navigate={navigate} />
          <MobileMenuButton handleNavCollapse={handleNavCollapse} />
          <NavigationLinks user={user} cart={cart} subtotal={subtotal} />
          <MobileNavigationLinks
            isNavCollapsed={isNavCollapsed}
            user={user}
            cart={cart}
            subtotal={subtotal}
            handleLogout={handleLogout}
            handleNavCollapse={handleNavCollapse}
          />
        </div>
      </div>
    </header>
  );
};

export default NavigationHeader;
