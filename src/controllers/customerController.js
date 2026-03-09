"use strict";

const repository = require("../repositories/customerRepository");
const validationContract = require("../validators/fluentValidator");
const md5 = require("md5");
const config = require("../config");
const authService = require("../services/authService");
const emailService = require("../services/emailService");

exports.post = async (req, res, next) => {
  exports.authenticate = async (req, res, next) => {
    try {
      const customer = await repository.authenticate({
        email: req.body.email,
        password: md5(req.body.password + global.SALT_KEY),
      });
      authService.generateToken({ email: customer.email, name: customer.name });

      if (!customer) {
        res.status(404).send({
          message: "Usuário ou senha invalidos",
        });
        return;
      }
      const token = await authService.generateToken({
        email: customer.email,
        name: customer.name,
      });
      res.status(201).send({
        token: token,
        data: {
          email: customer.email,
          name: customer.name,
        },
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
};
