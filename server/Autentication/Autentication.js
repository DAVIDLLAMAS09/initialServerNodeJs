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


  module.exports = {
      verificarTokn
  }