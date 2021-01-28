// port
// app.set('port',process.env.PORT || 3001)
 process.env.PORT = process.env.PORT || 3001
 process.env.NODE_ENV =  process.env.NODE_ENV || 'dev'

//  jwt
 process.env.SEMILLA = process.env.SEED || "este-es-el-seed-de-desarrollo"
 process.env.CADUCIDAD_TOKEN = process.env.CADUCIDAD || 60 * 60 * 24 * 30

 let urlDB;

 if( process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe'
 }else{
     
     urlDB = 'mongodb+srv://david:im58D1LJ46F3redL@cluster0.ngf0f.mongodb.net/cafe'
 }

 process.env.URLDB = urlDB