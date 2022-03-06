const express = require('express');     //hämta hem express.
const app = express();                  //initialisera express i en variabel och kör den som en function.
const cors = require('cors');

const productController = require('./controllers/productController');
const userController = require('./controllers/userController');

// MIDDLEWARE

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//CONTROLLERS

app.use('/api/products', productController);
app.use('/api/users', userController);


module.exports = app                    //skickar ut för att importera den i server.js. Vi behöva lysna på ändringar på app.