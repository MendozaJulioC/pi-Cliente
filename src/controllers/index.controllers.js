var express = require('express');
var app = express();
const fetch = require('node-fetch');

let totalcomuna, total_alonso;

const getTotalesComuna= async(req, res, next)=>{
    try{
        fetch('http://localhost:4000/api/cuatrienios/comuna')
        .then(res=>res.json())
        .then(data=>{
          totalcomuna = data.data;
        })     
}catch(e){ console.log(e);}
next();
}

const getCuatrienio = async (req, res) =>{
    try{
        fetch('http://localhost:4000/api/cuatrienios')
        .then(res=>res.json())
        .then(datos=>{
            const grfAlonso =(parseInt(datos.data[0].alonso));
            const grfAnibal = (parseInt(datos.data[0].anibal));
            const grfFico = (parseInt(datos.data[0].fico));
            res.render('./cuatrienios/cuatrienio.html', {
                title:"Cuatrienios",            
                Alonso: grfAlonso,
                Anibal: grfAnibal,
                Fico: grfFico,
                totalComuna: totalcomuna  
            }) 
        })
    }catch(e){ console.log(e);}
}

const getDetalleComuna = async(req, res)=>{
    try{
        const comuna = req.params.cod_comuna;
        fetch('http://localhost:4000/api/cuatrienios/detalle/'+ comuna)
        .then(res=>res.json())
        .then(datos=>{
           console.log(datos.data)
           res.render('./cuatrienios/cuatrienio.html', {
               detalleComuna: datos.data  
            }) 
        })
    }catch(e){ console.log(e);}

}

const getAlonso = async (req, res)=>{
    try {
        fetch('http://localhost:4000/api/cuatrienios/alonso')
        .then(res=>res.json())
        .then(datos=>{
            console.log(datos.data)
            res.render('./cuatrienios/alonso.html',{
            title: "2008-2011",
            total_alonso: datos.data
         })

        })

        
    } catch (error) {
        console.log("Error getAlonso: ", error)
    }
}

const getAnibal = async (req, res)=>{
    try {
        res.render('./cuatrienios/anibal.html',{
            title: "2012-2015"
        });
        
    } catch (error) {
        console.log("Error getAnibal: ", error)
    }
}

const getFico = async (req, res)=>{
    try {
        res.render('./cuatrienios/fico.html',{
            title: "2016-2019"
        });
        
    } catch (error) {
        console.log("Error getFico: ", error)
    }
}



const getHome = async (req, res) =>{
    try{res.render('./home/index.html', {title: "geoApp"}) }catch(e){ console.log(e);}
}
const getVigencias = async (req, res) =>{
    try{res.render('./vigencias/vigencia.html', {title: "Vigencias"})}catch(e){ console.log(e);}
}
const getComunas = async (req, res) =>{
    try{res.render('./comunas/comuna.html', {title: "Comunas"})}catch(e){ console.log(e);}
}
const getDependencia = async (req, res) =>{
    try{res.render('./dependencias/dependencia.html', {title: "Dependencias"})}catch(e){ console.log(e);}
}
const getProyectos = async (req, res) =>{
    try{res.render('./proyectos/proyecto.html', {title: "Proyectos"})}catch(e){ console.log(e);}
}
const getContacto = async (req, res) =>{
    try{res.render('./contacto/contacto.html', {title: "Contacto"})}catch(e){ console.log(e);}
}





module.exports= { getHome,
     getCuatrienio,
     getTotalesComuna,
     getVigencias,
     getComunas,
     getDependencia,
     getProyectos,
     getContacto,
     getDetalleComuna, 
     getAlonso, getAnibal, getFico
    
    
    
}