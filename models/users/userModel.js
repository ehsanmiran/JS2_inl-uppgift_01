const User = require('./userSchema');
const bcrypt = require('bcryptjs');
const auth = require('../../authentication/auth');


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

    const salt = bcrypt.genSaltSync(10);
    bcrypt.hash(req.body.password, salt, (err, hash) =>{
      
      if(err) {
        return res.status(500).json({
          statusCode: 500,
          status: false,
          message: 'Password encryption failed',
          err
        })
      }

/*       res.json({
        password: req.body.password,
        salt,
        passwordHash: hash,
      })
 */

      // --- Create a User account ----
      User.create({
        firstName:       req.body.firstName,
        lastName:        req.body.lastName,
        email:           req.body.email,
        passwordHash:    hash
      })
      .then(user => {
        res.status(201).json({
          statusCode: 201,
          status: true,
          message: 'User successfully created',
          token: auth.generateToken(user)
        })
      })
      .catch(err => {
        res.status(500).json({
          statusCode: 500,
          status: false,
          message: 'Unable to create user',
          err
        })
      })

    })



  })

}

// ---- Log in for already registered user ---
// ---- to log in we need to compare the posted email address with the already registered email address and saved with a password. if the two values are related then the log in prossess will success


exports.loginUserWithEmailAndPassword = (req, res) => {

  User.findOne({ email: req.body.email }, (err, user) => {

    if(err) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: 'Bad Request!!',
        err
      })
    }

    if(!user) {
      return res.status(401).json({
        statusCode: 401,
        status: false,
        message: 'Incorrect email or password',
        err
      })
    }

    bcrypt.compare(req.body.password, user.passwordHash, (err, result) => {

      if(err) {
        return res.status(500).json({
          statusCode: 500,
          status: false,
          message: 'Password decryption unsucceeded',
        })
      }

      if(!result) {
        return res.status(401).json({
          statusCode: 401,
          status: false,
          message: 'Incorrect email or password',
        })
      }


      return res.status(200).json({
        statusCode: 200,
        status: true,
        message: 'Successful Authentication',
        token: auth.generateToken(user)
      })

    })

  })

}