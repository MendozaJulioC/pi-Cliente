const express = require('express');
const app = express();
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const passport = require('passport')





const getDependencias = async (req, res) => {
    try {
     
   const message = req.flash('message')[0]  ;
   //console.log(message)
 
       fetch(`https://sse-pdm.herokuapp.com/see/api/dependencias`)
       .then(res=>res.json())
       .then(data=>{
           dependencias =data.data
           res.render('./dependencias/dependencia.html', {
            title: "Dependencias-PDM",
            message

        })
       })
       
    } catch (e) {
        console.log(e);
    }
}



module.exports = {getDependencias}