

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
    fetch('http://localhost:7000/geo/api/tipo-inversion')
    .then(res=>res.json())
    .then(datos=>{

     
        vigencia.innerHTML= 2020
        localizada.innerHTML=formatter.format(Math.round(datos.data[0].localizada))
        ciudad.innerHTML= formatter.format(Math.round(datos.data[0].ciudad))
        pp.innerHTML= formatter.format(Math.round(datos.data[0].pp))
        fortInst.innerHTML= formatter.format(Math.round(datos.data[0].fortinst))
        inverTotal.innerHTML=  formatter.format((Math.round(datos.data[0].localizada))+(Math.round(datos.data[0].ciudad)) + (Math.round(datos.data[0].pp))+(Math.round(datos.data[0].fortinst))) 
     
        
        const dataSource = {
          chart: {
            caption: "Distribución por tipo de Inversión",
           
            showpercentvalues: "0",
            defaultcenterlabel: "Tipo de Inversión",
            aligncaptionwithcanvas: "0",
            captionpadding: "0",
            numberprefix: "$",
            //numbersuffix:"%",
            formatnumberscale: "0",
            decimals: "1",
            plottooltext:
              "<b>$percentValue</b> de la Inversión <b>Total</b>",
              centerlabelFontSize:"1rem",
            centerlabel: "$label: $value",
            theme: "ocean"
          },
          data: [
            {
              label: "Institucional",
              value: (Math.round(datos.data[0].localizada))/1000000
            },
            {
              label: "Ciudad",
              value: (Math.round(datos.data[0].ciudad))/1000000
            },
            {
              label: "PP",
              value: (Math.round(datos.data[0].inversion_pp))/1000000
            }
            ,
            {
              label: "Fort/Inst.",
              value: (Math.round(datos.data[0].fortinst))/1000000
            }
          ]
        };
        
        FusionCharts.ready(function() {
          var myChart = new FusionCharts({
            type: "doughnut2d",
            renderAt: "chartMainVigencia",
            width: "100%",
            height: "100%",
            dataFormat: "json",
            dataSource
          }).render();
        });
    })
   
    garficaTotalCmuna()
    
  }catch (error) {console.log(error)}


}




