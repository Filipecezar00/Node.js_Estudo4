'use strict' 

const express = require("express"); 
const routes = express.Router(); 

routes.post("/",(req,res,next)=>{
    res.status(200).send(req.body); 
}); 

routes.put("/:id",(req,res)=>{
    const id = req.params.id 
    res.send({id:id,item:req.body}).status(200);
});

routes.delete("/:id",(req,res)=>{
    const id = req.params.id 
    res.send(id).status(200);
}); 

module.exports = routes; 
