const express = require('express')
const app = express()
// modelo Usuario
const Usuario = require('../models/usuarios')
// encriptar contraseña
const bcrypt = require('bcrypt');
// para modificar solo valores que yo quiero del modelo usuario 
const _ = require('underscore')
// verificar token en las rutas  de usuarios
const { verificarTokn, verificarRol }= require('../Autentication/Autentication')

//  routes
app.get('/',(req,res)=>{
   res.json("hola mundo!!!!")
})

// ruta que obtiene a todos los usuarios o buscar por nombre

app.get('/usuarios/', verificarTokn ,(req,res)=>{

    let query = req.query.nombre

//    const urlParams = new URLSearchParams(queryString);

    // si existe algo en query nombre regresa buscamos por nombre si no, toda la lista de usuarios regresa
    if(query){
        //    si hay parametros en la url se guardan en query y buscamos por nombre
        
        Usuario.find({nombre:{$regex: '.*' + query+ '.*'}},(err,usuarios)=>{
            console.log("usuarios que regresa el modelo",usuarios);
            if(err){
                return res.status(400).json({
                    success:false,
                    err
                })
            }
    
            res.status(200).json({
                success:true,
                usuarios,
                length:usuarios.length
            })
        }).select('')
    }else{
        // paginación
        let desde = Number(req.query.desde) || 0
        let limite = Number(req.query.limite) || 10
        
        Usuario.find({},(err,usuarios)=>{
            if(err){
                return res.status(400).json({
                    success:false,
                    err
                })
            }
    
            res.status(200).json({
                success:true,
                usuarios,
                length:usuarios.length
            })
        }).skip(desde).limit(limite).select('')
    }
   
})


// ruta donde creamos un usuario 


app.post('/usuarios',[verificarTokn,verificarRol],(req,res)=>{    
    let { body } = req
    console.log(body);

    // creamos un nevo usuario
    let usuario = new Usuario({
        nombre:body.nombre,
        email:body.email,
        password:bcrypt.hashSync(body.password,10),
        role:body.role

    })

    // guardamos usuario
    usuario.save((err,result)=>{
        if(err){
            return res.status(400).json({
                success:false,
                err
            })
        }

        res.json({
            success:true,
            usuario:result
        })
    })
    

})


// ruta para actualizar un usuario por su id 


app.put('/usuarios/:id',[verificarTokn,verificarRol],(req,res)=>{
    let id = req.params.id
    let body = _.pick(req.body,['nombre', 'email','img','role','estado'])

    let options={
        // nos regresa el usuario modificado-
        new:true,
        // corre las validaciones que tenemos en el schema 
        runValidators:true,
        context: 'query'
    }

    Usuario.findByIdAndUpdate(id,body,options,(err,result)=>{
        if(err){
            return res.json({
                success:false,
                err
            })
        }

        res.json({
            success:true,
            usuarios:result
        })


    })
    
})

// ruta para eliminar un usuario

app.delete('/usuarios/:id',[verificarTokn,verificarRol],(req,res)=>{
    let id = req.params.id

    console.log("usuario req en delete",req.usuario);
// no se puede borrar a si mismo verificando el id del jsonwebtoken y el id de la sesion
    if(req.usuario._id === id){
        return res.status(400).json({
            success:false,
            message:"no puedes borarte a ti mismo"
        })
    }
    // cambia su estado a false de un usuario

    Usuario.findByIdAndUpdate(id,{$set:{estado:false}},{new:true},(err,result)=>{
        if(err){
            return res.json({
                success:false,
                err
            })
        }

        res.json({
            success:true,
            result
        })
    })

    // Usuario.findById(id,(err,user)=>{
    //     if(!err){
    //         user.estado = false
    //         user.save((err,result)=>{
    //             if(err){
    //                 return res.status(400).json({
    //                     success:false,
    //                     err
    //                 })
    //             }

    //             res.json({
    //                 success:true,
    //                 result
    //             })
    //         })
            
    //     }
    // })

    // elimina un usuario de la bd
    // Usuario.findByIdAndRemove(id,(err,result)=>{
    //     if(err){
    //        return res.status(400).json({
    //             success:false,
    //             err
    //         })
    //     }

    //     res.json({
    //         success:true,
    //         result
    //     })
    // })
})


module.exports = app