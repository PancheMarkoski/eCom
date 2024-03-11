import React from "react";
import { Col, InputGroup } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { BsSearch } from "react-icons/bs";

const SearchBar = ({ products, navigate }) => (
  <Col md={5} xs={12} className="mt-3 mt-md-0">
    <InputGroup>
      <Typeahead
        id="product-search"
        className="form-control py-2 no-border-search"
        labelKey="title"
        options={products}
        placeholder="Search Product Here..."
        onChange={(selectedProduct) => {
          if (selectedProduct.length > 0) {
            const selectedProductId = selectedProduct[0]._id;
            navigate(`/product/${selectedProductId}`);
          }
        }}
      />
      <InputGroup.Text id="basic-addon2" className="p-3">
        <BsSearch className="fs-6" />
      </InputGroup.Text>
    </InputGroup>
  </Col>
);

export default SearchBar;
