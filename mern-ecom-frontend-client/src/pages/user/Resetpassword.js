import React, { useState } from "react";
import Meta from "../../components/Meta";
import BreadCrumb from "../../components/BreadCrumb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import * as yup from "yup";
import { useFormik } from "formik";
import { resetPassword } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

let schema = yup.object().shape({
  password: yup.string().required("Password is Required"),
  confpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is Required"),
});

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.pathname.split("/").pop();

  const [initialValues, setInitialValues] = useState({
    password: "",
    confpassword: "",
  });

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => {
      const resetPasswordData = {
        password: values.password,
        token: token,
      };

      dispatch(resetPassword(resetPasswordData))
        .unwrap()
        .then(() => {
          toast.success("Password reset successfully.");
          navigate("/login");
        })
        .catch((error) => {
          toast.error("An error occurred during password reset.");
        })
        .finally(() => {
          formik.resetForm();
        });
    },
  });

  return (
    <>
      <Meta title={"Reset Password"} />
      <BreadCrumb title={"Reset Password"} />
      <Container className="login-wrapper py-5 home-wrapper-2">
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="auth-card p-4">
              <h3 className="text-center mb-3">Reset Password</h3>
              <Form
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-3"
              >
                <Form.Group controlId="password">
                  <Form.Label visuallyHidden>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="New Password"
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

                <Form.Group controlId="confpassword">
                  <Form.Label visuallyHidden>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confpassword"
                    placeholder="Confirm Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confpassword}
                    isInvalid={
                      !!formik.errors.confpassword &&
                      formik.touched.confpassword
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.confpassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex justify-content-center gap-2 align-items-center">
                  <Button variant="primary" type="submit" className="w-100">
                    Ok
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

export default ResetPassword;
