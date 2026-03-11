"use strict";

const repository = require("../repositories/customerRepository");
const validationContract = require("../validators/fluentValidator");
const md5 = require("md5");
const config = require("../config");
const authService = require("../services/authService");
const emailService = require("../services/emailService");

exports.post = async (req, res, next) => {
  let contract = new validationContract();
  contract.hasMinLen(req.body.name, 3, "O nome precisa conter três caracteres");
  contract.isEmail(req.body.email, "O e-mail está inválido");
  contract.hasMinLen(
    req.body.password,
    5,
    "A senha precisa de no mínimo cinco caracteres",
  );

  if (!contract.isValid()) {
    return res.status(400).send(contract.errors());
  }

  try {
    await repository.create({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password + config.saltKey),
    });
    return res.status(201).send({ message: "Cliente cadastrado com Sucesso!" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Falha ao cadastrar cliente" });
  }
};
exports.authenticate = async (req, res, next) => {
  try {
    const customer = await repository.authenticate({
      email: req.body.email,
      password: md5(req.body.password + config.saltKey),
    });

    console.log("Senha enviada:", req.body.password);
    console.log(
      "Hash gerado para busca:",
      md5(req.body.password + config.saltKey),
    );

    if (!customer) {
      return res.status(404).send({
        message: "Usuário ou senha invalidos",
      });
    }
    const token = await authService.generateToken({
      id: customer._id,
      email: customer.email,
      name: customer.name,
    });
    return res.status(201).send({
      token: token,
      data: {
        email: customer.email,
        name: customer.name,
      },
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send(
        "Erro, Não foi possivel cadastrar o usuario devido a um erro interno.",
      );
  }
};
