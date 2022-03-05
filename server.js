const app = require('./app');              //hämta hem app.
const mongoose = require('mongoose');      //hämta hem mongoose för att koppla upp mot database.
require('dotenv').config();                //köra bara config function som kommer med dotenv för att kunna läsa .env file.

//att köra igång app.
const PORT = process.env.PORT || 9999;     //först vi behöver port nr. skappa variable PORT inne i .env.

const serverURI = 'http://localhost:' + PORT    //för att använda Porten, spara den i en variable.
const mongoURI = process.env.MONGO_URI

//starta igång servern.
app.listen(PORT, () => console.log('Server' + serverURI))   //lysna på "requests" på port nr 9999

if(!mongoURI) {
  console.log('no Mongo connection found')
} else {
//nu, koppla upp mot database "mongodb.com".
  mongoose.connect(mongoURI, () => console.log('Connected to DB'))
}