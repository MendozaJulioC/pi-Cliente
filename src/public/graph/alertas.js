//import fetch from "node-fetch";
var mes=0, vigencia=0, minimovalue=0, maximovalue=0;
var colorfondo='';
let valores=[];

async function dateomain(){
 setTimeout(function(){ avance_linea_dep()   }, 3000);
}
//alertasGraph()

async function avance_linea_dep(){
  try {
    let info=[];
    fetch('https://sse-pdm-back.herokuapp.com/dep/api/dependencias/avance')
    .then(res=>res.json())
    .then(datos=>{
      let tam = datos.data.length;
         for(let i =0; i<tam;i++){
        if (((datos.data[i].avance/datos.data[i].peso)*100)>=maximovalue){colorsemaf="#58AC84"}
        else if (((datos.data[i].avance/datos.data[i].peso)*100)<=minimovalue) {colorsemaf="#F06764"} 
        else {colorsemaf="#FFBD2E"}
        info.push({
           "label" : datos.data[i].nombre_dep,
           "value": (datos.data[i].avance/datos.data[i].peso)*100,
           "color": colorsemaf,
        })
      }
      info.sort((a, b) =>  b.value -a.value )
      const dataSource = {
        chart: {
          caption: "% Avance cuatrienial por Dependencias PDM",
          yaxisname: "Dependencias",
          aligncaptionwithcanvas: "0",
          theme: "gammel",
          numbersuffix: "%"
        },
        data: info
      };
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "bar2d",
          renderAt: "chart-container",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });
    })
  } catch (error) {
    console.error('Error _avancePDM ',error )
  }
  document.getElementById('minimorango').innerHTML= '< '+minimovalue
  document.getElementById('maximorango').innerHTML= '> '+maximovalue
  document.getElementById('intermediorango').innerHTML= minimovalue +'-'+ maximovalue
  alertasGraph()
}


