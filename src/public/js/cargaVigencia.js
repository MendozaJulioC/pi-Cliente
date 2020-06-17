
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
    })
    .catch(error=>{ console.log(error)})
  } catch (error) {console.log(error)}

  try {
      fetch('http://localhost:4000/api/vigencias/fortalecimiento/2019')
      .then(res=> res.json())
      .then(datos=>{
        fortInst.innerHTML= formatter.format(Math.round(datos.data[0].inver_total))
      })
  } catch (error) {console.log(error)}

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
            tabla +='<td>'+formatter.format(parseInt((datos.data[i].inver_localizada)/1000000))+'</td>';
            tabla +='<td>'+formatter.format(parseInt((datos.data[i].inver_ciudad)/1000000))+'</td>';
            tabla +='<td>'+formatter.format(parseInt((datos.data[i].inver_pp)/1000000))+'</td>';
            tabla +='<td>'+formatter.format(parseInt((datos.data[i].inver_total)/1000000))+'</td>'
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


  map.on('click', e => {
    //marker1.bindPopup(hola(1)).openPopup();
    // marker2.bindPopup(hola(2)).openPopup();
    })


  const geojson_url = "/GeoJson/Limite_Comuna_Corregimiento.geojson";
  fetch(geojson_url)
  .then(res => res.json())
  .then(data => {
    let geojsonlayer = L.geoJson(data, {style: style,
      onEachFeature: function (feature, layer) {
        let popupContent2 = `                       
        <div class="card" style="width: 18rem;">
                      
                        <div class="card-body">
                        <h5 class="card-title">` + feature.properties.NOMBRE + `</h5>
                        <h6 class="card-subtitle mb-2 text-muted">` + feature.properties.IDENTIFICACION+ `</h6>
                        <p class="card-text">
                        <p  class="text-muted"  ;">Ejecución Presupuestal 2012-2015</p>
                        <table class="table table-hover table-inverse table-responsive">
                        <tbody>
                                
                                <tr>
                                <td>Inversión Localizada</td>
                                <td>` + new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: 'USD'
                                            }).format(parseInt(feature.properties.inver_localizada2019)) + `</td>
                                </tr>
                             
                                <tr>
                                <td>Total Inversión Cuatrienio</td>
                                <td>`+ new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                }).format(parseInt(feature.properties.Vigencia2019)) +` </td>
                                </tr>
                            </tbody>
                        </table>
                        </p>
                        </div>
                        </div>`
         
         layer.bindPopup(popupContent2)

      }

    } ).addTo(map)
    map.fitBounds(geojsonlayer.getBounds())


      var info = L.control();
      info.onAdd = function (map) {
          this._div = L.DomUtil.create('div', 'info');
          this.update();
          return this._div;
      };
      info.update = function () {
        this._div.innerHTML = '<h5>Total Inversión Pública Comunas y Corregimientos</h5>'+ 2019;
      };
      info.addTo(map);

      var legend = L.control({position: 'bottomright'});
      legend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend'),
      grades = [0, 30000000000, 60000000000, 100000000000, 150000000000, 250000000000, 350000000000, 400000000000],
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
          onAdd: function(map) {
              var img = L.DomUtil.create('img');
              img.src = '/img/logo.png';
              img.style.width = '100px';
              return img;
          },
          onRemove: function(map) {
              // Nothing to do here
          }
      });
      L.control.watermark = function(opts) {
          return new L.Control.Watermark(opts);
      }
      L.control.watermark({ position: 'bottomleft' }).addTo(map);
  })

}

        






function getColor(d) {
  return d > 400000000000  ? '#800026' :
         d > 350000000000  ? '#BD0026' :
         d > 250000000000  ? '#E31A1C' :
         d > 150000000000  ? '#FC4E2A' :
         d > 100000000000  ? '#FD8D3C' :
         d > 60000000000   ? '#FEB24C' :
         d > 30000000000   ? '#FED976' :
                             '#FFEDA0' ;
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








