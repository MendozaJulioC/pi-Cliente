var express = require('express');
const { MulterError } = require('multer');
var app = express();
const fetch = require('node-fetch');


const getProjects= async(req, res)=>
{
    try {
       
        res.render('./proyectos_estrategicos/projects_start.html', {
            title: "Proyectos Estratégicos"
        })
     
    } catch (error) {
        console.log('Error getProjects: ', error)
    }
}


const getProject1= async(req, res)=>{
    try{ 
        res.render('./proyectos_estrategicos/proyecto/proyect_e1.html',
         {
             title: "Metro de la 80",
            subtitle: "Metro de la 80",
            
        } )
    } catch (error) {console.log('Error getProject1: ', error)}
}

const getProject2= async(req, res)=>{
    try {
        res.render('./proyectos_estrategicos/proyecto/proyect_e2.html', 
        {
            title: "Plan estratégico de tecnologías para la seguridad",
            subtitle: "Plan estratégico de tecnologías para la seguridad: Inteligencia, tecnología e infraestructura para la seguridad y la convivencia"
         
        }) 
    } catch (error) {console.log('Error getProject2: ', error)}
}

const getProject3= async(req, res)=>{
    try {res.render('./proyectos_estrategicos/proyecto/proyect_e3.html', {title: "Un billón", subtitle:"Un billón para la reactivación económica y el valle del software"})} catch (error) {console.log('Error getProject3: ', error)}
}
const getProject4= async(req, res)=>{
    try {res.render('./proyectos_estrategicos/proyecto/proyect_e4.html', {title: "Refugio de vida silvestre", subtitle: "Refugio de vida silvestre "})} catch (error) {console.log('Error getProject4: ', error)}
}
const getProject5= async(req, res)=>{
    try {res.render('./proyectos_estrategicos/proyecto/proyect_e5.html', {title: "Red neutra y red mesh ", subtitle:"Red neutra y red mesh"})} catch (error) {console.log('Error getProject5: ', error)}
}
const getProject6= async(req, res)=>{
    try {res.render('./proyectos_estrategicos/proyecto/proyect_e6.html', {title: "Parques del norte", subtitle:"Parques del norte"})} catch (error) {console.log('Error getProject6: ', error)}
}
const getProject7= async(req, res)=>{
    try {res.render('./proyectos_estrategicos/proyecto/proyect_e7.html', {title: "Transformación educativa", subtitle:"Transformación educativa"})} catch (error) {console.log('Error getProject7: ', error)}
}
const getProject8= async(req, res)=>{
    try {res.render('./proyectos_estrategicos/proyecto/proyect_e8.html', {title: "Fortalecimiento IS", subtitle:"Fortalecimiento de la infraestructura de salud"})} catch (error) {console.log('Error getProject8: ', error)}
}
const getProject9= async(req, res)=>{
    try {res.render('./proyectos_estrategicos/proyecto/proyect_e9.html', {title: "Estrategia Medellín me cuida: social y salud ", subtitle:"Estrategia Medellín me cuida: social y salud"})} catch (error) {console.log('Error getProject9: ', error)}
}
const getProject10= async(req, res)=>{
    try {res.render('./proyectos_estrategicos/proyecto/proyect_e10.html', {title: "Seguridad alimentaria y hambre cero", subtitle:"Seguridad alimentaria y hambre cero"})} catch (error) {console.log('Error getProject10: ', error)}
}
const getProject11= async(req, res)=>{
    try {res.render('./proyectos_estrategicos/proyecto/proyect_e11.html', {title: "Sistema municipal de cuidados ", subtitle:"Sistema municipal de cuidados"})} catch (error) {console.log('Error getProject11: ', error)}
}
const getProject12= async(req, res)=>{
    try {res.render('./proyectos_estrategicos/proyecto/proyect_e12.html', {title: "Bienes de capital físico para mujeres", subtitle:"Bienes de capital físico para mujeres"})} catch (error) {console.log('Error getProject12: ', error)}
}
const getProject13= async(req, res)=>{
    try {res.render('./proyectos_estrategicos/proyecto/proyect_e13.html', {title: "Estudios de una nueva Línea del Metro con tramos subterráneos", subtitle:"Estudios de una nueva Línea del Metro con tramos subterráneos"})} catch (error) {console.log('Error getProject13: ', error)}
}
const getProject14= async(req, res)=>{
    try {res.render('./proyectos_estrategicos/proyecto/proyect_e14.html', {title: "Parque biblioteca pública Zona Nororiental", subtitle:"Parque biblioteca pública Zona Nororiental"})} catch (error) {console.log('Error getProject14: ', error)}
}
const getProject15= async(req, res)=>{
    try {res.render('./proyectos_estrategicos/proyecto/proyect_e15.html', {title: "Complejo cultural de Ciudad del Río", subtitle:"Complejo cultural de Ciudad del Río"})} catch (error) {console.log('Error getProject15: ', error)}
}
const getProject16= async(req, res)=>{
    try {res.render('./proyectos_estrategicos/proyecto/proyect_e16.html', {title: "Medellín caminable y pedaleable ", subtitle:"Medellín caminable y pedaleable"})} catch (error) {console.log('Error getProject16: ', error)}
}
const getProject17= async(req, res)=>{
    try {res.render('./proyectos_estrategicos/proyecto/proyect_e17.html', {title: "Ciencia futuro ", subtitle:"Ciencia futuro"})} catch (error) {console.log('Error getProject17: ', error)}
}

const getProjectEspecial = async(req, res)=>{
    try {
        res.render('./proyectos_estrategicos/proyecto/proyect_especiales.html', 
        {title: "Especiales ", subtitle:"Medellin futuro"})



    } catch (error) {
        console.error('Error getProjectEspecial:', error);
    }
}

const getEspecialIndicadores = async (req, res)=>{
    try {
        res.render('./proyectos_estrategicos/proyecto/proyect_special_indicador.html', 
        {title: "Indicadores Especiales ", subtitle:"Medellin futuro"})
    } catch (error) {
        console.error('Error getEspecialIndicadores: ', error);
    }
}

module.exports = { 
    getProjects,getProject1,getProject2,
    getProject3,getProject4,getProject5,
    getProject6,getProject7,getProject8,
    getProject9,getProject10,getProject11,
    getProject12,getProject13,getProject14,
    getProject15,getProject16,getProject17,
    getProjectEspecial, getEspecialIndicadores
}