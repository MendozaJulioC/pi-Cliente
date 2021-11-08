var express = require('express');
var app = express();
const fetch = require('node-fetch');
const googlesheet = require ('../config/spreadsheet')

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
})

const getAlertaObra = async (req, res)=>{
    try {
        let alertas=[]
        fetch(`https://sse-pdm.herokuapp.com/obrafisica/api/alertas`)
        .then(res=>res.json())
        .then(response=>{
            //console.log(response.data);
            alertas = [
                {
                    label: response.data[1].alerta,
                    value: response.data[1].total_alerta,
                    color : "#feedde"
                },
                {
                    label: response.data[2].alerta,
                    value: response.data[2].total_alerta,
                    color : "#fdae6b"
                },
                {
                    label: response.data[3].alerta,
                    value: response.data[3].total_alerta,
                    color : " #fd8d3c"
                },
                {
                    label: response.data[4].alerta,
                    value: response.data[4].total_alerta,
                    color : "#e6550d"
                },
                {
                    label: response.data[5].alerta,
                    value: response.data[5].total_alerta,
                    color : "#fdd0a2"
                },
                {
                    label: response.data[6].alerta,
                    value: response.data[6].total_alerta,
                    color : "#a63603"
                }
                       
            ] 
            alertas.sort((a,b) => b.value-a.value)
            res.status(200).json({
                Autor:"Alcaldía de Medellin - Departamento Administrativo de Planeación ",
                alizacion:"Mensual",
                Version: "1.0",
                Cobertura:"Municipio de Medelín",
                data: alertas
            });


           
        })

       
        
    } catch (error) {
        console.error("Error getAlertas: ", error);
    }
}

const getObras = async(req, res)=>{
    try {
        fetch(`https://sse-pdm.herokuapp.com/obrafisica/api/totales`)
        .then(res=>res.json())
        .then(response=>{
            //console.log(response.data);
            total_inver=  formatter.format( response.data[0].total_inversion) ;
            total_obras= response.data[0].total_obras;
            res.render('./obras/obra.html', {
                title: "Obra Física",
                total_inver,
                total_obras
            })
        })
    } catch (error) {
        console.error('Error getObra ', error)
    }
}

const getObraTema = async (req, res)=>{
    try {
        let temas=[]
       fetch(`https://sse-pdm.herokuapp.com/obrafisica/api/temas`)
       .then(res=>res.json())
       .then(response=>{
            for (let index = 0; index < response.data.length; index++) {
                temas.push({
                    label: response.data[index].tematica,
                    value: response.data[index].total_tematica
                })
            }
        //console.log(response.data);
        temas.sort((a,b) => b.value-a.value)
        res.status(200).json({
            Autor:"Alcaldía de Medellin - Departamento Administrativo de Planeación ",
            alizacion:"Mensual",
            Version: "1.0",
            Cobertura:"Municipio de Medelín",
            data: temas
        });
       })
    } catch (error) {
        console.error('Error getObraTema: ', error)
    }
}

const getObraTipo= async (req, res)=>{
   try {
    let tipo=[];
    fetch(`https://sse-pdm.herokuapp.com/obrafisica/api/intervencion`)
    .then(res=>res.json())
    .then(response=>{
       for (let index = 0; index < response.data.length; index++) {
           tipo.push({
               label: response.data[index].tipo_intervencion,
               value: response.data[index].total_intervencion,
           })
        }
        tipo.sort((a,b)=>b.value-a.value)
        res.status(200).json({
        Autor:"Alcaldía de Medellin - Departamento Administrativo de Planeación ",
        alizacion:"Mensual",
        Version: "1.0",
        Cobertura:"Municipio de Medelín",
        data: tipo
    });          
    }) 
   } catch (error) {
       console.error('Error getObraTipo: ', error )
   } 
}

const getObraEtapas= async(req, res)=>{
    try {
       let etapa=[];
       fetch(`https://sse-pdm.herokuapp.com/obrafisica/api/etapas`)
       .then(res=>res.json())
       .then(response=>{
           //console.log(' task ',response.data);
            for (let index = 0; index < response.data.length; index++) {
                //console.log(response.data[index].etapa);
                etapa.push({
                    label: response.data[index].etapa,
                    value: response.data[index].total_etapa
                })
            }
            res.status(200).json({
                Autor:"Alcaldía de Medellin - Departamento Administrativo de Planeación ",
                actualizacion:"Mensual",
                Version: "1.0",
                Cobertura:"Municipio de Medelín",
                data: etapa
           });
       })        
   
    } catch (error) {
        console.error('Error getObraEtapa:', error )
    }
}

