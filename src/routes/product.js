'use strict' 

const express = require("express"); 
const routes = express.Router(); 
const controller = require('../controllers/product.controler'); 

routes.get("/",controller.get); 
routes.get("/:slug",controller.getBySlug); 
routes.get("/admin/:id",controller.getById); 
routes.get("/tags/:tag",controller.getByTag); 
routes.post("/", controller.post);
routes.put("/:id",controller.put);
routes.delete("/:id",controller.delete); 

module.exports = routes; 
