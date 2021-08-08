//import fetch from "node-fetch"
var fecha =0; let mespa=0; var valormaximo=0; var valorminimo=0;var vigencia=0
var nomarchivopdf='';
var table4={};
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})
async function _main(){
  let dep = document.getElementById('inputGroupSelectDependencia').value
    _avancePDM(dep)
    _avance_financiero(dep)
    porc_avance_fisico(dep)
    tipoinversion(dep)
    columnGeo(dep)
    avance_linea_dep(dep)
    avance_prgs_dep(dep)
    avance_componente_dep(dep)
    total_proyectos_dep(dep)
    plan_accion_dep()
    //contadorSemDep(cod)
}
async function dep_estado(cod_dep){
  let terminal = document.getElementById("inputGroupSelectDependencia");
  var selectedText = terminal.options[terminal.selectedIndex].text;   
  _avancePDM(cod_dep)
  _avance_financiero(cod_dep)
  porc_avance_fisico(cod_dep)
  tipoinversion(cod_dep)
  columnGeo(cod_dep)
  avance_linea_dep(cod_dep,selectedText)
  avance_prgs_dep(cod_dep, selectedText)
  avance_componente_dep(cod_dep, selectedText)
  total_proyectos_dep(cod_dep)
  plan_accion_dep(cod_dep)
  contadorSemDep(cod_dep)
}
async function _avancePDM(cod_dep){
    try {
      fetch(`https://sse-pdm.herokuapp.com/dep/api/avance/${cod_dep}`)
      .then(res=>res.json())
      .then(datos=>{
       let avance_dep = (datos.data[0].avance/datos.data[0].peso)*100
          graphPDM(avance_dep)
        })
        _PASemaf()
    } catch (error) {
      console.log('Error _avancePDM ',error )
    }
}
async function graphPDM(total){
    //aqui un fetch para consultar el porcentaje de ejecución del pdm
    try {
      const dataSource = {
        chart: {
          caption: "% Avance cuatrienial PDM",
          lowerlimit: "0",
          upperlimit: "100",
          showvalue: "1",
          numbersuffix: "%",
          theme: "gammel",
          showtooltip: "0",
          valuefontsize: "25",
        },
        colorrange: {
          color: [
            {
             minvalue: 0,
             maxvalue: document.getElementById('minimo-corte').value,
              code: "#B4358B"
            },
            {
              minvalue: document.getElementById('minimo-corte').value,
              maxvalue: document.getElementById('maximo-corte').value,
              code: "#FFDC15"
            },
            {
              minvalue: document.getElementById('maximo-corte').value,
              maxvalue: 100,
              code: "#00853E"
            }
          ]
        },
        dials: {
          dial: [
            {
              value: total,
              tooltext: "<b>$value %</b> Valor Esperado"
            }
          ]
        },
        trendpoints: {
          point: [
            {
              startvalue: document.getElementById('maximo-corte').value,
              displayvalue: "Esperado",
              thickness: "2",
              color: "#E15A26",
              usemarker: "1",
              markerbordercolor: "#E15A26",
              markertooltext: document.getElementById('maximo-corte').value+"%"
            }
          ]
        }
      };
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "angulargauge",
          renderAt: "canvas-dep",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });
    } catch (error) {
      console.log('Error graphPDM: ', error)
    }
}
async function _avance_financiero(dep){
    try {
      fetch(`https://sse-pdm.herokuapp.com/pa/api/avancefinanciero/dep/${dep}`)
      .then(res=>res.json())
      .then(datos=>{
        porc_avance_financiero(datos.data[0].pptoejecutado/datos.data[0].pptoajustado) 
        graphPDA(parseFloat(datos.data[0].poai), parseFloat(datos.data[0].pptoajustado),parseInt(datos.data[0].pptoejecutado))
        detallePpto(datos.data[0].compromisos, datos.data[0].disponible, datos.data[0].ordenado, datos.data[0].total)
      })
    } catch (error) {
      console.log('Error porc_avance_financiero ',error )
    }
}
async function _PASemaf (){
  try {
    var fechaPA = new Date('06/30/2021');
    mespa = fechaPA.getMonth(fechaPA)+1
    vigencia = fechaPA.getFullYear(fecha)
    fetch(`https://sse-pdm.herokuapp.com/pa/semaforo-corte/${mespa}`)
    .then(res=>res.json())
    .then(response=>{
      valorminimo = (response.data[0].rojo)-0.01;
      valormaximo = (response.data[0].verde);
    })
  } catch (error) {
  }
}
async function porc_avance_financiero(avance){  
  try {
    var fechaPA = new Date('06/30/2021');
    mespa = fechaPA.getMonth(fechaPA)+1
    vigencia = fechaPA.getFullYear(fecha)
    fetch(`https://sse-pdm.herokuapp.com/pa/semaforo-corte/${mespa}`)
    .then(res=>res.json())
    .then(response=>{
        const dataSource = {
          chart: {
            caption: "% Ejecución Financiera",
            lowerlimit: "0",
            upperlimit: "100",
            showvalue: "1",
            numbersuffix: "%",
            theme: "gammel",
            showtooltip: "0",
            valuefontsize: "25"
          },
          colorrange: {
            color: [
              {
                minvalue: "0",
                maxvalue: valorminimo,
                code: "#F2726F"
              },
              {
                minvalue: valorminimo,
                maxvalue: valormaximo,
                code: "#FFC533"
              },
              {
                minvalue: valorminimo,
                maxvalue: "100",
                code: "#62B58F"
              }
            ]
            },
            dials: {
              dial: [
                {
                  value: (avance)*100
                }
              ]
            }
          };
          FusionCharts.ready(function() {
            var myChart = new FusionCharts({
              type: "angulargauge",
              renderAt: "chart-ejecfinanciera-dep",
              width: "100%",
              height: "100%",
              dataFormat: "json",
              dataSource
            }).render();
          });
    })
  } catch (error) {
  }
}
function graphPDA(poai, pptoajustado, ordenado){
    const dataSource = {
      chart: {
        caption: " Ejecución Financiera ",
        yaxisname: "(mill de $)",
        showvalues: "1",
        formatnumberscale: "0",
        plottooltext: "<b>$dataValue</b> Ppto",
        theme: "gammel",
        showvalues: "1",
        numberprefix: "$",
        decimalSeparator: ",",
        thousandSeparator: "."
      },
      data: [
        {
          label: "Ppto. Inicial",
          value: Math.ceil(poai),
          "color": "#009FE3"
        },
        {
          label: "Ppto. Ajustado",
          value: Math.ceil(pptoajustado),
          "color": "#009AB2"
        },
        {
          label: "Ppto. Ordenado",
          value: Math.ceil(ordenado) ,
          "color": "#EE7518"
        }
      ]
    };
    FusionCharts.ready(function() {
     var myChart = new FusionCharts({
        type: "bar2d",
        renderAt: "canvas-pa1-dep",
        width: "100%",
        height: "100%",
        dataFormat: "json",
        dataSource,
      }).render();
    });
}
async function detallePpto(compromisos, disponible, ordenado , total){
    document.getElementById('compromisos-dep').innerHTML=  formatter.format((compromisos));
    document.getElementById('disponible-dep').innerHTML=  formatter.format((disponible));
    document.getElementById('ordenado-dep').innerHTML=  formatter.format((ordenado));
    document.getElementById('total-dep').innerHTML=  formatter.format((total));
    const dataSource = {
      chart: {
        caption: "Detalle Presupuesto",
        subcaption:"en millones de pesos",
        showvalues: "1",
        decimals: "1",
        stack100percent: "1",
        valuefontcolor: "#FFFFFF",
        plottooltext:
          "$label has $dataValue (<b>$percentValue</b>) $seriesName",
        theme: "zune"
      },
      categories: [
        {category: [ { label: "Presupuesto" }]}
      ],
      dataset: [
        { seriesname: "Compromisos",
            data: [{value: Math.ceil(compromisos)}]
        },
        { seriesname: "Disponible",
           data: [{value: Math.ceil(disponible)}]
        },
        { seriesname: "Ordenado",
           data: [ { value: Math.ceil(ordenado) }]
        }
      ]
    };
    FusionCharts.ready(function() {
      var myChart = new FusionCharts({
        type: "scrollstackedbar2d",
        renderAt: "canvas-pa2-dep",
        width: "100%",
        height: "100%",
        dataFormat: "json",
        dataSource
      }).render();
    });
}
async function columnGeo(dep){
    try {
        fetch(`https://sse-pdm.herokuapp.com/geo/api/dependencias/territorio/${dep}`)
        .then(res=>res.json())
        .then(datos=>{
          const dataSource = {
            chart: {
              caption: "Inversión Pública por Comunas y Corregimientos",
              subcaption: "(millones de pesos)",
              xaxisname: "Territorio",
              yaxisname: "cifras en millones de pesos",
              showvalues: "1",
              formatnumberscale: "0",
              numberprefix: "$",
              theme: "zune",
              labeldisplay: "ROTATE",
              decimalSeparator: ",",
              thousandSeparator: ".",
              plottooltext: `<div id='divTable'>
                                <table id='dataTable' class="table table-sm table-responsive-sm table-hover" style="font-size: small;" width='200px'>
                                  <tr style="color:white" >
                                    <th>Territorio</th>
                                    <td>$label</td>
                                  </tr>
                                  <tr style="color:white" >
                                    <th>Inversión (en millones de pesos)</th>
                                    <td>$dataValue</td>
                                  </tr>
                               
                                </table>
                              </div>`,
                            },
            data: [
              {
                label: "Popular",
                value: Math.ceil(parseInt(datos.data[0].popular)/1000000)
                ,color:"#009AB2"
              },
              {
                label: "Santa Cruz",
                value: Math.ceil(parseInt(datos.data[0].santa_cruz)/1000000)
                ,color:"#009AB2"
              },
              {
                label: "Manrique",
                value: Math.ceil(parseInt(datos.data[0].manrique)/1000000)
                ,color:"#009AB2"
              },
              {
                label: "Aranjuez",
                value: Math.ceil(parseInt(datos.data[0].aranjuez)/1000000) ,  color:"#009AB2"
              },
              {
                label: "Castilla",
                value: Math.ceil(parseInt(datos.data[0].castilla)/1000000) , color:"#009AB2"
              },
              {
                label: "Doce de Octubre",
                value: Math.ceil(parseInt(datos.data[0].doce_de_octubre)/1000000) , color:"#009AB2"
              },
              {
                label: "Robledo",
                value: Math.ceil(parseInt(datos.data[0].robledo)/1000000) ,color:"#009AB2"
              },
              {
                label: "Villa Hermosa",
                value: Math.ceil(parseInt(datos.data[0].villa_hermosa)/1000000) ,color:"#009AB2"
              },
              {
                label: "Buenos Aires",
                value: Math.ceil(parseInt(datos.data[0].buenos_aires)/1000000) ,color:"#009AB2"
              },
              {
                label: "La Candelaria",
                value: Math.ceil(parseInt(datos.data[0].la_candelaria)/1000000) ,color:"#009AB2"
              },
              {
                label: "Laureles Estadio",
                value: Math.ceil(parseInt(datos.data[0].laureles_estadio)/1000000) ,color:"#009AB2"
              },
              {
                label: "La América",
                value: Math.ceil(parseInt(datos.data[0].la_america)/1000000) ,color:"#009AB2"
              },
              {
                label: "San Javier",
                 value: Math.ceil(parseInt(datos.data[0].san_javier)/1000000) ,color:"#009AB2"
              },
              {
                label: "El Poblado",
                value: Math.ceil(parseInt(datos.data[0].el_poblado)/1000000) ,color:"#009AB2"
              },
              {
                label: "Guayabal",
                value: Math.ceil(parseInt(datos.data[0].guayabal)/1000000) ,color:"#009AB2"
              },
              {
                label: "Belén",
                value: Math.ceil(parseInt(datos.data[0].belen)/1000000) ,color:"#009AB2"
              },
              {
                label: "Palmitas",
                value: Math.ceil(parseInt(datos.data[0].palmitas)/1000000) ,color:"#009AB2"
              },
              {
                label: "San Cristóbal",
                value: Math.ceil(parseInt(datos.data[0].san_cristobal)/1000000) ,color:"#009AB2"
              },
              {
                label: "Altavista",
                value: Math.ceil(parseInt(datos.data[0].altavista)/1000000) ,color:"#009AB2"
              },
              {
                label: "San Antonio",
                 value: Math.ceil(parseInt(datos.data[0].san_antonio)/1000000) ,color:"#009AB2"
              },
              {
                label: "Santa Elena",
                value: Math.ceil(parseInt(datos.data[0].santa_elena)/1000000) ,color:"#009AB2"
              }
              ,
              {
                label: "Ciudad",
                value: Math.ceil(parseInt(datos.data[0].ciudad)/1000000) ,color:"#009AB2"
              },
              {
                label: "Fort. Inst",
                value: Math.ceil(parseInt(datos.data[0].fort_inst)/1000000) ,color:"#009AB2"
              }
            ]
          };
          FusionCharts.ready(function() {
            var myChart = new FusionCharts({
              type: "column2d",
              renderAt: "chart-geo-dep",
              width: "100%",
              height: "100%",
              dataFormat: "json",
              dataSource
            }).render();
          });
       })
    } catch (error) {
      console.log('Error columnGeo: ', error)
    }
}
async function porc_avance_fisico(dep){
    try {
      fetch(`https://sse-pdm.herokuapp.com/pa/api/avancefisico/dep/${dep}`)
      .then(res=>res.json())
      .then(datos=>{
          const dataSource = {
            chart: {
              caption: "% Ejecución Física",
              lowerlimit: "0",
              upperlimit: "100",
              showvalue: "1",
              numbersuffix: "%",
              theme: "gammel",
              showtooltip: "0",
              valuefontsize: "25"
            },
            colorrange: {
              color: [
                {
                  minvalue: "0",
                  maxvalue: valorminimo,
                  code: "#F2726F"
                },
                {
                  minvalue: valorminimo,
                  maxvalue: valormaximo,
                  code: "#FFC533"
                },
                {
                  minvalue: valorminimo,
                  maxvalue: "100",
                  code: "#62B58F"
                }
              ]
            },
            dials: {
              dial: [
                {
                  value: (datos.data[0].avance_fisico)*100
                }
              ]
            }
          };
          FusionCharts.ready(function() {
            var myChart = new FusionCharts({
              type: "angulargauge",
              renderAt: "chart-ejecfisica-dep",
              width: "100%",
              height: "100%",
              dataFormat: "json",
              dataSource
            }).render();
          });
        })
    } catch (error) {
      console.log('Error _avancePDM ',error )
    }
}
async function tipoinversion(dep){
   try {
     fetch(`https://sse-pdm.herokuapp.com/geo/api/dependencias/tipo-inversion/${dep}`)
     .then(res=>res.json())
     .then(datos=> {
      document.getElementById('localizada').innerHTML = formatter.format(datos.data[0].localizada)
      document.getElementById('pp').innerHTML = formatter.format(datos.data[0].pp)
      document.getElementById('ciudad').innerHTML = formatter.format(datos.data[0].ciudad)
      document.getElementById('fortinst').innerHTML = formatter.format(datos.data[0].fortinst)
     })
    } catch (error) {
      console.log('Error tipoinversion', error)
    }
}
function stopEnterKey(evt) {
    var evt = (evt) ? evt : ((event) ? event : null);
    var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
    if ((evt.keyCode == 13) && (node.type == "text")) { return false; }
}
document.onkeypress = stopEnterKey;

