'use-strict'

const http = require("http"); 
const debug = require("debug") ("nodestr:server");
const express = require("express"); 
const { version } = require("os");

const app = express(); 
const port = 4000;  
app.set("port",port);  


const server = http.createServer(app); 
const router = express.Router(); 

let route = router.get("/",(req,res,next)=>{
res.status(200).send({title:"Node App",version:"0.0.1"}); 
});

app.use("/",route); 