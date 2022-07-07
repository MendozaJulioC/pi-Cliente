const express = require('express');
const app = express();
const fetch = require('node-fetch');

const getHome = async (req, res) => {
    try {
       //const message = req.session.msg; delete req.session.msg;
   const message = req.flash('message')[0]  ;
   //console.log(message)
        res.render('./home/index.html', {
            title: "SEE-PDM",
            message
        })
    } catch (e) {
        console.error('Error getHome ', e);
    }
}

const getContacto = async (req, res) => {
    try {
        res.render('./contacto/contacto.html', {
            title: "Contacto"
        })
    } catch (e) {
        console.error('Error getContacto ', e);
    }
}

const getDash= async (req, res)=>{
    try {
        res.render('./dash/dash.html', {
            title: "SEE-PDM"
        })
    } catch (e) {
        console.error('Error getHogetDash', e);
    }
}

const getGeneral = async(req, res)=>{
    try {
        res.render('./generalpdm/generalspdm.html', {
            title: "SEE-PDM"
        })
    } catch (e) {
        console.error('Error getGeneral ', e);
    }   
}

const getIndicador = async(req, res)=>{
    try {
        fetch('https://sse-pdm.herokuapp.com/pi/api/list-indicador')
        .then(res=> res.json())
        .then(data=>{
            indicadores = data.data;
            res.render('./indicadores/indicador.html', {
                title: "Indicadores",
                indicadores: indicadores
            })
        })
    } catch (e) {
        console.error('Error getIndicador ', e);
    }   
}

const getEstructura = async(req, res)=>{
    try {
        res.render('./estructura/estructura.html', {
            title: "Estructura-PDM"
        })
    } catch (e) {
        console.error('Error getEstructura ', e);
    }
}

const getComponente = async(req, res)=>{
    try {
        fetch('https://sse-pdm.herokuapp.com/pi/api/list-componente')
        .then(res=>res.json())
        .then(data=>{
            componentes = data.data;
            res.render('./componentes/componente.html', {
                title: "Componentes-PDM",
                componentes: componentes
            })
        })
    } catch (e) {
        console.error('Error getComponente', e );
    }   
}

const getPrograma = async(req, res)=>{
    try {
        fetch('https://sse-pdm.herokuapp.com/pi/api/list-programas')
        .then(res=>res.json())
        .then(data=>{
            programas = data.data;
            res.render('./programas/programa.html', {
                title: "Programas-PDM",
                componentes: programas
            })
        })
     } catch (e) {
        console.error('Error getPrograma', e );
    }   
}

const getAlertas = async(req, res)=>{
    try {
        res.render('./alertas/alerta.html', {
            title: "Alertas-PDM"
        })
    } catch (e) {
        console.error('Error getAlertas ', e);
    }
}
const getAlertasPA = async(req, res)=>{
    try {
        res.render('./alerta_pa/alerta_pa.html', {
            title: "Alerta-PA"
        })
    } catch (e) {
        console.error('Error getAlertasPA', e);
    }
}
const getSiem = async(req, res)=>{
    try {
        res.render('./siem/siem.html', {
            title: "SIEM-PDM"
        })
    } catch (error) {
        console.error('Error getSiem: ', error);
        
    }
}


const getPlanAccion = async(req, res)=>{
    try {
        res.render('./plan_accion/plan_a.html', {
            title: "Plan Acción"
        })
    } catch (error) {
        console.error('Error getPlanAccion', error);
    }
}

const getAlertPP= async (rq, res)=>{
    try {
        res.render('./alerta_pp/alertpp.html', {
            title: "Alertas PP"
        })

    } catch (error) {
        console.error('Error getAlertPP', error);
    }
}
module.exports = {  getHome, getDash, getGeneral, getContacto, getSiem,
                    getIndicador, getEstructura, getComponente, getPrograma, getAlertas, getAlertasPA,
                    getPlanAccion, getAlertPP
                }
