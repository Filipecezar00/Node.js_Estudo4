'use strict'

const { version } = require("react");

const app = express(); 
const router= express.Router() 

router.get("/",(req,res,next)=>{
    res.status(200).send({
        title:'Node Store', 
        version:"0.0.1" 
    }); 
}); 

app.use("/",route);  
module.exports = app; 