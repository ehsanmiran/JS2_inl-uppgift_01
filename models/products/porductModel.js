const req = require('express/lib/request')
const Product = require('./productSchema')


exports.getProducts = async (req, res) => {

  try {
    const data = await Product.find()
    res.status(200).json(data)
  }
  catch (err) {
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: 'Fetching product failed.',
      err
    })
  }


}



exports.getProductByID = (req, res) => {

  Product.exists({ _id: req.params.id }, (err, result) =>{

    if(err) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: 'Unaccepted Request.',
        err
      })
    }

    if(!result) {
      return res.status(404).json({
        statusCode: 404,
        status: false,
        message: 'Product is not found.',
      })
    }

    Product.findOne({ _id: req.params.id})
      .then(data => res.status(200).json(data))
      .catch(err => {
        res.status(500).json({
          statusCode: 500,
          status: false,
          message: err.message || 'Internal Server error.'
        })
      })

  })
}



exports.createProduct = (req, res) => {

  Product.exists({ name: req.body.name }, (err, result) => {         // Kolla om produkt med namn "name" finns redan i DB?

    if(err) {
      return res.status(500),json(err)
    }

    if(result) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: 'This product is already exist.'
      })
    }


    Product.create({
      name:   req.body.name,
      short:  req.body.short,
      desc:   req.body.desc,
      price:  req.body.price,
      image:  req.body.image
    })
    .then(data => {
      res.status(201).json({
        statusCode: 201,
        status: true,
        message: 'The product is created successfully.',
        data
      })
    })
    .catch(err => {
      res.status(500).json({
        statusCode: 500,
        status: false,
        message: 'Product creation FAILED.',
        err
      })
    })
  })

}



exports.updateProduct = (req, res) => {

  Product.exists({ _id: req.params.id }, (err, result) => {

    if(err) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: 'You have made a bad request'
      })
    }

    if(!result) {
      return res.status(404).json({
        statusCode: 404,
        status: false,
        message: 'Product is not found'
      })
    }

    Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(data => {
        res.status(200).json({
          statusCode: 200,
          status: true,
          message: 'Product updated successfully',
          data
        })
      })
      .catch(err => {
        if(err.code === 11000) {
          return res.status(400).json({
            statusCode: 400,
            status: false,
            message: 'A product with that name is already exists',
            err
          })
        }


        res.status(500).json({
          statusCode: 500,
          status: false,
          message: 'Could not update product',
          err
        })

      })

  })

}




exports.deleteProduct = (req, res) => {

  Product.exists({ _id: req.params.id }, (err, result) => {

    if(err) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: 'You have made a bad request.',
      })
    }

    if(!result) {
      return res.status(404).json({
        statusCode: 404,
        status: false,
        message: 'Product is not found.',
      })
    }

    Product.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(200).json({
          statusCode: 200,
          status: true,
          message: 'Product deleted',
        })
      })
      .catch(err => {
        res.status(500).json({
          statusCode: 500,
          status: false,
          message: 'Product not deleted',
          err
        })
      })
  })

}