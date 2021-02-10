//import fetch from "node-fetch";
var mes=0, vigencia=0, minimovalue=0, maximovalue=0;

async function dateomain(){
  corteplan()
  _avancePDM()
  _Components()
  swal("Espere mientras cargamos la información!",{
    buttons: false,
    icon: "info",
    timer: 3000,
  });
}

async  function corteplan(){
  var fecha = new Date('08/31/2020');
  document.getElementById('fecha_corte').innerHTML= fecha.toDateString()
  // mes = fecha.getMonth(fecha)
  vigencia = fecha.getFullYear(fecha)
  switch (vigencia) {
    case 2020:
      mes= fecha.getMonth(fecha)+1
    break;
    case 2021:
      mes= fecha.getMonth(fecha)+13
    break;
    case 2022:
      mes= fecha.getMonth(fecha)+25
    break;
    case 2023:
      mes= fecha.getMonth(fecha)+37
    break;
    default:
    break;
  }
  let parametros={
    "mesplan" : mes,
    "vigencia": vigencia
  }
  fetch(`https://sse-pdm-back.herokuapp.com/pi/api/semaforo-corte`,{
    method:'POST',
    body: JSON.stringify(parametros), // data can be `string` or {object}!
    headers:{
        'Content-Type': 'application/json'
    }
  }).then(res=> res.json())
  .then(response=>{
    minimovalue= (response.data[0].rojo)*100;
    maximovalue =(response.data[0].verde)*100;
    document.getElementById('minimo-corte').value= minimovalue
    document.getElementById('maximo-corte').value= maximovalue
  })
  alert('SSE-PDM')
}

async function _avancePDM(){
  try {
    fetch('https://sse-pdm-back.herokuapp.com/pi/api/total')
    .then(res=>res.json())
    .then(datos=>{
      avancePDMtarget(datos.data[0].total_plan)
      })
  } catch (error) {
    console.error('Error _avancePDM ',error )
  }
}

async function avancePDMtarget(avanceplan){
  const dataSource = {
    chart: {
      caption: "Avance Cuatrienial PDM",
      subcaption: "Mes "+ mes + " del Plan",
      numbersuffix: "%",
      theme: "fusion",
      plottooltext:
        "Avance  $datavalue del $targetDataValue esperado para este corte"
    },
    colorrange: {
      color: [
      {
        minvalue: 0,
        maxvalue:  document.getElementById('minimo-corte').value,
        code: "#B4358B"
      },
      {
        minvalue: document.getElementById('minimo-corte').value,
        maxvalue: document.getElementById('maximo-corte').value,
        code: "#EE7518"
      },
      {
        minvalue: document.getElementById('maximo-corte').value,
        maxvalue: 100,
        code: "#00853E"
      }
    ]
  },
   value: avanceplan,
   target: document.getElementById('maximo-corte').value
  };
  
  FusionCharts.ready(function() {
    var myChart = new FusionCharts({
      type: "hbullet",
      renderAt: "graphpdmtarget",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource
    }).render();
  });
  graphInicial()
}

async function graphInicial(){
  try {
    var dateo=[];
    fetch('https://sse-pdm-back.herokuapp.com/pi/api/total-avance-lineas')
    .then(res=>res.json())
    .then(datos=>{
      let tam = datos.data.length;
      for(let i =0; i<tam;i++){
        if ((Math.ceil(datos.data[i].avance_linea))>=document.getElementById('maximo-corte').value){colorsemaf="#00853E"}
        else if ((Math.ceil(datos.data[i].avance_linea))<=document.getElementById('minimo-corte').value) {
          colorsemaf="#B4358B"
        } else {
          colorsemaf="#EE7518"
        }
        dateo.push({
          "label" : datos.data[i].nom_linea,
          "value": Math.ceil(datos.data[i].avance_linea),
          "color": colorsemaf,
          "link":"https://sse-pdm.herokuapp.com/linea-"+(i+1)
        })
      }
      const dataSource = {
        chart: {
          caption: "% Avance por Líneas del PDM ",
          yaxisname: "Medellín Futuro",
          showvalues: "1",
          //numberprefix: "%",
          numbersuffix:"%",
          theme: "gammel",
          xaxisname: "PDM 2020- 2023",
          yaxisname: "% Ejecución Alcanzada",
          exportEnabled: "1",
          exportFileName:"AvancexLinea",
      },
        data:  dateo
      };

      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "column2D",
          renderAt: "chart-inicial",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });
         
    })
  } catch (error) {
    console.error('Error graphInicial ', error)
  }
  avance_linea_dep()
};


