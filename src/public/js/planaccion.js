var fecha = 0;
let mespa = 0;
var valormaximopa = 0;
var valorminimopa = 0;
var vigencia = 0;
let mes = 0;
var fecha = '';
var fechaPA = '';
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

async function _main() {
  //_avance_financiero()
  //tipoinversion()
  // columnDependencias()

}

async function getCorteAvancePI() {
  try {
    fetch(`http://localhost:7001/pi/api/avance/corte`)
      .then(res => res.json())
      .then(response => {
        let corteavance = new Date(response.data[0].corte)
        let mesavance = corteavance.getMonth(corteavance) + 1
        let vigencia = corteavance.getFullYear(corteavance)
        fecha = corteavance;
        fechaPA = corteavance
        corteplan(mesavance, vigencia, corteavance)
        _PASemaf(mesavance, vigencia, corteavance)
     
      })
  } catch (error) {
    console.error('Error getalerta ', error);
  }
}

async function _PASemaf(mes, vigencia, corte) {
  try {
    mespa = mes//fecha.getMonth(fecha)+1
    vigencia = vigencia //fecha.getFullYear(fecha)
    fetch(`http://localhost:7001/pa/semaforo-corte/${mespa}`)
      .then(res => res.json())
      .then(response => {
        
        valorminimopa = (response.data[0].rojo);
        valormaximopa = (response.data[0].verde);
        porc_avance_fisico(valorminimopa, valormaximopa)
        _avance_financiero()
        graphbubble(valorminimopa, valormaximopa)

      })
  } catch (error) {}
}

async function _avance_financiero() {
  try {
    fetch('http://localhost:7001/pa/api/avancefinanciero')
      .then(res => res.json())
      .then(datos => {
        porc_avance_financiero(parseFloat(datos.data[0].pptoejecutado / datos.data[0].pptoajustado))
        graphPDA(parseFloat(datos.data[0].poai), parseFloat(datos.data[0].pptoajustado), parseFloat(datos.data[0].pptoejecutado))
        detallePpto(parseFloat(datos.data[0].compromisos), parseFloat(datos.data[0].disponible), parseFloat(datos.data[0].ordenado), parseFloat(datos.data[0].total))
      })
  } catch (error) {
    console.log('Error porc_avance_financiero ', error)
  }
}

async function porc_avance_financiero(avance) {
  try {
    porc_avance_fisico(valorminimopa, valormaximopa)
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
        color: [{
            minvalue: 0,
            maxvalue: valorminimopa,
            code: "#F2726F"
          },
          {
            minvalue: valorminimopa,
            maxvalue: valormaximopa,
            code: "#FFC533"
          },
          {
            minvalue: valorminimopa,
            maxvalue: 100,
            code: "#62B58F"
          }
        ]
      },
      dials: {
        dial: [{
          value: (avance) * 100
        }]
      }
    };
    FusionCharts.ready(function () {
      var myChart = new FusionCharts({
        type: "angulargauge",
        renderAt: "ejecfinanciera",
        width: "100%",
        height: "100%",
        dataFormat: "json",
        dataSource
      }).render();
    });
    avancefinaninst()
  } catch (error) {
    console.error(error);
  }
}

async function avancefinaninst() {
  try {
    fetch('http://localhost:7001/pa/general/financiero/inst')
      .then(res => res.json())
      .then(datos => {
        const dataSource = {
          chart: {
            caption: "% Ejecución Financiera Iniciativa Institucional del Plan de Acción",
            lowerlimit: "0",
            upperlimit: "100",
            showvalue: "1",
            numbersuffix: "%",
            theme: "gammel",
            showtooltip: "0",
            valuefontsize: "25"
          },
          colorrange: {
            color: [{
                minvalue: 0,
                maxvalue: valorminimopa,
                code: "#F2726F"
              },
              {
                minvalue: valorminimopa,
                maxvalue: valormaximopa,
                code: "#FFC533"
              },
              {
                minvalue: valorminimopa,
                maxvalue: 100,
                code: "#62B58F"
              }
            ]
          },
          dials: {
            dial: [{
              value: (datos.data[0].porc_finan) * 100
            }]
          }
        };
        FusionCharts.ready(function () {
          var myChart = new FusionCharts({
            type: "angulargauge",
            renderAt: "ejefinaninst",
            width: "100%",
            height: "100%",
            dataFormat: "json",
            dataSource
          }).render();
        });
      })
    ejecfinanpp()
  } catch (error) {

  }
}


