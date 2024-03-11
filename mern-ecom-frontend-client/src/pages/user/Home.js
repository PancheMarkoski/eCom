import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../../components/BlogCard";
import ProductCard from "../../components/ProductCard";
import SpecialProduct from "../../components/SpecialProduct";
import Container from "../../components/Container";
import { services } from "../../utils/Data";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../features/product/productSlice";
import { getUserWishlist } from "../../features/user/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getUserWishlist());
  }, []);

  const specialProducts =
    products && products?.filter((product) => product.tags.includes("special"));
  const featuredProducts =
    products && products.filter((product) => product.tags.includes("featured"));
  const popularProducts =
    products && products.filter((product) => product.tags.includes("popular"));

  return (
    <>
      <Container class1={"home-wrapper-1 py-5"}>
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative p-3">
              <img
                src="images/main-banner-1.jpg"
                className="img-fluid rounded-3"
                alt="main banner"
              />
              <div className="main-banner-content position-absolute ">
                <h4>SUPERCHARGED FOR PROS.</h4>
                <h5>iPad S13+ Pro</h5>
                <p>From $999.00 or $41.62/mo.</p>
                <Link to="/buy-now" className="button">
                  BUY NOW
                </Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap justify-contetn-between align-items-center gap-10">
              <div className="small-banner position-relative ">
                <img
                  src="images/catbanner-01.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute ">
                  <h4>Best Sale</h4>
                  <h5>iPad S13+ Pro</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative ">
                <img
                  src="images/catbanner-02.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute ">
                  <h4>New Arrival</h4>
                  <h5>iPad S13+ Pro</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative ">
                <img
                  src="images/catbanner-03.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute ">
                  <h4>SUPERCHARGED FOR PROS.</h4>
                  <h5>iPad S13+ Pro</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative ">
                <img
                  src="images/catbanner-04.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute ">
                  <h4>SUPERCHARGED FOR PROS.</h4>
                  <h5>iPad S13+ Pro</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1={"home-wrapper-2 py-5"}>
        <div className="row">
          <div className="col-12">
            <div className="services d-flex align-items-center justify-content-between">
              {services?.map((service, index) => {
                return (
                  <div key={index} className="d-flex align-items-center gap-15">
                    <img src={service.image} alt={service.title} />
                    <div>
                      <h5>{service.title}</h5>
                      <p className="mb-0">{service.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>

      <Container class1={"home-wrapper-2 py-5"}>
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
      </Container>

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
          <div className="col-3">
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
          </div>
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

      <Container class1={"marque-wrapper py-5"}>
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src="images/brand-01.png" alt="Brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-02.png" alt="Brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-03.png" alt="Brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-04.png" alt="Brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-05.png" alt="Brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-06.png" alt="Brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-07.png" alt="Brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-08.png" alt="Brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>

      <Container class1={"blog-wrapper py-5 home-wrapper-2"}>
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
      </Container>
    </>
  );
};

export default Home;
