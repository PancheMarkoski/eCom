import React, { useEffect, useState } from "react";
import CustomInput from "../../components/Admin/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import {
  createProductCategory,
  getProductCategoryById,
  updateProductCategory,
} from "../../features/productCategories/productCategoriesSlice";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
});

const AddProductCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getProductCategoryId = location.pathname.split("/")[3];

  const [initialValues, setInitialValues] = useState({ title: "" });

  useEffect(() => {
    if (getProductCategoryId) {
      dispatch(getProductCategoryById(getProductCategoryId))
        .unwrap()
        .then((productCategory) => {
          setInitialValues({ title: productCategory.category.title }); // Set the fetched productCategory title as initial form values
        })
        .catch((error) => {
          toast.error("Could not fetch productCategory details");
        });
    } else {
      setInitialValues({ title: "" });
    }
  }, [getProductCategoryId, dispatch]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => {
      const action = getProductCategoryId
        ? updateProductCategory({ id: getProductCategoryId, ...values })
        : createProductCategory(values);
      dispatch(action)
        .unwrap()
        .then(() => {
          // Handle success, e.g., show a success toast, navigate away, etc.
          toast.success(
            `Product Category ${
              getProductCategoryId ? "updated" : "added"
            } successfully`
          );
          navigate("/dashboard/list-categories");
        })
        .catch((error) => {
          // Handle error, e.g., show an error toast
          toast.error("An error occurred");
        })
        .finally(() => {
          // Reset the product state after the product creation attempt
          //   dispatch(resetState());
          // Reset Formik form if staying on the same page
          formik.resetForm();
        });
    },
  });

  return (
    <div>
      <h3 className="mb-4  title">
        {getProductCategoryId
          ? "Edit Product Category"
          : "Add Product Category"}
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Product Category"
            id="brand"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>{" "}
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getProductCategoryId
              ? "Edit Product Category"
              : "Add Product Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductCategory;
