
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
        value: "55",
    
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
            value: "4469452000000",
            color: "#EE7518"  //Custom Color
          },
          {
            label: "PPto. Ajustado",
            value: "5579022000000",
            color: "#009AB2"
          },
          {
            label: "Ordenado",
            value: "4915670000000",
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
          yaxisname: "% ejecución alcanzada",
          exportEnabled: "1",
          exportFileName:"AvancexLinea"
        

        },
        data: [
            {
              label: "Reactivación Económica y Valle del Software",
              value: 10
            },
            {
              label: "Transformación Educativa y Cultural",
              value: 20
            },
            {
              label: "Medellín me Cuida",
              value: 18
            },
            {
              label: "Ecociudad",
              value: 15
            },
            {
              label: "Gobernanza y Gobernabilidad",
              value: 11
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
            value: 29
          },
          {
            label: "Ciencia, Tecnología, Innovación y Emprendimiento: CTI + E",
            value: 26
          },
          {
            label: "Productividad, competitividad e internacionalización",
            value: 18
          },
          {
            label: "Información, datos y generación de valor público",
            value: 14
          },
          {
            label: "Inglés para Valle del Software",
            value: 15
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
            value: 29
          },
          {
            label: "Transformación Curricular para la Cuarta revolución Industrial",
            value: 26
          },
          {
            label: "Educación para todos y todas",
            value: 18
          },
          {
            label: "Maestros/as: Líderes de Futuro",
            value: 14
          },
          {
            label: "Infraestructura y ambientes de aprendizaje",
            value: 12
          }
          ,
          {
            label: "Cultura, arte y memoria",
            value: 11
          }
          ,
          {
            label: "Cultura ciudadana",
            value: 18
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
          value: 29
        },
        {
          label: "Juventudes",
          value: 26
        },  
        {
          label: "Mujeres",
          value: 18
        },
        {
          label: "Maestros/as: Líderes de Futuro",
          value: 14
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
          value: 29
        },
        {
          label: "Servicios públicos, energías alternativas y aprovechamiento de residuos sólidos",
          value: 26
        },  
        {
          label: "MujerConservación y protección de todas las formas de vidaes",
          value: 18
        },
        {
          label: "Urbanismo ecológico",
          value: 14
        }
        ,
        {
          label: "Corregimientos y Desarrollo rural sostenible",
          value: 34
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
          value: 29
        },
        {
          label: "Paz, víctimas y justicia",
          value: 26
        },  
        {
          label: "Seguridades",
          value: 18
        },
        {
          label: "Participación",
          value: 14
        }
        ,
        {
          label: "Planeación, articulación y fortalecimiento territorial",
          value: 14
        }
        ,
        {
          label: "Comunicaciones",
          value: 34
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
        "value": 4915670,
        "color": "#00853E"
      },
      {
        "label": "Compromisos",
        "value": 190174,
        "color":"#EE7518"
      },
      {
        "label": "Disponible",
        "value": 472789,
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
      caption: "Presupuesto",
      subcaption: "Comportamiento por Dependencias",
      xaxisname: "Dependencias",
      yaxisname: "Presupuesto",
      drawcrossline: "1",
      plottooltext: "<b>$seriesName</b> Total in $label de <b>$$dataValue</b>",
      theme: "zune",
      showvalues: "1",
     
      numberprefix: "$",
    placevaluesinside: "0",

    },
    categories: [
      {
        category: [
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
            "label": "Germany"
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
          }
        ]
      }
    ],
    dataset: [
      {
        seriesname: "Ppto. Ajustado",
        data: [
          {
            value: "17000"
          },
          {
            value: "16000"
          },
          {
            value: "15000"
          },
          {
            value: "14500"
          },
          {
            value: "14000"
          },
          {
            value: "13500"
          },
          {
            value: "13000"
          },
          {
            value: "12500"
          },
          {
            value: "12500"
          },
          {
            value: "12000"
          },
          {
            value: "11500"
          },
          {
            value: "13500"
          }
        ]
      },
      {
        seriesname: "Ppto. Ejecutado",
        showvalues:"1",
        data: [
          {
            value: "17000"
          },
          {
            value: "16300"
          },
          {
            value: "14900"
          },
          {
            value: "14300"
          },
          {
            value: "13400"
          },
          {
            value: "13100"
          },
          {
            value: "13700"
          },
          {
            value: "12100"
          },
          {
            value: "12000"
          },
          {
            value: "11100"
          },
          {
            value: "10900"
          },
          {
            value: "13500"
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
      showvalues: "1",
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
            "value": "90"
          },
          {
            "value": "70"
          },
          {
            "value": "67"
          },
          {
            "value": "55"
          },
          {
            "value": "42"
          },
          {
            "value": "42"
          },
          {
            "value": "41"
          },
          {
            "value": "29"
          },
          {
            "value": "28"
          },
          {
            "value": "22"
          },
          {
            "value": "21"
          },
          {
            "value": "19"
          },
          {
            "value": "19"
          },
          {
            "value": "18"
          },
          {
            "value": "17"
          },
          {
            "value": "15"
          },
          {
            "value": "13"
          },
          {
            "value": "11"
          },
          {
            "value": "11"
          },
          {
            "value": "10"
          }
        ]
      },
      {
        "seriesname": "% Físico",
        "data": [
          {
            "value": "24"
          },
          {
            "value": "70"
          },
          {
            "value": "67"
          },
          {
            "value": "55"
          },
          {
            "value": "42"
          },
          {
            "value": "42"
          },
          {
            "value": "41"
          },
          {
            "value": "29"
          },
          {
            "value": "28"
          },
          {
            "value": "22"
          },
          {
            "value": "21"
          },
          {
            "value": "19"
          },
          {
            "value": "19"
          },
          {
            "value": "18"
          },
          {
            "value": "17"
          },
          {
            "value": "15"
          },
          {
            "value": "13"
          },
          {
            "value": "11"
          },
          {
            "value": "11"
          },
          {
            "value": "10"
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