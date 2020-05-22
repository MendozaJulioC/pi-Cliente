var express = require('express');
var app = express();
const fetch = require('node-fetch');

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })



const getTotales = async (req, res) =>{
    try{
            fetch('http://localhost:4000/api/totales')
            .then(res=>res.json())
            .then(data=>{
                res.render('./cuatrienios/totales.html', {
                    title:"Totales",
                    datos: data.data
                }) 
            })
    }catch(e){ console.log(e);}
  
}







module.exports = getTotales;

    





