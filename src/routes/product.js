'use strict' 

const express = require("express"); 
const routes = express.Router(); 
const controller = require('../controllers/product.controler'); 

routes.post("/", controller.post);
routes.put("/:id",controller.put);
routes.delete("/",controller.delete); 

module.exports = routes; 
