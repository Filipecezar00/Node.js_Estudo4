'use strict' 

const express = require("express"); 
const routes = express.Router(); 
const controller = require('../controllers/product.controler'); 

routes.post("/", controller.post);

routes.put("/:id",(req,res)=>{});

routes.delete("/:id",(req,res)=>{}); 

module.exports = routes; 
