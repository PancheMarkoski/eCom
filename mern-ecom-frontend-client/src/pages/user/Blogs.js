import React, { useEffect } from "react";
import Meta from "../../components/Meta";
import BreadCrumb from "../../components/BreadCrumb";
import BlogCard from "../../components/BlogCard";
import Container from "../../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../../features/blog/blogSlice";
import "../../styles/blogs.css";

const Blog = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogs);

  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);

  return (
    <>
      <Meta title="Blogs" />
      <BreadCrumb title="Blogs" />

      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Shop By Categories</h3>
              <div>
                <ul className="ps-0">
                  <li>Watch</li>
                  <li>Tv</li>
                  <li>Camera</li>
                  <li>Laptop</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="row">
              {blogs?.map((blog) => {
                return (
                  <div className="col-6 mb-3" key={blog._id}>
                    <BlogCard data={blog} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Blog;
