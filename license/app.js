'use strict'

const express = require("express");  
const bodyparser = require("body-parser"); 
const moongose = require("mongoose"); 

const app = express(); 
const router= express.Router(); 

//Conecta ao Banco 
moongose.connect(process.env.MONGO_URL);  

//Carregando Rotas 
const index = require('../src/routes/index'); 
const products = require('../src/routes/product'); 

app.use(bodyparser.json()); 
app.use(bodyparser.urlencoded({extended:false})); 

app.use("/",index);   
app.use("/products",products);  




module.exports = app; 