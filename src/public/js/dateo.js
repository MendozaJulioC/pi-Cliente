
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
        value: "24",
    
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
          renderAt: "chart-pa",
       
          dataFormat: "json",
          dataSource
        }).render();
      });
      
     
};

async function graphInicial(){
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
          plottooltext: "<div id='divTable'><table id='dataTable' width='300px'><tr class=''><th>Línea</th><td>$label</td></tr><tr><th>$yAxisName</th><td>$value%</td></tr><tr><th>% Proyectado</th><td>$value%</td></tr></table></div>",
        

        },
        data: [
            {
              label: "Reactivación Económica y Valle del Software",
              value: 20
            },
            {
              label: "Transformación Educativa y Cultural",
              value: 10
            },
            {
              label: "Medellín me Cuida",
              value: 30
            },
            {
              label: "Ecociudad",
              value: 10
            },
            {
              label: "Gobernanza y Gobernabilidad",
              value: 60
            }
          ]
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
      
};

async function graphCompL1(){
    const dataSource = {
        chart: {
          caption: "Componentes Línea 1. Reactivación Económica y Valle del Software",
          subcaption: "Avance Físico",
          xaxisname: "PDM 2020-2023",
          yaxisname: "% avance actual",
          showvalues: "1",
          numbersuffix: "%",
          theme: "gammel"
        },
        data: [
          {
            label: "Talento Humano y Empleo",
            value: 10
          },
          {
            label: "Ciencia, Tecnología, Innovación y Emprendimiento: CTI + E",
            value: 20
          },
          {
            label: "Productividad, competitividad e internacionalización",
            value: 50
          },
          {
            label: "Información, datos y generación de valor público",
            value: 90
          },
          {
            label: "Inglés para Valle del Software",
            value: 20
          }
        ]
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

async function graphCompL2(){
    const dataSource = {
        chart: {
          caption: "Componentes Línea 2.Transformación Educativa y Cultural",
          subcaption: "Avance Físico",
          xaxisname: "PDM 2020-2023",
          yaxisname: "% avance actual",
          showvalues: "1",
          numbersuffix: "%",
          theme: "gammel"
        },
        data: [
          {
            label: "Buen Comienzo",
            value: 0
          },
          {
            label: "Transformación Curricular para la Cuarta revolución Industrial",
            value: 0
          },
          {
            label: "Educación para todos y todas",
            value: 0
          },
          {
            label: "Maestros/as: Líderes de Futuro",
            value: 0
          },
          {
            label: "Infraestructura y ambientes de aprendizaje",
            value: 0
          }
          ,
          {
            label: "Cultura, arte y memoria",
            value: 0
          }
          ,
          {
            label: "Cultura ciudadana",
            value: 0
          }
        ]
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

async function graphCompL3(){
  const dataSource = {
      chart: {
        caption: "Componentes Línea 3.Medellín me Cuida",
        subcaption: "Avance Físico",
        xaxisname: "PDM 2020-2023",
        yaxisname: "% avance actual",
        showvalues: "1",
        numbersuffix: "%",
        theme: "gammel"
      },
      data: [
        {
          label: "Comunidades, cuerpos y mentes saludables",
          value: 0
        },
        {
          label: "Juventudes",
          value: 0
        },  
        {
          label: "Mujeres",
          value: 0
        },
        {
          label: "Maestros/as: Líderes de Futuro",
          value: 0
        }
      ]
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

async function graphCompL4(){
  const dataSource = {
      chart: {
        caption: "Componentes Línea 4. Ecociudad",
        subcaption: "Avance Físico",
        xaxisname: "PDM 2020-2023",
        yaxisname: "% avance actual",
        showvalues: "1",
        numbersuffix: "%",
        theme: "gammel"
      },
      data: [
        {
          label: "Movilidad sostenible e inteligente",
          value: 0
        },
        {
          label: "Servicios públicos, energías alternativas y aprovechamiento de residuos sólidos",
          value: 0
        },  
        {
          label: "MujerConservación y protección de todas las formas de vidaes",
          value: 0
        },
        {
          label: "Urbanismo ecológico",
          value: 0
        }
        ,
        {
          label: "Corregimientos y Desarrollo rural sostenible",
          value: 0
        }
      ]
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

async function graphCompL5(){
  const dataSource = {
      chart: {
        caption: "Componentes Línea 5. Gobernanza y Gobernabilidadd",
        subcaption: "Avance Físico",
        xaxisname: "PDM 2020-2023",
        yaxisname: "% avance actual",
        showvalues: "1",
        numbersuffix: "%",
        theme: "gammel"
      },
      data: [
        {
          label: "Gobierno Transparente",
          value: 0
        },
        {
          label: "Paz, víctimas y justicia",
          value: 0
        },  
        {
          label: "Seguridades",
          value: 0
        },
        {
          label: "Participación",
          value: 0
        }
        ,
        {
          label: "Planeación, articulación y fortalecimiento territorial",
          value: 0
        }
        ,
        {
          label: "Comunicaciones",
          value: 0
        }
      ]
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