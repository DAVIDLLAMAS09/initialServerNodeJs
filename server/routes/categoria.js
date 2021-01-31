const express = require('express')
const app = express()
const Categoria = require('../models/categoria')
const { verificarTokn,verificarRol } = require('../Autentication/Autentication')


// muestra TODAS LAS CATEGORIAS 
app.get('/categorias/',verificarTokn,(req,res)=>{
    

    Categoria.find().populate('usuario').exec((err,categorias)=>{
        if(err){
           return res.status(400).json({
                success:false,
                err
            })
        }

        res.json({
            success:true,
            categorias
        })
    })
    
})

// muestra una categoria por id 

app.get('/categorias/:id',verificarTokn,(req,res)=>{
    let id = req.params.id

    // populate extrae los datos (objectId) de la categoria y extrae la informacion de esa coleccion 
    Categoria.findById(id)
    .populate('usuario')
    .exec((err,categoria)=>{
        if(err){
           return res.status(400).json({
                success:false,
                message:`no se encontro una categoria con el id ${id}`
            })
        }

        Categoria.find().populate('usuario').exec()
        res.json({
            success:true,
            categoria
        })
    })
})


// crea una nueva categoria
app.post('/categorias/',verificarTokn,(req,res)=>{

    // obtenemos el id del usuario por el objeto usuario generado en el login
    let idUsuario = req.usuario._id

    let categoria = new Categoria({
        description:req.body.description,
        usuario:idUsuario
    })

    categoria.save((err,result)=>{
        if(err){
            return res.status(400).json({
                success:false,
                err
            })
        }

        res.json({
            success:true,
            categoria:result
        })
    })
})

// actualizar una categoria

app.put('/categorias/:id',[verificarTokn,verificarRol],(req,res)=>{
    let id = req.params.id

    Categoria.findByIdAndUpdate(id,req.body,(err,result)=>{
        if(err){
            return res.status(400).json({
                success:false,
                err
            })
        }

        res.json({
            success:true,
            message:'la categoria ha sido actualizada'
        })
    })
})


// elimina una categoria 

app.delete('/categorias/:id',[verificarTokn,verificarRol],(req,res)=>{
    let id = req.body.id

    Categoria.findByIdAndRemove(id,(err,result)=>{
        if(err){
           return res.status(400).json({
                success:false,
                err
            })
        }

        req.json({
            success:true,
            message:`la categoria ha sido eliminada`
        })
    })
})



module.exports = app