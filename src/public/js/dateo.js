
async function dateomain(){
  mapaVogencia()
    graphInicial()
    graphInversion()
    graphBarPA()
    graphCompL1()
    graphCompL2()
    graphCompL3()
    graphCompL4()
    graphCompL5()
    papptoejecxdep()
    columnGeo()
    strategicprojects()
    _PDM()
    _Components()
}

async function _PDM(){

  try {
    fetch('https://sse-pdm-back.herokuapp.com/pi/api/total')
    .then(res=>res.json())
    .then(datos=>{
      document.getElementById('porcentaje-pdm').innerHTML=Math.ceil(datos.data[0].total_plan)+"%";
      })
  } catch (error) {
    console.log('Error _avancePDM ',error )
  }

}

async function _Components(){
  try {
    let avance_Comp1=[]; let avance_Comp3=[];
    let avance_Comp2=[]; let avance_Comp4=[]; let avance_Comp5=[];
    let tabla='', tabla2='',  tabla3='',   tabla4='',  tabla5='';
    fetch('https://sse-pdm-back.herokuapp.com/pi/api/total-componentes')
    .then(res=>res.json())
    .then(datos=>{
      console.log(datos)
      document.getElementById('tbl_comp1').innerHTML="";
      let tam = datos.data.length;
      for(let i =0; i<tam;i++){
        if ((datos.data[i].cod_linea) =="1"){
          avance_Comp1.push({
            "label" : datos.data[i].nom_componente,
            "value": Math.ceil((datos.data[i].peso_avance/datos.data[i].peso)*100)
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
          avance_Comp2.push({
            "label" : datos.data[i].nom_componente,
            "value": Math.ceil((datos.data[i].peso_avance/datos.data[i].peso)*100)
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
          avance_Comp3.push({
            "label" : datos.data[i].nom_componente,
            "value": Math.ceil((datos.data[i].peso_avance/datos.data[i].peso)*100)
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
          avance_Comp4.push({
            "label" : datos.data[i].nom_componente,
            "value": Math.ceil((datos.data[i].peso_avance/datos.data[i].peso)*100)
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
          avance_Comp5.push({
            "label" : datos.data[i].nom_componente,
            "value": Math.ceil((datos.data[i].peso_avance/datos.data[i].peso)*100)
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
      console.log(avance_Comp1);

      })
  } catch (error) {
    console.log('Error : _Componentes ', error)
  }
}


async function graphInversion(){
    const dataSource = {
        chart: {
          caption: "% Avance",
          subcaption: "Avance Acumulado",
          theme: "fusion",
          ticksonright: "1",
          plottooltext: "Total: <b>$datavalue</b>",
          targettooltext: "Target: $targetValue",
          numbersuffix: "%",
        },
        colorrange: {
          color: [
            {
              minvalue: "0",
              maxvalue: "25",
              code: "#F2726F"
            },
            {
              minvalue: "25",
              maxvalue: "55",
              code: "#FFC533"
            },
            {
              minvalue: "55",
              maxvalue: "100",
              code: "#62B58F"
            }
          ]
        },
        value: "0",
    
      };
      
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "vbullet",
          renderAt: "chart-inversion",
          height:"100%",
          width: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });
      


};

async function graphBarPA(){

// tomar los valores de la geo
    const dataSource = {
        chart: {
          caption: "Ejecución Financiera",
          subcaption: "Avance Vigencia Actual",
          yaxisname: "millones de Pesos",
          aligncaptionwithcanvas: "0",
          plottooltext: "<b>$dataValue</b>",
          theme: "fusion",
          showvalues:"1",
          rotatevalues:"1",
        

        },
        data: [
          {
            label: "Ppto. Inicial",
            value: 0,
            color: "#EE7518"  //Custom Color
          },
          {
            label: "PPto. Ajustado",
            value: 0,
            color: "#009AB2"
          },
          {
            label: "Ordenado",
            value: 0,
            color : "#00853E"
          }
        ]
      };
      
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "column2D",
          renderAt: "chart-pa",
       
          dataFormat: "json",
          dataSource
        }).render();
      });
      
     
};

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
          "value": Math.ceil(datos.data[i].avance_linea)
        })
      }
      const dataSource = {
        chart: {
          caption: "% Avance ",
          yaxisname: "Medellín Futuro",
          showvalues: "1",
          //numberprefix: "%",
          numbersuffix:"%",
          theme: "fusion",
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

};

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
    detalleppto() 
};

async function detalleppto(){
  const dataSource = {
    "chart": {
      "caption": "Detalle Presupuesto",
      "subcaption": "Avance Vigencia Actual",
      "showpercentvalues": "1",
      "defaultcenterlabel": "2020",
      "decimals": "1",
      "plottooltext": "<b>$percentValue</b> of our Android users are on <b>$label</b>",
      "centerlabel": "$label: $value",
      "doughnutradius": "55",
      "theme": "fusion",
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
      height: "380",
      dataFormat: "json",
      dataSource
     }).render();
    }
  )
};

async function papptoejecxdep(){
  const dataSource = {
    chart: {
      caption: "Ejecución Financiera por Dependencias",
      subcaption: "2020",
      xaxisname: "Dependencias",
      yaxisname: "cifas en pesos",
      drawcrossline: "1",
      plottooltext: "<b>$seriesName</b> expense in $label was <b>$$dataValue</b>",
      theme: "zune",
      showvalues: "0"
    },
    categories: [
      {
        category: [
          {
            label: "Privada"
          },
          {
            label: "Comunicaciones"
          },
          {
            label: "Eval y Control"
          },
          {
            label: "Hacienda"
          },
          {
            label: "Sec. Seguridad"
          },
          {
            label: "G. Hum. y Serv.a la Ciud."
          },
          {
            label: "Suministros y Servicios"
          },
          {
            label: "Educación"
          },
          {
            label: "Part Ciudadana"
          },
          {
            label: "Cultura Ciudadana"
          },
          {
            label: "Salud"
          },
          {
            label: "Mujeres"
          }
        ]
      }
    ],
    dataset: [
      {
        seriesname: "Ajustado",
        data: [
          {
            value: 0
          },
          {
            value: 0
          },
          {
            value: 0
          },
          {
            value: 0
          },
          {
            value: 0
          },
          {
            value: 0
          },
          {
            value: 0
          },
          {
            value: 0
          },
          {
            value: 0
          },
          {
            value: 0
          },
          {
            value: 0
          },
          {
            value: 0
          }
        ]
      },
      {
        seriesname: "Ejecutado",
        data: [
          {
            value: 0
          },
          {
            value: 0
          },
          {
            value: 0
          },
          {
            value: 0
          },
          {
            value: 0
          },
          {
            value: 0
          },
          {
            value: 0
          },
          {
            value: 0
          },
          {
            value: 0
          },
          {
            value: 0
          },
          {
            value: 0
          },
          {
            value: 0
          }
        ]
      }
    ]
  };
  
  FusionCharts.ready(function() {
    var myChart = new FusionCharts({
      type: "overlappedbar2d",
      renderAt: "chart-paxdep",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource
    }).render();
  });
  
  paxmetafisica()
};
  
async function paxmetafisica(){
  const dataSource = {
    "chart": {
      "caption": "% Avance",
      "subcaption": "Plan de Acción 2020-2023",
      "yaxisname": "% ejecución",
      "numvisibleplot": "10",
      "labeldisplay": "Dependencias",
      "numberSuffix": "%",
      "showpercentvalues": "1",
      "showvalues":"1",
      "theme": "zune"
    },
    "categories": [
      {
        "category": [
          {
            "label": "Privada"
          },
          {
            "label": "Comunicaciones"
          },
          {
            "label": "Eval y Control"
          },
          {
            "label": "Hacienda"
          },
          {
            "label": "Sec. Seguridad"
          },
          {
            "label": "General"
          },
          {
            "label": "G. Hum. y Serv.a la Ciud."
          },
          {
            "label": "Suministros y Servicios"
          },
          {
            "label": "Educación"
          },
          {
            "label": "Part Ciudadana"
          },
          {
            "label": "Cultura Ciudadana"
          },
          {
            "label": "Salud"
          },
          {
            "label": "Inclusión Social, flia y DDHH"
          },
          {
            "label": "Comunicaciones"
          },
          {
            "label": "Suministros y Servicios"
          },
          {
            "label": "G. Hum. y Serv.a la Ciud."
          },
          {
            "label": "Suministros y Servicios"
          },
          {
            "label": "Educación"
          }
        ]
      }
    ],
    "dataset": [
      {
        "seriesname": "% Financiero",
        "data": [
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          }
        ]
      },
      {
        "seriesname": "% Físico",
        "data": [
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          },
          {
            "value": 0
          }
        ]
      }
    ]
  };
  
  FusionCharts.ready(function() {
    const myChart = new FusionCharts({
      type: "scrollcolumn2d",
      renderAt: "chart-paxmetafisica",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource
    }).render();
  }
 )

};