async function _Components(){
  try {
    let avance_Comp1=[]; let avance_Comp3=[];
    let avance_Comp2=[]; let avance_Comp4=[]; let avance_Comp5=[];
    let tabla='', tabla2='',  tabla3='',   tabla4='',  tabla5='';let colorsemaf;
    fetch('https://sse-pdm-back.herokuapp.com/pi/api/total-componentes')
    .then(res=> res.json())
    .then(datos=>{
      document.getElementById('tbl_comp1').innerHTML="";
      let tam = datos.data.length;
      for(let i =0; i<tam;i++){   
        if ((datos.data[i].cod_linea) =="1"){
          if ((Math.ceil((datos.data[i].peso_avance/datos.data[i].peso)*100))>=document.getElementById('maximo-corte').value){colorsemaf="#00853E"}
          else if (Math.ceil((datos.data[i].peso_avance/datos.data[i].peso)*100)<=document.getElementById('minimo-corte').value) {colorsemaf="#B4358B"}
          else {colorsemaf="#EE7518"}

          avance_Comp1.push({
            "label" : datos.data[i].nom_componente,
            "value": Math.ceil((datos.data[i].peso_avance/datos.data[i].peso)*100),
            "color": colorsemaf
          })
        
          tabla +='<tr >';
          tabla +='<td style="font-weight: 400; width: 10px;"">'+datos.data[i].cod_componente+'</td>';
          tabla +='<td style="text-align: left; font-size: 10px;">'+((datos.data[i].nom_componente))+'</td>';
          tabla +='<td style="font-weight: 400; width: 21px; text-align: center;"">'+datos.data[i].count+'</td>';
          tabla +='<td style="font-weight: 400; width: 21px; text-align: center;">'+Math.ceil((datos.data[i].peso_avance/datos.data[i].peso)*100) +'%</td>';
          tabla +='<tr>';
          document.getElementById('tbl_comp1').innerHTML=tabla;

        }

        if ((datos.data[i].cod_linea) =="2"){
          if ((Math.ceil((datos.data[i].peso_avance/datos.data[i].peso)*100))>=maximovalue){colorsemaf="#00853E"}
          else if (Math.ceil((datos.data[i].peso_avance/datos.data[i].peso)*100)<=minimovalue) {colorsemaf="#B4358B"}
          else {colorsemaf="#EE7518"}
          avance_Comp2.push({
            "label" : datos.data[i].nom_componente,
            "value": Math.ceil((datos.data[i].peso_avance/datos.data[i].peso)*100),
            "color": colorsemaf
          })
        
          tabla2 +='<tr >';
          tabla2 +='<td style="font-weight: 400; width: 10px;"">'+datos.data[i].cod_componente+'</td>';
          tabla2 +='<td style="text-align: left; font-size: 10px;">'+((datos.data[i].nom_componente))+'</td>';
          tabla2 +='<td style="font-weight: 400; width: 21px; text-align: center;"">'+datos.data[i].count+'</td>';
          tabla2 +='<td style="font-weight: 400; width: 21px; text-align: center;">'+Math.ceil((datos.data[i].peso_avance/datos.data[i].peso)*100) +'%</td>';
          tabla2 +='<tr>';
          document.getElementById('tbl_comp2').innerHTML=tabla2;
        }
 
        if ((datos.data[i].cod_linea) =="3"){
          if (Math.ceil((datos.data[i].peso_avance/datos.data[i].peso)*100)>=maximovalue){colorsemaf="#00853E"}
          else if (Math.ceil((datos.data[i].peso_avance/datos.data[i].peso)*100)<=minimovalue) {colorsemaf="#B4358B"}
          else {colorsemaf="#EE7518"}
          avance_Comp3.push({
            "label" : datos.data[i].nom_componente,
            "value": Math.ceil((datos.data[i].peso_avance/datos.data[i].peso)*100),
            "color": colorsemaf
          })
        
          tabla3 +='<tr >';
          tabla3 +='<td style="font-weight: 400; width: 10px;"">'+datos.data[i].cod_componente+'</td>';
          tabla3 +='<td style="text-align: left; font-size: 10px;">'+((datos.data[i].nom_componente))+'</td>';
          tabla3 +='<td style="font-weight: 400; width: 21px; text-align: center;"">'+datos.data[i].count+'</td>';
          tabla3 +='<td style="font-weight: 400; width: 21px; text-align: center;">'+Math.ceil((datos.data[i].peso_avance/datos.data[i].peso)*100) +'%</td>';
          tabla3 +='<tr>';
          document.getElementById('tbl_comp3').innerHTML=tabla3;

        }
        if ((datos.data[i].cod_linea) =="4"){
          if (Math.ceil((datos.data[i].peso_avance/datos.data[i].peso)*100)>=maximovalue){colorsemaf="#00853E"}
          else if (Math.ceil((datos.data[i].peso_avance/datos.data[i].peso)*100)<=minimovalue) {colorsemaf="#B4358B"}
          else {colorsemaf="#EE7518"}
          avance_Comp4.push({
            "label" : datos.data[i].nom_componente,
            "value": Math.ceil((datos.data[i].peso_avance/datos.data[i].peso)*100),
            "color": colorsemaf
          })
          tabla4 +='<tr >';
          tabla4 +='<td style="font-weight: 400; width: 10px;"">'+datos.data[i].cod_componente+'</td>';
          tabla4 +='<td style="text-align: left; font-size: 10px;">'+((datos.data[i].nom_componente))+'</td>';
          tabla4 +='<td style="font-weight: 400; width: 21px; text-align: center;"">'+datos.data[i].count+'</td>';
          tabla4 +='<td style="font-weight: 400; width: 21px; text-align: center;">'+Math.ceil((datos.data[i].peso_avance/datos.data[i].peso)*100) +'%</td>';
          tabla4 +='<tr>';
          document.getElementById('tbl_comp4').innerHTML=tabla4;
        }
        if ((datos.data[i].cod_linea) =="5"){
          if (Math.ceil((datos.data[i].peso_avance/datos.data[i].peso)*100)>=maximovalue){colorsemaf="#00853E"}
          else if (Math.ceil((datos.data[i].peso_avance/datos.data[i].peso)*100)<=minimovalue) {colorsemaf="#B4358B"}
          else {colorsemaf="#EE7518"}
          avance_Comp5.push({
            "label" : datos.data[i].nom_componente,
            "value": Math.ceil((datos.data[i].peso_avance/datos.data[i].peso)*100),
            "color": colorsemaf
          })
          tabla5 +='<tr >';
          tabla5 +='<td style="font-weight: 400; width: 10px;"">'+datos.data[i].cod_componente+'</td>';
          tabla5 +='<td style="text-align: left; font-size: 10px;">'+((datos.data[i].nom_componente))+'</td>';
          tabla5 +='<td style="font-weight: 400; width: 21px; text-align: center;"">'+datos.data[i].count+'</td>';
          tabla5 +='<td style="font-weight: 400; width: 21px; text-align: center;">'+Math.ceil((datos.data[i].peso_avance/datos.data[i].peso)*100) +'%</td>';
          tabla5 +='<tr>';
          document.getElementById('tbl_comp5').innerHTML=tabla5;
        }
      }
      graphCompL1(avance_Comp1);
      graphCompL2(avance_Comp2);
      graphCompL3(avance_Comp3);
      graphCompL4(avance_Comp4);
      graphCompL5(avance_Comp5);
    })
  } catch (error) {
    console.error('Error : _Componentes ', error)
  }
}


