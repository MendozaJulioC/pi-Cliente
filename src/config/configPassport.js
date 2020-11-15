const fetch = require('node-fetch');
const passport = require('passport');
const LocalStrategy = require ('passport-local').Strategy;
const bcrypt = require('bcrypt');




passport.use( new LocalStrategy({
    usernameField: 'username',
    passwordField:'password'
    
}, async (email, password, done)=>{
   let user=[];
    fetch(`https://sse-pdm-back.herokuapp.com/auth/api/validatemail/${email}`)
    .then(res=>res.json())
    .then(respuesta =>{
        let tam = respuesta.data.length;
        if (tam>0) {
            user=respuesta.data
            isEmail(email,password,user, done)    
           
        }else{
            return done(null,false,{message:"Usuario no registrado"})
        }
       
    })
   
}));

passport.serializeUser((user,done)=>{
    done(null,user[0].id);
});

passport.deserializeUser((id,done)=>{
  // console.log("deseria id " ,id)
    finalFunction(id,done)
    //user.findById(id, (error,user)=>{
    //  done(err,user);
  //})

  
})

async function isEmail(email, pass,user,done){
    if (email == user[0].email) {
        isMatch(pass, user ,done) 
       
    } else{
        return done(null,false,{error:"Usuario no registrado"})
    }

}
async function isMatch(password, user,done)
{
   const match = await bcrypt.compare(password, user[0].password)
    console.log("match ",match)
        if (match) {
            return done(null,user,{message: user[0].nom_usuario });
        }else{
          
            return done(null,  false, { error: 'Datos de inicio de session Errados!!!'}  )
        }

}

function finalFunction(id,done){
    fetch(`https://sse-pdm-back.herokuapp.com/auth/api/id/${id}`)
    .then(res=>res.json())
    .then(respuesta =>{
       if (respuesta.data) {
          return done(null,respuesta.data)
       }else{
        return done(null, false, { error: 'Datos de inicio de session Errados!!!'}  )   
       }
    })
}
//module.exports= {}