import express from "express";
const router = express.Router();

import {
  demoteProduct,
  getPromotedProducts,
  promoteProduct,
  updatePromotedProduct,
  updatePromotedProductTheme,
} from "../controllers/promotedProductController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

router.route("/").get(getPromotedProducts);

router
  .route("/:id")
  .post(protect, admin, checkObjectId, promoteProduct)
  .put(protect, admin, checkObjectId, updatePromotedProduct)
  .delete(protect, admin, checkObjectId, demoteProduct);

router.put("/theme/:id", updatePromotedProductTheme);

export default router;