async function total_proyectos_dep(dep){
  try {
     fetch(`https://sse-pdm.herokuapp.com/pa/api/tipo-iniciativa/dependencias/${dep}`)
    .then(res=>res.json())
    .then(datos=>{
      document.getElementById('inst').innerHTML=  datos.data[0].ini_inst
      document.getElementById('Proyectos_pp').innerHTML=  datos.data[0].pp
      document.getElementById('saldos_no_exec').innerHTML=  datos.data[0].saldos_no_exec
      document.getElementById('saldos_pendientes').innerHTML=  datos.data[0].saldos_pendientes
      const dataSource = {
        chart: {
          caption: "Presupuesto por tipo de iniciativa",
          xaxisname: "Tipo de iniciativa",
      yaxisname: "millones de pesos",
      drawcrossline: "1",
      plottooltext: "<b>$seriesName</b> expense in $label was <b>$$dataValue</b>",
      theme: "zune",
      showvalues: "1",
      formatnumberscale: "0"
    },
    categories: [
    {
      category: [
        {
          label: "Proyecto Iniciativa Institucional"
        },
        {
          label: "Proyectos Presuspuesto participativo"
        },
        {
          label: "Proyectos con saldos no ejecutables"
        },
        {
          label: "Proyectos con ejecución de saldos pendientes  (Vigencia Anterior)"
        }
      ]
    }
  ],
  dataset: [
    {
      seriesname: "POAI",
      data: [
        {
          value: Math.round (parseFloat(datos.data[0].poai_ini_inst))
        },
        {
          value: (parseInt(datos.data[0].poai_pp))
        },
        {
          value: (parseInt(datos.data[0].poai_saldos_no_exec))
        },
        {
          value: (parseInt(datos.data[0].poai_saldos_pendientes))
        }
      ]
    },
    {
      seriesname: "Ppto. Ajustado",
      data: [
        {
          value: (parseInt(datos.data[0].ajustado_ini_inst))
        },
        {
          value: (parseInt(datos.data[0].ajustado_pp))
        },
        {
          value: (parseInt(datos.data[0].ajustado_saldos_no_exec))
        },
        {
          value: (parseInt(datos.data[0].ajustado_saldos_pendientes))
        }
      ]
    }
  ]
};
FusionCharts.ready(function() {
    var myChart = new FusionCharts({
      type: "msbar2d",
      renderAt: "chart-proyectos-dep",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource
    }).render();
  });
  })
  } catch (error) {
    console.log('Error total_proyectos', error)
  }
}
async function avance_linea_dep(dep, nom_dep){
  try {
    let valores =[];
    fetch(`https://sse-pdm.herokuapp.com/dep/api/avance/lineas/${dep}`)
    .then(res=>res.json())
    .then(datos=> {
      let tam = datos.data.length;
      for(let i =0; i<tam;i++){
        if ((Math.ceil((datos.data[i].avance/datos.data[i].peso)*100))>=document.getElementById('maximo-corte').value){colorsemaf="#00853E"}
        else if (Math.ceil((datos.data[i].avance/datos.data[i].peso)*100)<=document.getElementById('minimo-corte').value) {colorsemaf="#B4358B"}
        else {colorsemaf="#EE7518"}
        valores.push({
          "label" : datos.data[i].nom_linea,
          "value": (datos.data[i].avance/datos.data[i].peso)*100,
          "color": colorsemaf
        })
      }
      const dataSource = {
        chart: {
          caption: "% Avance cuatrienial líneas "+ nom_dep +" PDM-2020/2023",
          yaxisname: "PDM-2020/2023",
          aligncaptionwithcanvas: "0",
          plottooltext: "<b>$dataValue</b> Avance",
          numbersuffix: "%",
          theme: "zune"
        },
        data: valores
      };
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "column2d",
          renderAt: "chart-lineas-dep",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });
    })
   } catch (error) {
     console.log('Error tipoinversion', error)
   }
}
async function avance_componente_dep(dep , nom_dep){
  try {
    let valores =[];
    fetch(`https://sse-pdm.herokuapp.com/dep/api/avance/componentes/${dep}`)
    .then(res=>res.json())
    .then(datos=> {
      let tam = datos.data.length;
      for(let i =0; i<tam;i++){
        if ((Math.ceil((datos.data[i].avance/datos.data[i].peso)*100))>=document.getElementById('maximo-corte').value){colorsemaf="#00853E"}
        else if (Math.ceil((datos.data[i].avance/datos.data[i].peso)*100)<=document.getElementById('minimo-corte').value) {colorsemaf="#B4358B"}
        else {colorsemaf="#EE7518"}
        valores.push({
          "label" : datos.data[i].nom_componente,
          "value": (datos.data[i].avance/datos.data[i].peso)*100,
          "color": colorsemaf
        })
      }
      const dataSource = {
        chart: {
          caption: "% Avance cuatrienial componentes "+ nom_dep +" PDM-2020/2023",
          yaxisname: "PDM-2020/2023",
          aligncaptionwithcanvas: "0",
          plottooltext: "<b>$dataValue</b> leads received",
          numbersuffix: "%",
          theme: "zune"
        },
        data: valores
      };
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "bar2d",
          renderAt: "chart-componentes-dep",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });
  } )
  }catch (error) {
    console.log('Error avance_componente_dep', error)
  }
}
async function avance_prgs_dep(dep, nom_dep){
  try {
    let info=[];
    fetch(`https://sse-pdm.herokuapp.com/dep/api/avance/programas/${dep}`)
    .then(res=>res.json())
    .then(datos=> {
      let tam = datos.data.length;
      for(let i =0; i<tam;i++){
        if ((Math.ceil((datos.data[i].avance/datos.data[i].peso)*100))>=document.getElementById('maximo-corte').value){colorsemaf="#00853E"}
        else if (Math.ceil((datos.data[i].avance/datos.data[i].peso)*100)<=document.getElementById('minimo-corte').value) {colorsemaf="#B4358B"}
        else {colorsemaf="#EE7518"}
        info.push({
          "label" : datos.data[i].nom_programa,
          "value": (datos.data[i].avance/datos.data[i].peso)*100,
          "color": colorsemaf
         })
      }
      const dataSource = {
        chart: {
          caption: "% Avance cuatrienial programas "+ nom_dep +" ",
          yaxisname: "PDM-2020/2023",
          aligncaptionwithcanvas: "0",
          plottooltext: "<b>$dataValue</b> leads received",
          numbersuffix: "%",
          theme: "zune"
        },
        data: info
      };
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "bar2d",
          renderAt: "chart-programas-dep",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });
    })
  } catch (error) {
    console.log('Error avance_prgs_dep', error)
  }
}
async function plan_accion_dep(dep){  
 let valores1=[]; let valores2=[];let valores3=[];let valores4=[];let valores5=[];

  fetch(`https://sse-pdm.herokuapp.com/pa/api/plan/dependencias/${dep}`)
  .then(res=>res.json())
  .then(datos=>{
    let tam = datos.data.length; 
    for(var i =0; i<(tam) ;i++){
     if (datos.data[i].tipo_iniciativa==1){
      valores1.push([ datos.data[i].cod_linea,
        datos.data[i].cod_componente,
        datos.data[i].cod_programa,
        datos.data[i].cod_proyecto,
        datos.data[i].nom_proyecto,
        ((datos.data[i].porc_eficacia_proyecto)*100).toFixed(2),
        ((datos.data[i].ejecucion/datos.data[i].ppto_ajustado)*100).toFixed(2),
        formatter.format(datos.data[i].poai),
        formatter.format(datos.data[i].ppto_ajustado),
        formatter.format(datos.data[i].ejecucion)
      ]);
     }
    if (datos.data[i].tipo_iniciativa==2){
      valores2.push([ datos.data[i].cod_linea,
        datos.data[i].cod_componente,
        datos.data[i].cod_programa,
        datos.data[i].cod_proyecto,
        datos.data[i].nom_proyecto,
        ((datos.data[i].porc_eficacia_proyecto)*100).toFixed(2),
        ((datos.data[i].ejecucion/datos.data[i].ppto_ajustado)*100).toFixed(2),
        formatter.format(datos.data[i].poai),
        formatter.format(datos.data[i].ppto_ajustado),
        formatter.format(datos.data[i].ejecucion)
      ]);
   }
   if (datos.data[i].tipo_iniciativa==3){
      valores3.push([ datos.data[i].cod_linea,
        datos.data[i].cod_componente,
        datos.data[i].cod_programa,
        datos.data[i].cod_proyecto,
        datos.data[i].nom_proyecto,
        ((datos.data[i].porc_eficacia_proyecto)*100).toFixed(2),
        ((datos.data[i].ejecucion/datos.data[i].ppto_ajustado)*100).toFixed(2),
        formatter.format(datos.data[i].poai),
        formatter.format(datos.data[i].ppto_ajustado),
        formatter.format(datos.data[i].ejecucion)
      ]);

    }
    if (datos.data[i].tipo_iniciativa==4){
        valores4.push([ datos.data[i].cod_linea,
          datos.data[i].cod_componente,
          datos.data[i].cod_programa,
          datos.data[i].cod_proyecto,
          datos.data[i].nom_proyecto,
          ((datos.data[i].porc_eficacia_proyecto)*100).toFixed(2),
          ((datos.data[i].ejecucion/datos.data[i].ppto_ajustado)*100).toFixed(2),
          formatter.format(datos.data[i].poai),
          formatter.format(datos.data[i].ppto_ajustado),
          formatter.format(datos.data[i].ejecucion)
        ]);
    }
    if (datos.data[i].tipo_iniciativa==5){
      valores5.push([ datos.data[i].cod_linea,
        datos.data[i].cod_componente,
        datos.data[i].cod_programa,
        datos.data[i].cod_proyecto,
        datos.data[i].nom_proyecto,
        ((datos.data[i].porc_eficacia_proyecto)*100).toFixed(2),
        ((datos.data[i].ejecucion/datos.data[i].ppto_ajustado)*100).toFixed(2),
        formatter.format(datos.data[i].poai),
        formatter.format(datos.data[i].ppto_ajustado),
        formatter.format(datos.data[i].ejecucion)
      ]);
  }
  } 
//console.log(valores1);
  nuevatabla(valores1,valores2,valores3,valores4, valores5)

})
}

