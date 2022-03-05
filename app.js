const express = require('express');     //hämta hem express.
const app = express();                  //initialisera express i en variabel och kör den som en function.

const productController = require('./controllers/productController')

// MIDDLEWARE



//CONTROLLERS

app.use('/api/products', productController)


module.exports = app                    //skickar ut för att importera den i server.js. Vi behöva lysna på ändringar på app.