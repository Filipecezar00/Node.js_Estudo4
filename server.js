'use-strict'

const http = require("http"); 
const debug = require("debug") ("nodestr:server");
const express = require("express"); 

const app = express(); 
const port = 4000;  
app.set("port",port);  


const server = http.createServer(app); 
const router = express.Router(); 
