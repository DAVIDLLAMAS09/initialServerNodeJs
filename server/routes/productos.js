const express = require('express')
const Producto = require('../models/producto')
const {verificarTokn} = require('../Autentication/Autentication')
const app = express()


// obtener productos 
app.get('/productos/',verificarTokn,(req, res)=>{
//    trar datos de los productos
    Producto.find({})
    .populate('usuario')
    .populate('categoria')
    .exec((err,productos)=>{
        if(err){
           return res.json({
                success:false,
                err
            })
        }

        res.json({
            success:true,
            productos
        })
    })
    

});

// obtener un producto por su id

app.get('/productos/:id',verificarTokn,(req,res)=>{
    let id = req.params.id

    Producto.findById(id)
    .populate('usuario')
    .populate('categoria')
    .exec( (err,producto) =>{
        if(err){
            return res.json({
                success:false,
                err
            })
        }

        res.json({
            success:true,
            producto
        })

        
    })
})

// crear un producto
app.post('/productos/',verificarTokn,(req,res)=>{
    // saber que usuario agrego el producto
    let idUser = req.usuario._id

    let producto = new Producto({
        nombre:req.body.nombre,
        precioUni:req.body.precioUnitario,
        descripcion:req.body.descripcion,
        disponible:req.body.disponible,
        categoria:req.body.categoria,
        usuario:idUser
    })

    producto.save((err,producto)=>{
        if(err){
            return res.json({
                success:false,
                err
            })
        }

        res.json({
            success:true,
            message:"El producto ha sido creado exitosamente."
        })
    })

})

// eliminar un producto

app.delete('/productos/:id',verificarTokn,(req,res)=>{
    let id = req.params.id

    Producto.findByIdAndUpdate(id,{disponible:false},(err,result)=>{
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
})


module.exports = app