async function alertasGraph(){
  try {
    let tabla='';
    let sumInd=0, sumGris=0, sumRojo=0,  sumAmarillo=0, sumVerde=0;
    document.getElementById('tabla_alerta').innerHTML="";
    fetch(`https://sse-pdm-back.herokuapp.com/pi/api/semaforo-corte/alertas`)
    .then(res=> res.json())
    .then(datos=>{
    let tam = datos.data.length;
    var gris=0, rojo=0, amarillo=0, verde=0, avance=0;
     for(let i =0; i<tam;i++){
        if (datos.data[i].total_gris == null){ gris= 0 } else { gris = parseInt(datos.data[i].total_gris)  }
        if (datos.data[i].total_rojo == null){rojo= 0} else { rojo = parseInt(datos.data[i].total_rojo ) }
        if (datos.data[i].total_amarillo == null){ amarillo= 0} else { amarillo = parseInt(datos.data[i].total_amarillo ) }
        if (datos.data[i].total_verde == null){ verde= 0} else { verde = parseInt(  datos.data[i].total_verde )}
        if (datos.data[i].avance == null){avance= 0} else { avance = parseFloat( datos.data[i].avance )}
        if((parseFloat(datos.data[i].avance)).toFixed(2)< minimovalue ){colorfondo='#f06764'}
        else if ((parseFloat(datos.data[i].avance)).toFixed(2)>= maximovalue) {colorfondo='#58ac84'
        } else {colorfondo='#ffbd2e'}
          valores.push({
            "cod_dep" : datos.data[i].cod_dep,
            "nombre_dep": datos.data[i].nombre_dep,
            "total_gris": gris,
            "total_rojo": rojo,
            "total_amarillo": amarillo,
            "total_verde": verde,
            "avance": avance,
            "color" : colorfondo
          })
          /*
          tabla +='<tr >';
          tabla +='<td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+datos.data[i].cod_dep+'</td>';
          tabla +='<td style="text-align: left;font-weight: 400; width: 10px; width: 20px;">'+((datos.data[i].nombre_dep))+'</td>';
          tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+((gris)+(rojo)+(amarillo)+(verde))+'</td>';
          tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+gris+'</td>';
          tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+rojo+'</td>';
          tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+amarillo+'</td>';
          tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+verde+'</td>';
          tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+(parseFloat(datos.data[i].avance)).toFixed(2) +'%</td>';
          tabla +='<tr>';
          document.getElementById('tabla_alerta').innerHTML=tabla;*/
      }
     valores.sort((b, a) =>  b.avance - a.avance )
     let count =1; 
    for (let index = 0; index < valores.length; index++) {
      let suma=((valores[index].total_gris)+(valores[index].total_rojo)+(valores[index].total_amarillo)+(valores[index].total_verde))
      tabla +='<tr>';
      tabla +='<td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+(count++)+'</td>';
      tabla +='<td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+valores[index].cod_dep+'</td>';
      tabla +='<td style="text-align: left;font-weight: 400; width: 10px; width: 20px;">'+((valores[index].nombre_dep))+'</td>';
      tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+((valores[index].total_gris)+(valores[index].total_rojo)+(valores[index].total_amarillo)+(valores[index].total_verde))+'</td>';
      tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+valores[index].total_gris+'</td>';
      tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+((valores[index].total_gris)/((suma))*100).toFixed(2)+'%</td>';
      tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+valores[index].total_rojo+'</td>';
      tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+((valores[index].total_rojo)/((suma))*100).toFixed(2)+'%</td>';
      tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+valores[index].total_amarillo+'</td>';
      tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+((valores[index].total_amarillo)/((suma))*100).toFixed(2)+'%</td>';
      tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+valores[index].total_verde+'</td>';
      tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+((valores[index].total_verde)/((suma))*100).toFixed(2)+'%</td>';
      tabla +='<td  style="text-align: center;font-weight: 400; width: 10px; width: 20px;background-color:'+valores[index].color +' ;"> '+ (valores[index].avance).toFixed(2)+'  %</td>';
      //tabla +='<td td style="text-align: center;font-weight: 100; width: 10px; width: 20px;"><button class="btn btn-outline-primary btn-sm" onclick="ampliarDep('+valores[index].cod_dep+')"><i class="fa fa-globe fa-2x fa-rotate-270" style="color: #339af0;"></i></button></td>';
      tabla +='<tr>';
      document.getElementById('tabla_alerta').innerHTML=tabla;
      sumInd= sumInd+ ((valores[index].total_gris)+(valores[index].total_rojo)+(valores[index].total_amarillo)+(valores[index].total_verde))
      sumGris= sumGris+ (valores[index].total_gris);
      sumRojo= sumRojo+ (valores[index].total_rojo);
      sumAmarillo = sumAmarillo+ (valores[index].total_amarillo);
      sumVerde=sumVerde+ (valores[index].total_verde);
    }
    document.getElementById('totaInd').innerHTML=sumInd
    document.getElementById('totalnoprogramados').innerHTML=sumGris
    document.getElementById('pocentajeprogramados').innerHTML= ((sumGris/sumInd)*100).toFixed(2)+"%"
    document.getElementById('totalminimorango').innerHTML=sumRojo
    document.getElementById('porcentajeminimorango').innerHTML= ((sumRojo/sumInd)*100).toFixed(2)+"%"
    document.getElementById('totalinermediorango').innerHTML=sumAmarillo
    document.getElementById('porcentajemediorango').innerHTML= ((sumAmarillo/sumInd)*100).toFixed(2)+"%"
    document.getElementById('totalmaximorango').innerHTML=sumVerde
    document.getElementById('porcentajemaximorango').innerHTML= ((sumVerde/sumInd)*100).toFixed(2)+"%"
   })
   } catch (error) {
    console.error('Error alertasGraph ', error)
  }
}


