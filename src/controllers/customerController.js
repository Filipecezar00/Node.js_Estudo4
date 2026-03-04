"use strict";

const repository = require("../repositories/customerRepository");
const validationContract = require("../validators/fluentValidator");

exports.post = async (req, res, post) => {
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
    await repository.create(req.body);
    res.status(200).send("Fluxo trabalhando corretamente");
  } catch (err) {
    res.status(500).send("Erro Interno" + err);
  }
};