async function ejecfinanpp() {
  try {
    fetch('http://localhost:7001/pa/general/financiero/pp')
      .then(res => res.json())
      .then(datos => {
        const dataSource = {
          chart: {
            caption: "% Ejecución Financiera Presupuesto Participativo Plan de Acción",
            lowerlimit: "0",
            upperlimit: "100",
            showvalue: "1",
            numbersuffix: "%",
            theme: "gammel",
            showtooltip: "0",
            valuefontsize: "25"
          },
          colorrange: {
            color: [{
                minvalue: 0,
                maxvalue: valorminimopa,
                code: "#F2726F"
              },
              {
                minvalue: valorminimopa,
                maxvalue: valormaximopa,
                code: "#FFC533"
              },
              {
                minvalue: valorminimopa,
                maxvalue: 100,
                code: "#62B58F"
              }
            ]
          },
          dials: {
            dial: [{
              value: (datos.data[0].porc_finan) * 100
            }]
          }
        };
        FusionCharts.ready(function () {
          var myChart = new FusionCharts({
            type: "angulargauge",
            renderAt: "ejefinanpp",
            width: "100%",
            height: "100%",
            dataFormat: "json",
            dataSource
          }).render();
        });
      })
  } catch (error) {
    console.error('Error ejecfinanpp: ', error);
  }
}

async function graphPDA(poai, pptoajustado, ordenado) {
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
    data: [{
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
        value: Math.round(ordenado),
        "color": "#EE7518"
      }
    ]
  };
  FusionCharts.ready(function () {
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

async function porc_avance_fisico(valorminimopa, valormaximopa) {
  try {

    fetch('http://localhost:7001/pa/api/avancefisico')
      .then(res => res.json())
      .then(datos => {
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
            color: [{
                minvalue: "0",
                maxvalue: valorminimopa,
                code: "#F2726F"
              },
              {
                minvalue: valorminimopa,
                maxvalue: valormaximopa,
                code: "#FFC533"
              },
              {
                minvalue: valorminimopa,
                maxvalue: "100",
                code: "#62B58F"
              }
            ]
          },
          dials: {
            dial: [{
              value: (datos.data[0].ejec_fisica) * 100
            }]
          }
        };
        FusionCharts.ready(function () {
          var myChart = new FusionCharts({
            type: "angulargauge",
            renderAt: "ejecfisica",
            width: "100%",
            height: "100%",
            dataFormat: "json",
            dataSource
          }).render();
        });
      })
    ejecFisicaInst()
  } catch (error) {
    console.log('Error _avancePDM ', error)
  }
}

async function ejecFisicaInst() {
  try {
    fetch(`http://localhost:7001/pa/general/fisico/institucional`).then(res => res.json())
      .then(response => {
        const dataSource = {
          chart: {
            caption: "% Ejecución Física Institucional del Plan de Acción",
            lowerlimit: "0",
            upperlimit: "100",
            showvalue: "1",
            numbersuffix: "%",
            theme: "gammel",
            showtooltip: "0",
            valuefontsize: "25"
          },
          colorrange: {
            color: [{
                minvalue: "0",
                maxvalue: valorminimopa,
                code: "#F2726F"
              },
              {
                minvalue: valorminimopa,
                maxvalue: valormaximopa,
                code: "#FFC533"
              },
              {
                minvalue: valorminimopa,
                maxvalue: "100",
                code: "#62B58F"
              }
            ]
          },
          dials: {
            dial: [{
              value: (response.data[0].porc_ejecfisica) * 100
            }]
          }
        };
        FusionCharts.ready(function () {
          var myChart = new FusionCharts({
            type: "angulargauge",
            renderAt: "ejecfisicainst",
            width: "100%",
            height: "100%",
            dataFormat: "json",
            dataSource
          }).render();
        });
      })
    ejefisicapp()
  } catch (error) {
    console.error('Error ejecFisicaInst ', error);
  }
}

