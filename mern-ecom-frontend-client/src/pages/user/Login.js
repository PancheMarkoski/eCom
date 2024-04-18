import React from "react";
import Meta from "../../components/Meta";
import BreadCrumb from "../../components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { userLogin } from "../../features/user/userSlice";
import { toast } from "react-toastify";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .nullable()
    .email("Invalid email")
    .required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(userLogin(values))
        .unwrap()
        .then(() => {
          toast.success("You're logged in!");
          navigate("/");
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            toast.error(error.response.data.message);
          } else {
            toast.error("Login failed. Please try again.");
          }
        });
    },
  });

  return (
    <>
      <Meta title={"Login"} />
      <BreadCrumb title={"Login"} />
      <Container className="login-wrapper py-5 home-wrapper-2">
        <Row>
          <Col xs={12}>
            <div className="auth-card">
              <h3 className="text-center mb-3">Login</h3>
              <Form
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-3"
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

                <Form.Group controlId="password">
                  <Form.Label visuallyHidden>Password</Form.Label>
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

                <div className="text-center">
                  <Link to="/forgot-password" className="d-block mb-3">
                    Forgot Password?
                  </Link>
                  <Button variant="primary" type="submit" className="me-2">
                    Login
                  </Button>
                  <Link to="/signup" className="btn btn-secondary">
                    SignUp
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

export default Login;
