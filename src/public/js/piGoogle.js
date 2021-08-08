
var mes=0,  minimovalue=0, maximovalue=0; var vigencia=0;


async function detalleAvance(){
  try {
        fetch(`/pi/google`)
        .then( res=> res.json())
        .then(response=>{
          //console.log(response.cumplehoy);
            triadaInicial2(response.cumplehoy)
            const dataSource = {
                chart: {
                    caption: "<strong>Avance Cuatrienio y Cumplimiento Año</strong>",
                    subcaption: "<b>Plan de Desarrollo  Medellín Futuro</b> ",
                    xaxisname: "Cortes de Seguimiento",
                    yaxisname: "Total Desempeño",
                    numbersuffix: "%",
                    valuefontsize: "14",
                    formatnumberscale: "0",
                    adjustdiv: "0",
                    yaxismaxvalue: "100",
                    numdivlines: "4",
                    showvalues: "1",
                    animation: "1",
                    plottooltext:
                        "<b>$dataValue</b> Desempeño <b>$seriesName</b> en $label",
                    theme: "zune",
                    drawcrossline: "1"
                },
                categories: [
                {
                category: response.corte
            }
            ],
            dataset: [
            {
                seriesname: "Avance",
                data: response.avance
            },
            {
                seriesname: "Cumplimiento",
                data: response.cumplimiento
            }
            ]
        };
        FusionCharts.ready(function() {
            var myChart = new FusionCharts({
            type: "mscolumn2d",
            renderAt: "chart-avancegeneral",
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

async function detalleAvanceLinea(){
    try {

        fetch(`/pi/google/lineas`)
        .then( res=> res.json())
        .then(response=>{

            const dataSource = {
                chart: {
                  caption: "Avance Cuatrienio y Cumplimiento Año por Línea Estratégica",
                  subcaption: "PDM 2020-2023",
                  xaxisname: "Seguimiento",
                  yaxisname: "Desempeño Alcanzado",
                  formatnumberscale: "1",
                  numbersuffix: "%",
                  showvalues:"1",
                  valuefontsize: "14",
                  plottooltext:
                    "<b>$dataValue</b> Desempeño reportado <b>$seriesName</b> en $label",
                  theme: "zune",
                  drawcrossline: "1"
                },
                categories: [
                  {
                    category: response.linea
                  }
                ],
                dataset: [
                    {
                        seriesname: "Avance Dic 2020",
                        data:response.avanceDic20
                    },
                    {
                        seriesname: "Cumplimiento Dic 2020",
                        data:response.cumplimientoDic20
                    },
                    {
                        seriesname: "Avance Junio 2021",
                        data:response.avanceJun21
                    },
                    {
                        seriesname: "Cumplimiento Junio 2021",
                        data: response.cumplimientoJun21
                    },
                    {
                        seriesname: "Proyección Avance Dic 2021",
                        data: response.proyeccAvanceDic21
                    },
                    {
                        seriesname: "Proyección Cumplimiento Dic 2021",
                        data: response.proyeccCumplDic2021
                    } 
                  
                ]
              };
              
              FusionCharts.ready(function() {
                var myChart = new FusionCharts({
                  type: "mscolumn2d",
                  renderAt: "chart-avancelineas",
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

async function triadaInicial2(datos){
    let mes=0; let valormaximo=0; let valorminimo=0;
    var fechaPA = new Date('06/30/2021');
    mes = fechaPA.getMonth(fechaPA)+1
    vigencia = fechaPA.getFullYear(fechaPA)
      
    fetch(`https://sse-pdm.herokuapp.com/pa/semaforo-corte/${mes}`)
    .then(res=>res.json())
    .then(response=>{
        
        valorminimo = (response.data[0].rojo);
        valormaximo = (response.data[0].verde);
        const dataSource = {
            chart: {
              caption: "% Cumplimiento",
              subcaption: vigencia,
              lowerlimit: "0",
              upperlimit: "100",
              showvalue: "1",
              numbersuffix: "%",
              valuefontsize: "25",
              theme: "fusion"
            },
            colorrange: {
              color: [
                {
                    minvalue: 0,
                    maxvalue: response.data[0].rojo,
                    code: "#F2726F"
                },
                {
                    minvalue: response.data[0].rojo,
                    maxvalue: response.data[0].verde,
                    code: "#FFC533"
                },
                {
                    minvalue: response.data[0].rojo,
                    maxvalue: 100,
                    code: "#62B58F"
                }
              ]
            },
            dials: {
              dial: [
                {
                  value: datos,
                  tooltext: "<b>%</b>de Cumplimiento en esta vigencia "
                }
              ]
            },
            trendpoints: {
              point: [
                {
                  startvalue: valormaximo,
                  displayvalue: "Esperado",
                  thickness: "2",
                  color: "#E15A26",
                  usemarker: "1",
                  markerbordercolor: "#E15A26",
                  markertooltext: valormaximo+"%"
                }
              ]
            }
          };
          
          FusionCharts.ready(function() {
            var myChart = new FusionCharts({
              type: "angulargauge",
              renderAt: "triada2",
              width: "100%",
              height: "100%",
              dataFormat: "json",
              dataSource
            }).render();
          });



    })

    
      
  }
  


detalleAvance();
detalleAvanceLinea();
