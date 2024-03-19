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

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getUserWishlist());
  }, []);

  const products = useSelector((state) => state.products.products);
  const specialProducts =
    products && products?.filter((product) => product.tags.includes("special"));
  const featuredProducts =
    products && products.filter((product) => product.tags.includes("featured"));
  const popularProducts =
    products && products.filter((product) => product.tags.includes("popular"));

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

  return (
    <>
      <Container class1={"home-wrapper-1 py-5"}>
        <MainPagePromotions />
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
        <div className="row">
          {/* <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/fameous-01.webp"
                alt="Smart Watch Series 7"
                className="img-fluid"
              />
              <div className="famous-content position-absolute">
                <h5>Big Screen</h5>
                <h6>Smart Watch Series 7</h6>
                <p>From $399 or $16.62/mo. for 24 mo.*</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-05.png"
                alt="Smart Watch Series 7"
                className="img-fluid"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Big Screen</h5>
                <h6 className="text-dark">Smart Watch Series 7</h6>
                <p className="text-dark">From $399 or $16.62/mo. for 24 mo.*</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-05.png"
                alt="Smart Watch Series 7"
                className="img-fluid"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Big Screen</h5>
                <h6 className="text-dark">Smart Watch Series 7</h6>
                <p className="text-dark">From $399 or $16.62/mo. for 24 mo.*</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/samsung-serif-tv.webp"
                alt="Smart Watch Series 7"
                className="img-fluid"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Big Screen</h5>
                <h6 className="text-dark">Smart Watch Series 7</h6>
                <p className="text-dark">From $399 or $16.62/mo. for 24 mo.*</p>
              </div>
            </div>
          </div> */}
          <FamousCard
            imgSrc="images/fameous-01.webp"
            title="Big Screen"
            subtitle="Smart Watch Series 7"
            details="From $399 or $16.62/mo. for 24 mo.*"
            theme="light" // Or omit the theme prop for default styling
          />
          <FamousCard
            imgSrc="images/famous-05.png"
            title="Big Screen"
            subtitle="Smart Watch Series 7"
            details="From $399 or $16.62/mo. for 24 mo.*"
            theme="dark"
          />
          <FamousCard
            imgSrc="images/fameous-01.webp"
            title="Big Screen"
            subtitle="Smart Watch Series 7"
            details="From $399 or $16.62/mo. for 24 mo.*"
            theme="light" // Or omit the theme prop for default styling
          />
          <FamousCard
            imgSrc="images/samsung-serif-tv.webp"
            title="Big Screen"
            subtitle="Smart Watch Series 7"
            details="From $399 or $16.62/mo. for 24 mo.*"
            theme="dark"
          />
        </div>
      </Container>

      <Container class1={"special-wrapper py-5 home-wrapper-2"}>
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
      </Container>

      <Container class1={"special-wrapper py-5 home-wrapper-2"}>
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
