import React, { useState } from "react";
import Meta from "../../components/Meta";
import BreadCrumb from "../../components/BreadCrumb";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import * as yup from "yup";
import { useFormik } from "formik";
import { forgotPasswordEmailSend } from "../../features/user/userSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

let schema = yup.object().shape({
  email: yup.string().required("Email is Required"),
});

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const [initialValues, setInitialValues] = useState({
    email: "",
  });

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(forgotPasswordEmailSend(values))
        .unwrap()
        .then(() => {
          toast.success(
            "Check your inbox! We've just emailed you instructions to reset your password."
          );
        })
        .catch((error) => {
          console.log({ error });
          toast.error("An error occurred ");
        })
        .finally(() => {
          formik.resetForm();
        });
    },
  });

  return (
    <>
      <Meta title={"Forgot Password"} />
      <BreadCrumb title={"Forgot Password"} />
      <Container className="login-wrapper py-5 home-wrapper-2">
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="auth-card p-4">
              <h3 className="text-center mb-3">Reset Your Password</h3>
              <p className="text-center my-2 mb-3">
                We will send you an email to reset your password.
              </p>

              <Form
                className="d-flex flex-column gap-3"
                onSubmit={formik.handleSubmit}
              >
                <Form.Group controlId="email">
                  <Form.Label visuallyHidden>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    isInvalid={!!formik.errors.email && formik.touched.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex flex-column align-items-center gap-2">
                  <Button variant="primary" type="submit" className="w-100">
                    Submit
                  </Button>
                  <Link to="/login" className="text-center w-100">
                    Cancel
                  </Link>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ForgotPassword;
