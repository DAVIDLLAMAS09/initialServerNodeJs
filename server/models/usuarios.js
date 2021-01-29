const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
// un modelo nos permite crear,actualizar,funciones 

// validar los roles
let validateRoles = {
    values:['ADMIN_ROLE','USER_ROLE'],
    message:'{VALUE} no es un rol válido'
}

let usuariosSchema = new Schema({
    nombre:{type:String,required:[true,'El nombre es necesario']},
    email:{type:String,required:[true,'El email es obligatorio'],unique:true},
    password:{type:String,required:[true,'El password el obligatorio']},
    img:{type:String,required:false},
    role:{type:String,default:'USER_ROLE',enum:validateRoles},
    estado:{type:Boolean,default:true},
    google:{type:Boolean,default:false},
    token:{type:String}
},{
    collection: 'users'
});

// quitar en la api el password y el __v  en el response
usuariosSchema.methods.toJSON = function(){
    let user = this ;
    let userObject = user.toObject();
    delete userObject.password;
    delete userObject.__v
    // ocultar el token en todas las peticiones por seguridad
    delete userObject.token

    return userObject;
}


// usamos el plugin de validacion en el schema
usuariosSchema.plugin(uniqueValidator,{message:' hay otro usuario con este {PATH}'})

// exportamos el modelo Usuario
module.exports = mongoose.model('Usuario',usuariosSchema)