const garficaTotalCmuna = async(req, res)=>{
  try {
    fetch(`http://localhost:7000/geo/api/territorio`)
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
          theme: "ocean",
          labeldisplay: "ROTATE",
          decimalSeparator: ",",
          thousandSeparator: ".",
          plottooltext: `<div id='divTable'>
                            <table id='dataTable' class="table table-sm table-responsive-sm " style="font-size: small;" width='200px'>
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
            value: Math.ceil(parseInt(datos.data[0].popular)/1000000),
        
            link: "j-showAlert-Apple,$810K"
          },
          {
            label: "Santa Cruz",
            value: Math.ceil(parseInt(datos.data[0].santa_cruz)/1000000)
      
          },
          {
            label: "Manrique",
            value: Math.ceil(parseInt(datos.data[0].manrique)/1000000)
         
          },
          {
            label: "Aranjuez",
            value: Math.ceil(parseInt(datos.data[0].aranjuez)/1000000) 
          },
          {
            label: "Castilla",
            value: Math.ceil(parseInt(datos.data[0].castilla)/1000000) 
          },
          {
            label: "Doce de Octubre",
            value: Math.ceil(parseInt(datos.data[0].doce_de_octubre)/1000000)
          },
          {
            label: "Robledo",
            value: Math.ceil(parseInt(datos.data[0].robledo)/1000000) 
          },
          {
            label: "Villa Hermosa",
            value: Math.ceil(parseInt(datos.data[0].villa_hermosa)/1000000) 
          },
          {
            label: "Buenos Aires",
            value: Math.ceil(parseInt(datos.data[0].buenos_aires)/1000000)
          },
          {
            label: "La Candelaria",
            value: Math.ceil(parseInt(datos.data[0].la_candelaria)/1000000) 
          },
          {
            label: "Laureles Estadio",
            value: Math.ceil(parseInt(datos.data[0].laureles_estadio)/1000000)
          },
          {
            label: "La América",
            value: Math.ceil(parseInt(datos.data[0].la_america)/1000000) 
          },
          {
            label: "San Javier",
             value: Math.ceil(parseInt(datos.data[0].san_javier)/1000000) 
          },
          {
            label: "El Poblado",
            value: Math.ceil(parseInt(datos.data[0].el_poblado)/1000000) 
          },
          {
            label: "Guayabal",
            value: Math.ceil(parseInt(datos.data[0].guayabal)/1000000) 
          },
          {
            label: "Belén",
            value: Math.ceil(parseInt(datos.data[0].belen)/1000000) 
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
          renderAt: "chartdiv_comunas_vigencia",
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

mapaVogencia();
}
 


const mapaVogencia = async (req, res) => {
  var container = L.DomUtil.get('map');
  if(container != null){
      container._leaflet_id = null;
  }
  // Initialize the map and assign it to a variable for later use
  var map = L.map('map', {
    // Set latitude and longitude of the map center (required)
    center: [6.2982733, -75.5459204],
    // Set the initial zoom level, values 0-18, where 0 is most zoomed-out (required)
    //zoom: 12,
    maxZoom: 12,
    minZoom: 12

  });
  map.createPane('labels');
  map.getPane('labels').style.zIndex = 600;
  map.getPane('labels').style.pointerEvents = 'none';



  // Create a Tile Layer and add it to the map
  var tiles = new L.tileLayer('http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://maps.stamen.com/#terrain/11/6.2518/-75.5636">maps.stamen.com</a> contributors'
  }).addTo(map);

 
 
  const geojson_url = "/GeoJson/Limite_Comuna_Corregimiento.geojson";
 
  fetch(geojson_url)
    .then(res => res.json())
    .then(data => {
     
    
      let geojsonlayer = L.geoJson(data, {
        
        style: style,
        
        onEachFeature: function (feature, layer) {
          


          
          let popupContent = `                       
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
                        <td>` + new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(parseInt(feature.properties.inver_localizada_2020)) + `</td>
                      </tr>
                     <tr>
                        <td>Inversión Ciudad</td>
                        <td>` + new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD'}).format(parseInt(feature.properties.inver_ciudad_2020)) + `</td>
                      </tr>
                      <tr>
                        <td>Inversión Presupuesto Participativo</td>
                        <td>` + new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD'}).format(parseInt(feature.properties.inver_pp_2020)) + `</td>
                      </tr>
                      <tr>
                        <td>Total Inversión</td>
                        <td>` + new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(parseInt(feature.properties.Vigencia2020)) + ` </td>
                      </tr>
                      <tr>
                        <td>Consultar</td>
                        <td>
                        <a name="" id="" class="btn btn-sm btn-success btn-block" onclick="pruebaevento( ${feature.properties.CODIGO }, '${feature.properties.NOMBRE }',${feature.properties.Vigencia2020},${feature.properties.inver_localizada_2020},${feature.properties.inver_ciudad_2020}, ${feature.properties.inver_pp_2020})"  data-toggle="modal" data-target="#exampleModalmapa" role="button">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                           <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                          </svg> Ampliar
                        </a>
                        
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>`
              
      let tooltipconten=' <p>  <span> <strong> <em>'+ feature.properties.NOMBRE +' </em> </strong></span>'+ new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(parseInt(feature.properties.Vigencia2020))+'</p>'
   
         layer.bindPopup(popupContent)
         layer.bindTooltip( tooltipconten );

        

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
        this._div.innerHTML = '<p><b>2020</b></p>';
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

const tablaVigencia = async(req, res)=>{
  try {
      var datadep=[];
      fetch('http://localhost:7000/api/vigencias/dependencias/2019')
      .then(res=> res.json())
          .then(datos=>{

            let tam = datos.data.length;
          
        
            for(var i =0; i<(tam) ;i++   ){
                datadep.push({
                  "dependencias": datos.data[i].nom_cortp,
                  "total":(parseInt(datos.data[i].total))
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



function style2(valor) {
  return {
      fillColor: getColor(valor),
      weight: 2,
      opacity: 1,
      color: 'blue',
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

async function pruebaevento(value, nombre, valor, localizada, ciudad, pp){
  console.log(value, nombre, valor);
    document.getElementById('mapaprueba').innerHTML= value
    document.getElementById('nombre_comuna').innerHTML= nombre
    var container = L.DomUtil.get('map2');
    if(container != null){
        container._leaflet_id = null;
    }
    var map2 = L.map('map2', {
      // Set latitude and longitude of the map center (required)
      center: [6.2262, -75.5453],
      // Set the initial zoom level, values 0-18, where 0 is most zoomed-out (required)
      zoom: 12,
      //maxZoom: 12,  
      //minZoom: 12
    });
    var tiles = new L.tileLayer('http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://maps.stamen.com/#terrain/12/6.2580/-75.5542">maps.stamen.com</a> contributors'
      }).addTo(map2);
      console.log('Map ready');
      let geo_url=""; 
      geo_url=`https://www.medellin.gov.co/mapas/rest/services/ServiciosCatastro/OPENDATA_Catastro/MapServer/6/query?where=comuna%3D${value}&f=geojson`
      fetch(geo_url)
      .then(res=>res.json())
      .then(data => {
        document.getElementById('total').innerHTML= new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(parseInt(valor))
         let geojsonlayer2 = L.geoJson(data, {
           style: style2(valor),
           onEachFeature: async function (feature, layer) {
             let popupContent3 = `                       
             <div class="card" style="width: 18rem;">
             <!-aquí podemos colocar una imagen-->     
            <div class="card-body">
               <h5 class="card-title">` + nombre + `</h5>
           
        
               
               <table class="table table-hover table-inverse table-responsive">
                 <tbody>
                   <tr>
                     <td>Inversión Localizada</td>
                     <td>` + new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(parseInt(localizada)) + `</td>
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
                     <td>Total Inversión</td>
                     <td>` + new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(parseInt(valor)) + ` </td>
                   </tr>
                   <tr>
                
                   </tr>
                 </tbody>
               </table>
             </div>
           </div>`
             layer.bindPopup(popupContent3)
          

           }
         }).addTo(map2)
          L.Control.Watermark = L.Control.extend({
          onAdd: function(map2) {
          var img = L.DomUtil.create('img');
          img.src = '/img/logo.png';
          img.style.width = '100px';
          return img;
          },
          onRemove: function(map2) {
              // Nothing to do here
          }
          });
          L.control.watermark = function(opts) {
          return new L.Control.Watermark(opts);
          }
          L.control.watermark({ position: 'bottomleft' }).addTo(map2);

      });

      
      map2.whenReady(() => {
        setTimeout(() => {map2.invalidateSize();}, 800);
 
        jQuery.noConflict();
        $('#Modalmapa').modal('show');    
    })
    const dataSource = {
      chart: {
        caption: "Android Distribution for our app",
        subcaption: "For all users in 2017",
        showpercentvalues: "1",
        defaultcenterlabel: "Android Distribution",
        aligncaptionwithcanvas: "0",
        captionpadding: "0",
        decimals: "1",
        plottooltext:
          "<b>$percentValue</b> of our Android users are on <b>$label</b>",
        centerlabel: "# Users: $value",
        theme: "ocean"
      },
      data: [
        {
          label: "Ice Cream Sandwich",
          value: "1000"
        },
        {
          label: "Jelly Bean",
          value: "5300"
        },
        {
          label: "Kitkat",
          value: "10500"
        },
        {
          label: "Lollipop",
          value: "18900"
        },
        {
          label: "Marshmallow",
          value: "17904"
        }
      ]
    };
    
    FusionCharts.ready(function() {
      var myChart = new FusionCharts({
        type: "doughnut2d",
        renderAt: "chartMainVigencia-modal",
        width: "100%",
        height: "100%",
        dataFormat: "json",
        dataSource
      }).render();
    });
    depterriotiomodal() 

    
}



async function depterriotiomodal(){
  const dataSource = {
    chart: {
      caption: "Countries With Most Oil Reserves [2017-18]",
      subcaption: "In MMbbl = One Million barrels",
      xaxisname: "Country",
      yaxisname: "Reserves (MMbbl)",
      numbersuffix: "K",
      theme: "ocean"
    },
    data: [
      {
        label: "Venezuela",
        value: "290"
      },
      {
        label: "Saudi",
        value: "260"
      },
      {
        label: "Canada",
        value: "180"
      },
      {
        label: "Iran",
        value: "140"
      },
      {
        label: "Russia",
        value: "115"
      },
      {
        label: "UAE",
        value: "100"
      },
      {
        label: "US",
        value: "30"
      },
      {
        label: "China",
        value: "30"
      }
    ]
  };
  
  FusionCharts.ready(function() {
    var myChart = new FusionCharts({
      type: "column2d",
      renderAt: "ChartDepComuna-modal",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource
    }).render();
  });

}


