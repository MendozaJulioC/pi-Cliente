function buscar_vigencia(){
    var vigencia_query = document.getElementById('inputGroupSelect04').value
    
    try {
        let inverTotal= document.getElementById('totalVIgencia');
        let vigencia = document.getElementById('vigencia');
        let localizada = document.getElementById('inverLocalizada');
        let ciudad = document.getElementById('inverCiudad');
        let pp = document.getElementById('pp');
        let fortInst= document.getElementById('fortInst')
       fetch('http://localhost:4000/api/vigencias/'+vigencia_query)
       .then(res=>res.json())
       .then(datos=>{
           inverTotal.innerHTML= formatter.format(Math.round(datos.data[0].inversion_total))
           vigencia.innerHTML= datos.data[0].ano
           localizada.innerHTML=formatter.format(Math.round(datos.data[0].total_localizada))
           ciudad.innerHTML= formatter.format(Math.round(datos.data[0].total_ciudad))
           pp.innerHTML= formatter.format(Math.round(datos.data[0].inversion_pp))
       })
       .catch(error=>{ console.log(error)})
     } catch (error) {}
     try {
        fetch('http://localhost:4000/api/vigencias/fortalecimiento/'+vigencia_query)
        .then(res=> res.json())
        .then(datos=>{
          fortInst.innerHTML= formatter.format(Math.round(datos.data[0].inver_total))
        })
    } catch (error) {   }

    try {
        var data=[];let tabla='';
        fetch('http://localhost:4000/api/vigencias/total-comuna/'+vigencia_query)
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


    var container = L.DomUtil.get('map');
    if(container != null){
      container._leaflet_id = null;
    }
      
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
      let geojsonlayer = L.geoJson(data, {style: style2,
        onEachFeature: function (feature, layer) {
          switch (parseInt(vigencia_query)) {
            case 2019:
              var localizada = feature.properties.inver_localizada_2019;
              var ciudad = feature.properties.inver_ciudad_2019;
              var pp = feature.properties.inver_pp_2019;
              var total = feature.properties.Vigencia2019;
              break;
            case 2018:
              var localizada = feature.properties.inver_localizada_2018;
              var ciudad = feature.properties.inver_ciudad_2018;
              var pp = feature.properties.inver_pp_2018;
              var total = feature.properties.Vigencia2018;
             
              break;
            case 2017:
              var localizada = feature.properties.inver_localizada_2017;
              var ciudad = feature.properties.inver_ciudad_2017;
              var pp = feature.properties.inver_pp_2017;
              var total = feature.properties.Vigencia2017;
              break;
            case 2016:
              var localizada = feature.properties.inver_localizada_2016;
              var ciudad = feature.properties.inver_ciudad_2016;
              var pp = feature.properties.inver_pp_2016;
              var total = feature.properties.Vigencia2016;
              break;
            case 2015:
              var localizada = feature.properties.inver_localizada_2015;
              var ciudad = feature.properties.inver_ciudad_2015;
              var pp = feature.properties.inver_pp_2015;
              var total = feature.properties.Vigencia2015;
              break;
            case 2014:
              var localizada = feature.properties.inver_localizada_2014;
              var ciudad = feature.properties.inver_ciudad_2014;
              var pp = feature.properties.inver_pp_2014;
              var total = feature.properties.Vigencia2014;
              break;
            case 2013:
              var localizada = feature.properties.inver_localizada_2013;
              var ciudad = feature.properties.inver_ciudad_2013;
              var pp = feature.properties.inver_pp_2013;
              var total = feature.properties.Vigencia2013;
              break;
            case 2012:
              var localizada = feature.properties.inver_localizada_2012;
              var ciudad = feature.properties.inver_ciudad_2012;
              var pp = feature.properties.inver_pp_2012;
              var total = feature.properties.Vigencia2012;
              break;
            case 2011:
              var localizada = feature.properties.inver_localizada_2011;
              var ciudad = feature.properties.inver_ciudad_2011;
              var pp = feature.properties.inver_pp_2011;
              var total = feature.properties.Vigencia2011;
              break;
            case 2010:
              var localizada = feature.properties.inver_localizada_2010;
              var ciudad = feature.properties.inver_ciudad_2010;
              var pp = feature.properties.inver_pp_2010;
              var total = feature.properties.Vigencia2010;
              break;
            case 2009:
              var localizada = feature.properties.inver_localizada_2009;
              var ciudad = feature.properties.inver_ciudad_2009;
              var pp = feature.properties.inver_pp_2009;
              var total = feature.properties.Vigencia2009;
              break;
            case 2008:
              var localizada = feature.properties.inver_localizada_2008;
              var ciudad = feature.properties.inver_ciudad_2008;
              var pp = feature.properties.inver_pp_2008;
              var total = feature.properties.Vigencia2008;
              break;
          }
          let popupContent2 = `                       
          <div class="card" style="width: 18rem;">
                  <!-aquí podemos colocar una imagen-->     
            <div class="card-body">
              <h5 class="card-title">` + feature.properties.NOMBRE + `</h5>
              <h6 class="card-subtitle mb-2 text-muted">` + feature.properties.IDENTIFICACION+ `</h6>
              <p class="card-text">
              <p  class="text-muted"  ;">Ejecución Presupuestal `+vigencia_query+`</p>
              <table class="table table-hover table-inverse table-responsive">
                <tbody>
                  <tr>
                    <td>Inversión Localizada</td>
                    <td>` + new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD'}).format(parseInt(localizada)) + `</td>
                  </tr>
                  <tr>
                  <td>Inversión Ciudad</td>
                  <td>` + new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD'}).format(parseInt(ciudad)) + `</td>
                </tr>
                <tr>
                <td>Inversión Presupuesto Participativo</td>
                <td>` + new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD'}).format(parseInt(pp)) + `</td>
              </tr>
                  <tr>
                      <td>Total Inversión Cuatrienio</td>
                      <td>`+ new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD'}).format(parseInt(total)) +` </td>
                  </tr>
                </tbody>
              </table>
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
          this._div.innerHTML = '<p><b>'+vigencia_query+'</b></p>';
      };
      info.addTo(map);
      var legend = L.control({position: 'bottomright'});
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

    var datadep=[];
  fetch('http://localhost:4000/api/vigencias/dependencias/'+vigencia_query)
  .then(res=> res.json())
      .then(datos=>{

        let tam = datos.data.length;
     
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
          "titles": [{
            "text": "Inversión Dependencias "+datos.data[0].ano,
            "size": 12
        }],
          "dataProvider": datadep,
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
    
}

function getColor2(d) {
  return d > 400000000000  ? '#005a32' :
         d > 350000000000  ? '#238b45' :
         d > 300000000000  ? '#41ab5d' :
         d > 250000000000  ? '#74c476' :
         d > 200000000000  ? '#a1d99b' :
         d > 150000000000   ? '#c7e9c0' :
         d > 100000000000   ? '#e5f5e0' :
                             '#f7fcf5' ;
}

function style2(feature) {
  var vigencia_query = document.getElementById('inputGroupSelect04').value
  
  var total=0;
  switch (parseInt(vigencia_query)) {
    case 2019:
    total = feature.properties.Vigencia2019;
      break;
    case 2018:
    
     total = feature.properties.Vigencia2018;
      break;
    case 2017:
      
    total = feature.properties.Vigencia2017;
      break;
    case 2016:
     
     total = feature.properties.Vigencia2016;
      break;
    case 2015:
    
      total = feature.properties.Vigencia2015;
      break;
    case 2014:
    
       total = feature.properties.Vigencia2014;
      break;
    case 2013:
    
     total = feature.properties.Vigencia2013;
      break;
    case 2012:
    
      total = feature.properties.Vigencia2012;
      break;
    case 2011:
      
       total = feature.properties.Vigencia2011;
      break;
    case 2010:
      
     total = feature.properties.Vigencia2010;
      break;
    case 2009:
   
       total = feature.properties.Vigencia2009;
      break;
    case 2008:
     
    total = feature.properties.Vigencia2008;
      break;
  }

  return {
      fillColor: getColor2(total),
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