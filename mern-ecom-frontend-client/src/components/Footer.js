import React from "react";
import { Link } from "react-router-dom";
import { BsLinkedin, BsInstagram, BsGithub, BsYoutube } from "react-icons/bs";
import newsletter from "../images/newsletter.png";
const Footer = () => {
  return (
    <>
      <footer className="py-4">
        <div className="container xxl">
          <div className="row">
            <div className="col-12 col-md-5">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src={newsletter} alt="newsletter" className="img-fluid" />
                <h2 className="mb-0 text-white">Sign Up for Newsletter</h2>
              </div>
            </div>
            <div className="col-12 col-md-7">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Your Email Address"
                  aria-label="Email Address"
                  aria-describedby="newsletter-signup"
                />
                <span className="input-group-text p-3" id="newsletter-signup">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="p-4 text-center">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 col-md-3 mb-5">
              <h4 className="text-white mb-4">Contact Us</h4>
              <div>
                <address className="text-white fs-6">
                  277 Near Vill Chopal, <br /> Sonipat, Haryana <br /> Pincode:
                  131103
                </address>
                <p className="d-block mb-2 text-white">Phone: +91 8264954234</p>
                <Link
                  href="mailto:navdeepdahiya753@gmail.com"
                  className="d-block mb-2 text-white"
                >
                  navdeepdahiya753@gmail.com
                </Link>
                <div className="social_icons d-flex align-items-center gap-30 mt-4 d-flex justify-content-center">
                  <Link
                    className="text-white me-2"
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsLinkedin className="fs-4" />
                  </Link>
                  <Link
                    className="text-white me-2"
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsInstagram className="fs-4" />
                  </Link>
                  <Link
                    className="text-white me-2"
                    href="https://www.github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsGithub className="fs-4" />
                  </Link>
                  <Link
                    className="text-white me-2"
                    href="https://www.youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsYoutube className="fs-4" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-3 mb-5">
              <h4 className="text-white mb-4">Information</h4>
              <div className="footer-link d-flex flex-column">
                <Link to={"/privacy-policy"} className="text-white py-2 mb-1">
                  Privacy Policy
                </Link>
                <Link to={"/refund-policy"} className="text-white py-2 mb-1">
                  Refund Policy
                </Link>
                <Link to={"/shipping-policy"} className="text-white py-2 mb-1">
                  Shipping Policy
                </Link>
                <Link to={"/term-conditions"} className="text-white py-2 mb-1">
                  Terms & Conditions
                </Link>
                <Link to={"/blogs"} className="text-white py-2 mb-1">
                  Blogs
                </Link>
              </div>
            </div>
            <div className="col-12 col-md-3 mb-5">
              <h4 className="text-white mb-4">Account</h4>
              <div className="footer-link d-flex flex-column">
                <Link className="text-white py-2 mb-1" to="/laptops">
                  Search
                </Link>
                <Link className="text-white py-2 mb-1" to="/headphones">
                  About Us
                </Link>
                <Link className="text-white py-2 mb-1" to="/tablets">
                  Faq
                </Link>
                <Link className="text-white py-2 mb-1" to="/watches">
                  Contact
                </Link>
              </div>
            </div>
            <div className="col-12 col-md-3 mb-5">
              <h4 className="text-white mb-4">Quick Links</h4>
              <div className="footer-link d-flex flex-column">
                <Link className="text-white py-2 mb-1" to="/laptops">
                  Laptops
                </Link>
                <Link className="text-white py-2 mb-1" to="/headphones">
                  Headphones
                </Link>
                <Link className="text-white py-2 mb-1" to="/tablets">
                  Tablets
                </Link>
                <Link className="text-white py-2 mb-1" to="/watches">
                  Watch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="p-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                &copy; {new Date().getFullYear()}; Powered by Developer's Corner
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
