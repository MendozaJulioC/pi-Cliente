var fecha =0; let mespa=0; var valormaximo=0; var valorminimo=0;var vigencia=0; let mes=0;
var fecha='';var fechaPA = '';
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})
async function _main(){
  porc_avance_fisico()
  tipoinversion()
  columnDependencias()
}

async function getCorteAvancePI(){
  try {
    fetch(`http://localhost:7001/pi/api/avance/corte`)
    .then(res=>res.json())
    .then(response=>{
      let corteavance= new Date(response.data[0].corte) 
      let mesavance = corteavance.getMonth(corteavance)+1
      let vigencia = corteavance.getFullYear(corteavance)
      fecha= corteavance;
      fechaPA=corteavance
       corteplan(mesavance, vigencia, corteavance)   
       _PASemaf (mesavance,vigencia, corteavance)
    })
  } catch (error) {
    console.error('Error getalerta ', error);
  }
}

function corteplan(mesavance, vigenciaavance, corteavance)  {
  let dia = corteavance.getDate()
   corteavance.setDate(dia)
  document.getElementById('fecha_corte').innerHTML= corteavance.toLocaleDateString("en-US", { day:'numeric',month: 'short',year: 'numeric' })
  let vigencia = vigenciaavance //corteavance.getFullYear(corteavance)
  switch (vigencia) {
    case 2020:
      mes= corteavance.getMonth(corteavance)+1
    break;
    case 2021:
      mes= corteavance.getMonth(corteavance)+13
    break;
    case 2022:
      mes= corteavance.getMonth(corteavance)+25
    break;
    case 2023:
      mes= corteavance.getMonth(corteavance)+37
    break;
    default:
    break;
  }
  let parametros={
    "mesplan" : mes,
    "vigencia": vigencia
  }
  fetch(`http://localhost:7001/pi/api/semaforo-corte`,{
    method:'POST',
    body: JSON.stringify(parametros), // data can be `string` or {object}!
    headers:{
        'Content-Type': 'application/json'
    }
  }).then(res=> res.json())
  .then(response=>{
    minimovalue= (response.data[0].rojo)*100;
    maximovalue =(response.data[0].verde)*100;
    document.getElementById('minimo-corte').value= minimovalue.toFixed(2)
    document.getElementById('maximo-corte').value= maximovalue.toFixed(2)
    _avancePDM()
  })
  swal( {
    title: "SSE-PDM!",
    text: "Cargando espere un momento!",
    icon: "info",
    buttons: false,
    timer: 5000
  });
}

async function _PASemaf (mes, vigencia, corte){
  try {
    mespa = mes+1//fecha.getMonth(fecha)+1
    vigencia = vigencia//fecha.getFullYear(fecha)
    fetch(`http://localhost:7001/pa/semaforo-corte/${mespa}`)
    .then(res=>res.json())
    .then(response=>{
      valorminimo = (response.data[0].rojo);
      valormaximo = (response.data[0].verde);
    })
  } catch (error) {
  }
}

async function _avancePDM(){
  try {
    fetch('http://localhost:7001/pi/api/total')
    .then(res=>res.json())
    .then(datos=>{
        graphPDM(datos.data[0].total_plan)
        let cumplimiento= (parseFloat(datos.data[0].avancepond/datos.data[0].programado)*100).toFixed(2)
        graphCumplimientoPDM(cumplimiento)
      })
  } catch (error) {
    console.log('Error _avancePDM ',error )
  }
}

async function graphPDM(total){
  //aqui un fetch para consultar el porcentaje de ejecución del pdm
  let esperado=(mes/48)*100
  //console.log(mes);
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
            tooltext: "<b>$value%</b>"
          }
        ]
      },
      trendpoints: {
        point: [
          {
            startvalue: esperado ,//document.getElementById('maximo-corte').value,
            displayvalue: "Esperado",
            thickness: "2",
            color: "#E15A26",
            usemarker: "1",
            markerbordercolor: "#E15A26",
            markertooltext: esperado.toFixed(2)+"%"//document.getElementById('maximo-corte').value+"%"
          }
        ]
      }
    };
    FusionCharts.ready(function() {
      var myChart = new FusionCharts({
        type: "angulargauge",
        renderAt: "canvas",
        width: "100%",
        height: "100%",
        dataFormat: "json",
        dataSource
      }).render();
    });
    _avance_financiero()
  } catch (error) {
    console.log('Error graphPDM: ', error)
  }
}

