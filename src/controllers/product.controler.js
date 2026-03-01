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
  Product.findOne(
    {
      slug: req.params.slug,
      active: true,
    },
    "title description price slug tags",
  )

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
  Product.findById(req.params.id)
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
  console.log("ID do alvo:", req.params.id);
  console.log("Dados da Munição", req.body);

  Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        slug: req.body.slug,
      },
    },
    { new: true },
  )
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

  let product = new Product(req.body);

  product
    .save()

    .then((x) => {
      res.status(200).send({ message: "Produto  Cadastrado com Sucesso" });
    })
    .catch((e) => {
      res.status(400).send("Erro: " + e);
    });
};

exports.getByTag = (req, res, next) => {
  Product.find(
    {
      tags: req.params.tag,
      active: true,
    },
    "title description price slug tags",
  )
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((erro) => {
      res.status(400).send(erro);
    });
};

exports.delete = (req, res, next) => {
  Product.findByIdAndDelete(req.params.id)
    .then((x) => {
      res.status(200).send({ message: "Produto Removido com sucesso" });
    })
    .catch((e) => {
      res
        .status(500)
        .send({ message: `${e} erro ao Executar processo de Exclusão` });
    });
};
