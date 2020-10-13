var express = require('express');
var app = express();
const fetch = require('node-fetch');


const getLinea1 = async(req, res)=>{
 
    try {
        
        res.render('./linea1/linea-1.html', {
            title: "Línea 1"
          
        })
    } catch (error) {
        console.log('Error getLinea1 ', error)
    }
  
}

const getLinea2 = async(req, res)=>{

    try {
        res.render('./linea2/linea-2.html', {
            title: "Línea 2"
        })
    } catch (error) {
        console.log('Error getLinea2 ', error)
    }
}

const getLinea3 = async(req, res)=>{

    try {
        res.render('./linea3/linea-3.html', {
            title: "Línea 3"
        })
    } catch (error) {
        console.log('Error getLinea3 ', error)
    }
}

const getLinea4 = async(req, res)=>{

    try {
        res.render('./linea4/linea-4.html', {
            title: "Línea 4"
        })
    } catch (error) {
        console.log('Error getLinea4 ', error)
    }
}

const getLinea5 = async(req, res)=>{

    try {
        res.render('./linea5/linea-5.html', {
            title: "Línea 5"
        })
    } catch (error) {
        console.log('Error getLinea5 ', error)
    }
}
















module.exports = { getLinea1,getLinea2, getLinea3, getLinea4, getLinea5 }