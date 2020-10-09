
avance_pe()
cumple_pe_anual()
inversion_exec()
eficiencia_tiempo()
_graphHistoryIndicadorEstrategico()
_detalleEjecPresupuesto()
_detalleppto()



async function avance_pe(){
    const dataSource = {
        chart: {
          caption: "Avance Cuatrenial",
          lowerlimit: "0",
          upperlimit: "100",
          showvalue: "1",
          numbersuffix: "%",
          theme: "gammel",
          showtooltip: "0"
        },
        colorrange: {
          color: [
            {
              minvalue: "0",
              maxvalue: "50",
              code: "#F2726F"
            },
            {
              minvalue: "50",
              maxvalue: "75",
              code: "#FFC533"
            },
            {
              minvalue: "75",
              maxvalue: "100",
              code: "#62B58F"
            }
          ]
        },
        dials: {
          dial: [
            {
              value: "81"
            }
          ]
        }
      };
      
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "angulargauge",
          renderAt: "avance-pe",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });
      
}

async function cumple_pe_anual(){
    const dataSource = {
        chart: {
          caption: "Cumplimiento Anual",
          lowerlimit: "0",
          upperlimit: "100",
          showvalue: "1",
          numbersuffix: "%",
          theme: "gammel",
          showtooltip: "1"
        },
        colorrange: {
          color: [
            {
              minvalue: "0",
              maxvalue: "50",
              code: "#F2726F"
            },
            {
              minvalue: "50",
              maxvalue: "75",
              code: "#FFC533"
            },
            {
              minvalue: "75",
              maxvalue: "100",
              code: "#62B58F"
            }
          ]
        },
        dials: {
          dial: [
            {
              value: "81"
            }
          ]
        }
      };
      
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "angulargauge",
          renderAt: "cumple-pe",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });
      
}

async function inversion_exec(){
    const dataSource = {
        chart: {
          caption: "Ejecución Financiera",
          lowerlimit: "0",
          upperlimit: "100",
          showvalue: "1",
          numbersuffix: "%",
          theme: "gammel",
          showtooltip: "0"
        },
        colorrange: {
          color: [
            {
              minvalue: "0",
              maxvalue: "50",
              code: "#F2726F"
            },
            {
              minvalue: "50",
              maxvalue: "75",
              code: "#FFC533"
            },
            {
              minvalue: "75",
              maxvalue: "100",
              code: "#62B58F"
            }
          ]
        },
        dials: {
          dial: [
            {
              value: "81"
            }
          ]
        }
      };
      
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
            type: "angulargauge",
          renderAt: "ejecucion-pe",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });
      
}

async function eficiencia_tiempo(){
    const dataSource = {
        chart: {
          caption: "Eficiencia / Tiempo",
          subcaption: "Actividades/Tiempo de ejecución",
          showvalues: "0",
          labeldisplay: "ROTATE",
          rotatelabels: "1",
          plothighlighteffect: "fadeout",
          plottooltext: "$seriesName in $label : <b>$dataValue</b>",
          theme: "gammel"
        },
        axis: [
          {
            title: "Subscription Amount",
            titlepos: "left",
            numberprefix: "$",
            divlineisdashed: "1",
            maxvalue: "100000",
            dataset: [
              {
                seriesname: "Subscription Amount",
                linethickness: "3",
                data: [
                  {
                    value: "38450.2"
                  },
                  {
                    value: "16544.4"
                  },
                  {
                    value: "10659.4"
                  },
                  {
                    value: "9657.4"
                  },
                  {
                    value: "9040.4"
                  },
                  {
                    value: "9040.4"
                  },
                  {
                    value: "6992.3"
                  },
                  {
                    value: "6650.5"
                  },
                  {
                    value: "6650.5"
                  },
                  {
                    value: "6337.2"
                  },
                  {
                    value: "5835.4"
                  },
                  {
                    value: "4582.9"
                  }
                ]
              }
            ]
          },
          {
            title: "Subscription %",
            axisonleft: "1",
            titlepos: "left",
            numdivlines: "8",
            divlineisdashed: "1",
            maxvalue: "25",
            numbersuffix: "%",
            dataset: [
              {
                seriesname: "Subscription %",
                dashed: "1",
                data: [
                  {
                    value: "17.23"
                  },
                  {
                    value: "7.41"
                  },
                  {
                    value: "4.78"
                  },
                  {
                    value: "4.33"
                  },
                  {
                    value: "4.05"
                  },
                  {
                    value: "4.05"
                  },
                  {
                    value: "3.13"
                  },
                  {
                    value: "2.98"
                  },
                  {
                    value: "2.98"
                  },
                  {
                    value: "2.84"
                  },
                  {
                    value: "2.62"
                  },
                  {
                    value: "2.05"
                  }
                ]
              }
            ]
          },
          {
            title: "Number of Votes",
            titlepos: "RIGHT",
            axisonleft: "0",
            numdivlines: "5",
            numbersuffix: "",
            divlineisdashed: "1",
            maxvalue: "400000",
            dataset: [
              {
                seriesname: "Number of Votes",
                linethickness: "3",
                data: [
                  {
                    value: "358196"
                  },
                  {
                    value: "166138"
                  },
                  {
                    value: "107288"
                  },
                  {
                    value: "97268"
                  },
                  {
                    value: "91098"
                  },
                  {
                    value: "91098"
                  },
                  {
                    value: "70617"
                  },
                  {
                    value: "67199"
                  },
                  {
                    value: "67199"
                  },
                  {
                    value: "64066"
                  },
                  {
                    value: "59048"
                  },
                  {
                    value: "46523"
                  }
                ]
              }
            ]
          },
          {
            title: "Voting %",
            titlepos: "RIGHT",
            axisonleft: "0",
            numdivlines: "5",
            divlineisdashed: "1",
            maxvalue: "20",
            numbersuffix: "%",
            dataset: [
              {
                seriesname: "Voting %",
                dashed: "1",
                data: [
                  {
                    value: "16.3"
                  },
                  {
                    value: "7.03"
                  },
                  {
                    value: "4.54"
                  },
                  {
                    value: "4.12"
                  },
                  {
                    value: "3.86"
                  },
                  {
                    value: "3.86"
                  },
                  {
                    value: "2.99"
                  },
                  {
                    value: "2.84"
                  },
                  {
                    value: "2.84"
                  },
                  {
                    value: "2.71"
                  },
                  {
                    value: "2.5"
                  },
                  {
                    value: "1.97"
                  }
                ]
              }
            ]
          }
        ],
        categories: [
          {
            category: [
              {
                label: "2020-06"
              },
              {
                label: "2020-12"
              },
              {
                label: "2021-06"
              },
              {
                label: "2021-12"
              },
              {
                label: "2010"
              },
              {
                label: "2011"
              },
              {
                label: "2012"
              },
              {
                label: "2013"
              },
              {
                label: "2014"
              },
              {
                label: "2015"
              },
              {
                label: "2016"
              },
              {
                label: "2017"
              }
            ]
          }
        ]
      };
      
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "multiaxisline",
          renderAt: "eficiencia-tiempo",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });
      
}

