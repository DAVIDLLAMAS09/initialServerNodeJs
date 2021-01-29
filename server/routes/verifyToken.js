const express = require('express')
const app = express()
const Usuario = require('../models/usuarios')

// verifica el token si el usuario hizo login y proteger las rutas en el front end 
app.post('/verifytokenuser',(req,res)=>{
    let tokenUser  = req.body.tokenUser
    
    Usuario.findOne({token:tokenUser},(err,usuario)=>{
        if(usuario == null){
           return res.status(401).json({
                success:false,
                message:"token no encontrado"
            })
        }

        res.json({
            success:true,
            usuario
        })
    })
    
})


module.exports = app