const getObraDep=async (req, res)=>{
    try {
        let dep=[], obra=[], ejecutada=[];
        fetch(`https://sse-pdm.herokuapp.com/obrafisica/api/obrasdep`)
        .then(res=>res.json())
        .then(response=>{
            for (let index = 0; index < response.data.length; index++) {
                dep.push({
                    "label": response.data[index].nom_cortp,
                    "value": response.data[index].total,
                    "link": "j-showAlert-"+response.data[index].cod_dep
                }) 
            }
            dep.sort((a,b)=>b.value-a.value)
            res.status(200).json({
                Autor:"Alcaldía de Medellin - Departamento Administrativo de Planeación ",
                alizacion:"Mensual",
                Version: "1.0",
                Cobertura:"Municipio de Medelín",
                data: dep,
            });
        })
    } catch (error) {
    }
}

const getObraDepDetalle=async(req, res)=>{
    try {
        const dep = req.params.cod_dep
        var total_inversion=0;
        var corte=''
        let alertas=[];
        let etapa=[];
        let hitos=[];
        fetch(`https://sse-pdm.herokuapp.com/obrafisica/api/total/dep/${dep}`)
        .then(res=>res.json())
        .then(response=>{
            total_inversion= formatter.format(parseFloat(response.data[0].total_dep) )
            corte = response.data[0].corte
            console.log('del fetch:_',corte);
            let tipo=[];
            fetch(`https://sse-pdm.herokuapp.com/obrafisica/api/intervencion/dep/${dep}`)
            .then(res=>res.json())
            .then(datos=>{
                //console.log(datos.data);
                for (let index = 0; index < datos.data.length; index++) {
                    tipo.push({
                        label: datos.data[index].tipo_intervencion,
                        value: datos.data[index].total_intervencion
                    })
                }
                tipo.sort((a,b)=>b.value-a.value)
                fetch(`https://sse-pdm.herokuapp.com/obrafisica/api/alerta/dep/${dep}`)
                .then(res=>res.json())
                .then(response=>{
                    for (let index = 0; index < response.data.length; index++) {
                      if (response.data[index].alerta!=0) {
                            alertas.push({
                                label: response.data[index].alerta,
                                value: response.data[index].total_alerta,
                                 color : "#bb371a"
                            })
                        }
                    }

                fetch(`https://sse-pdm.herokuapp.com/obrafisica/api/etapa/dep/${dep}`)
                .then(res=>res.json())
                .then(response=>{
                    for (let index = 0; index < response.data.length; index++) {
                    
                            etapa.push({
                                label: response.data[index].etapa,
                                value: response.data[index].total_etapa
                            })
                    
                    }
                    // alertas.sort((a,b)=> b.value-a.value)
                    // etapa.sort((a,b)=>b.value-a.value)
                fetch(`https://sse-pdm.herokuapp.com/obrafisica/api/hitos/sif`)    
                .then(res=>res.json())
                .then(response=>{
                    for (let index = 0; index < response.data.length; index++) {
                        hitos.push({
                            label: response.data[index].hito,
                            value: response.data[index].total_hito
                        })
                    }
                    res.status(200).json({
                        data:tipo,
                        alerta: alertas,
                        inversion: total_inversion,
                        corte: corte,
                        etapa: etapa,
                        hitos: hitos
                    });
                })
              })
           })
         })
       })
     } catch (error) {
         console.error('Error getObraDepDetalle:', error);
    }
}

const getObrasGeo= async(req, res)=>{
    try {
       // geo= await googlesheet.geo_obras()
       let geo=[];
       fetch(`https://sse-pdm.herokuapp.com/obrafisica/api/geo`)
       .then(res=>res.json())
       .then(response=>{
            for (let index = 0; index < response.data.length; index++) {
                geo.push({
                    label: response.data[index].nom_comuna,
                    value: response.data[index].obras,
                    link: "j-showAlert-"+response.data[index].cod_comuna
                })
            }
            res.status(200).json({
            Autor:"Alcaldía de Medellin - Departamento Administrativo de Planeación ",
            alizacion:"Mensual",
            Version: "1.0",
            Cobertura:"Municipio de Medelín",
            data: geo
           });
       })
      

    } catch (error) {
        console.error('Error getObrasGeo: ', error)
    }
}



module.exports = { getObras, getAlertaObra, getObraTema, getObraTipo, getObraEtapas, getObraDep, getObraDepDetalle, getObrasGeo }