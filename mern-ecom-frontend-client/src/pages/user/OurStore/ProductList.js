import React from "react";

const ProductList = ({
  grid,
  setGrid,
  sortOption,
  setSortOption,
  products,
}) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center gap-10">
        <p className="mb-0 d-block" style={{ width: "100px" }}>
          Sort By:
        </p>
        <select
          className="form-control form-select"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Best Selling</option>
          <option value="title">Alphabetically, A-Z</option>
          <option value="-title">Alphabetically, Z-A</option>
          <option value="price">Price, low to high</option>
          <option value="-price">Price, high to low</option>
          <option value="createdAt">Date, old to new</option>
          <option value="-createdAt">Date, new to old</option>
        </select>
      </div>

      <div className="d-flex align-items-center gap-10 ourStore__displayNoneMaxWidth">
        <p className="totalproducts mb-0">{products?.length} Products</p>
        <div className="d-flex gap-10 align-items-center grid">
          <img
            onClick={() => setGrid(3)}
            src="images/gr4.svg"
            className="d-block img-fluid"
            style={{ cursor: "pointer" }}
            alt="Grid 4"
          />
          <img
            onClick={() => setGrid(4)}
            src="images/gr3.svg"
            className="d-block img-fluid"
            style={{ cursor: "pointer" }}
            alt="Grid 3"
          />
          <img
            onClick={() => setGrid(6)}
            src="images/gr2.svg"
            className="d-block img-fluid"
            style={{ cursor: "pointer" }}
            alt="Grid 2"
          />
          <img
            onClick={() => setGrid(12)}
            src="images/gr.svg"
            className="d-block img-fluid"
            style={{ cursor: "pointer" }}
            alt="Grid 1"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