async function detallePpto(compromisos, disponible, ordenado, total) {
  //console.log(compromisos, disponible, ordenado, total);
  /*document.getElementById('compromisos').innerHTML=  formatter.format((compromisos));
  document.getElementById('disponible').innerHTML=  formatter.format((disponible));
  document.getElementById('ordenado').innerHTML=  formatter.format((ordenado));
  document.getElementById('totalppto').innerHTML=  formatter.format((total));*/
  const dataSource = {
    chart: {
      caption: "Detalle Presupuesto",
      subcaption: "en millones de pesos",
      showvalues: "1",
      decimals: "1",
      stack100percent: "1",
      valuefontcolor: "#FFFFFF",
      plottooltext: "$label has $dataValue (<b>$percentValue</b>) $seriesName",
      theme: "zune"
    },
    categories: [{
      category: [{
        label: "Presupuesto"
      }]
    }],
    dataset: [{
        seriesname: "Compromisos",
        data: [{
          value: Math.ceil(compromisos)
        }]
      },
      {
        seriesname: "Disponible",
        data: [{
          value: Math.ceil(disponible)
        }]
      },
      {
        seriesname: "Ordenado",
        data: [{
          value: Math.ceil(ordenado)
        }]
      }
    ]
  };
  FusionCharts.ready(function () {
    var myChart = new FusionCharts({
      type: "scrollstackedbar2d",
      renderAt: "canvasdetallepptot",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource
    }).render();
  });

}

async function ejefisicapp() {
  try {
    fetch(`http://localhost:7001/pa/general/fisico/pp`).then(res => res.json())
      .then(response => {

        const dataSource = {
          chart: {
            caption: "% Ejecución Física Presupuesto Participativo del Plan de Acción",
            lowerlimit: "0",
            upperlimit: "100",
            showvalue: "1",
            numbersuffix: "%",
            theme: "gammel",
            showtooltip: "0",
            valuefontsize: "25"
          },
          colorrange: {
            color: [{
                minvalue: "0",
                maxvalue: valorminimopa,
                code: "#F2726F"
              },
              {
                minvalue: valorminimopa,
                maxvalue: valormaximopa,
                code: "#FFC533"
              },
              {
                minvalue: valorminimopa,
                maxvalue: "100",
                code: "#62B58F"
              }
            ]
          },
          dials: {
            dial: [{
              value: (response.data[0].porc_ejecfisica) * 100
            }]
          }
        };
        FusionCharts.ready(function () {
          var myChart = new FusionCharts({
            type: "angulargauge",
            renderAt: "ejecfisicapp",
            width: "100%",
            height: "100%",
            dataFormat: "json",
            dataSource
          }).render();
        });
      })
    ejecfisicarank()

  } catch (error) {
    console.error('Error ejefisicapp: ', error);
  }
}

async function graphPDA(poai, pptoajustado, ordenado) {
  const dataSource = {
    chart: {
      caption: " Ejecución Financiera ",
      yaxisname: "(mill de $)",
      showvalues: "1",
      formatnumberscale: "0",
      plottooltext: "<b>$dataValue</b> (Millones)",
      theme: "gammel",
      showvalues: "1",
      numberprefix: "$",
      decimalSeparator: ",",
      thousandSeparator: "."
    },
    data: [{
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
        value: Math.round(ordenado),
        "color": "#EE7518"
      }
    ]
  };
  FusionCharts.ready(function () {
    var myChart = new FusionCharts({
      type: "bar2d",
      renderAt: "canvasfinan",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource,
    }).render();
  });
}

function stopEnterKey(evt) {
  var evt = (evt) ? evt : ((event) ? event : null);
  var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
  if ((evt.keyCode == 13) && (node.type == "text")) {
    return false;
  }
}
document.onkeypress = stopEnterKey;

