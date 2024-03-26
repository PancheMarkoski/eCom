import React, { useEffect, useState } from "react";
import Container from "../../../components/Container";
import ReactStars from "react-rating-stars-component";
import { rateProduct } from "../../../features/product/productSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Review from "./Review";

const CustomerReviews = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const productId = location.pathname.split("/").pop();

  const totalRating = useSelector(
    (state) => state?.products?.product?.totalRating
  );
  const totalReviews = useSelector(
    (state) => state?.products?.product?.ratings
  );

  const userId = useSelector((state) => state?.user?.user?._id);

  const [star, setStar] = useState(0);
  const [comment, setComment] = useState("");
  const [hasReviewed, setHasReviewed] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const userRating = totalReviews?.find(
      (rating) => rating.postedBy._id === userId
    );

    // If a previous rating exists, pre-populate the form with the user's rating and comment
    if (userRating) {
      setStar(userRating.star);
      setComment(userRating.comment);
      setHasReviewed(true);
    } else {
      setHasReviewed(false);
    }

    // Cleanup function
    return () => {
      setStar(0); // Reset star rating to initial state
      setComment(""); // Reset comment to initial state
      setHasReviewed(false); // Ensure hasReviewed is reset
    };
  }, [productId, userId, totalReviews]);

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
                    key={totalRating}
                    count={5}
                    size={24}
                    value={Number(totalRating ? totalRating : 0)}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 ">
                    Based on {totalReviews?.length} Reviews
                  </p>
                </div>
              </div>

              <div>
                <p className="text-dark text-decoration-underline">
                  Write a Review
                </p>
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
                    key={star}
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
                  <button className="button border-0">
                    {hasReviewed ? "Update Review" : "Submit Review"}
                  </button>
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
