const express = require('express')
const bcrypt = require('bcrypt')
const app = express()
// modelo Usuario
const Usuario = require('../models/usuarios')
const jwt = require('jsonwebtoken')



app.post('/login',(req,res)=>{

    // VERIFICAR QUE EL EMAIL EXISTE
    Usuario.findOne({email:req.body.email},(err,Usuariodb)=>{
        if(err){
            return res.status(500).json({
                success:false,
                err
            })
            
        }

        if(!Usuariodb){
            return res.status(400).json({
                success:false,
                message:"usuario o contraseña incorrectos"
            })
            
        }

       if( !bcrypt.compareSync( req.body.password,Usuariodb.password ) ){
        res.status(400).json({
            success:false,
            passbody:"usuario o contraseña incorrectos"
        })
       }

    //    genreamos el token si todo salio bien de las validaciones de password y email

       let token = jwt.sign({
           usuario:Usuariodb
       },process.env.SEMILLA , {expiresIn: process.env.CADUCIDAD_TOKEN })

    //    guardar token en la bd
        Usuariodb.token = token

        Usuariodb.save((err,result)=>{
            if(err){
                return res.status(400).json({
                    success:false,
                    err
                })
            }

            res.json({
                success:true,
                Usuariodb,
                token
            })
        })

        

    })
   
})

module.exports = app

