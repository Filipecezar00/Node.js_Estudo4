"use strict";

const express = require("express");
const routes = express.Router();
const controller = require("../controllers/product.controler");
const authService = require("../services/authService");

routes.get("/", controller.get);
routes.get("/:slug", controller.getBySlug);
routes.get("/admin/:id", controller.getById);
routes.get("/tags/:tag", controller.getByTag);
routes.post("/", authService.authorize, controller.post);
routes.put("/:id", authService.authorize, controller.put);
routes.delete("/:id", authService.authorize, controller.delete);

module.exports = routes;
