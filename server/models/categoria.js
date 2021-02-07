const {Schema, model } = require('mongoose')


let categoriaSchema = new Schema({
    nombre:{type:String,required:true},
    description:{type:String,unique:true,required:true},
    usuario:{type:Schema.Types.ObjectId, ref:'Usuario'}
},{
    collection:'categories',
    timestamps:true
    
})



module.exports = model('Categoria',categoriaSchema)