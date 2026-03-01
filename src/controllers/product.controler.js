"use strict";

const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const ValidationContract = require("../validators/fluentValidator");
const Repository = require("../repositories/productRepository");

exports.get = (req, res, next) => {
  Repository.get()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((erro) => {
      res.status(400).send(erro);
    });
};
exports.getBySlug = (req, res, next) => {
  Repository.getBySlug(req.params.slug)
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send({ message: "Produto não encontrado" });
      }
    })
    .catch((erro) => {
      res.status(400).send(erro);
    });
};

exports.getById = (req, res, next) => {
  Repository.getById(req.params.id)
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send({ message: "ID não encontrado" });
      }
    })
    .catch((erro) => {
      res.status(400).send(erro);
    });
};

exports.put = (req, res, next) => {
  Repository.put(req.params.id, req.body)
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "Produto não encontrado" });
      }
      res.status(200).send({
        message: "Produto atualizado com sucesso!",
        item: data,
      });
    })
    .catch((e) => {
      res.status(400).send({
        message: "Falha ao atualizar produto",
        data: e,
      });
    });
};

exports.post = (req, res, next) => {
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

  Repository.create(req.body)
    .then((x) => {
      res.status(200).send({ message: "Produto  Cadastrado com Sucesso" });
    })
    .catch((e) => {
      res.status(400).send("Erro: " + e);
    });
};

exports.getByTag = (req, res, next) => {
  Repository.getByTag(req.params.tags)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((erro) => {
      res.status(400).send(erro);
    });
};

exports.delete = (req, res, next) => {
  Repository.delete(req.body.id)
    .then((x) => {
      res.status(200).send({ message: "Produto Removido com sucesso" });
    })
    .catch((e) => {
      res
        .status(500)
        .send({ message: `${e} erro ao Executar processo de Exclusão` });
    });
};
