const express = require("express");
const router = express.Router();
const { verifyUser } = require("../middlewares/tokenMW");
const {updateproductValidationRules} = require('../middlewares/productMW');
const {postReview,getAllReviews,getSingleReviews,updateReview,deleteReview} = require('../controllers/reviewControllers');
//Post a review --- USER ONLY
router.post('/postReview/:id',verifyUser,updateproductValidationRules(),postReview);
//Get All Reviews 
router.get('/getAllReviews/:id',verifyUser,getAllReviews);
//Get Single Review (Review Id)
router.get('/getSingleReview/:id',verifyUser,getSingleReviews);
//Update a Review
router.patch('/updateReview/:id',verifyUser,updateproductValidationRules(),updateReview);
//Delete a Review
router.delete('/deleteReview/:id',verifyUser,deleteReview);


module.exports = router;