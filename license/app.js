"use strict";

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const config = require("../src/config.js");
const app = express();
const router = express.Router();

//Conecta ao Banco
mongoose.connect(config.connectionString);

//Carregando os Models
const Product = require("../src/models/product");
const Customer = require("../src/models/customer");
const Order = require("../src/models/order.js");

//Carregando Rotas
const Routeindex = require("../src/routes/index.js");
const RouteProducts = require("../src/routes/product.js");
const RouteCustomer = require("../src/routes/customerRoutes.js");
const RouteOrder = require("../src/routes/orderRoute.js");

app.use(
  express.json({
    limit: "5mb",
  }),
);
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token",
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});

app.use("/", Routeindex);

app.get("/teste", (req, res) => {
  res.send("O app.js está funcionando");
});

app.use("/", router);

app.use("/products", RouteProducts);
app.use("/customer", RouteCustomer);
app.use("/orders", RouteOrder);
module.exports = app;
