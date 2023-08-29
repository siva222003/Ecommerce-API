    const User = require("../models/userModel");
    const Product = require('../models/productModel');
    const { validationResult } = require("express-validator");

    // Posting a review
    exports.postReview = async (req,res) =>
    {
        try{
            // Validations Error Handling
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });   
            }
            
            //Finding User for adding in the review
            const _id = req.id;
            const user = await User.findById({_id}).select("-password");
            if(!user){
                res.status(400).json({"error" : "couldn't find user"});
            }
            //Making review
            const {rating,comment} = req.body;
            const review = 
                {
                user : user._id,
                name : user.name,
                rating,
                comment
            }
            //Finding product by id and adding review
            const {id} = req.params;
            const response = await Product.findByIdAndUpdate({_id : id}, { $push: { reviews: review } },{new : true});
            if(!response){
                res.status(400).json({"error" : "couldn't find product"});
            }
            res.status(200).json(response);

        }catch(err){
            res.status(500).json({"error" : err.message});
        }
    }

    //Get All Reviews

    exports.getAllReviews = async (req,res) =>
    {
        try{   
            //Finding product by id
            const {id} = req.params;
            const response = await Product.findById({_id : id}).select('reviews');
            if(!response){
                res.status(400).json({"error" : "couldn't find product"});
            }
            res.status(200).json(response);

        }catch(err){
            res.status(500).json({"error" : err.message});
        }
    }

    //Get Single Review --- (Review Id)

    exports.getSingleReviews = async (req,res) =>
    {
        try{   
            //Finding product by id
            const {id} = req.params;
            const product = await Product.findOne({_id : id}).select('reviews');
            if(!product){
                res.status(400).json({"error" : "couldn't find product"});
            }
            const {reviewId} = req.query;
            const review = product.reviews.find((item) => item._id.toString() === reviewId.toString());
            if(!review){
                res.status(400).json({"error" : "couldn't find review"});
            }
            res.status(200).json(review);

        }catch(err){
            res.status(500).json({"error" : err.message});
        }
    }

    //Update a Review

    exports.updateReview = async (req, res) => {
        try {
         //Finding product by id
          const { id } = req.params;
          const product = await Product.findOne({ _id: id }).select('reviews'); 
          if (!product) {
            return res.status(400).json({ error: "Couldn't find product" });
          }
           
          //Finding review by Id
          const { reviewId } = req.query;
          const review = product.reviews.find((item) => item._id.toString() === reviewId.toString());  
          if (!review) {
            return res.status(400).json({ error: "Couldn't find review" });
          }
          //Deleting Previous Review and updating review array
          if(req.body.rating){
            review.rating = req.body.rating;
          }
          if(req.body.comment){
            review.comment = req.body.comment;
          }
          const newreviewArray = product.reviews.filter((item) => item._id.toString() !== reviewId.toString());

          //Pushing the Updated review
          newreviewArray.push(review);
          
          //Updating the array in the database
          const response = await Product.findByIdAndUpdate(id, { reviews: newreviewArray }, { new: true });
          res.status(200).json(response);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      };
      


      exports.deleteReview = async (req, res) => {
        try {
           //Finding product by id
           const { id } = req.params;
           const product = await Product.findOne({ _id: id }).select('reviews'); 
           if (!product) {
             return res.status(400).json({ error: "Couldn't find product" });
           }
            
           //Finding review by Id
           const { reviewId } = req.query;
           const review = product.reviews.find((item) => item._id.toString() === reviewId.toString());  
           if (!review) {
             return res.status(400).json({ error: "Couldn't find review" });
           }
          
           //Deleting Previous Review and updating review array
          const newreviewArray = product.reviews.filter((item) => item._id.toString() !== reviewId.toString());
          
          //Updating the array in the database
          const response = await Product.findByIdAndUpdate(id, { reviews: newreviewArray }, { new: true });      
          res.status(200).json(response);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      };
      