async function graphCompL1(avanceComp1){
  const dataSource = {
    chart: {
      caption: "Componentes Línea 1. Reactivación Económica y Valle del Software",
      subcaption: "Avance Físico",
      xaxisname: "PDM 2020-2023",
      yaxisname: "% avance actual",
      showvalues: "1",
      numbersuffix: "%",
      theme: "zune"
    },
    data: avanceComp1
  };
  FusionCharts.ready(function() {
    var myChart = new FusionCharts({
      type: "column2d",
      renderAt: "chart-cl1",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource
    }).render();
  });
};

async function graphCompL2(avanceComp2){
  const dataSource = {
    chart: {
      caption: "Componentes Línea 2.Transformación Educativa y Cultural",
      subcaption: "Avance Físico",
      xaxisname: "PDM 2020-2023",
      yaxisname: "% avance actual",
      showvalues: "1",
      numbersuffix: "%",
      theme: "zune"
    },
    data: avanceComp2
  };
  FusionCharts.ready(function() {
    var myChart = new FusionCharts({
      type: "column2d",
      renderAt: "chart-cl2",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource
    }).render();
  });
};

async function graphCompL3(avanceComp3){
  const dataSource = {
    chart: {
      caption: "Componentes Línea 3.Medellín me Cuida",
      subcaption: "Avance Físico",
      xaxisname: "PDM 2020-2023",
      yaxisname: "% avance actual",
      showvalues: "1",
      numbersuffix: "%",
      theme: "zune"
    },
   data: avanceComp3
  };
  FusionCharts.ready(function() {
    var myChart = new FusionCharts({
      type: "column2d",
      renderAt: "chart-cl3",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource
    }).render();
  });
};

