    const  {body}  = require("express-validator");
    const createproductValidationRules = () => {
        return [
        body('name').notEmpty().withMessage('Please provide product name').trim(),
  
        
        body('description').notEmpty().withMessage('Please provide description'),
 
        
        body('price')
            .notEmpty()
            .withMessage('Please provide price')
            .isNumeric()
            .withMessage('Price must be a number')
            .isLength({ max: 8 })
            .withMessage('Price cannot exceed 8 digits'),


        body('images')
            .notEmpty()
            .withMessage('Please provide at least one image')
            .isArray({ min: 1 })
            .withMessage('Please provide at least one image'),


        body('images.*.url').notEmpty().withMessage('Please provide URL'),


        body('category').notEmpty().withMessage('Please enter product category'),


        body('stock')
            .notEmpty()
            .withMessage('Please enter product stock amount')
            .isNumeric()
            .withMessage('Stock must be a number'),


        body('numberOfReviews').optional().isNumeric().withMessage('Number of reviews must be a number'),


        body('reviews').optional().isArray().withMessage('Reviews must be an array'),


        body('reviews.*.name').notEmpty().withMessage('Name is required for each review'),


        body('reviews.*.rating')
            .notEmpty()
            .withMessage('Rating is required for each review')
            .isNumeric()
            .withMessage('Rating must be a number'),


        body('reviews.*.comment').notEmpty().withMessage('Comment is required for each review'),
        ];
    };
    


    const updateproductValidationRules = () => {
        return [
        body('name').optional().notEmpty().withMessage('Please provide product name').trim(),
  
        
        body('description').optional().notEmpty().withMessage('Please provide description'),
 
        
        body('price')
            .optional()
            .notEmpty()
            .withMessage('Please provide price')
            .isNumeric()
            .withMessage('Price must be a number')
            .isLength({ max: 8 })
            .withMessage('Price cannot exceed 8 digits'),


        body('images')
            .optional()
             .notEmpty()
            .withMessage('Please provide at least one image')
            .isArray({ min: 1 })
            .withMessage('Please provide at least one image'),


        body('images.*.url').optional().notEmpty().withMessage('Please provide URL'),


        body('category').optional().notEmpty().withMessage('Please enter product category'),


        body('stock')
            .optional()
            .notEmpty()
            .withMessage('Please enter product stock amount')
            .isNumeric()
            .withMessage('Stock must be a number'),


        body('numberOfReviews').optional().isNumeric().withMessage('Number of reviews must be a number'),


        body('reviews').optional().isArray().withMessage('Reviews must be an array'),


        body('reviews.*.name').notEmpty().withMessage('Name is required for each review'),


        body('reviews.*.rating')
            .notEmpty()
            .withMessage('Rating is required for each review')
            .isNumeric()
            .withMessage('Rating must be a number'),


        body('reviews.*.comment').notEmpty().withMessage('Comment is required for each review'),
        ];
    };

    module.exports = {createproductValidationRules,updateproductValidationRules};