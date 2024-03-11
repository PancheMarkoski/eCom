import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Color from "../../../components/Color";

const OurStoreFilterSection = ({
  selectedCategory,
  selectedBrand,
  selectedColor,
  onCategorySelection,
  onBrandSelection,
  onColorSelection,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}) => {
  const { productCategories } = useSelector(
    (state) => state?.productCategories
  );
  const { brands } = useSelector((state) => state?.brands);
  const { colors } = useSelector((state) => state?.colors);

  return (
    <>
      <div className="filter-card mb-3">
        <h3 className="filter-title">Shop By Categories</h3>
        <div>
          <ul className="ps-0">
            {productCategories?.map((category) => (
              <li
                key={category._id}
                style={{
                  color:
                    selectedCategory === category.title ? "green" : "#777777",
                }}
                onClick={() => onCategorySelection(category._id)}
              >
                {category?.title}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="filter-card mb-3">
        <h3 className="filter-title">Filter By</h3>
        <div>
          {/* <h5 className="sub-title">Availablity</h5>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="inStock"
                    />
                    <label className="form-check-label" htmlFor="inStock">
                      In Stock (1)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="outOfStock"
                    />
                    <label className="form-check-label" htmlFor="outOfStock">
                      Out of Stock (0)
                    </label>
                  </div>
                </div> NEED TO BE DONE!!! */}
          <h5 className="sub-title">Price</h5>
          <div>
            <div className="d-flex align-items-center gap-10">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInputFrom"
                  placeholder="From"
                  value={minPrice}
                  onChange={onMinPriceChange}
                />
                <label htmlFor="floatingInputFrom">From</label>
              </div>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInputTo"
                  placeholder="To"
                  value={maxPrice}
                  onChange={onMaxPriceChange}
                />
                <label htmlFor="floatingInputTo">To</label>
              </div>
            </div>
          </div>
          <h5 className="sub-title">Color</h5>
          <div>
            <Color
              data={colors}
              setColor={onColorSelection}
              color={selectedColor}
            />
          </div>
          {/* <h5 className="sub-title">Size</h5>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="inStock"
                    />
                    <label className="form-check-label" htmlFor="inStock">
                      S (2)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="inStock"
                    />
                    <label className="form-check-label" htmlFor="inStock">
                      S (2)
                    </label>
                  </div>
                </div> NEED TO BE DONE!!! */}
        </div>
      </div>

      <div className="filter-card mb-3">
        <h3 className="filter-title">Product Brands</h3>
        <div className="product-tags d-flex flex-wrap align-items-center gap-10">
          {brands?.map((brand) => (
            <span
              className="badge  text-secondary rounded-3 py-2 px-3"
              key={brand._id}
              style={{
                backgroundColor:
                  selectedBrand === brand.title ? "#b1e0a8" : "#f8f9fa",
                cursor: "pointer",
              }}
              onClick={() => onBrandSelection(brand._id)}
            >
              {brand?.title}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default OurStoreFilterSection;
