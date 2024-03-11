import React from "react";
import { BsList } from "react-icons/bs";

const MobileMenuButton = ({ handleNavCollapse }) => (
  <div className="col-6 d-md-none text-end mt-2" style={{ width: "100%" }}>
    <button
      className="btn btn-outline-light"
      type="button"
      onClick={handleNavCollapse}
    >
      <BsList />
    </button>
  </div>
);

export default MobileMenuButton;
