'use strict'; 

const mongoose = require("mongoose"); 
const Product = mongoose.model("Product"); 

exports.post = (req,res,next) =>{
    let product = new Product(req.body); 

    product.save()

    .then(x => {
    res.status(200).send({message:"Produto  Cadastrado com Sucesso"}); 
    })
    .catch(e => {
    res.status(400).send("Erro: " + e)  
    }); 
    
}

exports.put = (req,res,next) =>{
    const id = req.params.id
    res.status(200).send({id:id,item:req.body}); 
}

exports.delete = (req,res,next) =>{
    const id = req.params.id 
    res.status(200).send(id);  
}
