var express = require('express');
var app = express();
const fetch = require('node-fetch');



const getObras = async(req, res)=>{

    try {
        res.render('./obras/obra.html', {
            title: "Obra Física"
        })
    } catch (error) {
        console.error('Error getObra ', error)
    }
}



module.exports = { getObras }