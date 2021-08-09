var express = require('express');
var app = express();
const fetch = require('node-fetch');
const googlesheet = require ('../config/spreadsheetPI')

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
})


const getGeneralPI = async (req, res)=>{
    reportPI = await googlesheet.getGoogleSheetPI();
   // console.log('task ',reportPI);
    let AvancePI=[]; let CumplimientoPI=[]; let CortePlan=[];let cumpleHoy=0;
    for (let z=0; z<reportPI.length;z++){
        if(reportPI[z].Avance!= '#DIV/0!'){
           // console.log((reportPI[z].Avance ));
            AvancePI.push ({ "value" :  (reportPI[z].Avance) })  
            CortePlan.push({ "label" :  reportPI[z].Corte })
        }
        if(reportPI[z].Avance !='0'){
            CumplimientoPI.push ({ "value" : reportPI[z].Cumplimiento })  
        }
        
       if(reportPI[z].Corte== '2021-06-30'){
           cumpleHoy= reportPI[z].Cumplimiento 
        }
   }
   res.status(200).json({
    Autor:"Alcaldía de Medellin - Departamento Administrativo de Planeación ",
    Version: "1.0",
    Cobertura:"Municipio de Medelín",
    avance: AvancePI,
    cumplimiento: CumplimientoPI,
    corte: CortePlan,
    cumplehoy : cumpleHoy
    });      

  
}

const getGeneralPI_Lineas = async (req, res)=>{
    reportPIL = await googlesheet.getGoogleSheetPI_Lineas();
   //console.log('task ',reportPIL);
    let NomPIL=[]; let AvanceJun2021=[]; let CumplimientoJun21=[]; let ProyecAvanDic21=[]; let ProyecCumpDic21=[];
    let AvanceDic20=[]; let CumplimientoDic20=[];
    for (let z=0; z<reportPIL.length;z++){
        AvanceDic20.push({"value" :  parseFloat(reportPIL[z].Avance2020_12_31)})
        CumplimientoDic20.push({"value" :  parseFloat(reportPIL[z].Cumplimiento2020_12_31) })
        AvanceJun2021.push ({ "value" :  parseFloat(reportPIL[z].Avance2021_06_30) })  
        CumplimientoJun21.push ({ "value" :  parseFloat(reportPIL[z].Cumplimiento2021_06_30) }) 
        ProyecAvanDic21.push ({ "value" :  parseFloat(reportPIL[z].Avance2021_12_31_P) }) 
        ProyecCumpDic21.push ({ "value" :  parseFloat(reportPIL[z].Cumplimiento2021_12_31_P) }) 
        NomPIL.push({ "label" : reportPIL[z].NomLinea })
   }
   res.status(200).json({
    Autor:"Alcaldía de Medellin - Departamento Administrativo de Planeación ",
    Version: "1.0",
    Cobertura:"Municipio de Medelín",
    avanceDic20:AvanceDic20,
    cumplimientoDic20: CumplimientoDic20,
    avanceJun21: AvanceJun2021,
    cumplimientoJun21: CumplimientoJun21,
    proyeccAvanceDic21 : ProyecAvanDic21,
    proyeccCumplDic2021: ProyecCumpDic21,
    linea: NomPIL

    });      

  
}

