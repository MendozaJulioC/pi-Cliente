
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})
async function _main(){
  corteplan()
   porc_avance_fisico()
  _avance_financiero()
  tipoinversion()
  columnDependencias()
}
function corteplan(){
  var fecha = new Date('12/31/2020');
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
  fetch(`http://localhost:7000/pi/api/semaforo-corte`,{
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
    _avancePDM()
  })
swal( {
  title: "SSE-PDM!",
  text: "Cargando espere un momento!",
  icon: "info",
  buttons: false,
  timer: 3000
});
}
async function _avancePDM(){
  try {
    fetch('http://localhost:7000/pi/api/total')
    .then(res=>res.json())
    .then(datos=>{
        graphPDM(datos.data[0].total_plan)
      })
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
        renderAt: "canvas",
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
async function _avance_financiero(){
  try {
    fetch('http://localhost:7000/pa/api/avancefinanciero')
    .then(res=>res.json())
    .then(datos=>{
      porc_avance_financiero((datos.data[0].pptoejecutado/datos.data[0].pptoajustado))
      graphPDA(parseInt(datos.data[0].poai), parseInt(datos.data[0].pptoajustado),parseInt(datos.data[0].pptoejecutado))
      detallePpto(datos.data[0].compromisos, datos.data[0].disponible, datos.data[0].ordenado, datos.data[0].total)
    })
  } catch (error) {
    console.log('Error porc_avance_financiero ',error )
  }
}
async function porc_avance_financiero(avance){  

  const dataSource = {
    chart: {
      caption: "% Ejecución Financiera Plan de Acción",
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
          maxvalue: "40",
          code: "#F2726F"
        },
        {
          minvalue: "40",
          maxvalue: "60",
          code: "#FFC533"
        },
        {
          minvalue: "60",
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
        renderAt: "chart-ejecfinanciera",
        width: "100%",
        height: "100%",
        dataFormat: "json",
        dataSource
      }).render();
    });
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
      fetch(`http://localhost:7000/geo/api/territorio`)
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
                              <table id='dataTable' class="table table-sm table-responsive-sm " style="font-size: small;" width='200px'>
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
              ,color:"#00853E",
              link: "j-showAlert-Apple,$810K"
            },
            {
              label: "Santa Cruz",
              value: Math.ceil(parseInt(datos.data[0].santa_cruz)/1000000)
              ,color:"#00853E"
            },
            {
              label: "Manrique",
              value: Math.ceil(parseInt(datos.data[0].manrique)/1000000)
              ,color:"#00853E"
            },
            {
              label: "Aranjuez",
              value: Math.ceil(parseInt(datos.data[0].aranjuez)/1000000) ,color:"#00853E"
            },
            {
              label: "Castilla",
              value: Math.ceil(parseInt(datos.data[0].castilla)/1000000) ,color:"#00853E"
            },
            {
              label: "Doce de Octubre",
              value: Math.ceil(parseInt(datos.data[0].doce_de_octubre)/1000000) ,color:"#00853E"
            },
            {
              label: "Robledo",
              value: Math.ceil(parseInt(datos.data[0].robledo)/1000000) ,color:"#00853E"
            },
            {
              label: "Villa Hermosa",
              value: Math.ceil(parseInt(datos.data[0].villa_hermosa)/1000000) ,color:"#00853E"
            },
            {
              label: "Buenos Aires",
              value: Math.ceil(parseInt(datos.data[0].buenos_aires)/1000000) ,color:"#00853E"
            },
            {
              label: "La Candelaria",
              value: Math.ceil(parseInt(datos.data[0].la_candelaria)/1000000) ,color:"#00853E"
            },
            {
              label: "Laureles Estadio",
              value: Math.ceil(parseInt(datos.data[0].laureles_estadio)/1000000) ,color:"#00853E"
            },
            {
              label: "La América",
              value: Math.ceil(parseInt(datos.data[0].la_america)/1000000) ,color:"#00853E"
            },
            {
              label: "San Javier",
               value: Math.ceil(parseInt(datos.data[0].san_javier)/1000000) ,color:"#00853E"
            },
            {
              label: "El Poblado",
              value: Math.ceil(parseInt(datos.data[0].el_poblado)/1000000) ,color:"#00853E"
            },
            {
              label: "Guayabal",
              value: Math.ceil(parseInt(datos.data[0].guayabal)/1000000) ,color:"#00853E"
            },
            {
              label: "Belén",
              value: Math.ceil(parseInt(datos.data[0].belen)/1000000) ,color:"#00853E"
            },
            {
              label: "Palmitas",
              value: Math.ceil(parseInt(datos.data[0].palmitas)/1000000) ,color:"#00853E"
            },
            {
              label: "San Cristóbal",
              value: Math.ceil(parseInt(datos.data[0].san_cristobal)/1000000) ,color:"#00853E"
            },
            {
              label: "Altavista",
              value: Math.ceil(parseInt(datos.data[0].altavista)/1000000) ,color:"#00853E"
            },
            {
              label: "San Antonio",
               value: Math.ceil(parseInt(datos.data[0].san_antonio)/1000000) ,color:"#00853E"
            },
            {
              label: "Santa Elena",
              value: Math.ceil(parseInt(datos.data[0].santa_elena)/1000000) ,color:"#00853E"
            }
          ]
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
async function porc_avance_fisico(){
  try {
    fetch('http://localhost:7000/pa/api/avancefisico')
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
                maxvalue: "40",
                code: "#F2726F"
              },
              {
                minvalue: "40",
                maxvalue: "60",
                code: "#FFC533"
              },
              {
                minvalue: "60",
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
async function tipoinversion()
{
  try {
   fetch(`http://localhost:7000/geo/api/tipo-inversion`)
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
  fetch(`http://localhost:7000/geo/api/dependencias`)
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
    valores.sort((a, b) => a.value - b.value)
    const dataSource = {
    chart: {
      caption: "Inversión Pública por Dependencias",
    
      xaxisname: "Dependencias",
      yaxisname: "cifras en millones de pesos",
      //numbersuffix: "$",
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
     fetch(`http://localhost:7000/pa/api/ejecusion-fisica/dependencias`)
     .then(res=> res.json())
     .then(datos=>{
      let tam = datos.data.length;
      for(let i =0; i<tam;i++){
     
        infofisicadep.push({
          "label" : datos.data[i].nom_dependencia,
          "value": (datos.data[i].porc_ejecfisica)*100,
     
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

    $('#ejecfisicaModal').modal('show'); 

}
async function ejecfinanciera(){
    try {
      let infofisicadep=[];
      fetch(`http://localhost:7000/pa/api/ejecusion-financiera/dependencias`)
      .then(res=> res.json())
      .then(datos=>{
       let tam = datos.data.length;
       for(let i =0; i<tam;i++){
      
         infofisicadep.push({
           "label" : datos.data[i].nom_dependencia,
           "value": (datos.data[i].porcexec_financiera)*100,
           "color":"#00af91"
      
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
 
     $('#ejecfinancieraModal').modal('show'); ;
}