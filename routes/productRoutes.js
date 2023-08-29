const express = require("express");
const router = express.Router();
const { verifyUser, verifyAdmin } = require("../middlewares/tokenMW");
const {
  createproductValidationRules,
  updateproductValidationRules,
} = require("../middlewares/productMW");
const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/ProductControllers");
//USER***************************************************************************

//GET ALL PRODUCTS
router.get("/", verifyUser, getAllProducts);
//GET ONE PRODUCT
router.get("/:id", verifyUser, getSingleProduct);

//ADMIN*************************************************************************

//CREATE A PRODUCT
router.post(
  "/admin",
  verifyUser,
  verifyAdmin,
  createproductValidationRules(),
  createProduct
);
//UPDATE A PRODUCT
router.patch(
  "/:id",
  verifyUser,
  verifyAdmin,
  updateproductValidationRules(),
  updateProduct
);
//DELETE A PRODUCT
router.delete(
  "/:id",
  verifyUser,
  verifyAdmin,
  deleteProduct
);

module.exports = router;
