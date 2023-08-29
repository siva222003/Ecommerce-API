const Product = require('../models/productModel');
const { validationResult } = require('express-validator'); 

//Get All Products
exports.getAllProducts = async (req,res)=>
{
    try{
        const response = await Product.find({});
        res.status(200).json(response);
    }catch(err){
        console.log(err.message);
        res.status(500).json({"error" : err.message});
    }

}

//Get Single Product
exports.getSingleProduct = async (req,res)=>
{
    try{
        const {_id} = req.params;
        const response = await Product.findById({_id});
        if(!response){
            res.status(400).json({"error" : "couldn't find the product"})
        }
        res.status(200).json(response);
    }catch(err){
        console.log(err.message);
        res.status(500).json({"error" : err.message});
    }

}


//ADMIN --- CREATE PRODUCT
exports.createProduct = async (req,res)=>
{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const data = req.body;
        const product = new Product(data)
        const response = await product.save();
        res.status(200).json(response);
    }catch(err){
        console.log(err.message);
        res.status(500).json({"error" : err.message});
    }
}



//ADMIN --- UPDATE PRODUCT
exports.updateProduct = async (req,res)=>
{
    try{
        const {_id} = req.params;
        const product = await Product.findById({_id});
        if(!product){
            res.status(400).json({"error" : "couldn't find the product"})
        }
        const response = await Product.findByIdAndUpdate({_id},{new:true});
        res.status(200).json(response);
    }catch(err){
        console.log(err.message);
        res.status(500).json({"error" : err.message});
    }

}

//ADMIN --- DELETE PRODUCT
exports.deleteProduct = async (req,res)=>
{
    try{
        const { id } = req.params;
        const result = await Product.findOne({ _id: id });
        if (!result) return res.status(400).json({ error: "Couldn't find the product" });
        const response = await Product.findByIdAndDelete({_id : id});
        res.status(200).json({"message" : "product deleted successfully",response});
    }catch(error){
        console.error(error);
      res.status(500).json({ error: "An error occurred." }); 
    }
}