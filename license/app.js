'use strict'
const express = require("express") 
const app = express(); 
const router= express.Router() 

router.get("/",(req,res,next)=>{
    res.status(200).send({
        title:'Node Store', 
        version:"0.0.1" 
    }); 
}); 

app.use("/",router);  
module.exports = app; 