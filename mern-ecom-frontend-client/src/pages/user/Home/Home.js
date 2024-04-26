import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../../../components/BlogCard";
import ProductCard from "../../../components/ProductCard";
import SpecialProduct from "../../../components/SpecialProduct";
import Container from "../../../components/Container";
import { services } from "../../../utils/Data";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../features/product/productSlice";
import { getUserWishlist } from "../../../features/user/userSlice";
import MainPagePromotions from "./Components/MainPagePromotions";
import ServicesComponent from "./Components/ServicesComponent";
import FamousCard from "./Components/FamousCard";
import BrandMarquee from "./Components/BrandMarquee";
import { getPromotedProducts } from "../../../features/promotedProducts/promotedProductsSlice";
import Spinner from "../../../components/Spinner";
import "../../../styles/home.css";

const Home = () => {
  const dispatch = useDispatch();

  const promotedProducts = useSelector(
    (state) => state?.promotedProducts?.promotedProducts
  );
  const products = useSelector((state) => state.products.products);
  const isAdmin = useSelector((state) => state?.user?.user?.role === "admin");
  const loadingPromotedProducts = useSelector(
    (state) => state.promotedProducts.isLoading
  );

  const specialProducts =
    products && products?.filter((product) => product.tags.includes("special"));

  const featuredProducts =
    products && products.filter((product) => product.tags.includes("featured"));

  const popularProducts =
    products && products.filter((product) => product.tags.includes("popular"));

  const famousProducts = promotedProducts.filter(
    (product) => product.promoType === "famous"
  );

  const mainPromotedProducts = promotedProducts.filter(
    (product) => product.promoType === "main"
  );

  const brands = [
    { name: "Brand 1", image: "images/brand-01.png" },
    { name: "Brand 2", image: "images/brand-02.png" },
    { name: "Brand 3", image: "images/brand-03.png" },
    { name: "Brand 4", image: "images/brand-04.png" },
    { name: "Brand 5", image: "images/brand-05.png" },
    { name: "Brand 6", image: "images/brand-06.png" },
    { name: "Brand 7", image: "images/brand-07.png" },
    { name: "Brand 8", image: "images/brand-08.png" },
  ];

  useEffect(() => {
    dispatch(getPromotedProducts());
    dispatch(getProducts());
    dispatch(getUserWishlist());
  }, [dispatch, promotedProducts.length, products.length]);

  return (
    <>
      <Container class1={"home-wrapper-1 py-5"}>
        {loadingPromotedProducts ? (
          <Spinner />
        ) : (
          <MainPagePromotions mainPromotedProducts={mainPromotedProducts} />
        )}
      </Container>

      <Container class1={"home-wrapper-2 py-5"}>
        <ServicesComponent services={services} />
      </Container>

      {/* Need To Be Done !! */}
      {/* <Container class1={"home-wrapper-2 py-5"}>
          <div className="row">
            <div className="col-12">
              <div className="categories d-flex justify-content-between flex-wrap align-items-center">
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h6>Music & Gaming</h6>
                    <p>Items</p>
                  </div>
                  <img src="images/camera.jpg" alt="Camera" />{" "}
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h6>Camera</h6>
                    <p>Items</p>
                  </div>
                  <img src="images/camera.jpg" alt="Camera" />{" "}
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h6>Smart Tv</h6>
                    <p>Items</p>
                  </div>
                  <img src="images/tv.jpg" alt="Camera" />{" "}
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h6>Smart Watches</h6>
                    <p>Items</p>
                  </div>
                  <img src="images/headphone.jpg" alt="Camera" />{" "}
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h6>Music & Gaming</h6>
                    <p>Items</p>
                  </div>
                  <img src="images/camera.jpg" alt="Camera" />{" "}
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h6>Camera</h6>
                    <p>Items</p>
                  </div>
                  <img src="images/camera.jpg" alt="Camera" />{" "}
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h6>Smart Tv</h6>
                    <p>Items</p>
                  </div>
                  <img src="images/tv.jpg" alt="Camera" />{" "}
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h6>Smart Watches</h6>
                    <p>Items</p>
                  </div>
                  <img src="images/headphone.jpg" alt="Camera" />{" "}
                </div>
              </div>
            </div>
          </div>
        </Container> */}
      {/* Need To Be Done !! */}

      <Container class1={"featured-wrapper py-5 home-wrapper-2"}>
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Featured Collection</h3>
          </div>
          {featuredProducts &&
            featuredProducts?.map((product) => (
              <ProductCard key={product._id} data={product} />
            ))}
        </div>
      </Container>

      <Container class1={"famous-wrapper py-5 home-wrapper-2"}>
        {
          <div className="row">
            {famousProducts.map((product) => (
              <FamousCard
                key={product._id}
                product={product}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        }
      </Container>

      <Container class1={"special-wrapper py-5 home-wrapper-2"}>
        {
          <>
            <div className="row">
              <div className="col-12">
                <h3 className="section-heading">Special Products</h3>
              </div>
            </div>
            <div className="row">
              {specialProducts &&
                specialProducts?.map((product) => (
                  <SpecialProduct key={product._id} data={product} />
                ))}
            </div>
          </>
        }
      </Container>

      <Container class1={"special-wrapper py-5 home-wrapper-2"}>
        {
          <>
            <div className="row">
              <div className="col-12">
                <h3 className="section-heading">Our Popular Products</h3>
              </div>
            </div>
            <div className="row">
              {popularProducts &&
                popularProducts.map((product) => (
                  <ProductCard key={product._id} data={product} />
                ))}
            </div>
          </>
        }
      </Container>

      <div style={{ width: "100%", overflowX: "hidden" }}>
        <BrandMarquee brands={brands} />
      </div>
      {/* Need to be DONE !!!! */}
      {/* <Container class1={"blog-wrapper py-5 home-wrapper-2"}>
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Latest Blogs</h3>
          </div>
          <div className="col-3">
            <BlogCard />
          </div>
          <div className="col-3">
            <BlogCard />
          </div>
          <div className="col-3">
            <BlogCard />
          </div>
          <div className="col-3">
            <BlogCard />
          </div>
        </div>
      </Container> */}
    </>
  );
};

export default Home;
