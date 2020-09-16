var express = require('express');
var app = express();
const fetch = require('node-fetch');






const getHome = async (req, res) => {
    try {
        res.render('./home/index.html', {
            title: "SEE-PDM"
        })
    } catch (e) {
        console.log(e);
    }
}



const getContacto = async (req, res) => {
    try {
        res.render('./contacto/contacto.html', {
            title: "Contacto"
        })
    } catch (e) {
        console.log(e);
    }
}


const getDash= async (req, res)=>{
    try {
        res.render('./dash/dash.html', {
            title: "SEE-PDM"
        })
    } catch (e) {
        console.log(e);
    }


}

const getGeneral = async(req, res)=>{
    try {
        res.render('./generalpdm/generalspdm.html', {
            title: "SEE-PDM"
        })
    } catch (e) {
        console.log(e);
    }   
}


module.exports = {
    getHome,
    getDash,
    getGeneral,

   
    getContacto
  



}