async function   nuevatabla(valores1, valores2, valores3,valores4, valores5){
document.getElementById('table_tipo1').innerHTML=""
  var table1 = $('#table_tipo1').DataTable({
    data: valores1,
    columns: [
      { title: "Línea" },
      { title: "Componente" },
      { title: "Programa" },
      { title: "BPIN" },
      { title: "Proyecto" },
      { title: "Eficacia" },
      { title: "%Ejec. Financiera" },
      { title: "POAI" },
      { title: "Ppto. Ajustado" },
      { title: "Ejec. Financiera" },
      { title: `<i class="fa fa-search-plus fa-2x" style="color: #28527a;"></i>` }
    ]  ,   
    scrollCollapse: true, 

    fixedColumns: {
      heightMatch: 'none'
    }, fixedHeader: true,
    stateSave: false,
    language: {
      "lengthMenu": "Mostrar _MENU_ registros por página",
      "emptyTable":     "No hay datos para este tipo de proyectos",
      "zeroRecords": "Nothing found - sorry",
      "info": "Vistas página _PAGE_ of _PAGES_",
      "infoEmpty": "No hay registros Disponibles",
      "infoFiltered": "(filtered from _MAX_ total registros)", 
      "zeroRecords": "No hay datos para este tipo de proyectos",
    paginate: {
      first: "Primera",
      last: "Última",
      next: "Siguiente",
      previous: "Anterior"
    },
    sProcessing:"Procesando..."
   },
   responsive:"true",
  dom:'frtlp',
 bDestroy: true,
  columnDefs: [
      {/*Línea */       width: "5px",   targets: 0, className: "text-center"    },
      {/*Componente*/   width: "5px",   targets: 1, className: "text-center"    },
      {/*Programa*/     width: "5px",   targets: 2, className: "text-center"    },
      {/*BPIN  */       width: "50px",  targets: 3, className: "text-center"    },
      {/*Proyecto*/     width: "500px", targets: 4, className: "text-left"      },
      {/*Eficacia*/     width: "10px",  targets: 5, className: "text-center"    },
      {/*%Ejec  */      width: "70px",  targets: 6, className: "text-center"    },
      {/*POAI  */       width: "70px",  targets: 7, className: "text-center"    },
      {/*Ajustado*/     width: "70px",  targets: 8, className: "text-center"    },
      {/*Financiera*/   width: "70px",  targets: 9, className: "text-center"    },
      {width: "70px",  targets: 10,className: "text-center" , data: "cod_dep", defaultContent: `<button class='btn btn-link'><i class="fa fa-search-plus fa-2x" style="color: #28527a;"></i></button>`  , searchable: false,orderable: false   } 
     ],   
       bDestroy: true
   });

   document.getElementById('table_tipo2').innerHTML=""
   var table2 = $('#table_tipo2').DataTable({
    data: valores2,
    columns: [
      { title: "Línea" },
      { title: "Componente" },
      { title: "Programa" },
      { title: "BPIN" },
      { title: "Proyecto" },
      { title: "Eficacia" },
      { title: "%Ejec. Financiera" },
      { title: "POAI" },
      { title: "Ppto. Ajustado" },
      { title: "Ejec. Financiera" },
      { title: `<i class="fa fa-search-plus fa-2x" style="color: #28527a;"></i>` }
    ]  ,   
    scrollCollapse: true, 

    fixedColumns: {
      heightMatch: 'none'
    }, fixedHeader: true,
    stateSave: false,
    language: {
      "lengthMenu": "Mostrar _MENU_ registros por página",
      "emptyTable":     "No hay datos para este tipo de proyectos",
      "zeroRecords": "Nothing found - sorry",
      "info": "Vistas página _PAGE_ of _PAGES_",
      "infoEmpty": "No hay registros Disponibles",
      "infoFiltered": "(filtered from _MAX_ total registros)", 
      "zeroRecords": "No hay datos para este tipo de proyectos",
    paginate: {
      first: "Primera",
      last: "Última",
      next: "Siguiente",
      previous: "Anterior"
    },
    sProcessing:"Procesando..."
   },
   responsive:"true",
 // dom:'Bfrtlp',

  columnDefs: [
      {/*Línea */       width: "5px",   targets: 0, className: "text-center"    },
      {/*Componente*/   width: "5px",   targets: 1, className: "text-center"    },
      {/*Programa*/     width: "5px",   targets: 2, className: "text-center"    },
      {/*BPIN  */       width: "50px",  targets: 3, className: "text-center"    },
      {/*Proyecto*/     width: "500px", targets: 4, className: "text-left"      },
      {/*Eficacia*/     width: "10px",  targets: 5, className: "text-center"    },
      {/*%Ejec  */      width: "70px",  targets: 6, className: "text-center"    },
      {/*POAI  */       width: "70px",  targets: 7, className: "text-center"    },
      {/*Ajustado*/     width: "70px",  targets: 8, className: "text-center"    },
      {/*Financiera*/   width: "70px",  targets: 9, className: "text-center"    },
      {width: "70px",  targets: 10,className: "text-center" , data: "cod_dep", defaultContent: `<button class='btn btn-link'><i class="fa fa-search-plus fa-2x" style="color: #28527a;"></i></button>`  , searchable: false,orderable: false   } 
     ],   
       bDestroy: true
   });
   document.getElementById('table_tipo3').innerHTML=""
   var table3 = $('#table_tipo3').DataTable({
    data: valores3,
    columns: [
      { title: "Línea" },
      { title: "Componente" },
      { title: "Programa" },
      { title: "BPIN" },
      { title: "Proyecto" },
      { title: "Eficacia" },
      { title: "%Ejec. Financiera" },
      { title: "POAI" },
      { title: "Ppto. Ajustado" },
      { title: "Ejec. Financiera" },
      { title: `<i class="fa fa-search-plus fa-2x" style="color: #28527a;"></i>` }
    ]  ,   
    scrollCollapse: true, 

    fixedColumns: {
      heightMatch: 'none'
    }, fixedHeader: true,
    stateSave: false,
    language: {
      "lengthMenu": "Mostrar _MENU_ registros por página",
      "emptyTable":     "No hay datos para este tipo de proyectos",
      "zeroRecords": "Nothing found - sorry",
      "info": "Vistas página _PAGE_ of _PAGES_",
      "infoEmpty": "No hay registros Disponibles",
      "infoFiltered": "(filtered from _MAX_ total registros)", 
      "zeroRecords": "No hay datos para este tipo de proyectos",
    paginate: {
      first: "Primera",
      last: "Última",
      next: "Siguiente",
      previous: "Anterior"
    },
    sProcessing:"Procesando..."
   },
   responsive:"true",
 // dom:'Bfrtlp',
 bDestroy: true,
  columnDefs: [
      {/*Línea */       width: "5px",   targets: 0, className: "text-center"    },
      {/*Componente*/   width: "5px",   targets: 1, className: "text-center"    },
      {/*Programa*/     width: "5px",   targets: 2, className: "text-center"    },
      {/*BPIN  */       width: "50px",  targets: 3, className: "text-center"    },
      {/*Proyecto*/     width: "500px", targets: 4, className: "text-left"      },
      {/*Eficacia*/     width: "10px",  targets: 5, className: "text-center"    },
      {/*%Ejec  */      width: "70px",  targets: 6, className: "text-center"    },
      {/*POAI  */       width: "70px",  targets: 7, className: "text-center"    },
      {/*Ajustado*/     width: "70px",  targets: 8, className: "text-center"    },
      {/*Financiera*/   width: "70px",  targets: 9, className: "text-center"    },
      {width: "70px",  targets: 10,className: "text-center" , data: "cod_dep", defaultContent: `<button class='btn btn-link'><i class="fa fa-search-plus fa-2x" style="color: #28527a;"></i></button>`  , searchable: false,orderable: false   } 
     ],   
       bDestroy: true
   });
   document.getElementById('table_tipo4').innerHTML=""
   table4 = $('#table_tipo4').DataTable({
    data: valores4,
    columns: [
      { title: "Línea" },
      { title: "Componente" },
      { title: "Programa" },
      { title: "BPIN" },
      { title: "Proyecto" },
      { title: "Eficacia" },
      { title: "%Ejec. Financiera" },
      { title: "POAI" },
      { title: "Ppto. Ajustado" },
      { title: "Ejec. Financiera" },
      { title: `<i class="fa fa-search-plus fa-2x" style="color: #28527a;"></i>` }
    ]  ,   
    scrollCollapse: true, 

    fixedColumns: {
      heightMatch: 'none'
    }, fixedHeader: true,
    stateSave: false,
    language: {
        "lengthMenu": "Mostrar _MENU_ registros por página",
        "emptyTable":     "No hay datos para este tipo de proyectos",
        "zeroRecords": "Nothing found - sorry",
        "info": "Vistas página _PAGE_ of _PAGES_",
        "infoEmpty": "No hay registros Disponibles",
        "infoFiltered": "(filtered from _MAX_ total registros)", 
        "zeroRecords": "No hay datos para este tipo de proyectos",
    paginate: {
      first: "Primera",
      last: "Última",
      next: "Siguiente",
      previous: "Anterior"
    },
    sProcessing:"Procesando..."

   },
   responsive:"true",
 
   
 // dom:'Bfrtlp',
 
 bDestroy: true,
  columnDefs: [
      {/*Línea */       width: "5px",   targets: 0, className: "text-center"    },
      {/*Componente*/   width: "5px",   targets: 1, className: "text-center"    },
      {/*Programa*/     width: "5px",   targets: 2, className: "text-center"    },
      {/*BPIN  */       width: "50px",  targets: 3, className: "text-center"    },
      {/*Proyecto*/     width: "500px", targets: 4, className: "text-left"      },
      {/*Eficacia*/     width: "10px",  targets: 5, className: "text-center"    },
      {/*%Ejec  */      width: "70px",  targets: 6, className: "text-center"    },
      {/*POAI  */       width: "70px",  targets: 7, className: "text-center"    },
      {/*Ajustado*/     width: "70px",  targets: 8, className: "text-center"    },
      {/*Financiera*/   width: "70px",  targets: 9, className: "text-center"    },
      {width: "70px",  targets: 10,className: "text-center" , data: "cod_dep", defaultContent: `<button class='btn btn-link' ><i class="fa fa-search-plus fa-2x" style="color: #28527a;"></i></button>`  , searchable: false,orderable: false   } 
     ]
   });

   document.getElementById('table_tipo5').innerHTML=""
   table5 = $('#table_tipo5').DataTable({
    data: valores5,
    columns: [
      { title: "Línea" },
      { title: "Componente" },
      { title: "Programa" },
      { title: "BPIN" },
      { title: "Proyecto" },
      { title: "Eficacia" },
      { title: "%Ejec. Financiera" },
      { title: "POAI" },
      { title: "Ppto. Ajustado" },
      { title: "Ejec. Financiera" },
      { title: `<i class="fa fa-search-plus fa-2x" style="color: #28527a;"></i>` }
    ]  ,   
    scrollCollapse: true, 

    fixedColumns: {
      heightMatch: 'none'
    }, fixedHeader: true,
    stateSave: false,
    language: {
        "lengthMenu": "Mostrar _MENU_ registros por página",
        "emptyTable":     "No hay datos para este tipo de proyectos",
        "zeroRecords": "Nothing found - sorry",
        "info": "Vistas página _PAGE_ of _PAGES_",
        "infoEmpty": "No hay registros Disponibles",
        "infoFiltered": "(filtered from _MAX_ total registros)", 
        "zeroRecords": "No hay datos para este tipo de proyectos",
    paginate: {
      first: "Primera",
      last: "Última",
      next: "Siguiente",
      previous: "Anterior"
    },
    sProcessing:"Procesando..."

   },
   responsive:"true",
 
   
 // dom:'Bfrtlp',
 
 bDestroy: true,
  columnDefs: [
      {/*Línea */       width: "5px",   targets: 0, className: "text-center"    },
      {/*Componente*/   width: "5px",   targets: 1, className: "text-center"    },
      {/*Programa*/     width: "5px",   targets: 2, className: "text-center"    },
      {/*BPIN  */       width: "50px",  targets: 3, className: "text-center"    },
      {/*Proyecto*/     width: "500px", targets: 4, className: "text-left"      },
      {/*Eficacia*/     width: "10px",  targets: 5, className: "text-center"    },
      {/*%Ejec  */      width: "70px",  targets: 6, className: "text-center"    },
      {/*POAI  */       width: "70px",  targets: 7, className: "text-center"    },
      {/*Ajustado*/     width: "70px",  targets: 8, className: "text-center"    },
      {/*Financiera*/   width: "70px",  targets: 9, className: "text-center"    },
      {width: "70px",  targets: 10,className: "text-center" , data: "cod_dep", defaultContent: `<button class='btn btn-link' ><i class="fa fa-search-plus fa-2x" style="color: #28527a;"></i></button>`  , searchable: false,orderable: false   } 
     ]
   });


   $('#table_tipo1 tbody').on( 'click', 'button', function () {
    var data1 = table1.row( $(this).parents('tr') ).data();
    buscavalstat(data1[4], data1[3], data1[9])
  } );
  $('#table_tipo2 tbody').on( 'click', 'button', function () {
    var data2 = table2.row( $(this).parents('tr') ).data();
     buscavalstat(data2[4], data2[3], data2[9])
  } );
  $('#table_tipo3 tbody').on( 'click', 'button', function () {
    var data3 = table3.row( $(this).parents('tr') ).data();
    buscavalstat(data3[4], data3[3], data3[9])
  } );
  $('#table_tipo4 tbody').on( 'click', 'button', function () {
    var data4 = table4.row( $(this).parents('tr') ).data();
    buscavalstat(data4[4], data4[3], data4[9])
  } ); 
  $('#table_tipo5 tbody').on( 'click', 'button', function () {
    var data5 = table5.row( $(this).parents('tr') ).data();
    buscavalstat(data5[4], data5[3], data5[9])
  } ); 
}



 function buscavalstat(nomproyecto, cod, ejec){
 
try {

   fetch(`https://sse-pdm.herokuapp.com/pa/api/proyecto/${cod}`)
  .then(res=>res.json())
  .then(datos=>{
    geoProyect(nomproyecto,cod)
    let tablaValStat ='';
    document.getElementById('valStat').innerHTML="";
    let tam = datos.data.length;
    document.getElementById('nom1').innerHTML = nomproyecto;
    document.getElementById('nomprodetalle').innerHTML=nomproyecto;
    document.getElementById('cod1').innerHTML = cod;
    let fecha = new Date(datos.data[0].corte_ejecucion)
     document.getElementById('corte1').innerHTML=(fecha.toLocaleDateString())
    document.getElementById('cod_linea1').innerHTML = datos.data[0].cod_linea;
    document.getElementById('nom_linea1').innerHTML = datos.data[0].nom_linea;
    document.getElementById('cod_componente1').innerHTML = datos.data[0].cod_componente;
    document.getElementById('nom_componente1').innerHTML = datos.data[0].nom_componente;
    document.getElementById('cod_programa1').innerHTML = datos.data[0].cod_programa;
    document.getElementById('nom_programa1').innerHTML = datos.data[0].nom_programa;

    document.getElementById('poai1').innerHTML = formatter.format(datos.data[0].y_dev_poai);
    document.getElementById('ppto_ajustado1').innerHTML = formatter.format(datos.data[0].y_dev_pptoajustado);
    document.getElementById('ejec1').innerHTML = (ejec);
    proyecto_fisico(cod)
    for (let index = 0; index < tam; index++) {
     tablaValStat += `<tr style="background-color:gray ;">
                        <th   style="text-align: center;">Val. Est.</th>
                        <th   colspan="2" style="text-align: center;">Producto/Bien/Servicio </th>
                        <th   style="text-align: center;">SUIFP</th>
                      </tr>
                      <tr>
                        <td   style="text-align: center;">${datos.data[index].cod_val_stat}</td>
                        <td   colspan="2" style="text-align: left;">${datos.data[index].nom_val_stat} </td>
                        <th   style="text-align: center;">${datos.data[index].cod_siufp_catal}</th>     
                      </tr>
                      <tr>
                        <th style="text-align: center;">Unidad</th>
                        <th style="text-align: center;">Cantidad Planeada</th>
                        <th style="text-align: center;">Cantidad Ejecutada</th>
                        <th colspan="2" style="text-align: center;">Eficacia Producto</th>
                      </tr>
                      <tr>
                        <td style="text-align: center;">${datos.data[index].u_medida}</td>
                        <td style="text-align: center;">${datos.data[index].q_plan}</td>
                        <td style="text-align: center;">${datos.data[index].q_real}</td>
                        <td colspan="2" style="text-align: center;">${Math.ceil(datos.data[index].eficacia_ve)}%</td>
                      </tr>
                      <tr>
                        <th colspan="2">Descripción</th>
                        <th colspan="2">Observación Seguimiento</th>
                      </tr>
                      <tr>
                        <td colspan="2" style="text-align: left;">${datos.data[index].obs_cod_siufp}</td>
                        <td colspan="2" style="text-align: left;">${datos.data[index].obs_val_stat}</td>
                      </tr>
                      <tr><td colspan="4"><hr></td> </tr>  `
      document.getElementById('valStat').innerHTML=tablaValStat;  
    }
  })
 
} catch (error) {
  console.log('Error buscavalstat ', error)
}
jQuery.noConflict();
  $('#exampleModal2').modal('show'); ;
}
async function geoProyect( nom, cod){
  try {
    fetch(`https://sse-pdm.herokuapp.com/geo/api/dependencias/proyectos/${cod}`)
    .then(res=>res.json())
    .then(datos=>{
      const dataSource = {
        chart: {
          caption: "Inversión Pública por Comunas y Corregimientos",
          subcaption: nom,
          axisname: "Territorio",
          yaxisname: "cifras en millones de pesos",
          showvalues: "1",
          formatnumberscale: "0",
          numberprefix: "$",
          theme: "zune",
          labeldisplay: "ROTATE",
          decimalSeparator: ",",
          thousandSeparator: ".",
          plottooltext: `<div id='divTable'>
                          <table id='dataTable' class="table table-sm table-responsive-sm table-hover" style="font-size: small;" width='200px'>
                            <tr style="color:white" >
                              <th>Territorio</th>
                              <td>$label</td>
                            </tr>
                            <tr style="color:white" >
                              <th>Inversión (en millones de pesos)</th>
                              <td>$dataValue</td>
                            </tr>
                          </table>
                        </div>`,
        },
        data: [
                {
                  label: "Popular",
                  value: Math.ceil(parseInt(datos.data[0].popular)/1000000)
                  ,color:"#009AB2"
                },
                {
                  label: "Santa Cruz",
                  value: Math.ceil(parseInt(datos.data[0].santa_cruz)/1000000)
                  ,color:"#009AB2"
                },
                {
                  label: "Manrique",
                  value: Math.ceil(parseInt(datos.data[0].manrique)/1000000)
                  ,color:"#009AB2"
                },
                {
                  label: "Aranjuez",
                  value: Math.ceil(parseInt(datos.data[0].aranjuez)/1000000) ,  color:"#009AB2"
                },
                {
                  label: "Castilla",
                  value: Math.ceil(parseInt(datos.data[0].castilla)/1000000) , color:"#009AB2"
                },
                {
                  label: "Doce de Octubre",
                  value: Math.ceil(parseInt(datos.data[0].doce_de_octubre)/1000000) , color:"#009AB2"
                },
                {
                  label: "Robledo",
                  value: Math.ceil(parseInt(datos.data[0].robledo)/1000000) ,color:"#009AB2"
                },
                {
                  label: "Villa Hermosa",
                  value: Math.ceil(parseInt(datos.data[0].villa_hermosa)/1000000) ,color:"#009AB2"
                },
                {
                  label: "Buenos Aires",
                  value: Math.ceil(parseInt(datos.data[0].buenos_aires)/1000000) ,color:"#009AB2"
                },
                {
                  label: "La Candelaria",
                  value: Math.ceil(parseInt(datos.data[0].la_candelaria)/1000000) ,color:"#009AB2"
                },
                {
                  label: "Laureles Estadio",
                  value: Math.ceil(parseInt(datos.data[0].laureles_estadio)/1000000) ,color:"#009AB2"
                },
                {
                  label: "La América",
                  value: Math.ceil(parseInt(datos.data[0].la_america)/1000000) ,color:"#009AB2"
                },
                {
                  label: "San Javier",
                   value: Math.ceil(parseInt(datos.data[0].san_javier)/1000000) ,color:"#009AB2"
                },
                {
                  label: "El Poblado",
                  value: Math.ceil(parseInt(datos.data[0].el_poblado)/1000000) ,color:"#009AB2"
                },
                {
                  label: "Guayabal",
                  value: Math.ceil(parseInt(datos.data[0].guayabal)/1000000) ,color:"#009AB2"
                },
                {
                  label: "Belén",
                  value: Math.ceil(parseInt(datos.data[0].belen)/1000000) ,color:"#009AB2"
                },
                {
                  label: "Palmitas",
                  value: Math.ceil(parseInt(datos.data[0].palmitas)/1000000) ,color:"#009AB2"
                },
                {
                  label: "San Cristóbal",
                  value: Math.ceil(parseInt(datos.data[0].san_cristobal)/1000000) ,color:"#009AB2"
                },
                {
                  label: "Altavista",
                  value: Math.ceil(parseInt(datos.data[0].altavista)/1000000) ,color:"#009AB2"
                },
                {
                  label: "San Antonio",
                   value: Math.ceil(parseInt(datos.data[0].san_antonio)/1000000) ,color:"#009AB2"
                },
                {
                  label: "Santa Elena",
                  value: Math.ceil(parseInt(datos.data[0].santa_elena)/1000000) ,color:"#009AB2"
                },
                {
                  label: "Ciudad",
                  value: Math.ceil(parseInt(datos.data[0].ciudad)/1000000) ,color:"#009AB2"
                },
                {
                  label: "Fort. Inst",
                  value: Math.ceil(parseInt(datos.data[0].fort_inst)/1000000) ,color:"#009AB2"
                }
              ]
      };
     FusionCharts.ready(function() {
      var myChart = new FusionCharts({
        type: "column2d",
        renderAt: "chart-geoproyect",
        width: "100%",
        height: "100%",
        dataFormat: "json",
        dataSource
      }).render();
    });
    document.getElementById('inv_territorio_project').innerHTML="";

    let tabla='';
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">Popular</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].popular)))+'</td>';
    tabla +='</tr>';
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">Santa Cruz</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].santa_cruz)))+'</td>';
    tabla +='</tr>';
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">Manrique</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].manrique)))+'</td>';
    tabla +='</tr>';
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">Aranjuez</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].aranjuez)))+'</td>';
    tabla +='</tr>';
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">Castilla</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].castilla)))+'</td>';
    tabla +='</tr>';
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">Doce de Octubre</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].doce_de_octubre)))+'</td>';
    tabla +='</tr>';
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">Robledo</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].robledo)))+'</td>';
    tabla +='</tr>';
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">Villa Hermosa</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].villa_hermosa)))+'</td>';
    tabla +='</tr>';
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">Buenos Aires</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].buenos_aires)))+'</td>';
    tabla +='</tr>';
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">La Candelaria</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].la_candelaria)))+'</td>';
    tabla +='</tr>';
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">Lureles - Estadio</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].laureles_estadio)))+'</td>';
    tabla +='</tr>';
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">La América</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].la_america)))+'</td>';
    tabla +='</tr>';
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">San Javier</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].san_javier)))+'</td>';
    tabla +='</tr>';
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">El Poblado</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].el_poblado)))+'</td>';
    tabla +='</tr>'; 
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">Guayabal</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].guayabal)))+'</td>';
    tabla +='</tr>';                
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">Belén</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].belen)))+'</td>';
    tabla +='</tr>';                
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">San Sebastían de Palmitas</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].palmitas)))+'</td>';
    tabla +='</tr>';  
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">San Cristóbal</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].san_cristobal)))+'</td>';
    tabla +='</tr>';      
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">Altavista</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].altavista)))+'</td>';
    tabla +='</tr>';  
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">San Antonio de Prado</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].san_antonio)))+'</td>';
    tabla +='</tr>';  
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">Santa Elena</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].santa_elena)))+'</td>';
    tabla +='</tr>';  
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">Ciudad</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].ciudad)))+'</td>';
    tabla +='</tr>';  
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">Fortalecimiento Institucional</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].fort_inst)))+'</td>';
    tabla +='</tr>';      
    document.getElementById('inv_territorio_project').innerHTML=tabla;
   
    })



  } catch (error) {
  console.log('Error groProyect', error)      
  }
}
async function contadorSemDep(cod){
  try {
    fetch(`https://sse-pdm.herokuapp.com/pi/api/semaforo-corte/contador/dependencias/${cod}` )
    .then(res => res.json())
    .then(response =>{
      let cardsemaforogris ='';
      let cardsemafororojo ='';
      let cardsemaforoamarillo ='';
      let cardsemaforoverde ='';
      let gris=0, rojo=1, amarillo=2, verde=3;
      document.getElementById('footer-card-gris').innerHTML='';
      document.getElementById('footer-card-rojo').innerHTML='';
      document.getElementById('footer-card-amarillo').innerHTML='';
      document.getElementById('footer-card-verde').innerHTML='';
      cardsemaforogris=`  
      <div class="card-footer mt-4" style="background-color: white;">
        <a  class="btn btn-light btn-block" style="font-size: xx-small;" type="button" onclick="estado_sem_dep(${cod},${gris})"> 
          <i class="fa fa-pencil-square-o" style=" width:100%; height:16px; font-size: small;"aria-hidden="true"> Ampliar Información</i>
        </a>
      </div>
      `
      cardsemafororojo=`  
      <div class="card-footer mt-4" style="background-color: white;">
        <a  class="btn btn-light btn-block" style="font-size: xx-small;" type="button" onclick="estado_sem_dep(${cod},${rojo})"> 
          <i class="fa fa-pencil-square-o" style=" width:100%; height:16px; font-size: small;"aria-hidden="true"> Ampliar Información</i>
        </a>
      </div>
      `
      cardsemaforoamarillo=`  
      <div class="card-footer mt-4" style="background-color: white;">
        <a  class="btn btn-light btn-block" style="font-size: xx-small;" type="button" onclick="estado_sem_dep(${cod},${amarillo})"> 
          <i class="fa fa-pencil-square-o" style=" width:100%; height:16px; font-size: small;"aria-hidden="true"> Ampliar Información</i>
        </a>
      </div>
      `
      cardsemaforoverde=`  
      <div class="card-footer mt-4" style="background-color: white;">
        <a  class="btn btn-light btn-block" style="font-size: xx-small;" type="button" onclick="estado_sem_dep(${cod},${verde})"> 
          <i class="fa fa-pencil-square-o" style=" width:100%; height:16px; font-size: small;"aria-hidden="true"> Ampliar Información</i>
        </a>
      </div>
      `
      document.getElementById('footer-card-gris').innerHTML=cardsemaforogris;
      document.getElementById('footer-card-rojo').innerHTML=cardsemafororojo;
      document.getElementById('footer-card-amarillo').innerHTML=cardsemaforoamarillo;
      document.getElementById('footer-card-verde').innerHTML=cardsemaforoverde;

      document.getElementById('total-gris').innerHTML= response.data[0].gris
      document.getElementById('porcentaje-gris').innerHTML= ((response.data[0].gris/response.data[0].total_ind_dep)*100).toFixed(2)+"%"
      document.getElementById('total-rojos').innerHTML= response.data[0].rojo
      document.getElementById('porcentaje-rojos').innerHTML= ((response.data[0].rojo/response.data[0].total_ind_dep)*100).toFixed(2)+"%"
      document.getElementById('total-naranjas').innerHTML= response.data[0].amarillo
      document.getElementById('porcentaje-naranjas').innerHTML= ((response.data[0].amarillo/response.data[0].total_ind_dep)*100).toFixed(2)+"%"
      document.getElementById('total-verdes').innerHTML= response.data[0].verde
      document.getElementById('porcentaje-verdes').innerHTML= ((response.data[0].verde/response.data[0].total_ind_dep)*100).toFixed(2)+"%"
    })

  } catch (error) {
    console.log('Error contadorSemaforo ',error)
  }
}
async function estado_sem_dep(cod_dep,codsemaforo) {
  try {
    let parametros={
        "cod_semaforo":codsemaforo,
        "cod_dependencia": cod_dep
    }
  fetch(`https://sse-pdm.herokuapp.com/pi/api/semaforo-corte/dependencia/tipo/ `,{
    method:'POST',
    body: JSON.stringify(parametros), // data can be `string` or {object}!
    headers:{
        'Content-Type': 'application/json'
      }
    })
  .then(res=> res.json())
  .then(datos=>{
    let terminal = document.getElementById("inputGroupSelectDependencia");
    let avancetabla=""
    var selectedText = terminal.options[terminal.selectedIndex].text;   
    document.getElementById('nom_depencia_query').innerHTML= selectedText
    var imagen_semafav='';
    let tablaSemaforo ='';
    document.getElementById('tablaSemaforo').innerHTML='';
    let tam = datos.data.length;
    for (let index = 0; index < tam; index++) {
      if ((datos.data[index].semafav ) == 0)
      {
       imagen_semafav =  "/img/pause.png" ;
      }
      if ((datos.data[index].semafav )== 1){
        imagen_semafav =  "/img/rojo.png" ;
      }
      if ((datos.data[index].semafav) == 2){
        imagen_semafav =  "/img/amarillo.png" ;
      }
      if ((datos.data[index].semafav )== 3){
        imagen_semafav =  "/img/verde.png" ;
      }


      if (datos.data[index].avance_cuatrienio== -1) {
        avancetabla = "N/A"
        
      } else if(datos.data[index].avance_cuatrienio== -2){
        avancetabla = "N/D"
      } else{
        avancetabla = ((datos.data[index].avance_cuatrienio)*100).toFixed(2)
      }

      tablaSemaforo += `
                       <tr>
                         <td style="text-align: center;">${datos.data[index].cod_linea}</td>
                         <td style="text-align: left;">${datos.data[index].cod_componente} </td>
                         <td style="text-align: center;">${datos.data[index].cod_programa}</td>
                         <td style="text-align: center;">${datos.data[index].cod_indicador}</td>
                         <td style="text-align: center;">${datos.data[index].nom_indicador}</td>
                         <td style="text-align: center;">${datos.data[index].unidad}</td>
                         <td style="text-align: center;">${datos.data[index].fc}</td>
                         <td style="text-align: center;">${datos.data[index].sentido}</td>
                         <td style="text-align: center;">${avancetabla}%</td>
                         <td style="text-align: center;">${datos.data[index].observaciones_indicador}</td>
                         <td style="text-align: center;"> <span><img src="${imagen_semafav}" alt=""  width="30" height="30"></span></td>
                       </tr>
                      `
  
      document.getElementById('tablaSemaforo').innerHTML=tablaSemaforo;  
     }
  })
  } catch (error) {
    console.log("Error estado_sem_dep: ", error)
  }
  jQuery.noConflict();
  $('#exampleModal3').modal('show'); 
}
async function proyecto_fisico(cod){
  try {
    fetch(`https://sse-pdm.herokuapp.com/pa/api/avances/ejecucion/${cod}`)
    .then(res=> res.json())
    .then(response=>{
      let avanxcefisicoproject= parseFloat((response.data[0].porc_eficacia_proyecto)*100); 
      let avancexfinanciero= parseFloat((response.data[0].porc_ejec_financiera)*100);proyecto_financiero(avancexfinanciero)
      let ffp = ( (parseFloat(response.data[0].porc_eficacia_proyecto))*0.50   +  (parseFloat(response.data[0].porc_ejec_financiera))*0.50 )*100
      //console.log("fisico ",avanxcefisicoproject);
      //console.log("financiero ",avancexfinanciero);
      //console.log("ffp ",ffp);
      fifapon(ffp)
      nomarchivopdf=response.data[0].cod_proyecto;
      let tipo_proyecto="";
      if (response.data[0].tipo_iniciativa==1) {tipo_proyecto= "Proyecto de Iniciativa Institucional"}
      else if (response.data[0].tipo_iniciativa==2) { tipo_proyecto= " Proyecto de Presupuesto Participativo (Iniciativas Comunitarias)"}
      else if (response.data[0].tipo_iniciativa==3) { tipo_proyecto= "Proyecto con saldos no Ejecutables"}
      else {tipo_proyecto= "Proyecto con ejecución de saldos Pendientes (Vigencia Anterior)"}
  
        
  
      document.getElementById('tipo_proyecto').innerHTML= tipo_proyecto

      const dataSource = {
        chart: {
          caption: "% Ejecución Física ",
          lowerlimit: "0",
          upperlimit: "100",
          showvalue: "1",
          numbersuffix: "%",
          theme: "fusion",
          showtooltip: "0"
        },
        colorrange: {
          color: [
            {
              minvalue: "0",
              maxvalue: valorminimo,
              code: "#F2726F"
            },
            {
              minvalue: valorminimo,
              maxvalue: valormaximo,
              code: "#FFC533"
            },
            {
              minvalue: valorminimo,
              maxvalue: "100",
              code: "#62B58F"
            }
          ]
        },
        dials: {
          dial: [
            {
              value: avanxcefisicoproject
            }
          ]
        }
      };
      
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "angulargauge",
          renderAt: "chart-1",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });



    })
    
  } catch (error) {
    console.log('Error proyecto_fisico :>> ', error);
  }
 
 
}
async function proyecto_financiero(avancexfinanciero){
  const dataSource = {
    chart: {
      caption: "% Ejecución Financiera ",
      lowerlimit: "0",
      upperlimit: "100",
      showvalue: "1",
      numbersuffix: "%",
      theme: "fusion",
      showtooltip: "0"
    },
    colorrange: {
      color: [
        {
          minvalue: "0",
          maxvalue: valorminimo,
          code: "#F2726F"
        },
        {
          minvalue: valorminimo,
          maxvalue: valormaximo,
          code: "#FFC533"
        },
        {
          minvalue: valorminimo,
          maxvalue: "100",
          code: "#62B58F"
        }
      ]
    },
    dials: {
      dial: [
        {
          value:avancexfinanciero
        }
      ]
    }
  };
  
  FusionCharts.ready(function() {
    var myChart = new FusionCharts({
      type: "angulargauge",
      renderAt: "chart-2",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource
    }).render();
  });

}
async function fifapon(ffp){
  const dataSource = {
    chart: {
      caption: "% Cumplimiento",
     
      lowerlimit: "0",
      upperlimit: "100",
      showvalue: "1",
      numbersuffix: "%",
      theme: "fusion",
      showtooltip: "0"
    },
    colorrange: {
      color: [
        {
          minvalue: "0",
          maxvalue: valorminimo,
          code: "#F2726F"
        },
        {
          minvalue: valorminimo,
          maxvalue: valormaximo,
          code: "#FFC533"
        },
        {
          minvalue: valorminimo,
          maxvalue: "100",
          code: "#62B58F"
        }
      ]
    },
    dials: {
      dial: [
        {
          value: ffp
        }
      ]
    }
  };
  
  FusionCharts.ready(function() {
    var myChart = new FusionCharts({
      type: "angulargauge",
      renderAt: "chart-3",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource
    }).render();
  });
  
}

window.onload= function(){
  document.getElementById('download').addEventListener('click', ()=>{
      const invoice = this.document.getElementById('invoice');
     // console.log(invoice);
     //console.log(window);
     var opt = {
      margin:       1,
      filename:     nomarchivopdf+'.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 3 , letterRending:true },
      pagebreak: { mode: 'avoid-all', before: '#page2el' },
      jsPDF:        { unit: 'in', format: 'a3', orientation: 'portrait' }
    };
     html2pdf().from(invoice).set(opt).save();

  })
}





