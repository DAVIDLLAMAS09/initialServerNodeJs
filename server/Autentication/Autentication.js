const jwt = require('jsonwebtoken')
// verificar token

let verificarTokn = (req, res, next)=>{
    let token = req.header('token')
    
    if(!token){
        res.status(401).json({
            success:false,
            message:"Acceso denegado"
        })
    }

        jwt.verify(token,process.env.SEMILLA,(err,decoded)=>{
            if(err){
                res.status(400).json({
                    error:'token no válido'
                })
            }

            // console.log("decoded",decoded.usuario);

            // usuario viene del login 
            req.usuario = decoded.usuario
            // console.log("usuario req:",req.usuario);
            next();
        })
  }

//   verificar rol de usuario

let verificarRol = (req,res,next)=>{
    // JSON WEB TOKEN EN SIGN MANDAMOS UN OBJ CON EL USUARIO QUE PUEDE SER UTILIZADA PARA HACER VALIDACIONES ANTES DE CONSULTAR EL ENDPOINT
    let rol  = req.usuario.role

    if(rol !== "ADMIN_ROLE"){
       return res.status(401).json({
            success:false,
            message:"Los usuarios 'NO ADMIN' no tienen permitido crear, modificar, eliminar a otros usuarios"
        })
    }

    next();


}


  module.exports = {
      verificarTokn,
      verificarRol
  }