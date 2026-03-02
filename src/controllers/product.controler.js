"use strict";

const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const ValidationContract = require("../validators/fluentValidator");
const Repository = require("../repositories/productRepository");

exports.get = async (req, res, next) => {
  try {
    var data = await Repository.get();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.getBySlug = async (req, res, next) => {
  try {
    var data = await Repository.getBySlug(req.params.slug);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.getById = async (req, res, next) => {
  try {
    var data = await Repository.getById(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.put = async (req, res, next) => {
  try {
    var data = await Repository.put(req.params.id, req.body);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.post = async (req, res, next) => {
  let contract = new ValidationContract();
  contract.hasMinLen(
    req.body.title,
    3,
    "O titulo precisa conter pelo menos três caracteres",
  );
  contract.hasMinLen(
    req.body.slug,
    3,
    "O slug Precisa conter no mínimo três caracteres",
  );
  contract.hasMinLen(
    req.body.description,
    3,
    "A descrição precisa conter no mínimo três caracteres",
  );

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  try {
    var data = await Repository.create(req.body);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.getByTag = async (req, res, next) => {
  try {
    var data = await Repository.getByTag(req.params.tag);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.delete = async (req, res, next) => {
  try {
    var data = await Repository.delete(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send(e);
  }
};
