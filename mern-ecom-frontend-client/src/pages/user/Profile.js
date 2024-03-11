import React, { useEffect, useState } from "react";
import Meta from "../../components/Meta";
import BreadCrumb from "../../components/BreadCrumb";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import * as yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../features/user/userSlice";
import { toast } from "react-toastify";

let schema = yup.object().shape({
  firstName: yup.string().required("First Name is Required"),
  lastName: yup.string().required("Last Name is Required"),
  email: yup.string().required("Email is Required"),
  mobile: yup.string().required("Mobile is Required"),
});

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setInitialValues({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        mobile: user.mobile || "",
        password: user.password || "",
      });
    }
  }, [user]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(updateUser(values))
        .unwrap()
        .then(() => {
          // Handle successful logout, e.g., show a toast notification
          toast.success("Update profile successfuly!");
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            toast.error(error.response.data.message);
          } else {
            toast.error("Oops! Something went wrong, ");
          }
          // Reset form with initialValues from before the submit attempt
          formik.resetForm({ values: initialValues });

          console.error("Login failed:", error);
        });

      setIsEditing(false);
    },
  });

  return (
    <>
      <Meta title={"Profile"} />
      <BreadCrumb title={"Profile"} />
      <Container className="store-wrapper home-wrapper-2 py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="profile-edit mb-4 d-flex justify-content-between align-items-center">
              <h2>Update Profile</h2>
              <Button
                variant={isEditing ? "secondary" : "primary"}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </div>
            <Form onSubmit={formik.handleSubmit}>
              {/* Repeat the pattern below for each form field */}
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter First Name"
                  name="firstName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  disabled={!isEditing}
                  isInvalid={
                    !!formik.errors.firstName && formik.touched.firstName
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Last Name"
                  name="lastName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  disabled={!isEditing}
                  isInvalid={
                    !!formik.errors.lastName && formik.touched.lastName
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Email Name"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  disabled={!isEditing}
                  isInvalid={!!formik.errors.email && formik.touched.email}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="mobile">
                <Form.Label>Mobile No.</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Mobile Name"
                  name="mobile"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mobile}
                  disabled={!isEditing}
                  isInvalid={!!formik.errors.mobile && formik.touched.mobile}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.mobile}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Update password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  disabled={!isEditing}
                  isInvalid={
                    !!formik.errors.password && formik.touched.password
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              {/* Repeat for lastName, email, and mobile with respective changes */}

              <Button
                variant="primary"
                type="submit"
                disabled={!isEditing}
                className="mt-3"
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
