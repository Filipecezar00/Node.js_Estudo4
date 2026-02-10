'use strict'
const express = require("express");  
const bodyparser = require("body-parser"); 

const app = express(); 
const router= express.Router(); 

app.use(bodyparser.json()); 
app.use(bodyparser.urlencoded({extended:false})); 

router.get("/",(req,res,next)=>{
    res.status(200).send({
        title:'Node Store', 
        version:"0.0.1" 
    }); 
}); 

router.post("/",(req,res,next)=>{
    res.send(req.body); 
}); 


app.use("/",router);  
app.use("/products",create); 

module.exports = app; 