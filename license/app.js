'use strict'

require('dotenv').config(); 
const express = require("express");  
const bodyparser = require("body-parser"); 
const mongoose = require("mongoose"); 

const app = express(); 
const router= express.Router(); 

//Conecta ao Banco 
mongoose.connect(process.env.MONGODB_URL);  

//Carregando os Models
const Product = require("../src/models/product");  

//Carregando Rotas 
const index = require('../src/routes/index'); 
const products = require('../src/routes/product'); 

app.use(express.json());
app.use(express.urlencoded({extended:true})); 

app.use("/",index);   

app.get("/teste",(req,res)=>{
    res.send("O app.js está funcionando"); 
}); 

router.get("/",(req,res,next)=>{
res.status(200).send({title:"Node App",version:"0.0.1"}); 
});

app.use("/",router); 

app.use("/products",products);  

module.exports = app; 