const Product = require('./productSchema')





exports.createProduct = (req, res) => {

  Product.exists({ name: req.body.name }, (err, result) => {         // Kolla om produkt med namn "name" finns redan i DB?

    if(err) {
      return res.status(500),json(err)
    }

    if(result) {
      return res.status(400.json({
        statusCode: 400,
        status: false,
        message: 'This product is already exist.'
      }))
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
}