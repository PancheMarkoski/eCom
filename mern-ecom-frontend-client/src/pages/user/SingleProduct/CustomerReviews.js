import React, { useState } from "react";
import Container from "../../../components/Container";
import ReactStars from "react-rating-stars-component";
import { rateProduct } from "../../../features/product/productSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Review from "./Review";

const CustomerReviews = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const productId = location.pathname.split("/").pop();

  const [orderedProduct, setOrderedProduct] = useState(true);

  const [star, setStar] = useState(0);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});

  // Function to validate form
  const validateForm = () => {
    const errors = {};
    if (!star) errors.star = "Rating is required";
    if (!comment.trim()) errors.comment = "Comment is required";
    return errors;
  };

  const handleStarChange = (newValue) => {
    setStar(newValue);
    if (errors.star) {
      setErrors({ ...errors, star: "" });
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    if (errors.comment) {
      setErrors({ ...errors, comment: "" });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      // console.log("Form is valid", { star, comment, prodId: productId });
      dispatch(rateProduct({ star, comment, prodId: productId }));
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <Container class1="reviews-wrapper home-wrapper-2">
      <div className="row">
        <div className="col-12">
          <h3 id="review">Reviews</h3>
          <div className="review-inner-wrapper">
            <div className="review-head d-flex justify-content-between align-items-end">
              <div>
                <h4 className="mb-2">Customer Reviews</h4>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value={4}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 ">Based on 2 Reviews</p>
                </div>
              </div>

              <div>
                {orderedProduct && (
                  <a className="text-dark text-decoration-underline" href="">
                    Write a Review
                  </a>
                )}
              </div>
            </div>

            <div className="review-form py-4">
              <h4>Write Reviews</h4>
              <form
                onSubmit={handleSubmit}
                className="d-flex flex-column gap-15"
              >
                <div>
                  <ReactStars
                    count={5}
                    size={24}
                    value={star}
                    onChange={handleStarChange}
                    edit={true}
                    activeColor="#ffd700"
                  />
                  {errors.star && <p style={{ color: "red" }}>{errors.star}</p>}
                </div>
                <div>
                  <textarea
                    name="comments"
                    className="form-control"
                    cols="30"
                    rows="4"
                    placeholder="Comments"
                    value={comment}
                    onChange={handleCommentChange}
                  />
                  {errors.comment && (
                    <p style={{ color: "red" }}>{errors.comment}</p>
                  )}
                </div>
                <div className="d-flex justify-content-end">
                  <button className="button border-0">Submit Review</button>
                </div>
              </form>
            </div>
            <Review />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CustomerReviews;
