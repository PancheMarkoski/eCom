import React from "react";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";

const Review = () => {
  const reviewData = useSelector((state) => state?.products?.product?.ratings);

  return (
    <div className="reviews mt4">
      {reviewData?.map((review) => {
        const reactStarsKey = `react-stars-${review._id}-${review.star}`;

        return (
          <div className="review mt-3" key={review._id}>
            <div className="d-flex gap-10 align-items-center justify-content-space-between">
              <h6 className="mb-0">{review?.postedBy?.firstname}</h6>
              <ReactStars
                key={reactStarsKey}
                styles={{ flexGrow: "1" }}
                count={5}
                size={24}
                value={review?.star}
                edit={false}
                activeColor="#ffd700"
              />
              <div
                style={{
                  flexShrink: "3",
                  marginTop: "1rem",
                  lineHeight: "1.6",
                  maxWidth: "80%",
                  margin: "auto",
                }}
              >
                {review?.comment}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Review;