/*

const getAlertaObra = async (req, res)=>{
    try {
        //let alerta1=0, alerta2=0, alerta3=0, alerta4=0,alerta5=0,alerta6=0,alerta7=0,alerta8=0;
        reports = await googlesheet.getGoogleSheet();
        let alertas=[]
        for(let x=0; x<reports.length; x++){
            if(reports[x].cod_alerta=='1'){ alerta1+=1}
            if(reports[x].cod_alerta=='2') {alerta2+=1}
            if(reports[x].cod_alerta=='3') {alerta3+=1}
            if(reports[x].cod_alerta=='4') {alerta4+=1}
            if(reports[x].cod_alerta=='5') {alerta5+=1}
            if(reports[x].cod_alerta=='6') {alerta6+=1}
            if(reports[x].cod_alerta=='7') {alerta7+=1}
            if(reports[x].cod_alerta=='8') {alerta8+=1}
        }
        alertas = [
            {
                label: "Déficit presupuestal",
                value: alerta4,
                color : "#bb371a"
            },
            {
                label: "Gestión del proceso",
                value: alerta1,
                color : "#fc5404"
            },
            {
                label: "Cumplimiento",
                value: alerta3,
                color : "#f98404"
            },
            {
                label: "Suspendida",
                value: alerta7,
                color : "#f98404"
            },
            {
                label: "Criterio técnico",
                value: alerta2,
                color : "#f9b208"
            },
            {
                label: "Funcionamiento",
                value: alerta5,
                color : "#ffd56b"
            },
            {
                label: "Múltiples alertas",
                value: alerta6,
                color : "#ffd56b"
            }        
        ] 
        res.status(200).json({
            Autor:"Alcaldía de Medellin - Departamento Administrativo de Planeación ",
            alizacion:"Mensual",
            Version: "1.0",
            Cobertura:"Municipio de Medelín",
            data: alertas
        });
    } catch (error) {
        console.error("Error getAlertas: ", error);
    }
}

const getObras = async(req, res)=>{
    try {
        reports = await googlesheet.getGoogleSheet();
        //console.log(reports);
        let total_inversion=0, total_obras=0
        let alertas=[]
        for(let x=0; x<reports.length; x++){
            total_inversion= total_inversion  + parseInt(reports[x].valor_total_acumulado)
            total_obras+=1
        }
        let total_inver = formatter.format(total_inversion, total_obras)
        res.render('./obras/obra.html', {
            title: "Obra Física",
            total_inver,
            total_obras, alertas
        })
    } catch (error) {
        console.error('Error getObra ', error)
    }
}

const getObraTema = async (req, res)=>{
    try {
        let tema1=0, tema2=0, tema3=0, tema4=0,tema5=0,tema6=0, tema7=0, tema8=0, tema9=0, tema10=0, tema11=0;
        reports = await googlesheet.getGoogleSheet();
        let temas=[]
        for (let z=0; z<reports.length;z++){
            if(reports[z].cod_tematica=='1')  {tema1+=1}
            if(reports[z].cod_tematica=='2')  {tema2+=1}
            if(reports[z].cod_tematica=='3')  {tema3+=1}
            if(reports[z].cod_tematica=='4')  {tema4+=1}
            if(reports[z].cod_tematica=='5')  {tema5+=1}
            if(reports[z].cod_tematica=='6')  {tema6+=1}
            if(reports[z].cod_tematica=='7')  {tema7+=1}
            if(reports[z].cod_tematica=='8')  {tema8+=1}
            if(reports[z].cod_tematica=='9')  {tema9+=1}
            if(reports[z].cod_tematica=='10') {tema10+=1}
            if(reports[z].cod_tematica=='11') {tema11+=1}
        }
        if(tema1>0){ temas.push(  {"label": 'Comunitarios',   "value": tema1})}
        if(tema2>0){ temas.push(  {"label": 'Educativos',     "value": tema2})}
        if(tema3>0){ temas.push(  {"label": 'Espacio Público',"value": tema3})}
        if(tema4>0){ temas.push(  {"label": 'Medio Ambiente', "value": tema4})}
        if(tema5>0){ temas.push(  {"label": 'Mitigación del Riesgo', "value": tema5})}
        if(tema6>0){ temas.push(  {"label": 'Movilidad', "value": tema6})}
        if(tema7>0){ temas.push(  {"label": 'Recreación', "value": tema7})}
        if(tema8>0){ temas.push(  {"label": 'Salud', "value": tema8})}
        if(tema9>0){ temas.push(  {"label": 'Servicios Públicos', "value": tema9})}
        if(tema10>0){ temas.push( {"label": 'Vivienda', "value": tema10})}
        if(tema11>0){ temas.push( {"label": 'Seguridad', "value": tema11})}
        //console.log(temas);
        temas.sort((a,b)=>b.value-a.value)
        res.status(200).json({
            Autor:"Alcaldía de Medellin - Departamento Administrativo de Planeación ",
            alizacion:"Mensual",
            Version: "1.0",
            Cobertura:"Municipio de Medelín",
            data: temas
        });
    } catch (error) {
        console.error('Error getObraTema: ', error)
    }
}

const getObraTipo= async (req, res)=>{
   try {
           reports= await googlesheet.getGoogleSheet();
           let tipo=[];
           let tipo1=0, tipo2=0, tipo3=0, tipo4=0;
           for(let y=0; y < reports.length; y++){
            if(reports[y].cod_intervencion=='1')  {tipo1+=1}
            if(reports[y].cod_intervencion=='2')  {tipo2+=1}
            if(reports[y].cod_intervencion=='3')  {tipo3+=1}
            if(reports[y].cod_intervencion=='4')  {tipo4+=1}
           }
           if(tipo1>0){ tipo.push(  {"label": 'Obra nueva',     "value": tipo1})}
           if(tipo2>0){ tipo.push(  {"label": 'Ampliación',     "value": tipo2})}
           if(tipo3>0){ tipo.push(  {"label": 'Adecuación',     "value": tipo3})}
           if(tipo4>0){ tipo.push(  {"label": 'Mantenimiento',  "value": tipo4})}

           tipo.sort((a,b)=>b.value-a.value)
           res.status(200).json({
            Autor:"Alcaldía de Medellin - Departamento Administrativo de Planeación ",
            alizacion:"Mensual",
            Version: "1.0",
            Cobertura:"Municipio de Medelín",
            data: tipo
        });           
   } catch (error) {
       console.error('Error getObraTipo: ', error )
   } 
}

const getObraEtapas= async(req, res)=>{
    try {
       
        reports= await googlesheet.getGoogleSheet();
        let etapa=[];
        let etapa1=0,etapa2=0,etapa3=0,etapa4=0,etapa5=0,etapa6=0;
        for (let index = 0; index < reports.length; index++) {
            if(reports[index].cod_etapa=='1')  {etapa1+=1}
            if(reports[index].cod_etapa=='2')  {etapa2+=1}
            if(reports[index].cod_etapa=='3')  {etapa3+=1}
            if(reports[index].cod_etapa=='4')  {etapa4+=1}
            if(reports[index].cod_etapa=='5')  {etapa5+=1}
            if(reports[index].cod_etapa=='6')  {etapa6+=1}            
        }
        if(etapa1>0){ etapa.push(  {"label": 'Estudios preliminares',"value": etapa1})}
        if(etapa2>0){ etapa.push(  {"label": 'Gestión predial y social',"value": etapa2})}
        if(etapa3>0){ etapa.push(  {"label": 'Diseños', "value": etapa3})}
        if(etapa4>0){ etapa.push(  {"label": 'Proceso de contratación',"value": etapa4})}
        if(etapa5>0){ etapa.push(  {"label": 'Etapa constructiva', "value": etapa5})}
        if(etapa6>0){ etapa.push(  {"label": 'Obra ejecutada', "value": etapa6})}

        etapa.sort((a,b)=>b.value-a.value)
        res.status(200).json({
         Autor:"Alcaldía de Medellin - Departamento Administrativo de Planeación ",
         alizacion:"Mensual",
         Version: "1.0",
         Cobertura:"Municipio de Medelín",
         data: etapa
        });           
   
    } catch (error) {
        console.error('Error getObraEtapa:', error )
    }
}


const getObraDep=async (req, res)=>{
    try {
        reportdep= await googlesheet.getGoogleSheetObrasDep();
        //console.log(reportdep);
        let dep=[], obra=[], ejecutada=[];
        for (let index = 0; index < reportdep.length; index++) {
          if(reportdep[index].total_obras !='0' ){
            dep.push({
                "label": reportdep[index].nom_dependencia,
                "value": reportdep[index].total_obras,
                "link": "j-showAlert-"+reportdep[index].cod_dependencia,

            }) 
            obra.push({
                "value": reportdep[index].otras_etapas,
                "link": "j-showAlert-"+reportdep[index].cod_dependencia,
            })  
            ejecutada.push({
                "value": reportdep[index].obra_ejecutada,
                "link": "j-showAlert-"+reportdep[index].cod_dependencia,
            })  
          }
        }
        
        res.status(200).json({
            Autor:"Alcaldía de Medellin - Departamento Administrativo de Planeación ",
            alizacion:"Mensual",
            Version: "1.0",
            Cobertura:"Municipio de Medelín",
            data: dep,
            obra: obra,
            ejecutada: ejecutada
           });
    } catch (error) {
        
    }
}


const getObraDepDetalle=async(req, res)=>{
    try {
        const dep = req.params.cod_dep
        detalledep= await googlesheet.qReportDepModal(dep);
        hitos = await googlesheet.qReporHitotDepModal(dep)
        let total_inversion=0;
        let tipo=[];
        let tipo1=0, tipo2=0, tipo3=0, tipo4=0;
        let alerta1=0, alerta2=0, alerta3=0, alerta4=0,alerta5=0,alerta6=0,alerta7=0,alerta8=0;
        let alertas=[]
        let etapa=[];
        let etapa1=0,etapa2=0,etapa3=0,etapa4=0,etapa5=0,etapa6=0;
        for (let index = 0; index < detalledep.length; index++) {
            total_inversion= total_inversion  + parseInt(detalledep[index].val_total_acumulado)
            if(detalledep[index].cod_intervencion=='1')  {tipo1+=1}
            if(detalledep[index].cod_intervencion=='2')  {tipo2+=1}
            if(detalledep[index].cod_intervencion=='3')  {tipo3+=1}
            if(detalledep[index].cod_intervencion=='4')  {tipo4+=1}
            if(detalledep[index].cod_alerta=='1'){ alerta1+=1}
            if(detalledep[index].cod_alerta=='2') {alerta2+=1}
            if(detalledep[index].cod_alerta=='3') {alerta3+=1}
            if(detalledep[index].cod_alerta=='4') {alerta4+=1}
            if(detalledep[index].cod_alerta=='5') {alerta5+=1}
            if(detalledep[index].cod_alerta=='6') {alerta6+=1}
            if(detalledep[index].cod_alerta=='7') {alerta7+=1}
            if(detalledep[index].cod_alerta=='8') {alerta8+=1}
            if(detalledep[index].cod_etapa=='1')  {etapa1+=1}
            if(detalledep[index].cod_etapa=='2')  {etapa2+=1}
            if(detalledep[index].cod_etapa=='3')  {etapa3+=1}
            if(detalledep[index].cod_etapa=='4')  {etapa4+=1}
            if(detalledep[index].cod_etapa=='5')  {etapa5+=1}
            if(detalledep[index].cod_etapa=='6')  {etapa6+=1}  
        }
        let total_inver = formatter.format(total_inversion)
        if(tipo1>0){ tipo.push(  {"label": 'Obra nueva',     "value": tipo1})}
        if(tipo2>0){ tipo.push(  {"label": 'Ampliación',     "value": tipo2})}
        if(tipo3>0){ tipo.push(  {"label": 'Adecuación',     "value": tipo3})}
        if(tipo4>0){ tipo.push(  {"label": 'Mantenimiento',  "value": tipo4})}
        if(alerta1>0){ alertas.push(  {"label": 'Gestión del proceso',     "value": alerta1,   "color" : "#fc5404"})}
        if(alerta2>0){ alertas.push(  {"label": 'Criterio técnico',     "value": alerta2,   "color" : "#f9b208"})}
        if(alerta3>0){ alertas.push(  {"label": 'Cumplimiento',     "value": alerta3,   "color" : "#f98404"})}
        if(alerta4>0){ alertas.push(  {"label": 'Déficit presupuestal',  "value": alerta4,  "color" : "#bb371a"})}
        if(alerta5>0){ alertas.push(  {"label": 'Funcionamiento',     "value": alerta5,   "color" : "#ffd56b"})}
        if(alerta6>0){ alertas.push(  {"label": 'Múltiples alertas',     "value": alerta6, "color" : "#ffd56b"})}
        if(alerta7>0){ alertas.push(  {"label": 'Suspendida',     "value": alerta7, "color" : "#f98404"})}
        if(alerta8>0){ alertas.push(  {"label": 'Siguiente Administración',  "value": alerta8, "color" : "#005a8d"})}
        if(etapa1>0){ etapa.push(  {"label": 'Estudios preliminares',"value": etapa1})}
        if(etapa2>0){ etapa.push(  {"label": 'Gestión predial y social',"value": etapa2})}
        if(etapa3>0){ etapa.push(  {"label": 'Diseños', "value": etapa3})}
        if(etapa4>0){ etapa.push(  {"label": 'Proceso de contratación',"value": etapa4})}
        if(etapa5>0){ etapa.push(  {"label": 'Etapa constructiva', "value": etapa5})}
        if(etapa6>0){ etapa.push(  {"label": 'Obra ejecutada', "value": etapa6})}
        tipo.sort((a,b)=>b.value-a.value)
        alertas.sort((a,b)=> b.value-a.value)
        etapa.sort((a,b)=>b.value-a.value)
        res.status(200).json({
            Autor:"Alcaldía de Medellin - Departamento Administrativo de Planeación ",
            alizacion:"Mensual",
            Version: "1.0",
            Cobertura:"Municipio de Medelín",
            data: tipo,
            alerta: alertas,
            inversion: total_inver,
            etapa: etapa,
            hitos: hitos
           });

    } catch (error) {
        
    }
}

const getObrasGeo= async(req, res)=>{
    try {
        geo= await googlesheet.geo_obras()
        res.status(200).json({
            Autor:"Alcaldía de Medellin - Departamento Administrativo de Planeación ",
            alizacion:"Mensual",
            Version: "1.0",
            Cobertura:"Municipio de Medelín",
            data: geo
           });

    } catch (error) {
        console.error('Error getObrasGeo: ', error)
    }
}


*/


module.exports = { getGeneralPI , getGeneralPI_Lineas/*getObras, getAlertaObra, getObraTema, getObraTipo, getObraEtapas, getObraDep, getObraDepDetalle, getObrasGeo*/ }