async function strategicprojects(){
  const dataSource = {
    chart: {
      caption: "Programas y proyectos estratégicos Medellín Futuro",
      yaxisname: "PDM 2020-2023",
      aligncaptionwithcanvas: "1",
      plottooltext: "<b>$dataValue</b> Avance",
      numbersuffix: "%",
      theme: "zune"
    },
    data: [
      {
        label: "Metro de la 80",
        value: "41"
      },
      {
        label: "Plan estratégico de tecnologías para la seguridad",
        value: "39"
      },
      {
        label: "Un billón para la reactivación económica y el valle del software",
        value: "38"
      },
      {
        label: "Refugio de vida silvestre",
        value: "32"
      },
      {
        label: " Red neutra y red mesh",
        value: "26"
      },
      {
        label: "Parques del norte",
        value: "25"
      },
      {
        label: "Transformación educativa",
        value: "25"
      },
      {
        label: "Fortalecimiento de la infraestructura de salud",
        value: "24"
      },
      {
        label: "Estrategia Medellín me cuida: social y salud",
        value: "23"
      },
      {
        label: "Seguridad alimentaria y hambre cero",
        value: "22"
      },
      {
        label: "Sistema municipal de cuidados",
        value: "76"
      },
      {
        label: "Bienes de capital físico para mujeres",
        value: "16"
      },
      {
        label: "Estudios de una nueva Línea del Metro con tramos subterráneos",
        value: "15"
      },
      {
        label: "Parque biblioteca pública Zona Nororiental",
        value: "13"
      },
      {
        label: "Complejo cultural de Ciudad del Río",
        value: "12"
      },
      {
        label: "Medellín caminable y pedaleable",
        value: "11"
      },
      {
        label: "Ciencia futuro",
        value: "10"
      }
    ]
  };
  
  FusionCharts.ready(function() {
    var myChart = new FusionCharts({
      type: "bar2d",
      renderAt: "chart-projectstrategic",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource
    }).render();
  });
  
}