async function ejecfisica() {
  try {
    let infofisicadep = [];
    fetch(`http://localhost:7001/pa/api/ejecusion-fisica/dependencias`)
      .then(res => res.json())
      .then(datos => {
        let tam = datos.data.length;
        for (let i = 0; i < tam; i++) {
          if (((datos.data[i].porc_ejecfisica) * 100) >= valormaximo) {
            colorsemaf = "#58AC84"
          } else if (((datos.data[i].porc_ejecfisica) * 100) <= valorminimo) {
            colorsemaf = "#F06764"
          } else {
            colorsemaf = "#FFBD2E"
          }
          infofisicadep.push({
            "label": datos.data[i].nom_dependencia,
            "value": (datos.data[i].porc_ejecfisica) * 100,
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
        FusionCharts.ready(function () {
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

async function graphCumplimientoPDM(avance) {
  try {
    mespa = fechaPA.getMonth(fechaPA) + 1
    vigencia = fechaPA.getFullYear(fecha)
    fetch(`http://localhost:7001/pa/semaforo-corte/${mespa}`)
      .then(res => res.json())
      .then(response => {
        valorminimo = (response.data[0].rojo) - 0.01;
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
            color: [{
                minvalue: 0,
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
                maxvalue: 100,
                code: "#62B58F"
              }
            ]
          },
          dials: {
            dial: [{
              value: (avance)
            }]
          }
        };
        FusionCharts.ready(function () {
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

async function ejecfisicarank() {
  try {
    let infofisicadep = [];
    fetch(`http://localhost:7001/pa/api/ejecusion-fisica/dependencias`)
      .then(res => res.json())
      .then(datos => {
        let tam = datos.data.length;
        for (let i = 0; i < tam; i++) {
          if (((datos.data[i].porc_ejecfisica) * 100) >= valormaximopa) {
            colorsemaf = "#58AC84"
          } else if (((datos.data[i].porc_ejecfisica) * 100) <= valorminimopa) {
            colorsemaf = "#F06764"
          } else {
            colorsemaf = "#FFBD2E"
          }
          infofisicadep.push({
            "label": datos.data[i].nom_dependencia,
            "value": (datos.data[i].porc_ejecfisica) * 100,
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
          trendlines: [
            {
              line: [
                {
                  startvalue: valormaximopa,
                  color: "#5D62B5",
                  thickness: "2.5",
                  displayvalue: "<b>Esperado</b>",
                  tooltext: "<b>Esperado Corte $startvalue%</b>",
                  dashed: "1",
                  dashLen: "5",
                  dashGap: "4"
                },
               
              ]
            }
          ],
          data: infofisicadep, 
      
        };
        FusionCharts.ready(function () {
          var myChart = new FusionCharts({
            type: "bar2d",
            renderAt: "rank-pa-fis",
            width: "100%",
            height: "100%",
            dataFormat: "json",
            dataSource
          }).render();
        });
      })
    ejecfinancierarank()
  } catch (error) {
    console.error('Error ejecfisica :>> ', error);
  }
  jQuery.noConflict();
  $('#ejecfisicaModal').modal('show');
}

async function ejecfinancierarank() {
  try {
    let infofisicadep = [];
    fetch(`http://localhost:7001/pa/api/ejecusion-financiera/dependencias`)
      .then(res => res.json())
      .then(datos => {
        let tam = datos.data.length;
        for (let i = 0; i < tam; i++) {
          if (((datos.data[i].porcexec_financiera) * 100) >= valormaximopa) {
            colorsemaf = "#58AC84"
          } else if (((datos.data[i].porcexec_financiera) * 100) <= valorminimopa) {
            colorsemaf = "#F06764"
          } else {
            colorsemaf = "#FFBD2E"
          }
          infofisicadep.push({
            "label": datos.data[i].nom_dependencia,
            "value": (datos.data[i].porcexec_financiera) * 100,
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
          trendlines: [
            {
              line: [
                {
                  startvalue: valormaximopa,
                  color: "#5D62B5",
                  thickness: "2.5",
                  displayvalue: "<b>Esperado</b>",
                  tooltext: "<b>Esperado Corte $startvalue%</b>",
                  dashed: "1",
                  dashLen: "5",
                  dashGap: "4"
                },
               
              ]
            }
          ],
          data: infofisicadep
        };
        FusionCharts.ready(function () {
          var myChart = new FusionCharts({
            type: "bar2d",
            renderAt: "rank-finan-pa",
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
  $('#ejecfinancieraModal').modal('show');;
}


async function graphbubble(valorminimopa, valormaximop){
  try {
 

    let datosbubble=[];
    fetch(`http://localhost:7001/pa/bubble`)
    .then(res => res.json())
    .then(datos => {
      let tam = datos.data.length;
     
      for (let i = 0; i < tam; i++) {
        let colorea='';
      let eficacia = (datos.data[i].porc_ejecfisica)*100
      let financiera = (datos.data[i].ejefinan)*100
      console.log('Eficacia',eficacia)

        if (eficacia<= valormaximop && financiera <= valormaximop) {colorea = '#7B241C'}
        if(eficacia<valormaximop && financiera>valormaximop){colorea='#F1948A'}
        if(eficacia>valormaximop && financiera<valormaximop){colorea='#F39C12'}
        if(eficacia>valormaximop && financiera>valormaximop){colorea='#28B463'}
      
        datosbubble.push({
          "x": ((datos.data[i].porc_ejecfisica)*100).toFixed(2),
          "y":  ((datos.data[i].ejefinan)*100).toFixed(2),
          "z":  parseFloat(datos.data[i].pptoejecutado),
          "name":  datos.data[i].nom_cortp,
          "color": colorea
        })

      }
      console.log(valormaximop)



console.log(datosbubble)
      const dataSource = {
        chart: {
          theme: "gammel",
          caption: "Ejecución Física & Ejecución Financiera",
          subcaption: "Comportamiento",
          xaxisminvalue: "-10",
          xaxismaxvalue: "100",
          yaxisminvalue: "-10",
          yaxismaxvalue: "120",
          xaxisname: "%Ejecución Física",
          yaxisname: "%Ejecución Financiera",
          plottooltext: "$name : Física $xvalue% - Financ. $yvalue% - Ejecutado: $zvalue",
          drawquadrant: "1",
          quadrantlabeltl: "Baja Ejec. Física / Alta Ejec. Financiera",
          quadrantlabeltr: "Alta Ejec. Física / Alta Ejec. Financiera",
          quadrantlabelbl: "Baja Ejec. Física / Baja Ejec. Financiera",
          quadrantlabelbr: "Alta Ejec. Física / Baja Ejec. Financiera",
          quadrantxval: valormaximopa,
          quadrantyval: valormaximopa,
          quadrantlinealpha: valormaximopa,
          quadrantlinethickness: "1",
          plotFillHoverColor: "#6baa01",
          showValues: "1"
        
      
        },
        categories: [
          {
            category: [
              {
                label: "0",
                x: "0"
              },
              {
                label: "20%",
                x: "20",
                showverticalline: "1"
              },
              {
                label: "40%",
                x: "40",
                showverticalline: "1"
              },
              {
                label: "60%",
                x: "60",
                showverticalline: "1"
              },
              {
                label: "80%",
                x: "80",
                showverticalline: "1"
              },
              {
                label: "100%",
                x: "100",
                showverticalline: "1"
              }
            ]
          }
        ],
        dataset: [
          {
            data: datosbubble
          }
        ],
        trendlines: [
          {
            line: [
              {
                startvalue: "-10",
                endvalue: "40",
                istrendzone: "1",
                color: "#aaaaaa",
                alpha: "14"
              },
              {
                startvalue: "40",
                endvalue: "50",
                istrendzone: "1",
                color: "#aaaaaa",
                alpha: "7"
              }
            ]
          }
        ]
      };
      
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "bubble",
          renderAt: "bubledep",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });
      


    })

  } catch (error) {
    console.error('Eror grapgbubble', error);
  }
}

getCorteAvancePI()
