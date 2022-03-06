const User = require('./userSchema');


exports.registerUser = (req, res) => {


  User.exists({ email: req.body.email }, (err, result) => {

    if(err) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: 'Bad request',
      })
    }


    if(result) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        Message: 'This emails is already registered',

      })
    }

  })

}