async function columnGeo(){
  const dataSource = {
    chart: {
      caption: "Inversión Pública por Comunas y Corregimientos",
      subcaption: "corte",
      xaxisname: "Territorio",
      yaxisname: "cifras en millones de pesos",
      //numbersuffix: "$",
      numberprefix: "$",
      theme: "zune",
      labeldisplay: "ROTATE",
    },
    data: [
      {
        label: "Popular",
        value: "290"
      },
      {
        label: "Santa Cruz",
        value: "260"  
      },
      {
        label: "Manrique",
        value: "180"
      },
      {
        label: "Aranjuez",
        value: "140"
      },
      {
        label: "Castilla",
        value: "115"
      },
      {
        label: "Doce de Octubre",
        value: "100"
      },
      {
        label: "Robledo",
        value: "30"
      },
      {
        label: "Villa Hermosa",
        value: "30"
      },
      {
        label: "Buenos Aires",
        value: "180"
      },
      {
        label: "La Candelaria",
        value: "180"
      },
      {
        label: "Laureles Estadio",
        value: "180"
      },
      
      {
        label: "La América",
        value: "180"
      },
      {
        label: "San Javier",
        value: "180"
      },
      {
        label: "El Poblado",
        value: "180"
      },
      {
        label: "Guayabal",
        value: "180"
      },
      {
        label: "Belén",
        value: "180"
      },
      {
        label: "Palmitas",
        value: "180"
      },
      {
        label: "San Cristóbal",
        value: "180"
      },
      {
        label: "Altavista",
        value: "180"
      },
      {
        label: "San Antonio",
        value: "180"
      },
      {
        label: "Santa Elena",
        value: "180"
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
  
}

const mapaVogencia = async (req, res) => {
  // Initialize the map and assign it to a variable for later use
  var map = L.map('map', {
    // Set latitude and longitude of the map center (required)
    center: [6.2982733, -75.5459204],
    // Set the initial zoom level, values 0-18, where 0 is most zoomed-out (required)
    zoom: 12,
    //maxZoom: 12,
    //minZoom: 12
  });
  // Create a Tile Layer and add it to the map
  var tiles = new L.tileLayer('http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://maps.stamen.com/#terrain/12/6.2518/-75.5636">maps.stamen.com</a> contributors'
  }).addTo(map);

  /*
    map.on('click', e => {
      //marker1.bindPopup(hola(1)).openPopup();
      // marker2.bindPopup(hola(2)).openPopup();
      })
  */
  const geojson_url = "/GeoJson/Limite_Comuna_Corregimiento.geojson";
  fetch(geojson_url)
    .then(res => res.json())
    .then(data => {
      let geojsonlayer = L.geoJson(data, {
        style: style,
        onEachFeature: function (feature, layer) {
          let popupContent2 = `                       
             <div class="card" style="width: 18rem;">
                 <!-aquí podemos colocar una imagen-->     
               <div class="card-body">
                  <h5 class="card-title">` + feature.properties.NOMBRE + `</h5>
                  <h6 class="card-subtitle mb-2 text-muted">` + feature.properties.IDENTIFICACION + `</h6>
                  <p class="card-text">
                  <p  class="text-muted"  ;">Ejecución Presupuestal 2019</p>
                  <table class="table table-hover table-inverse table-responsive">
                    <tbody>
                      <tr>
                        <td>Inversión Localizada</td>
                      <td>` + new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(parseInt(feature.properties.inver_localizada_2019)) + `</td>
                </tr>
                <tr>
                <td>Inversión Ciudad</td>
                <td>` + new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(parseInt(feature.properties.inver_ciudad_2019)) + `</td>
              </tr>
              <tr>
              <td>Inversión Presupuesto Participativo</td>
              <td>` + new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(parseInt(feature.properties.inver_pp_2019)) + `</td>
            </tr>
                <tr>
                    <td>Total Inversión</td>
                    <td>` + new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(parseInt(feature.properties.Vigencia2019)) + ` </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>`
          layer.bindPopup(popupContent2)
        }

      }).addTo(map)


      map.fitBounds(geojsonlayer.getBounds())
      var info = L.control();
      info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
      };

      info.update = function () {
        this._div.innerHTML = '<p><b>2019</b></p>';
      };

      info.addTo(map);
      var legend = L.control({
        position: 'bottomright'
        
      });

      legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 100000000000, 150000000000, 200000000000, 250000000000, 250000000000, 300000000000, 400000000000],
          labels = [];
        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
        return div;
      };
      legend.addTo(map);

      L.Control.Watermark = L.Control.extend({
          onAdd: function (map) {
          var img = L.DomUtil.create('img');
          img.src = '/img/logo.png';
          img.style.width = '100px';
          return img;
        },
        onRemove: function (map) {// Nothing to do here
        }
      });
      L.control.watermark = function (opts) {
        return new L.Control.Watermark(opts);
      }
      L.control.watermark({position: 'bottomleft'}).addTo(map);
    })
    
   
}

function getColor(d) {
  return d > 400000000000  ? '#005a32' :
         d > 350000000000  ? '#238b45' :
         d > 300000000000  ? '#41ab5d' :
         d > 250000000000  ? '#74c476' :
         d > 200000000000  ? '#a1d99b' :
         d > 150000000000   ? '#c7e9c0' :
         d > 100000000000   ? '#e5f5e0' :
                             '#f7fcf5' ;
}

function style(feature) {
  return {
      fillColor: getColor(feature.properties.Vigencia2019),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

function highlightFeature(e) {
  var layer = e.target;
  layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
  }
}

function resetHighlight(e) {
  var geojson;
  geojson.resetStyle(e.target);
}