const express = require('express');
const app = express();
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const passport = require('passport')




const getRegister = async(req, res )=>{
   try {
    const message = req.flash('message')[0]  ;
       fetch(`https://sse-pdm-back.herokuapp.com/see/api/dependencias`)
       .then(res=>res.json())
       .then(data=>{
           dep =data.data
           res.render('./auth/register.html', {
            title:"Registro de Usuario",
            dependencia: dep,
            errors:[],message,
            fullname:"", 
            email: "", password:"", confirmpassword:"", cargo:"", dependencias:"", tel_contacto:""
           })
       })
    } catch (error) {
       console.log('Error getRegister', error)
   }
}

const postRegister = async(req, res)=>{
    try {
        const message = req.flash('message')[0]  ;
        const {fullname, email, password, confirmpassword, cargo, dependencias, tel_contacto} = req.body;
        var errors=[];
        if (!fullname||!email|| !password ||!confirmpassword ||!cargo||!dependencias||!tel_contacto){
            errors.push({message: "Es necesario llenar todos los campos"})
        }
        if (!fullname) { errors.push({message:"Ingrese el nombre del usuario"}) }
        if (!email) { errors.push({message:"Ingrese el email"})}
        if (!password) {errors.push({message:"Ingrese el password, recuerde mínimo 6 caracteres"})}
        if (!confirmpassword) {errors.push({message:"Ingrese la validación de su password"})}
        if (cargo == 0) {errors.push({message:"Seleccione su cargo"})}
        if (dependencias == 0) {errors.push({message:"Seleccione la dependencia a la cual pertenece"})}
        if (!tel_contacto) {errors.push({message:"Ingrese el número de teléfono de contacto"})}
        if (password !=  confirmpassword)  {errors.push({message:"Password no coinciden!!!"})}
        if (password.length<6 )  {errors.push({message:"Password debe contener más de 6 carateres!!!"})}
        if(errors.length>0){
        
            fetch(`https://sse-pdm-back.herokuapp.com/see/api/dependencias`)
            .then(res=>res.json())
            .then(data=>{
                dep =data.data
                res.render('./auth/register.html', {
                    title:"Registro de Usuario",
                    dependencia: dep,
                    errors: errors,
                    message,
                    fullname: fullname, email, password, confirmpassword, cargo, dependencias, tel_contacto
                })
            })
        } else{
            let hashPass = await bcrypt.hash(password,10);
            fetch(`https://sse-pdm-back.herokuapp.com/auth/api/validatemail/${email}`)
            .then(res=>res.json())
            .then(respuesta=>{
                validaEmail =respuesta.data
              
                if(validaEmail.length>0){
                    errors.push({message:"Este Email ya se encuentra registrado!!!"})
                    res.render('./auth/register.html', {
                        title:"Registro de Usuario",
                        dependencia: dep,
                        errors: errors,message,
                        fullname: fullname, email, password, confirmpassword, cargo, dependencias, tel_contacto
                    })
                }else{
                    var parametros={
                        "email":email,
                        "password": hashPass,
                        "fullname": fullname,
                        "cargo": cargo,
                        "tel_contacto": tel_contacto,
                        "dependencias": dependencias
                        
                    }
                    fetch('https://sse-pdm-back.herokuapp.com/auth/api/register',{
                        method: "POST",
                        body: JSON.stringify(parametros),
                        headers: {
                            'Content-Type':'application/json'
                        }
                    }).then(res=>res.json())
                    .then(response=>{
                         console.log(response)
                        //req.session.msg = req.body.fullname;
                        req.flash('message', req.body.fullname)
                        res.redirect('/')
                    })
                }
            })
        }
    } catch (error) {
        console.log('Error postRegister',error)
    }
}

const postLoguin = passport.authenticate('local',{
    failureRedirect:'/',
    successRedirect:'/dash',
    failureFlash: true

})


const getLogout = async (req, res)=>{
    req.logout();
    req.flash('message', 'Has cerrado la session');
    res.redirect('/')
}

module.exports = {getRegister, postRegister, postLoguin, getLogout}

