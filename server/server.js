require('./config/config')
const express = require('express')
const mongoose = require('mongoose');
const app = express()
const bodyParser = require('body-parser')

 
//  middlewares

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
})
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// importamos rutas del proyecto     
app.use(require('./routes/usuarios'))
app.use(require('./routes/login'))
app.use(require('./routes/verifyToken'))




mongoose.connect(process.env.URLDB,{useCreateIndex:true, useNewUrlParser: true,useUnifiedTopology:true,useFindAndModify:false },(err,res)=>{
    if(err) throw err;

    console.log("base de datos conectada");
})


app.listen(process.env.PORT,()=>{
    console.log(`Server runing on port ${process.env.PORT}`);
})