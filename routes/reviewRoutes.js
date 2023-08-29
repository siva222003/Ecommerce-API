const express = require("express");
const router = express.Router();
const { verifyUser } = require("../middlewares/tokenMW");
const {updateproductValidationRules} = require('../middlewares/productMW');
const {postReview,getAllReviews,getSingleReviews,updateReview,deleteReview} = require('../controllers/reviewControllers');
//Post a review --- USER ONLY
router.post('/:id',verifyUser,updateproductValidationRules(),postReview);
//Get All Reviews 
router.get('/:id',verifyUser,getAllReviews);
//Get Single Review (Review Id)
router.get('/:id',verifyUser,getSingleReviews);
//Update a Review
router.patch('/:id',verifyUser,updateproductValidationRules(),updateReview);
//Delete a Review
router.delete('/:id',verifyUser,deleteReview);


module.exports = router;