async function graphCompL4(avanceComp4){
  const dataSource = {
    chart: {
      caption: "Componentes Línea 4. Ecociudad",
      subcaption: "Avance Físico",
      xaxisname: "PDM 2020-2023",
      yaxisname: "% avance actual",
      showvalues: "1",
      numbersuffix: "%",
      theme: "zune"
    },
    data: avanceComp4
  };
  FusionCharts.ready(function() {
    var myChart = new FusionCharts({
      type: "column2d",
      renderAt: "chart-cl4",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource
    }).render();
  });
};

async function graphCompL5(avanceComp5){
  const dataSource = {
    chart: {
      caption: "Componentes Línea 5. Gobernanza y Gobernabilidadd",
      subcaption: "Avance Físico",
      xaxisname: "PDM 2020-2023",
      yaxisname: "% avance actual",
      showvalues: "1",
      numbersuffix: "%",
      theme: "zune"
    },
    data: avanceComp5
  };
  FusionCharts.ready(function() {
    var myChart = new FusionCharts({
      type: "column2d",
      renderAt: "chart-cl5",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource
    }).render();
  });
};


async function avance_linea_dep(){
  try {
    let info=[];
    fetch('https://sse-pdm-back.herokuapp.com/dep/api/dependencias/avance')
    .then(res=>res.json())
    .then(datos=>{
      let tam = datos.data.length;
         for(let i =0; i<tam;i++){
        if (((datos.data[i].avance/datos.data[i].peso)*100)>=maximovalue){colorsemaf="#00853E"}
        else if (((datos.data[i].avance/datos.data[i].peso)*100)<=minimovalue) {colorsemaf="#B4358B"} 
        else {colorsemaf="#EE7518"}
        info.push({
           "label" : datos.data[i].nombre_dep,
           "value": (datos.data[i].avance/datos.data[i].peso)*100,
           "color": colorsemaf,
        })
      }
      info.sort((a, b) =>  b.value - a.value )
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
          renderAt: "chart-avance-dep",
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
  contadorSemaforo()
}

async function contadorSemaforo(){
  try {
    fetch(`https://sse-pdm-back.herokuapp.com/pi/api/semaforo-corte/contador` )
    .then(res => res.json())
    .then(response =>{
      document.getElementById('total-gris').innerHTML= response.data[0].gris
      document.getElementById('porcentaje-gris').innerHTML= ((response.data[0].gris/612)*100).toFixed(2)+"%"
      document.getElementById('total-rojos').innerHTML= response.data[0].rojo
      document.getElementById('porcentaje-rojos').innerHTML= ((response.data[0].rojo/612)*100).toFixed(2)+"%"
      document.getElementById('total-naranjas').innerHTML= response.data[0].amarillo
      document.getElementById('porcentaje-naranjas').innerHTML= ((response.data[0].amarillo/612)*100).toFixed(2)+"%"
      document.getElementById('total-verdes').innerHTML= response.data[0].verde
      document.getElementById('porcentaje-verdes').innerHTML= ((response.data[0].verde/612)*100).toFixed(2)+"%"
      let cardsemaforogris ,cardsemafororojo, cardsemaforoamarillo ,cardsemaforoverde ;
      let gris=0, rojo=1, amarillo=2, verde=3;
      cardsemaforogris=`  
      <div class="card-footer mt-4" style="background-color: white;">
        <a  class="btn btn-light btn-block" style="font-size: xx-small;" type="button" onclick="estado_sem_pordep(${gris})"> 
          <i class="fa fa-pencil-square-o" style=" width:100%; height:16px; font-size: small;"aria-hidden="true"> Ampliar Información</i>
        </a>
      </div>`
      cardsemafororojo=`  
      <div class="card-footer mt-4" style="background-color: white;">
        <a  class="btn btn-light btn-block" style="font-size: xx-small;" type="button" onclick="estado_sem_pordep(${rojo})"> 
          <i class="fa fa-pencil-square-o" style=" width:100%; height:16px; font-size: small;"aria-hidden="true"> Ampliar Información</i>
        </a>
      </div>`
      cardsemaforoamarillo=`  
      <div class="card-footer mt-4" style="background-color: white;">
        <a  class="btn btn-light btn-block" style="font-size: xx-small;" type="button" onclick="estado_sem_pordep(${amarillo})"> 
          <i class="fa fa-pencil-square-o" style=" width:100%; height:16px; font-size: small;"aria-hidden="true"> Ampliar Información</i>
        </a>
      </div>`
      cardsemaforoverde=`  
      <div class="card-footer mt-4" style="background-color: white;">
        <a  class="btn btn-light btn-block" style="font-size: xx-small;" type="button" onclick="estado_sem_pordep(${verde})"> 
          <i class="fa fa-pencil-square-o" style=" width:100%; height:16px; font-size: small;"aria-hidden="true"> Ampliar Información</i>
        </a>
      </div>`
      document.getElementById('footer-card-gris').innerHTML=cardsemaforogris;
      document.getElementById('footer-card-rojo').innerHTML=cardsemafororojo;
      document.getElementById('footer-card-amarillo').innerHTML=cardsemaforoamarillo;
      document.getElementById('footer-card-verde').innerHTML=cardsemaforoverde;
    })
  } catch (error) {
    console.error('Error contadorSemaforo ',error)
  }
}
 
async function estado_sem_pordep(codsemaforo) {
  try {
    let info=[];
    fetch(`https://sse-pdm-back.herokuapp.com/pi/api/semaforo-corte/general/${codsemaforo} `)
    .then(res=> res.json()).
    then(datos=>{
      let tam = datos.data.length;
      for (let index = 0; index < tam; index++) {
        if (codsemaforo == 0){colorsemaf="#b2b1a7"}
        else if (codsemaforo == 1) {colorsemaf="#B4358B"}
        else if (codsemaforo == 2) {colorsemaf="#EE7518"}
        else {colorsemaf="#00853E"}
        info.push({
          "label" : datos.data[index].nombre_dep,
          "value": datos.data[index].total_indicadores,
          "color" : colorsemaf
        })
       }
       info.sort((a, b) =>  b.value -a.value )
       const dataSource = {
        chart: {
          caption: "Total indicadores por Dependencias",
          yaxisname: "Número de Indicadores",
          aligncaptionwithcanvas: "0",
          plottooltext: "<b>$dataValue</b> Indicadores",
          theme: "zune"
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
    $('#exampleModalSemFavGeneral').modal('show'); ;
  })
  } catch (error) {
    console.error("Error estado_sem_dep: ", error)
  }
}