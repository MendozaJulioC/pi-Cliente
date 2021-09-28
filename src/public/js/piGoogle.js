
var mes=0,  minimovalue=0, maximovalue=0; var vigencia=0;


async function detalleAvance(){
  try { var fecha=0; var mes=0
        let AvancePI=[]
        let CortePlan=[]
        let CumplimientoPI=[]
        //fetch(`/pi/google`)
        fetch(`https://sse-pdm.herokuapp.com/pi/api/generalpi`)
        .then( res=> res.json())
        .then(response=>{
          let fechaOrigen= '2021-08-31'
          let tam = response.data.length;
          for(let i =0; i<tam;i++){
            AvancePI.push ({ "value" :  (response.data[i].avance) })  
            CortePlan.push({ "label" :  (response.data[i].corte).substr(0,10) })
            CumplimientoPI.push ({ "value" : response.data[i].cumplimiento })  
            var fecha = response.data[i].corte
            let fechacorte=fecha.substr(0,10)
            if(fechacorte == fechaOrigen){
              triadaInicial2(response.data[i].cumplimiento)
            }
          }
          const dataSource = {
            chart: {
              caption: "<strong>Avance Cuatrienio y Cumplimiento Año</strong>",
              subcaption: "<b>Plan de Desarrollo  Medellín Futuro</b> ",
              xaxisname: "Cortes de Seguimiento",
              yaxisname: "Total Desempeño",
              numbersuffix: "%",
              valuefontsize: "16",
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
                category: CortePlan
              }
            ],
            dataset: [
            {
              seriesname: "Avance",
              data: AvancePI
            },
            {
              seriesname: "Cumplimiento",
              data: CumplimientoPI
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

      let NomPIL=[]; let AvanceJun2021=[]; let CumplimientoJun21=[]; let ProyecAvanDic21=[]; let ProyecCumpDic21=[];
      let AvanceDic20=[]; let CumplimientoDic20=[];
      fetch(`https://sse-pdm.herokuapp.com/pi/api/genralpilineas`)
       // fetch(`/pi/google/lineas`)
        .then( res=> res.json())
        .then(response=>{
         // console.log(response.data);
          let tam = response.data.length;
          for(let z =0; z<tam;z++){
              AvanceDic20.push({"value" :  parseFloat(response.data[z].Avance2020_12_31)})
              CumplimientoDic20.push({"value" :  parseFloat(response.data[z].Cumplimiento2020_12_31) })
              AvanceJun2021.push ({ "value" :  parseFloat(response.data[z].Avance2021_06_30) })  
              CumplimientoJun21.push ({ "value" :  parseFloat(response.data[z].Cumplimiento2021_06_30) }) 
              ProyecAvanDic21.push ({ "value" :  parseFloat(response.data[z].Avance2021_12_31_P) }) 
              ProyecCumpDic21.push ({ "value" :  parseFloat(response.data[z].Cumplimiento2021_12_31_P) }) 
              NomPIL.push({ "label" : response.data[z].nom_linea })
         }

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
                    category: NomPIL
                  }
                ],
                dataset: [
                    {
                        seriesname: "Avance Dic 2020",
                        data:AvanceDic20
                    },
                    {
                        seriesname: "Cumplimiento Dic 2020",
                        data:CumplimientoDic20
                    },
                    {
                        seriesname: "Avance Junio 2021",
                        data:AvanceJun2021
                    },
                    {
                        seriesname: "Cumplimiento Junio 2021",
                        data: CumplimientoJun21
                    },
                    {
                        seriesname: "Proyección Avance Dic 2021",
                        data: ProyecAvanDic21
                    },
                    {
                        seriesname: "Proyección Cumplimiento Dic 2021",
                        data: ProyecCumpDic21
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
 // console.log(datos);
    let mes=0; let valormaximo=0; let valorminimo=0;
    var fechaPA = new Date('08/31/2021');
    mes = fechaPA.getMonth(fechaPA)+1
    vigencia = fechaPA.getFullYear(fechaPA)
      
    fetch(`https://sse-pdm.herokuapp.com/pa/semaforo-corte/${mes}`)
    .then(res=>res.json())
    .then(response=>{
     //   console.log(response);
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
