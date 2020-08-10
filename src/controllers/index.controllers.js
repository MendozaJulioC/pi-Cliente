var express = require('express');
var app = express();
const fetch = require('node-fetch');

let totalcomuna, totales_alonso, total_alonso, totales_anibal, total_fico, totales_fico;

const getTotalesComuna = async (req, res, next) => {
    try {
        fetch('http://localhost:4000/api/cuatrienios/comuna')
            .then(res => res.json())
            .then(data => {
                totalcomuna = data.data;
            })
    } catch (e) {
        console.log(e);
    }
    next();
}
const getCuatrienio = async (req, res) => {
    try {
        fetch('http://localhost:4000/api/cuatrienios')
            .then(res => res.json())
            .then(datos => {
                const grfAlonso = (parseInt(datos.data[0].alonso));
                const grfAnibal = (parseInt(datos.data[0].anibal));
                const grfFico = (parseInt(datos.data[0].fico));
                res.render('./cuatrienios/cuatrienio.html', {
                    title: "Cuatrienios",
                    Alonso: grfAlonso,
                    Anibal: grfAnibal,
                    Fico: grfFico,
                    totalComuna: totalcomuna
                })
            })
    } catch (e) {
        console.log(e);
    }
}
const getDetalleComuna = async (req, res) => {
    try {
        const comuna = req.params.cod_comuna;
        fetch('http://localhost:4000/api/cuatrienios/detalle/' + comuna)
            .then(res => res.json())
            .then(datos => {
                //console.log(datos.data)
                res.render('./cuatrienios/cuatrienio.html', {
                    detalleComuna: datos.data
                })
            })
    } catch (e) {
        console.log(e);
    }

}

const getTotalAlonso = async (req, res, next) => {
    try {
        fetch('http://localhost:4000/api/cuatrienios/alonso/total')
            .then(res => res.json())
            .then(datos => {
                //console.log(datos.data)
                totales_alonso = datos.data
            })
    } catch (error) {
        console.log("Error getTotalAlonso: ", error)
    }
    next();
}
const getAlonso = async (req, res) => {
    try {
        fetch('http://localhost:4000/api/cuatrienios/alonso')
            .then(res => res.json())
            .then(datos => {

                const inverLocalizada_Alonso = parseInt(totales_alonso[0].total_localizada_alonso)
                const inverPublica_Alonso = parseInt(totales_alonso[0].total_inversión_ciudad)
                const inverPP_Alonso = parseInt(totales_alonso[0].ppalonso)
                res.render('./cuatrienios/alonso.html', {
                    title: "2008-2011",
                    inverLocalizada: inverLocalizada_Alonso,
                    inverPublica: inverPublica_Alonso,
                    inverPP: inverPP_Alonso,
                    total: (inverLocalizada_Alonso + inverPublica_Alonso + inverPP_Alonso),
                    total_alonso: datos.data
                })
            })
    } catch (error) {
        console.log("Error getAlonso: ", error)
    }
}

const getTotalAnibal = async (res, req, next) => {
    try {
        fetch('http://localhost:4000/api/cuatrienios/anibal/total')
            .then(res => res.json())
            .then(datos => {
               // console.log(datos.data)
                totales_anibal = datos.data

            })

    } catch (error) {
        console.log("Error getTotalAnibal: ", error)
    }
    next();

}
const getAnibal = async (req, res) => {
    try {
        fetch('http://localhost:4000/api/cuatrienios/anibal')
            .then(res => res.json())
            .then(datos => {
                // console.log(totales_anibal[0].total_localizada_anibal)
                const inverLocalizada_Anibal = parseInt(totales_anibal[0].total_localizada_anibal)
                const inverPublica_Anibal = parseInt(totales_anibal[0].total_inversión_ciudad_anibal)
                const inverPP_Anibal = parseInt(totales_anibal[0].ppanibal)

                res.render('./cuatrienios/anibal.html', {
                    title: "2012-2015",
                    inverLocalizada: inverLocalizada_Anibal,
                    inverPublica: inverPublica_Anibal,
                    inverPP: inverPP_Anibal,
                    total: (inverLocalizada_Anibal + inverPublica_Anibal + inverPP_Anibal),
                    total_anibal: datos.data
                })
            })
    } catch (error) {
        console.log("Error getAnibal : ", error)
    }
}

const getTotalFico = async (req, res, next) => {

    try {
        fetch('http://localhost:4000/api/cuatrienios/fico/total')
            .then(res => res.json())
            .then(datos => {
                //console.log(datos.data)
                totales_fico = datos.data
            })
    } catch (error) {
        console.log("Error getTotalFico: ", error)
    }
    next();
}

const getFico = async (req, res) => {
    try {
        fetch('http://localhost:4000/api/cuatrienios/fico')
            .then(res => res.json())
            .then(datos => {
                //console.log(datos.data)
                const inverLocalizada_Fico = parseInt(totales_fico[0].total_localizada_fico)
                const inverPublica_Fico = parseInt(totales_fico[0].total_inversión_ciudad_fico)
                const inverPP_Fico = parseInt(totales_fico[0].ppfico)
                res.render('./cuatrienios/fico.html', {
                    title: "2016-2019",
                    inverLocalizada: inverLocalizada_Fico,
                    inverPublica: inverPublica_Fico,
                    inverPP: inverPP_Fico,
                    total: (inverLocalizada_Fico + inverPublica_Fico + inverPP_Fico),
                    total_fico: datos.data
                })
            })
    } catch (error) {
        console.log(error)
    }
}

const getHome = async (req, res) => {
    try {
        res.render('./home/index.html', {
            title: "geoInverApp"
        })
    } catch (e) {
        console.log(e);
    }
}
const getVigencias = async (req, res) => {
    try {
        res.render('./vigencias/vigencia.html', {
            title: "Vigencias"
        })
    } catch (e) {
        console.log(e);
    }
}
const getComunas = async (req, res) => {
    try {
        res.render('./comunas/comuna.html', {
            title: "Comunas"
        })
    } catch (e) {
        console.log(e);
    }
}

const getProyectos = async (req, res) => {
    try {
        res.render('./proyectos/proyecto.html', {
            title: "Proyectos"
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




module.exports = {
    getHome,
    getCuatrienio,
    getTotalesComuna,
    getVigencias,
    getComunas,
   
    getProyectos,
    getContacto,
    getDetalleComuna,
    getAlonso,
    getAnibal,
    getFico,
    getTotalAlonso,
    getTotalAnibal,
    getTotalFico




}