'use strict'

require('dotenv').config(); 
const express = require("express");  
const bodyparser = require("body-parser"); 
const mongoose = require("mongoose"); 

const app = express(); 
const router= express.Router(); 

//Conecta ao Banco 
mongoose.connect(process.env.MONGO_URL);  

//Carregando os Models
const Product = require("../src/models/product");  

//Carregando Rotas 
const index = require('../src/routes/index'); 
const products = require('../src/routes/product'); 

app.use(bodyparser.json()); 
app.use(bodyparser.urlencoded({extended:false})); 

app.use("/",index);   
app.use("/products",products);  




module.exports = app; 