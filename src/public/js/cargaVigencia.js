

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })


const vigencia= async(req,res)=>{
  try {
     let inverTotal= document.getElementById('totalVIgencia');
     let vigencia = document.getElementById('vigencia');
     let localizada = document.getElementById('inverLocalizada');
     let ciudad = document.getElementById('inverCiudad');
     let pp = document.getElementById('pp');
     let fortInst= document.getElementById('fortInst');
    fetch('http://localhost:4000/api/vigencias/2019')
    .then(res=>res.json())
    .then(datos=>{
        inverTotal.innerHTML= formatter.format(Math.round(datos.data[0].inversion_total))
        vigencia.innerHTML= datos.data[0].ano
        localizada.innerHTML=formatter.format(Math.round(datos.data[0].total_localizada))
        ciudad.innerHTML= formatter.format(Math.round(datos.data[0].total_ciudad))
        pp.innerHTML= formatter.format(Math.round(datos.data[0].inversion_pp))

        am4core.useTheme(am4themes_animated);
        // Themes end
        var chart = am4core.create("chartMainVigencia", am4charts.PieChart);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
        chart.data = [
          {
            tipoInver: "Localizada",
            value: Math.round(datos.data[0].total_localizada)
          },
          {
            tipoInver: "Ciudad",
            value: Math.round(datos.data[0].total_ciudad)
          },
          {
            tipoInver: "PP",
            value: Math.round(datos.data[0].inversion_pp)
          }
        ];
        var title = chart.titles.create();
        title.text = "[bold font-size: 20]Porcentaje por el tipo de Inversión Territorial 2019 [/]\nsource: USPDM";
        title.textAlign = "middle";
        chart.radius = am4core.percent(70);
        chart.innerRadius = am4core.percent(40);
        chart.startAngle = 180;
        chart.endAngle = 360;  
        var series = chart.series.push(new am4charts.PieSeries());
        series.dataFields.value = "value";
        series.dataFields.category = "tipoInver";
        series.slices.template.cornerRadius = 10;
        series.slices.template.innerCornerRadius = 7;
        series.slices.template.draggable = true;
        series.slices.template.inert = true;
        series.alignLabels = false;
        
        series.hiddenState.properties.startAngle = 90;
        series.hiddenState.properties.endAngle = 90;
        
        chart.legend = new am4charts.Legend();
        

    })
    
  }catch (error) {console.log(error)}
  fortalecimientoValor()

}


const fortalecimientoValor = async(req, res)=>{

 try {
      fetch('http://localhost:4000/api/vigencias/fortalecimiento/2019')
      .then(res=> res.json())
      .then(datos=>{
        fortInst.innerHTML= formatter.format(Math.round(datos.data[0].inver_total))
      })
  } catch (error) {console.log(error)}

  garficaTotalCmuna()
}

const garficaTotalCmuna = async(req, res)=>{
 try {
    var data=[];  let tabla='';
    fetch('http://localhost:4000/api/vigencias/total-comuna/2019')
    .then(res=>res.json())
    .then(datos=>{
      let tam = datos.data.length;
      document.getElementById('vig_tabla').innerHTML=(parseInt(datos.data[0].ano))
      for(var i =0; i<(tam) ;i++   ){
        if(datos.data[i].comuna<=90){
          tabla +='<tr>';
            tabla +='<td style="text-align: center;">'+(parseInt(datos.data[i].comuna))+'</td>';
            tabla +='<td>'+formatter.format(parseInt((datos.data[i].inver_localizada)))+'</td>';
            tabla +='<td>'+formatter.format(parseInt((datos.data[i].inver_ciudad)))+'</td>';
            tabla +='<td>'+formatter.format(parseInt((datos.data[i].inver_pp)))+'</td>';
            tabla +='<td>'+formatter.format(parseInt((datos.data[i].inver_total)))+'</td>'
          tabla +='<tr>';
          document.getElementById('resultado').innerHTML=tabla;
          data.push({
            "comuna": datos.data[i].nom_comuna,
            "total":(parseInt(datos.data[i].inver_total))
          });
        }
      }
      var chart = AmCharts.makeChart( "chartdiv_comunas_vigencia", {
        "type": "serial",
        "theme": "dark",
        "titles": [{
          "text": "Total de Inversión por Comunas y Corregimientos "+datos.data[0].ano,
          "size": 15
      }],
        "dataProvider":data,
        "valueAxes": [ {
          "gridColor": "#FFFFFF",
          "gridAlpha": 0.2,
          "dashLength": 0
        } ],
        "gridAboveGraphs": true,
        "startDuration": 1,
        "graphs": [ {
          "balloonText": "[[category]]: <b>[[value]]</b>",
          "fillAlphas": 0.8,
          "lineAlpha": 0.2,
          "type": "column",
          "fillColors": "#B4358B",
          "valueField": "total"
        } ],
        "chartCursor": {
          "categoryBalloonEnabled": false,
          "cursorAlpha": 0,
          "zoomable": false
        },
        "categoryField": "comuna",
        "categoryAxis": {
          "gridPosition": "start",
          "gridAlpha": 0,
          "tickPosition": "start",
          "tickLength": 20,
          "labelRotation": 45
        },
        "export": {
          "enabled": true
        }
      } );    
    })
  } catch (error) {}

mapaVogencia();
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

    tablaVigencia();
}
 



const tablaVigencia = async(req, res)=>{
  try {
      var datadep=[];
      fetch('http://localhost:4000/api/vigencias/dependencias/2019')
      .then(res=> res.json())
          .then(datos=>{

            let tam = datos.data.length;
            document.getElementById('headderTableDepVigencia').innerHTML=`<b>Inversión por Dependencias en la Vigencia `+ datos.data[0].ano +`</b>`
        
            for(var i =0; i<(tam) ;i++   ){
                datadep.push({
                  "dependencias": datos.data[i].nombre_dep,
                  "total":(parseInt(datos.data[i].inversion))
                });
              
            }
            var chart = AmCharts.makeChart( "chartdiv", {
              "type": "serial",
              "theme": "light",
              "rotate": true,
         
              "dataProvider": datadep,
              "gridAboveGraphs": true,
              "startDuration": 1,
              "graphs": [ {
                "balloonText": "[[category]]: <b>[[value]]</b>",
                "fillAlphas": 0.9,
                "lineAlpha": 0.2,
                "type": "column",
                "fillColors":"#EE7518",
                "valueField": "total"
              } ],
              "chartCursor": {
                "categoryBalloonEnabled": false,
                "cursorAlpha": 0,
                "zoomable": false
              },
              "categoryField": "dependencias",
              "categoryAxis": {
                "gridPosition": "start",
                "gridAlpha": 0,
                "tickPosition": "start",
                "tickLength": 5
              },
              "export": {
                "enabled": true
              }
            
            } );
            


          })

  } catch (error) {}
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