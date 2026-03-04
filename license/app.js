"use strict";

exports.put = (req, res, next) => {
  console.log("Alvo localizado no Radar:", req.params.id);
  console.log("Carga Recebida", req.body);
};

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const router = express.Router();

//Conecta ao Banco
mongoose.connect(process.env.MONGODB_URL);

//Carregando os Models
const Product = require("../src/models/product");
const Customer = require("../src/models/customer");
const Order = require("../src/models/order");

//Carregando Rotas
const index = require("../src/routes/index.js");
const Products = require("../src/routes/product.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", index);

app.get("/teste", (req, res) => {
  res.send("O app.js está funcionando");
});

app.use("/", router);

app.use("/products", Products);

module.exports = app;
