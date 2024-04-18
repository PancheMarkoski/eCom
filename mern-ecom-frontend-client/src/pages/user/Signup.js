import React from "react";
import Meta from "../../components/Meta";
import BreadCrumb from "../../components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { userRegister } from "../../features/user/userSlice";
import { toast } from "react-toastify";

const signupSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is Required"),
  lastName: Yup.string().required("Last Name is Required"),
  email: Yup.string()
    .nullable()
    .email("Invalid email")
    .required("Email is Required"),
  mobile: Yup.string().required("Mobile No is Required"),
  password: Yup.string().required("Password is Required"),
});

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      dispatch(userRegister(values))
        .unwrap()
        .then(() => {
          toast.success("Registration successful!");
          navigate("/");
        })
        .catch((error) => {
          toast.error(error.message || "Registration failed");
        });
    },
  });

  return (
    <>
      <Meta title={"Signup"} />
      <BreadCrumb title={"Signup"} />
      <Container className="login-wrapper py-5 home-wrapper-2">
        <Row>
          <Col xs={12}>
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              <Form
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-3"
              >
                <Form.Group controlId="firstName">
                  <Form.Label visuallyHidden>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    isInvalid={
                      !!formik.errors.firstName && formik.touched.firstName
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="lastName">
                  <Form.Label visuallyHidden>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                    isInvalid={
                      !!formik.errors.lastName && formik.touched.lastName
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label visuallyHidden>First Name</Form.Label>
                  <Form.Control
                    type="text"
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

                <Form.Group controlId="mobile">
                  <Form.Label visuallyHidden>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    placeholder="Moblie"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.mobile}
                    isInvalid={!!formik.errors.mobile && formik.touched.mobile}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.mobile}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label visuallyHidden>First Name</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    isInvalid={
                      !!formik.errors.password && formik.touched.password
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="mt-3 d-flex justify-content-center gap-2 align-items-center">
                  <Button variant="primary" type="submit">
                    SignUp
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Signup;
