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
router.get("/getAllProducts", verifyUser, getAllProducts);
//GET ONE PRODUCT
router.get("/getProduct/:id", verifyUser, getSingleProduct);

//ADMIN*************************************************************************

//CREATE A PRODUCT
router.post(
  "/admin/createProduct",
  verifyUser,
  verifyAdmin,
  createproductValidationRules(),
  createProduct
);
//UPDATE A PRODUCT
router.patch(
  "/admin/updateProduct/:id",
  verifyUser,
  verifyAdmin,
  updateproductValidationRules(),
  updateProduct
);
//DELETE A PRODUCT
router.delete(
  "/admin/deleteProduct/:id",
  verifyUser,
  verifyAdmin,
  deleteProduct
);

module.exports = router;
