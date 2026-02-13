'use strict'
const express = require("express");  
const bodyparser = require("body-parser"); 

const app = express(); 
const router= express.Router(); 

app.use(bodyparser.json()); 
app.use(bodyparser.urlencoded({extended:false})); 


const create = router.post("/",(req,res,next)=>{
    res.send(req.body); 
}); 

const put = router.put("/:id",(req,res,next)=>{
    const id = req.params.id; 
    res.status(200).send({id:id, item:req.body}); 
}); 

const del = router.delete("/:id",(req,res)=>{
    const id = req.params.id; 
    res.status(200).send(id) 
});

app.use("/",router);  
app.use("/products",create); 
app.use("/:id",put); 

module.exports = app; 