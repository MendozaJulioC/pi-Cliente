const express = require('express');
const app = express();
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const passport = require('passport')





const getDependencias = async (req, res) => {
    try {
     
   const message = req.flash('message')[0]  ;
   //console.log(message)
 let dependencias=[];
       fetch(`https://sse-pdm.herokuapp.com/see/api/dependencias`)
       .then(res=>res.json())
       .then(data=>{
        for (let index = 0; index < data.data.length; index++) {
            dependencias.push({
            cod_dep: data.data[index].cod_dep,
            nombre_dep: data.data[index].nombre_dep
            })
        }
         dependencias.sort(function (a, b) {
            if (a.nombre_dep > b.nombre_dep) {
              return 1;
            }
            if (a.nombre_dep < b.nombre_dep) {
              return -1;
            }
            return 0;
          });
           res.render('./dependencias/dependencia.html', {
            title: "Dependencias-PDM",
            message, dependencias

        })
       })
       
    } catch (e) {
        console.log(e);
    }
}



module.exports = {getDependencias}