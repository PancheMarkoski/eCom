import React, { useState, useEffect } from "react";
import { Modal, Input, Select } from "antd";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

const promotionEditSchema = Yup.object().shape({
  promoImage: Yup.string().required("Promotion Image URL is required"),
  promoTag: Yup.string().required("Promotion Tag is required"),
  promoType: Yup.string().required("Promotion Type is required"),
});

const PromotionEditModal = ({
  openPromotionModal,
  hidePromotionModal,
  promoteProductId,
  onPromoteProduct,
  onUpdatePromotedProduct,
  isEditingPromotion,
  existingPromotionData,
}) => {
  const formik = useFormik({
    initialValues: {
      promoImage: existingPromotionData.promoImage || "",
      promoTag: existingPromotionData.promoTag || "",
      promoType: existingPromotionData.promoType || "main",
    },
    validationSchema: promotionEditSchema,
    onSubmit: (values) => {
      const action = isEditingPromotion
        ? onUpdatePromotedProduct
        : onPromoteProduct;

      action({ ...values, promoteProductId })
        .unwrap()
        .then((response) => {
          toast.success(
            `Product ${
              isEditingPromotion ? "updated" : "promoted"
            } successfully!`
          );
          hidePromotionModal();
        })
        .catch((error) => {
          // Now `error` will contain whatever you've passed to `rejectWithValue`
          const errorMessage =
            error?.message || "An error occurred. Please try again.";
          toast.error(errorMessage);
        });
    },
  });

  // Use useEffect to update Formik's initialValues when existingPromotionData changes
  useEffect(() => {
    formik.resetForm({
      values: {
        promoImage: existingPromotionData.promoImage || "",
        promoTag: existingPromotionData.promoTag || "",
        promoType: existingPromotionData.promoType || "main",
      },
    });
  }, [existingPromotionData]);

  return (
    <Modal
      title="Edit Promotion Details"
      open={openPromotionModal}
      onOk={formik.handleSubmit}
      onCancel={hidePromotionModal}
      okText="Save"
      cancelText="Cancel"
    >
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="promoImage">Promotion Image URL:</label>
          <Input
            id="promoImage"
            name="promoImage"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.promoImage}
          />
          {formik.touched.promoImage && formik.errors.promoImage ? (
            <div style={{ color: "red" }}>{formik.errors.promoImage}</div>
          ) : null}
        </div>
        <div style={{ marginTop: "10px" }}>
          <label htmlFor="promoTag">Promotion Tag:</label>
          <Input
            id="promoTag"
            name="promoTag"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.promoTag}
          />
          {formik.touched.promoTag && formik.errors.promoTag ? (
            <div style={{ color: "red" }}>{formik.errors.promoTag}</div>
          ) : null}
        </div>
        <div style={{ marginTop: "10px" }}>
          <label htmlFor="promoType">Promotion Type:</label>
          <Select
            id="promoType"
            name="promoType"
            onChange={(value) => formik.setFieldValue("promoType", value)}
            value={formik.values.promoType}
          >
            <Select.Option value="main">Main</Select.Option>
            <Select.Option value="famous">Famous</Select.Option>
          </Select>
          {formik.touched.promoType && formik.errors.promoType ? (
            <div style={{ color: "red" }}>{formik.errors.promoType}</div>
          ) : null}
        </div>
      </form>
    </Modal>
  );
};

export default PromotionEditModal;
