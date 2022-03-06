const router = require('express').Router();
const productModel = require('../models/products/porductModel');

router.get('/', productModel.getProducts);                             // Get all products

router.get('/:id', productModel.getProductByID);                       // Get one product by id

router.post('/', productModel.createProduct);                          // Create a new product

// router.patch('/:id')                                                // Update a product

router.delete('/:id', productModel.deleteProduct);                     // Delete a product


module.exports = router;