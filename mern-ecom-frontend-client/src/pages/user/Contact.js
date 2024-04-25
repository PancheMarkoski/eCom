import React, { useState } from "react";
import Meta from "../../components/Meta";
import BreadCrumb from "../../components/BreadCrumb";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import Container from "../../components/Container";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createContact, resetState } from "../../features/contact/contactSlice";
import Spinner from "../../components/Spinner";

let schema = yup.object().shape({
  name: yup.string().required("Name is Required"),
  email: yup.string().required("Email is Required"),
  mobile: yup.string().required("Mobile is Required"),
  comment: yup.string().required("Comment is Required"),
});

const Contact = () => {
  const dispatch = useDispatch();

  const [mapLoading, setMapLoading] = useState(true);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      comment: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createContact(values))
        .unwrap()
        .then(() => {
          // Handle success, e.g., show a success toast, navigate away, etc.
          toast.success(`Message is send successfully`);
          // navigate("/admin/blog-list");
        })
        .catch((error) => {
          // Handle error, e.g., show an error toast
          toast.error("An error occurred");
        })
        .finally(() => {
          // Reset the product state after the product creation attempt
          // dispatch(resetState());
          // Reset Formik form if staying on the same page
          formik.resetForm();
        });
    },
  });

  return (
    <>
      <Meta title="Blogs" />
      <BreadCrumb title="Blogs" />
      <Container class1="contact-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            {mapLoading && <Spinner />}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18..."
              width="600"
              height="450"
              className="border-0 w-100"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setMapLoading(false)}
            />
          </div>
          <div className="col-12 mt-5">
            <div className="contact-inner-wrapper d-flex justify-content-between">
              <div>
                <h3 className="contact-title">Contact</h3>
                <form
                  action=""
                  onSubmit={formik.handleSubmit}
                  className="d-flex flex-column gap-15"
                >
                  <div>
                    <div className="error">
                      {formik.touched.name && formik.errors.name}
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Name"
                      onChange={formik.handleChange("name")}
                      onBlur={formik.handleBlur("name")}
                      value={formik.values.name}
                    />
                  </div>
                  <div>
                    <div className="error">
                      {formik.touched.email && formik.errors.email}
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                      value={formik.values.email}
                      name="email"
                    />
                  </div>
                  <div>
                    <div className="error">
                      {formik.touched.mobile && formik.errors.mobile}
                    </div>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Mobile Number"
                      onChange={formik.handleChange("mobile")}
                      onBlur={formik.handleBlur("mobile")}
                      value={formik.values.mobile}
                      name="mobile"
                    />
                  </div>
                  <div>
                    <div className="error">
                      {formik.touched.comment && formik.errors.comment}
                    </div>
                    <textarea
                      name="comment"
                      className="form-control"
                      cols="30"
                      rows="4"
                      placeholder="Comments"
                      onChange={formik.handleChange("comment")}
                      onBlur={formik.handleBlur("comment")}
                      value={formik.values.comment}
                    />
                  </div>
                  <div>
                    <button type="submit" className="button border-0">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div>
                <h3 className="contact-title">Get in touch with us</h3>
                <div className="ps-0">
                  <li className="mb-3 d-flex gap-15 align-items-center">
                    <AiOutlineHome />
                    <address className="m-0">
                      Near village chopal, Mandaura, Sonipat, Hno:277, Haryana
                    </address>
                  </li>
                  <li className="mb-3 d-flex gap-15 align-items-center">
                    <BiPhoneCall />
                    <p>+91-123-456-7890</p>
                  </li>
                  <li className="mb-3 d-flex gap-15 align-items-center">
                    <AiOutlineMail />
                    <p>navdeepdahiya753@gmail.com</p>
                  </li>
                  <li className="mb-3 d-flex gap-15 align-items-center">
                    <BiInfoCircle />
                    <p>Friday 10 AM - 8 PM</p>
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Contact;
