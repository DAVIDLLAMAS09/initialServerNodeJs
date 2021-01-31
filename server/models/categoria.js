const {Schema, model } = require('mongoose')


let categoriaSchema = new Schema({
    description:{type:String,unique:true,required:true},
    usuario:{type:Schema.Types.ObjectId, ref:'Usuario'}
},{
    collection:'categories',
    timestamps:true
    
})



module.exports = model('Categoria',categoriaSchema)