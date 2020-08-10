var express = require('express');
var app = express();
const fetch = require('node-fetch');



const getDependencia = async (req, res) => {
    try {
        fetch('http://localhost:4000/api/dependencias')
        .then(res => res.json())
        .then(data => {
            
            dependencias= data.data;
            res.render('./dependencias/dependencia.html', {
                title: "Dependencias",
                Dependencias: dependencias
            })
       

        })
        
    } catch (e) {
        console.log(e);
    }
}


module.exports = {
   
    getDependencia
   




}