$(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#tabla_alerta tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

async function  filtro(estado){
  let tabla='';
  let sumInd=0, sumGris=0, sumRojo=0,  sumAmarillo=0, sumVerde=0;
  document.getElementById('tabla_alerta').innerHTML="";
  document.getElementById('totaInd').innerHTML='';
  document.getElementById('totalnoprogramados').innerHTML='';
  document.getElementById('totalminimorango').innerHTML='';
  document.getElementById('totalinermediorango').innerHTML='';
  document.getElementById('totalmaximorango').innerHTML='';

  if(estado == 1){
    let count =1; 

    for (let index = 0; index < valores.length; index++) {
      let suma=((valores[index].total_gris)+(valores[index].total_rojo)+(valores[index].total_amarillo)+(valores[index].total_verde))
      if((valores[index].avance).toFixed(2)<= minimovalue){
       
        tabla +='<tr>';
        tabla +='<td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+(count++)+'</td>';
        tabla +='<td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+valores[index].cod_dep+'</td>';
        tabla +='<td style="text-align: left;font-weight: 400; width: 10px; width: 20px;">'+((valores[index].nombre_dep))+'</td>';
        tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+((valores[index].total_gris)+(valores[index].total_rojo)+(valores[index].total_amarillo)+(valores[index].total_verde))+'</td>';
        tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+valores[index].total_gris+'</td>';
        tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+((valores[index].total_gris)/((suma))*100).toFixed(2)+'%</td>';
        tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+valores[index].total_rojo+'</td>';
        tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+((valores[index].total_rojo)/((suma))*100).toFixed(2)+'%</td>';
        tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+valores[index].total_amarillo+'</td>';
        tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+((valores[index].total_amarillo)/((suma))*100).toFixed(2)+'%</td>';
        tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+valores[index].total_verde+'</td>';
        tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+((valores[index].total_verde)/((suma))*100).toFixed(2)+'%</td>';
        tabla +='<td  style="text-align: center;font-weight: 400; width: 10px; width: 20px;background-color:'+valores[index].color +' ;"> '+ (valores[index].avance).toFixed(2)+'  %</td>';
        //tabla +='<td td style="text-align: center;font-weight: 100; width: 10px; width: 20px;"><button class="btn btn-outline-primary btn-sm" onclick="ampliarDep('+valores[index].cod_dep+')"><i class="fa fa-globe fa-2x fa-rotate-270" style="color: #339af0;"></i></button></td>';
        tabla +='<tr>';
        document.getElementById('tabla_alerta').innerHTML=tabla;
        }
    }



  }else if (estado == 3) {
    let count =1; 
    for (let index = 0; index < valores.length; index++) {
      let suma=((valores[index].total_gris)+(valores[index].total_rojo)+(valores[index].total_amarillo)+(valores[index].total_verde))
      if((valores[index].avance).toFixed(2)>= maximovalue){

        tabla +='<tr>';
        tabla +='<td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+(count++)+'</td>';
        tabla +='<td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+valores[index].cod_dep+'</td>';
        tabla +='<td style="text-align: left;font-weight: 400; width: 10px; width: 20px;">'+((valores[index].nombre_dep))+'</td>';
        tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+((valores[index].total_gris)+(valores[index].total_rojo)+(valores[index].total_amarillo)+(valores[index].total_verde))+'</td>';
        tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+valores[index].total_gris+'</td>';
        tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+((valores[index].total_gris)/((suma))*100).toFixed(2)+'%</td>';
        tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+valores[index].total_rojo+'</td>';
        tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+((valores[index].total_rojo)/((suma))*100).toFixed(2)+'%</td>';
        tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+valores[index].total_amarillo+'</td>';
        tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+((valores[index].total_amarillo)/((suma))*100).toFixed(2)+'%</td>';
        tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+valores[index].total_verde+'</td>';
        tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+((valores[index].total_verde)/((suma))*100).toFixed(2)+'%</td>';
        tabla +='<td  style="text-align: center;font-weight: 400; width: 10px; width: 20px;background-color:'+valores[index].color +' ;"> '+ (valores[index].avance).toFixed(2)+'  %</td>';
        //tabla +='<td td style="text-align: center;font-weight: 100; width: 10px; width: 20px;"><button class="btn btn-outline-primary btn-sm" onclick="ampliarDep('+valores[index].cod_dep+')"><i class="fa fa-globe fa-2x fa-rotate-270" style="color: #339af0;"></i></button></td>';
        tabla +='<tr>';
        document.getElementById('tabla_alerta').innerHTML=tabla;
      
      }
    
  
    }
 
  } else if (estado==2){
    let count =1; 
    for (let index = 0; index < valores.length; index++) {
      let suma=((valores[index].total_gris)+(valores[index].total_rojo)+(valores[index].total_amarillo)+(valores[index].total_verde))
      if( ( (valores[index].avance).toFixed(2)> minimovalue) && ((valores[index].avance).toFixed(2) < maximovalue)){
  
        tabla +='<tr>';
        tabla +='<td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+(count++)+'</td>';
        tabla +='<td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+valores[index].cod_dep+'</td>';
        tabla +='<td style="text-align: left;font-weight: 400; width: 10px; width: 20px;">'+((valores[index].nombre_dep))+'</td>';
        tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+((valores[index].total_gris)+(valores[index].total_rojo)+(valores[index].total_amarillo)+(valores[index].total_verde))+'</td>';
        tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+valores[index].total_gris+'</td>';
        tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+((valores[index].total_gris)/((suma))*100).toFixed(2)+'%</td>';
        tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+valores[index].total_rojo+'</td>';
        tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+((valores[index].total_rojo)/((suma))*100).toFixed(2)+'%</td>';
        tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+valores[index].total_amarillo+'</td>';
        tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+((valores[index].total_amarillo)/((suma))*100).toFixed(2)+'%</td>';
        tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+valores[index].total_verde+'</td>';
        tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+((valores[index].total_verde)/((suma))*100).toFixed(2)+'%</td>';
        tabla +='<td  style="text-align: center;font-weight: 400; width: 10px; width: 20px;background-color:'+valores[index].color +' ;"> '+ (valores[index].avance).toFixed(2)+'  %</td>';
        //tabla +='<td td style="text-align: center;font-weight: 100; width: 10px; width: 20px;"><button class="btn btn-outline-primary btn-sm" onclick="ampliarDep('+valores[index].cod_dep+')"><i class="fa fa-globe fa-2x fa-rotate-270" style="color: #339af0;"></i></button></td>';
        tabla +='<tr>';
        document.getElementById('tabla_alerta').innerHTML=tabla;
         
        
  
      }

  
    }

  }else{
    let count =1; 
    for (let index = 0; index < valores.length; index++) {
      let suma=((valores[index].total_gris)+(valores[index].total_rojo)+(valores[index].total_amarillo)+(valores[index].total_verde))
      tabla +='<tr>';
      tabla +='<td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+(count++)+'</td>';
      tabla +='<td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+valores[index].cod_dep+'</td>';
      tabla +='<td style="text-align: left;font-weight: 400; width: 10px; width: 20px;">'+((valores[index].nombre_dep))+'</td>';
      tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+((valores[index].total_gris)+(valores[index].total_rojo)+(valores[index].total_amarillo)+(valores[index].total_verde))+'</td>';
      tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+valores[index].total_gris+'</td>';
      tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+((valores[index].total_gris)/((suma))*100).toFixed(2)+'%</td>';
      tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+valores[index].total_rojo+'</td>';
      tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+((valores[index].total_rojo)/((suma))*100).toFixed(2)+'%</td>';
      tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+valores[index].total_amarillo+'</td>';
      tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+((valores[index].total_amarillo)/((suma))*100).toFixed(2)+'%</td>';
      tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+valores[index].total_verde+'</td>';
      tabla +='<td td style="text-align: center;font-weight: 400; width: 10px; width: 20px;">'+((valores[index].total_verde)/((suma))*100).toFixed(2)+'%</td>';
      tabla +='<td  style="text-align: center;font-weight: 400; width: 10px; width: 20px;background-color:'+valores[index].color +' ;"> '+ (valores[index].avance).toFixed(2)+'  %</td>';
      //tabla +='<td td style="text-align: center;font-weight: 100; width: 10px; width: 20px;"><button class="btn btn-outline-primary btn-sm" onclick="ampliarDep('+valores[index].cod_dep+')"><i class="fa fa-globe fa-2x fa-rotate-270" style="color: #339af0;"></i></button></td>';
      tabla +='<tr>';
      document.getElementById('tabla_alerta').innerHTML=tabla;
      
      sumInd= sumInd+ ((valores[index].total_gris)+(valores[index].total_rojo)+(valores[index].total_amarillo)+(valores[index].total_verde))
      sumGris= sumGris+ (valores[index].total_gris);
      sumRojo= sumRojo+ (valores[index].total_rojo);
      sumAmarillo = sumAmarillo+ (valores[index].total_amarillo);
      sumVerde=sumVerde+ (valores[index].total_verde);
      


    }
    document.getElementById('totaInd').innerHTML=sumInd
    document.getElementById('totalnoprogramados').innerHTML=sumGris
    document.getElementById('totalminimorango').innerHTML=sumRojo
    document.getElementById('totalinermediorango').innerHTML=sumAmarillo
    document.getElementById('totalmaximorango').innerHTML=sumVerde
  }
  

  

}