async function _avance_financiero(){
  try {
    fetch('http://localhost:7001/pa/api/avancefinanciero')
    .then(res=>res.json())
    .then(datos=>{
      porc_avance_financiero(parseFloat(datos.data[0].pptoejecutado/datos.data[0].pptoajustado))
      graphPDA(parseFloat(datos.data[0].poai), parseFloat(datos.data[0].pptoajustado),parseFloat(datos.data[0].pptoejecutado))
      detallePpto(parseFloat(datos.data[0].compromisos),parseFloat(datos.data[0].disponible),parseFloat( datos.data[0].ordenado), parseFloat(datos.data[0].total))
    })
  } catch (error) {
    console.log('Error porc_avance_financiero ',error )
  }
}

async function porc_avance_financiero(avance){  
try {
    mespa = fechaPA.getMonth(fechaPA)+1
    vigencia = fechaPA.getFullYear(fecha)
    fetch(`http://localhost:7001/pa/semaforo-corte/${mespa}`)
    .then(res=>res.json())
    .then(response=>{
      valorminimo = (response.data[0].rojo)-0.01;
      valormaximo = (response.data[0].verde);
      porc_avance_fisico(valorminimo, valormaximo)
      const dataSource = {
        chart: {
          caption: "% Ejecución  Financiera Plan de Acción",
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
              minvalue: 0,
              maxvalue:valorminimo,
              code: "#F2726F"
          },
          {
              minvalue: valorminimo,
              maxvalue: valormaximo,
              code: "#FFC533"
          },
          {
              minvalue: valorminimo,
              maxvalue: 100,
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
            renderAt: "chart-ejecfinanciera",
            width: "100%",
            height: "100%",
            dataFormat: "json",
            dataSource
          }).render();
        });
      })
  } catch (error) {
    console.error(error);
  }
}

async function graphPDA(poai, pptoajustado, ordenado){
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
        value: Math.round(poai),
        "color": "#009FE3"
      },
      {
        label: "Ppto. Ajustado",
        value: Math.round(pptoajustado),
        "color": "#009AB2"
      },
      {
        label: "Ppto. Ejecutado",
        value:Math.round (ordenado) ,
        "color": "#EE7518"
      }
    ]
  };
  FusionCharts.ready(function() {
    var myChart = new FusionCharts({
      type: "bar2d",
      renderAt: "canvas-pa1",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource,
    }).render();
  });
}

async function detallePpto(compromisos, disponible, ordenado , total){
  document.getElementById('compromisos').innerHTML=  formatter.format((compromisos));
  document.getElementById('disponible').innerHTML=  formatter.format((disponible));
  document.getElementById('ordenado').innerHTML=  formatter.format((ordenado));
  document.getElementById('totalppto').innerHTML=  formatter.format((total));
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
      renderAt: "canvas-pa2",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource
    }).render();
  });
  columnGeo()
}

