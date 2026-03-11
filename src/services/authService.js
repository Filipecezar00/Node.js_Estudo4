"use strict";
const jwt = require("jsonwebtoken");
const config = require("../config");

exports.generateToken = async (data) => {
  return jwt.sign(data, config.saltKey, { expiresIn: "1d" });
};

exports.decodeToken = async (token) => {
  var data = await jwt.verify(token, config.saltKey);
  return data;
};

exports.authorize = function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers["x-acess-token"];

  if (!token) {
    res.status(401).json({
      message: "Acesso Restrito",
    });
  } else {
    jwt.verify(token, config.saltKey, function (error, decoded) {
      if (error) {
        console.log("Erro na verificação:", error);
        res.status(401).json({ message: "Token inválido" });
      } else {
        next();
      }
    });
  }
};
