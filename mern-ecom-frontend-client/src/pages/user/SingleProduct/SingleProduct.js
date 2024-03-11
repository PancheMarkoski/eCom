import React, { useState, useEffect } from "react";
import Meta from "../../../components/Meta";
import BreadCrumb from "../../../components/BreadCrumb";
import ProductCard from "../../../components/ProductCard";
import ReactStars from "react-rating-stars-component";
import ZoomImage from "../../../components/ZoomImage";
import Color from "../../../components/Color";
import { AiOutlineHeart } from "react-icons/ai";
import { TbGitCompare } from "react-icons/tb";
import Container from "../../../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getProduct,
  getAllProducts,
} from "../../../features/product/productSlice";
import { stripHtmlTags } from "../../../utils/helperFunctions/stripHtmlTags";
import { addProductToCart, getCart } from "../../../features/cart/cartSlice";
import { toast } from "react-toastify";
import CustomerReviews from "./CustomerReviews";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const productId = location.pathname.split("/").pop();

  const productData = useSelector((state) => state.products.product);
  const allProducts = useSelector((state) => state.products.products);
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user);

  const [color, setColor] = useState();
  const [quantity, setQuantity] = useState(1);

  const popularProducts =
    allProducts &&
    allProducts.filter((product) => product.tags.includes("popular"));

  const [isProductInCart, setProductInCart] = useState();

  useEffect(() => {
    dispatch(getProduct(productId));
    dispatch(getAllProducts());
    dispatch(getCart());
  }, [productId]);

  useEffect(() => {
    setProductInCart(
      cart.some((cartItem) => cartItem.productId._id === productId)
    );
  }, [cart, productId]);

  // move to helper function
  const copyToClipboard = (text) => {
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  const handleAddToCart = () => {
    if (!color) {
      toast.error("Color is not selected");
      return;
    }

    toast.success(`Product is added to cart successfully`);
    dispatch(
      addProductToCart({
        productId: productData._id,
        color: color,
        quantity: quantity,
        price: productData.price,
      })
    );
  };

  return (
    <>
      <Meta title={productData?.title} />
      <BreadCrumb title={productData?.title} />

      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6 zoom-image-section">
            <ZoomImage
              imageUrl={productData?.images[0].url}
              key={productData?.images[0].public_id}
            />

            <div className="row w-100">
              {productData?.images.slice(0, 4).map((image) => {
                return (
                  <div className="col-6" key={image.public_id}>
                    <ZoomImage secondary={true} imageUrl={image.url} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-6">
            <div>
              <div className="main-product-details">
                <div className="border-bottom">
                  <h3 className="title">{productData?.title}</h3>
                </div>
                <div className="border-bottom py-3">
                  <p className="price">
                    $<span className="amount">{productData?.price}</span>
                  </p>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={+productData?.totalRating || 0}
                      edit={false}
                      activeColor={"#ffd700"}
                    />
                    <span className="mb-0">(2 Reviews)</span>
                  </div>
                  <a href="#review">Write a Review</a>
                </div>

                <div className="border-bottom py-3">
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Type :</h3>
                    <p className="product-data">{productData?.category}</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Brand :</h3>
                    <p className="product-data">{productData?.brand}</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Category :</h3>
                    <p className="product-data">Electronics</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Tags :</h3>
                    <p className="product-data">{productData?.tags}</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Availability :</h3>
                    <p className="product-data">
                      In Stock({productData?.quantity})
                    </p>
                  </div>
                  <div className="d-flex gap-10 flex-column mt-2 mb-3">
                    <h3 className="product-heading">Size :</h3>
                    <div className="d-flex flex-wrap gap-15">
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        S
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        M
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        L
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        XL
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        XXL
                      </span>
                    </div>
                  </div>

                  <div className="d-flex gap-10 flex-column mt-2 mb-3">
                    <h3 className="product-heading">Color :</h3>
                    <Color
                      data={productData?.color}
                      setColor={setColor}
                      color={color}
                    />
                  </div>

                  <div className="d-flex align-items-center gap-10 flex-row mt-2 mb-3">
                    <h3 className="product-heading">Quantity:</h3>
                    <div>
                      <input
                        type="number"
                        name=""
                        min={1}
                        max={10}
                        className="form-control"
                        style={{ width: "70px" }}
                        id=""
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                      />
                    </div>

                    <div className="d-flex align-items-center gap-30 ms-5">
                      {!isProductInCart ? (
                        <button
                          onClick={() =>
                            user.isSuccess
                              ? handleAddToCart()
                              : navigate("/login")
                          }
                          className="button border-0"
                          type="submit"
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <button
                          onClick={() => navigate("/cart")}
                          className="button border-0"
                          type="submit"
                        >
                          Go to Cart
                        </button>
                      )}
                      <button className="button signup">Buy It Now</button>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-15">
                    <a href="/compare">
                      <TbGitCompare className="fs-5 me-2" /> Add to Compare
                    </a>
                    <a href="/wishlist">
                      <AiOutlineHeart className="fs-5 me-2" /> Add to Wishlist
                    </a>
                  </div>

                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Shipping & Returns :</h3>
                    <p className="product-data">
                      Free shipping and returns available on all orders!
                      <br />
                      "We ship all US domestic orders within{" "}
                      <b>5-10 business days!</b>"
                    </p>
                  </div>

                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Copy Product Link:</h3>
                    <button
                      onClick={() => {
                        copyToClipboard(
                          "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg"
                        ); // Need to be done
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        color: "#777777",
                        textDecoration: "underline",
                        cursor: "pointer",
                        fontSize: "13px",
                      }}
                    >
                      https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="description-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>

            <div className="bg-white p-3">
              <p>{stripHtmlTags(productData?.description)}</p>
            </div>
          </div>
        </div>
      </Container>

      <CustomerReviews />

      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          {popularProducts.map((product) => (
            <ProductCard key={product._id} data={product} />
          ))}
        </div>
      </Container>
    </>
  );
};

export default SingleProduct;