async function columnGeo(){
  try {
    let geoinver=[]
      fetch(`http://localhost:7001/geo/api/territorio`)
      .then(res=>res.json())
      .then(datos=>{
        for (let index = 0; index < datos.data.length; index++) {
          geoinver.push({
            label: datos.data[index].nombre,
            value: datos.data[index].total,
          })
        }
        const dataSource = {
           chart: {
            caption: "Inversión Pública por Comunas y Corregimientos",
            subcaption: "(millones de pesos)",
            xaxisname: "Territorio",
            yaxisname: "cifras en pesos",
            showvalues: "1",
            formatnumberscale: "0",
            numberprefix: "$",
            theme: "zune",
            labeldisplay: "ROTATE",
            decimalSeparator: ",",
            thousandSeparator: ".",
            plottooltext: `<div id='divTable'>
                              <table id='dataTable' class="table table-sm table-responsive-sm " style="font-size: small;" width='200px'>
                                <tr style="color:white" >
                                  <th>Territorio</th>
                                  <td>$label</td>
                                </tr>
                                <tr style="color:white" >
                                  <th>Inversión</th>
                                  <td>$dataValue</td>
                                </tr>
                              </table>
                            </div>`,
          },
          data: geoinver,
        };
        FusionCharts.ready(function() {
          var myChart = new FusionCharts({
            type: "column2d",
            renderAt: "chart-geo",
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

async function porc_avance_fisico(valorminimo, valormaximo){
  try {
    fetch('http://localhost:7001/pa/api/avancefisico')
    .then(res=>res.json())
    .then(datos=>{
        const dataSource = {
          chart: {
            caption: "% Ejecución Física del Plan de Acción",
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
                value: (datos.data[0].ejec_fisica)*100
              }
            ]
          }
        };
        FusionCharts.ready(function() {
          var myChart = new FusionCharts({
            type: "angulargauge",
            renderAt: "chart-ejecfisica",
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

async function tipoinversion(){
  try {
   fetch(`http://localhost:7001/geo/api/tipo-inversion`)
   .then(res=>res.json())
   .then(datos=> {
    document.getElementById('tipo_localizada').innerHTML= formatter.format( datos.data[0].localizada/1000000);
    document.getElementById('tipo_pp').innerHTML= formatter.format(datos.data[0].pp/1000000);
    document.getElementById('tipo_ciudad').innerHTML= formatter.format( datos.data[0].ciudad/1000000 ) ;
    document.getElementById('tipo_fort').innerHTML= formatter.format( datos.data[0].fortinst/1000000 ) ;
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create("canvas-tipoInversion", am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    chart.data = [
      {
        country: "Localizada",
        value: datos.data[0].localizada/1000000
      },
      {
        country: "PP",
        value: datos.data[0].pp/1000000
      },
      {
        country: "Ciudad",
        value: datos.data[0].ciudad/1000000
      },
      {
        country: "Fort. Inst/nal.",
        value: datos.data[0].fortinst/1000000
      }
    ];
    chart.radius = am4core.percent(70);
    chart.innerRadius = am4core.percent(40);
    chart.startAngle = 180;
    chart.endAngle = 360;  
    var series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "value";
    series.dataFields.category = "country";
    series.slices.template.cornerRadius = 10;
    series.slices.template.innerCornerRadius = 7;
    series.slices.template.draggable = true;
    series.slices.template.inert = true;
    series.alignLabels = false;
    series.hiddenState.properties.startAngle = 90;
    series.hiddenState.properties.endAngle = 90;
    chart.legend = new am4charts.Legend();
   })
  } catch (error) {
    console.log('Error tipoinversion', error)
  }
}

async function columnDependencias(){
  var valores=[];
  fetch(`http://localhost:7001/geo/api/dependencias`)
      .then(res=>res.json())
      .then(datos=>{
        let tam = datos.data.length;
        for(var i =0; i<(tam) ;i++   ){
             valores.push({
              label: datos.data[i].nom_cortp,
              value:datos.data[i].total_dep,
              color: "#009AB2"
        });
    }
    valores.sort((a, b) => b.value - a.value)
    const dataSource = {
    chart: {
      caption: "Inversión Pública por Dependencias",
      xaxisname: "Dependencias",
      yaxisname: "cifras en millones de pesos",
      numberprefix: "$",
      theme: "zune",
      labeldisplay: "ROTATE",
      placevaluesinside: "1",
      showValues: "1",
      valuefontColor: "#000000",
      formatnumberscale: "0",
      decimalSeparator: ",",
      thousandSeparator: "."
    },
    data: valores
  };
    FusionCharts.ready(function() {
    var myChart = new FusionCharts({
      type: "column2d",
      renderAt: "chart-dep",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource
    }).render();
  });
 })
}

function stopEnterKey(evt) {
      var evt = (evt) ? evt : ((event) ? event : null);
      var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
      if ((evt.keyCode == 13) && (node.type == "text")) { return false; }
}
document.onkeypress = stopEnterKey;

async function ejecfisica(){
   try {
     let infofisicadep=[];
     fetch(`http://localhost:7001/pa/api/ejecusion-fisica/dependencias`)
     .then(res=> res.json())
     .then(datos=>{
      let tam = datos.data.length;
      for(let i =0; i<tam;i++){
        if (((datos.data[i].porc_ejecfisica)*100)>=valormaximo){colorsemaf="#58AC84"}
        else if (((datos.data[i].porc_ejecfisica)*100)<=valorminimo) {colorsemaf="#F06764"} 
        else {colorsemaf="#FFBD2E"}
        infofisicadep.push({
          "label" : datos.data[i].nom_dependencia,
          "value": (datos.data[i].porc_ejecfisica)*100,
          "color": colorsemaf
         })
      }
      infofisicadep.sort((a, b) => b.value - a.value)
      const dataSource = {
        chart: {
          aligncaptionwithcanvas: "0",
          numbersuffix: "%",
          plottooltext: "<b>$dataValue</b> leads received",
          theme: "zune"
        },
        data: infofisicadep
      };
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "bar2d",
          renderAt: "chart-ejecfisica-dep",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });
     })
   } catch (error) {
     console.error('Error ejecfisica :>> ', error);
   }
   jQuery.noConflict();
    $('#ejecfisicaModal').modal('show'); 
}

async function ejecfinanciera(){
    try {
      let infofisicadep=[];
      fetch(`http://localhost:7001/pa/api/ejecusion-financiera/dependencias`)
      .then(res=> res.json())
      .then(datos=>{
       let tam = datos.data.length;
       for(let i =0; i<tam;i++){
        if (((datos.data[i].porcexec_financiera)*100)>=valormaximo){colorsemaf="#58AC84"}
        else if (((datos.data[i].porcexec_financiera)*100)<=valorminimo) {colorsemaf="#F06764"} 
        else {colorsemaf="#FFBD2E"}
         infofisicadep.push({
           "label" : datos.data[i].nom_dependencia,
           "value": (datos.data[i].porcexec_financiera)*100,
           "color":colorsemaf
          })
       }
       infofisicadep.sort((a, b) => b.value - a.value)
       const dataSource = {
         chart: {
           aligncaptionwithcanvas: "0",
           numbersuffix: "%",
           plottooltext: "<b>$dataValue</b> leads received",
           theme: "zune"
         },
         data: infofisicadep
       };
       FusionCharts.ready(function() {
         var myChart = new FusionCharts({
           type: "bar2d",
           renderAt: "chart-ejecfinanciera-dep",
           width: "100%",
           height: "100%",
           dataFormat: "json",
           dataSource
         }).render();
       });
      })
    } catch (error) {
      console.error('Error ejecfinanciera :>> ', error);
    }
    jQuery.noConflict();
     $('#ejecfinancieraModal').modal('show'); ;
}

async function graphCumplimientoPDM(avance){  
  try {
    mespa = fechaPA.getMonth(fechaPA)+1
    vigencia = fechaPA.getFullYear(fecha)
    fetch(`http://localhost:7001/pa/semaforo-corte/${mespa}`)
    .then(res=>res.json())
    .then(response=>{
      valorminimo = (response.data[0].rojo)-0.01;
      valormaximo = (response.data[0].verde);
      porc_avance_fisico(valorminimo, valormaximo)
      const dataSource = {
        chart: {
          caption: "% Cumplimiento PDM",
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
              minvalue: 0,
              maxvalue:valorminimo,
              code: "#F2726F"
          },
          {
              minvalue: valorminimo,
              maxvalue: valormaximo,
              code: "#FFC533"
          },
          {
              minvalue: valorminimo,
              maxvalue: 100,
              code: "#62B58F"
          }
          ]
        },
        dials: {
            dial: [
              {
                value: (avance)
              }
            ]
          }
        };
        FusionCharts.ready(function() {
          var myChart = new FusionCharts({
            type: "angulargauge",
            renderAt: "cumplimientovigencia",
            width: "100%",
            height: "100%",
            dataFormat: "json",
            dataSource
          }).render();
        });
    })
  } catch (error) {
    console.error(error);
  }
}

async function getalerta(){
  try {
      fetch(`http://localhost:7001/pa/api/alerta/corte`)
      .then(res=>res.json())
      .then(response=>{
        let cortealerta= new Date(response.data[0].corte) 
        mespa = cortealerta.getMonth(cortealerta)+1
        vigencia = cortealerta.getFullYear(cortealerta)
        fetch(`http://localhost:7001/pa/api/alerta/valor/${mespa}`)
        .then(res=>res.json())
        .then(response=>{
          let rojo = response.data[0].rojo
          let verde = response.data[0].verde
          cumple_linea_dep(rojo, verde, vigencia)
        })
      })
    } catch (error) {
      console.error('Error getalerta ', error);
    }
}
  
async function cumple_linea_dep(rojo, verde, vigencia){
  try {
    let infocumple=[];
    var cump=0;
    let colorsemafcumple=''
    fetch(`http://localhost:7001/dep/api/rank/cumplimiento`)
    .then(res=>res.json())
    .then(response=>{
        let tam = response.data.length;
        for(let i =0; i<tam;i++){
      // if(response.data[i].avance!=0){
         cumpverde = (parseFloat(response.data[i].avance/response.data[i].programado2022)*100)
         console.log(cumpverde, parseFloat(verde)); 
        if (cumpverde>=parseFloat(verde)){colorsemafcumple="#58AC84"}
        else if (cumpverde<=parseFloat(rojo)) {colorsemafcumple="#F06764"} 
        else {colorsemafcumple="#FFBD2E"}
     //  }
        infocumple.push({
              "label" : response.data[i].nombre_dep,
              "value": (response.data[i].avance/response.data[i].programado2022)*100,
              "color": colorsemafcumple,
             // "link": "j-showAlert-"+response.data[i].cod_responsable_reporte
          })
        }
        infocumple.sort((a, b) =>  b.value -a.value )
        const dataSource = {
          chart: {
            caption: "% Cumplimiento Anual PDM",
            labelfontsize:"16",
            showvalues: "1",
            valuefontsize: "20",
            numbersuffix: "%",
            theme: "zune"
          },
          data: infocumple
        };
        FusionCharts.ready(function() {
          var myChart = new FusionCharts({
            type: "bar3d",
            renderAt: "rankcumplimiento",
            width: "100%",
            height: "100%",
            dataFormat: "json",
            dataSource
          }).render();
        });
      })
    } catch (error) {
      console.error('Erro',error )
    }
    jQuery.noConflict();
    $('#cumplimientoModal').modal('show'); 
}

getCorteAvancePI()
  