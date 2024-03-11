import React, { useEffect } from "react";
import Meta from "../../components/Meta";
import BreadCrumb from "../../components/BreadCrumb";
import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import blog from "../../images/blog-1.jpg";
import Container from "../../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getBlog } from "../../features/blog/blogSlice";
import { stripHtmlTags } from "../../utils/helperFunctions/stripHtmlTags";

const SingleBlog = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const blogId = location.pathname.split("/").pop();
  const blogData = useSelector((state) => state.blogs.blog);

  useEffect(() => {
    dispatch(getBlog(blogId));
  }, [blogId]);

  return (
    <>
      <Meta title={"dynamic blog name"} />
      <BreadCrumb title={"dynamic blog name"} />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="single-blog-card">
              <Link to={"/blogs"} className="d-flex align-items-center">
                <HiOutlineArrowLeft /> Go back to Blogs
              </Link>
              <h3>{blogData?.title}</h3>
              <img
                src={blogData?.images[0]?.url}
                className="img-fluid w-100 my-4 uniform-image-size"
                alt="Blog Image"
              />
              <p>{stripHtmlTags(blogData?.description)}</p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleBlog;
