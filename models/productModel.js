const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
      name: {
        type: String
      },
      description: {
        type: String
      },
      price: {
        type: Number
      },
      ratings: {
        type: Number,
        default: 0,
      },
      images: [
        {
          url: {
            type: String,
          }
        }
      ],
      category: {
        type: String,
      },
      stock: {
        type: Number,
        default: 1,
      },
      numberOfReviews: {
        type: Number,
        default: 0,
      },
      reviews: [
        {
          user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
          },
          name: {
            type: String,
          },
          rating: {
            type: Number,
          },
          comment: {
            type: String,
          },
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

  const Product = mongoose.model('Product',productSchema);
  module.exports = Product;



