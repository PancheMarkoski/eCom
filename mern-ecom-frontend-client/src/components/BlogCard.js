import React from "react";
import { Link } from "react-router-dom";
import { stripHtmlTags } from "../utils/helperFunctions/stripHtmlTags";
import "../styles/blogCard.css";

const BlogCard = ({ data }) => {
  const createdAtDate = new Date(data?.createdAt);

  const formattedDate = createdAtDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="blog-card">
      <div className="card-image">
        <img
          src={data?.images[0]?.url}
          alt="Blog"
          className="img-fluid w-100"
        />
      </div>
      <div className="blog-content">
        <p className="date">{formattedDate}</p>
        <h5 className="title">{data?.title}</h5>
        <p className="desc">{stripHtmlTags(data?.description)}</p>
        <Link to={`/blog/${data?._id}`} className="button">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
