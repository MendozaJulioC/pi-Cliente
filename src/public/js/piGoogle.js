
var mes=0,  minimovalue=0, maximovalue=0; var vigencia=0;
let fechaOrigen= '';

async function detalleAvance(){
  try { var fecha=0; var mes=0
        let AvancePI=[]
        let CortePlan=[]
      
        let CumplimientoPI=[]; let tipo_corte=[];
        //fetch(`/pi/google`)
        fetch(`https://sse-pdm.herokuapp.com/pi/api/generalpi`)
        .then( res=> res.json())
        .then(response=>{
          fetch(`https://sse-pdm.herokuapp.com/pi/api/avance/corte`)
          .then(res=>res.json())
          .then(datos=>{
            let corteavance= new Date(datos.data[0].corte) 
            fechaOrigen=  (datos.data[0].corte).substr(0,10)
            let tam = response.data.length;

            for(let i =0; i<tam;i++){
              if ((response.data[i].tipo_corte) != 'P') {
                AvancePI.push ({ "value" :  (response.data[i].avance) })  
                CortePlan.push({ "label" :  `${response.data[i].corte.substr(0,10)}(${response.data[i].tipo_corte})`})
                CumplimientoPI.push ({ "value" : response.data[i].cumplimiento })  
                var fecha = response.data[i].corte
                let fechacorte=fecha.substr(0,10)
                if(fechacorte == fechaOrigen){
                  triadaInicial2(response.data[i].cumplimiento)
                }
              }
            }
          const dataSource = {
            chart: {
            caption: "<strong>Avance Cuatrienio y Cumplimiento Año</strong>",
            subcaption: "<b>Plan de Desarrollo  Medellín Futuro</b> <br> (N)Corte Normal  (P)Corte Proyectado ",
            xaxisname: "Cortes de Seguimiento",
            yaxisname: "Total Desempeño",
            numbersuffix: "%",
            valuefontsize: "16",
            labelfontsize:"16",
            legendItemFontSize: "14",
            legendIconScale: "1",
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
              categories: [{category: CortePlan}],
              dataset: [{seriesname: "Avance",data: AvancePI},
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
    })
  } catch (error) {console.error('Error detalleAvance: ', error);}
}

async function detalleAvanceLinea(){
  try {
      let CortePlan2=[]
  
    //let AvanceJun2021=[]; let CumplimientoJun21=[]; 
    //let ProyecAvanDic21=[]; let ProyecCumpDic21=[];
    //let AvanceAgo2021=[]; let CumplimientoAgo21=[];
    //let AvanceSep2021=[]; let CumplimientoSep21=[];
   // let AvanceOct2021=[]; let CumplimientoOct21=[];
    
    let AvanceL1=[]; 
    let AvanceL2=[]; 
    let AvanceL3=[]; 
    let AvanceL4=[]; 
    let AvanceL5=[]; 

    fetch(`https://sse-pdm.herokuapp.com/pi/api/genralpilineas`)
    // fetch(`/pi/google/lineas`)
    .then( res=> res.json())
    .then(response=>{
      // console.log(response.data);
        fetch(`https://sse-pdm.herokuapp.com/pi/api/corteslineas`).then(res=> res.json())
        .then(datos=>{        
          for (let index = 0; index < datos.data.length; index++) {
            CortePlan2.push({ "label" :  `${datos.data[index].corte.substr(0,10)}(${datos.data[index].tipo})`})
          }
          //console.log(CortePlan2)
          //console.log(response.data[0].cod_linea)
          for (let x = 0; x < response.data.length; x++) {
           if( response.data[x].cod_linea==1){AvanceL1.push({value: response.data[x].avance}) }
           if( response.data[x].cod_linea==2){AvanceL2.push({value: response.data[x].avance})}
           if( response.data[x].cod_linea==3){AvanceL3.push({value: response.data[x].avance})}
           if( response.data[x].cod_linea==4){AvanceL4.push({value: response.data[x].avance})}
           if( response.data[x].cod_linea==5){AvanceL5.push({value: response.data[x].avance})}
          }
          const dataSource = {
            chart: {
              caption: "Avance por Líneas",
              subcaption: "2020-2023",
              xaxisname: "Cortes",
              yaxisname: "Total Avance por Línea en cada corte",
              formatnumberscale: "1",
              numbersuffix: "%",
              valuefontsize: "16",
              labelfontsize:"16",
              legendItemFontSize: "14",
              legendIconScale: "1",
              formatnumberscale: "0",
              adjustdiv: "0",
              yaxismaxvalue: "100",
              numdivlines: "4",
              showvalues: "1",
              animation: "1",
              plottooltext:
                "<b>$dataValue</b>% Avance<b>$seriesName</b> en $label",
              theme: "zune",
              drawcrossline: "1",
              showvalues: "1",
            },
            categories: [
              {
                category: CortePlan2
              }
            ],
            dataset: [
              {
                seriesname: "Reactivación Económica y Valle del Software",
                data: AvanceL1
              },
              {
                seriesname: "Transformación Educativa y Cultural",
                data: AvanceL2
              },
              {
                seriesname: "Medellín me Cuida",
                data: AvanceL3
              } , {
                seriesname: "Ecociudad",
                data: AvanceL4
              } ,
              
              {
                seriesname: "Gobernanza y Gobernabilidad",
                data: AvanceL5
              }
              // se púede agregar los cumplimientos 
             
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
    
    })
    } catch (error) {console.error(error);}   
}

async function triadaInicial2(datos){
  let mes=0; let valormaximo=0; let valorminimo=0;
  var fechaPA = new Date('09/30/2021');
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