async function _graphHistoryIndicadorEstrategico(cumple_2020, cumple_2021, cumple_2022, cumple_2023){

    const dataSource = {
        chart: {
         
          subcaption: "2020-2023",
          charttopmargin: "10",
          numbersuffix: "%",
          showvalues:1,
          labeldisplay: "ROTATE",
          theme: "gammel",
          rotateValues: "1"
        },
        dataset: [
          {
            data: [
                {
                  value: "56.42",
                  tooltext: "Junio 2020: <b>$dataValue</b>"
                },
                {
                  value: "63.61",
                  tooltext: "Octubre 2020: <b>$dataValue</b>"
                },
                {
                  value: "67.36",
                  tooltext: "Diciembre 2020: <b>$dataValue</b>"
                },
                {
                  value: "60.59",
                  tooltext: "Marzo 2021: <b>$dataValue</b>"
                },
                {
                  value: "64.89",
                  tooltext: "Junio 2021: <b>$dataValue</b>"
                },
                {
                  value: "24.60",
                  tooltext: "Octubre 2021: <b>$dataValue</b>"
                },
                {
                  value: "77.93",
                  tooltext: "Diciembre 2021: <b>$dataValue</b>"
                },
                {
                  value: "81.04",
                  tooltext: "Marzo 2022: <b>$dataValue</b>"
                },
                {
                  value: "71.20",
                  tooltext: "Junio 2022: <b>$dataValue</b>"
                },
                {
                  value: 90.37,
                  tooltext: "Octubre 2022: <b>$dataValue</b>"
                },
                {
                  value: "73.53",
                  tooltext: "Diciembre 2022: <b>$dataValue</b>"
                }
                ,
                {
                  value: "73.53",
                  tooltext: "Marzo 2023: <b>$dataValue</b>"
                },
                {
                  value: "73.53",
                  tooltext: "Junio 2023: <b>$dataValue</b>"
                }
                ,
                {
                  value: "73.53",
                  tooltext: "Octubre 2023: <b>$dataValue</b>"
                }
                ,
                {
                  value: "73.53",
                  tooltext: "Diciembre 2023: <b>$dataValue</b>"
                }
              ]
          }
        ]
      };
      
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "sparkcolumn",
          renderAt: "history-indicadorEstrategico",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });
      
}

async function _detalleEjecPresupuesto(){
    const dataSource = {
        chart: {
          caption: "Ejecución Financiera",
          subcaption: "Avance Vigencia Actual",
          yaxisname: "millones de Pesos",
          aligncaptionwithcanvas: "0",
          plottooltext: "<b>$dataValue</b>",
          theme: "gammel",
          showvalues:"1",
          rotatevalues:"1",
        

        },
        data: [
          {
            label: "Ppto. Inicial",
            value: 100000,
            color: "#EE7518"  //Custom Color
          },
          {
            label: "PPto. Ajustado",
            value: 9000,
            color: "#009AB2"
          },
          {
            label: "Ordenado",
            value: 9500,
            color : "#00853E"
          }
        ]
      };
      
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "column2D",
          renderAt: "chart-pa-pe",
          dataFormat: "json",
          dataSource
        }).render();
      });
      
}


async function _detalleppto(){
    const dataSource = {
      "chart": {
        "caption": "Detalle Presupuesto",
   
        "showpercentvalues": "1",
        "defaultcenterlabel": "2020",
        "decimals": "1",
        "plottooltext": "<b>$percentValue</b> of our Android users are on <b>$label</b>",
        "centerlabel": "$label: $value",
        "doughnutradius": "55",
        "theme": "zune",
        "enablemultislicing": "0"
    
      },
      "data": [
        {
          "label": "Ordenado",
          "value": 1000,
          "color": "#00853E"
        },
        {
          "label": "Compromisos",
          "value": 800,
          "color":"#EE7518"
        },
        {
          "label": "Disponible",
          "value": 200,
          "color": "#009FE3"
        }
      ]
    };
    
    FusionCharts.ready(function() {
      const myChart = new FusionCharts({
        type: "doughnut2d",
        renderAt: "chart-detalleppto",
        width: "100%",
        height: "100%",
        dataFormat: "json",
        dataSource
       }).render();
      }
    )
  };


 