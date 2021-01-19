require('./config/config')
const express = require('express')
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





//  routes
app.get('/',(req,res)=>{
    res.json('Hello world')
})

app.get('/usuarios',(req,res)=>{
    res.json('usuarios get')
})


app.post('/usuarios',(req,res)=>{    
    let {body} = req
    body.nombre == undefined ? ( res.status(400).json({error:'datos incompletos'}) ) :( res.json({data:body}) )
})

app.put('/usuarios/:id',(req,res)=>{
    let id = req.params.id
    res.json({
        id
    })
})


app.listen(process.env.PORT,()=>{
    console.log(`Server runing on port ${process.env.PORT}`);
})