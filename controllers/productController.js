const router = require('express').Router();
const productModel = require('../models/products/porductModel');
const auth = require('../authentication/auth');


router.get('/', productModel.getProducts);                             // Get all products

router.get('/:id', productModel.getProductByID);                       // Get one product by id

router.post('/', auth.verifyToken, productModel.createProduct);                          // Create a new product

router.put('/:id', auth.verifyToken, productModel.updateProduct);                        // Update a product - we could use "put" instead as well.

router.delete('/:id', auth.verifyToken, productModel.deleteProduct);                     // Delete a product



module.exports = router;