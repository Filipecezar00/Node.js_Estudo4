"use strict";

const repository = require("../repositories/customerRepository");
const validationContract = require("../validators/fluentValidator");
const md5 = require("md5");

exports.post = async (req, res, next) => {
  let contract = new validationContract();
  contract.hasMinLen(req.body.name, 3, "O campo deve conter três caracteres");
  contract.isEmail(req.body.email, "O email está invalido");
  contract.hasMinLen(
    req.body.password,
    5,
    "A senha Precisa possui no mínimo cinco caracteres",
  );

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }
  try {
    await repository.create({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY),
    });
    res.status(200).send("Usuario Cadastrado no sistema");
  } catch (err) {
    res
      .status(500)
      .send(
        "Erro, Não foi possivel cadastrar o usuario devido a um erro interno.",
      );
    console.error(err);
  }
};
