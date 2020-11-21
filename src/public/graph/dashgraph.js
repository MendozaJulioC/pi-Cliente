


const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})



async function _main(){
  _avancePDM()
   porc_avance_fisico()
  _avance_financiero()
  tipoinversion()
  columnDependencias()
}

async function _avancePDM(){
  try {
    fetch('https://sse-pdm-back.herokuapp.com/pi/api/total')
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
        caption: "% Avance cumplimiento PDM",
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
            maxvalue: "50",
            code: "#B4358B"
          },
          {
            minvalue: "50",
            maxvalue: "75",
            code: "#FFDC15"
          },
          {
            minvalue: "75",
            maxvalue: "100",
            code: "#00853E"
          }
        ]
      },
      dials: {
        dial: [
          {
            value: Math.ceil(total)
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
    fetch('https://sse-pdm-back.herokuapp.com/pa/api/avancefinanciero')
    .then(res=>res.json())
    .then(datos=>{
      porc_avance_financiero(datos.data[0].ejec_financiera) 
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
  document.getElementById('total').innerHTML=  formatter.format((total));

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
        dateo.push({
          "label" : datos.data[i].nom_linea,
          "value": Math.ceil(datos.data[i].avance_linea),
          "color": "#B4358B",
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
    console.log('Error graphInicial ', error)
  }
columnGeo()

};


async function columnGeo(){


  try {
      fetch(`https://sse-pdm-back.herokuapp.com/geo/api/territorio`)
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
    fetch('https://sse-pdm-back.herokuapp.com/pa/api/avancefisico')
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
   fetch('https://sse-pdm-back.herokuapp.com/geo/api/tipo-inversion')
   .then(res=>res.json())
   .then(datos=> {

    am4core.useTheme(am4themes_animated);
    var chart = am4core.create("canvas-tipoInversion", am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    chart.data = [
      {
        country: "Localizada",
        value: datos.data[0].localizada
      },
      {
        country: "PP",
        value: datos.data[0].pp
      },
      {
        country: "Ciudad",
        value: datos.data[0].ciudad
      },
      {
        country: "Fort. Inst/nal.",
        value: datos.data[0].fortinst
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
  fetch(`https://sse-pdm-back.herokuapp.com/geo/api/dependencias`)
      .then(res=>res.json())
      .then(datos=>{
     
        let tam = datos.data.length;
        for(var i =0; i<(tam) ;i++   ){
          console.log(datos.data[i].nom_cortp)
             valores.push({
             
              label: datos.data[i].nom_cortp,
              value:datos.data[i].total_dep,
              color: "#009AB2"
        });
        console.log(valores)
    }
    valores.sort((a, b) => a.value - b.value)
const dataSource = {
    chart: {
      caption: "Inversión Pública por Dependencias",
      subcaption: "Agosto-31-2020",
      xaxisname: "Dependencias",
      yaxisname: "cifras en millones de pesos",
      //numbersuffix: "$",
      numberprefix: "$",
      theme: "zune",
      labeldisplay: "ROTATE",
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
