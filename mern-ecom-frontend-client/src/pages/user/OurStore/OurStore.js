import React, { useState, useEffect } from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import Meta from "../../../components/Meta";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../../../components/ProductCard";
import Color from "../../../components/Color";
import Container from "../../../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../features/product/productSlice";
import { getUserWishlist } from "../../../features/user/userSlice";
import { getProductCategories } from "../../../features/productCategories/productCategoriesSlice";
import { getBrands } from "../../../features/barnds/brandsSlice";
import OurStoreFilterSection from "./OurStoreFilterSection";
import RandomProduct from "./RandomProduct";
import ProductList from "./ProductList";
import { getColors } from "../../../features/color/colorSlice";

const OurStore = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state?.products);
  const { productCategories } = useSelector(
    (state) => state?.productCategories
  );
  const { brands } = useSelector((state) => state?.brands);

  const [grid, setGrid] = useState(3);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getUserWishlist());
    dispatch(getProductCategories());
    dispatch(getBrands());
    dispatch(getColors());
  }, []);

  useEffect(() => {
    const filters = {
      ...(selectedCategory && { category: selectedCategory }),
      ...(selectedBrand && { brand: selectedBrand }),
      ...(selectedColor && { color: selectedColor }),
      ...(minPrice && { "price[gte]": minPrice }),
      ...(maxPrice && { "price[lte]": maxPrice }),
      ...(sortOption && { sort: sortOption }),
    };

    dispatch(getProducts(filters));
    // Dispatch other actions as needed
  }, [
    dispatch,
    selectedCategory,
    selectedBrand,
    selectedColor,
    minPrice,
    maxPrice,
    sortOption,
  ]);

  const handleCategorySelection = (categoryId) => {
    const category = productCategories.find((c) => c._id === categoryId);
    setSelectedCategory((prev) =>
      prev === category?.title ? null : category?.title
    );
  };

  const handleBrandSelection = (brandId) => {
    const brand = brands.find((b) => b._id === brandId);
    setSelectedBrand((prev) => (prev === brand?.title ? null : brand?.title));
  };

  const handleColorSelection = (color) => {
    setSelectedColor((prev) => (prev === color ? null : color));
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title={"Our Store"} />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <OurStoreFilterSection
              selectedCategory={selectedCategory}
              selectedBrand={selectedBrand}
              selectedColor={selectedColor}
              onCategorySelection={handleCategorySelection}
              onBrandSelection={handleBrandSelection}
              onColorSelection={handleColorSelection}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onMinPriceChange={handleMinPriceChange}
              onMaxPriceChange={handleMaxPriceChange}
            />

            <RandomProduct products={products} />
          </div>

          <div className="col-9">
            <div className="filter-sort-gird">
              <ProductList
                grid={grid}
                setGrid={setGrid}
                sortOption={sortOption}
                setSortOption={setSortOption}
              />
            </div>
            <div className="products-list pb-5">
              <div className="d-flex flex-wrap">
                {products?.map((product) => (
                  <ProductCard grid={grid} data={product} key={product._id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;
