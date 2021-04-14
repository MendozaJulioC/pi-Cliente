

var nombreComuna,VigenciaTotal,EstaVigencia,LocalizadaInver,CiudadInver,PPInverver;

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

const comunas = async (req, res)=>{
    var container = L.DomUtil.get('map');
    if(container != null){
        container._leaflet_id = null;
    }
    var map = L.map('map', {
        // Set latitude and longitude of the map center (required)
        center: [6.2982733, -75.5459204],
        // Set the initial zoom level, values 0-18, where 0 is most zoomed-out (required)
        //zoom: 12,
        maxZoom: 12,
        minZoom: 12
      });
      // Create a Tile Layer and add it to the map
      var tiles = new L.tileLayer('http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://maps.stamen.com/#terrain/12/6.2518/-75.5636">maps.stamen.com</a> contributors'
      }).addTo(map);   
}

function activa(valor){
    if(valor==0){
        document.getElementById('inputGroupSelectVigencia').value=0;
        document.getElementById('inputGroupSelectVigencia').disabled= true;
        document.getElementById('btnConsulta').disabled= true
       
    }else{
        document.getElementById('inputGroupSelectVigencia').disabled=false 
    }
}

function activabutton(valor){
    if (valor==0){
        document.getElementById('inputGroupSelectVigencia').value=0;
        document.getElementById('inputGroupSelectVigencia').disabled= true;
        document.getElementById('btnConsulta').disabled= true
    }
    else{
        document.getElementById('btnConsulta').disabled= false
    }
}

function buscaComuna(){
    let territorio = parseInt(document.getElementById('inputGroupSelectTerritorio').value);
    let vigencia = parseInt(document.getElementById('inputGroupSelectVigencia').value);
    var parametros={
        "comuna": territorio,
	    "vigencia":vigencia   
    }
    if(territorio!=0){  
        fetch('http://localhost:4000/api/comuna/vigencia',{
            method:'POST',
            body: JSON.stringify(parametros), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
         }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            document.getElementById('nom_comuna').innerHTML=response.data[0].nom_comuna;
            document.getElementById('totalComunaVigencia').innerHTML=formatter.format(Math.round(response.data[0].inver_total));
            document.getElementById('vigencia').innerHTML=response.data[0].ano;
            document.getElementById('inverLocalizada').innerHTML=formatter.format(Math.round(response.data[0].inver_localizada));
            document.getElementById('inverCiudad').innerHTML=formatter.format(Math.round(response.data[0].inver_ciudad));
            document.getElementById('pp').innerHTML=formatter.format(Math.round(response.data[0].inver_pp));
            nombreComuna=response.data[0].nom_comuna;
            EstaVigencia= response.data[0].ano;
            LocalizadaInver=formatter.format(Math.round(response.data[0].inver_localizada));
            CiudadInver=formatter.format(Math.round(response.data[0].inver_ciudad));
            PPInverver=formatter.format(Math.round(response.data[0].inver_pp));
            VigenciaTotal=formatter.format(Math.round(response.data[0].inver_total));
            am4core.useTheme(am4themes_dataviz);
            am4core.useTheme(am4themes_animated);
            // Themes end
            var chart = am4core.create("chartComunaVigencia", am4charts.PieChart);
            chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
            chart.data = [
              {
                dep: "Localizada",
                value: (Math.round(response.data[0].inver_localizada))
              },
              {
                dep: "Ciudad",
                value: (Math.round(response.data[0].inver_ciudad))
              },
              {
                dep: "Pp",
                value: (Math.round(response.data[0].inver_pp))
              },
            ];
            chart.radius = am4core.percent(70);
            chart.innerRadius = am4core.percent(40);
            chart.startAngle = 180;
            chart.endAngle = 360;  
            var series = chart.series.push(new am4charts.PieSeries());
            series.dataFields.value = "value";
            series.dataFields.category = "dep";
            series.slices.template.cornerRadius = 20;
            series.slices.template.innerCornerRadius = 7;
            series.slices.template.draggable = true;
            series.slices.template.inert = false;
            series.alignLabels = false;
            series.hiddenState.properties.startAngle = 50;
            series.hiddenState.properties.endAngle = 10;
            chart.legend = new am4charts.Legend();
            ComunaDepVigencia()
        });
    }else{
        document.getElementById('inputGroupSelectTerritorio').value=0;
        document.getElementById('inputGroupSelectVigencia').value=0;
        document.getElementById('inputGroupSelectVigencia').disabled= true;   
    }

}

function ComunaDepVigencia(){
   var datos=[];
    let NomTerritorio= document.getElementById('inputGroupSelectTerritorio')
    let territorio = parseInt(document.getElementById('inputGroupSelectTerritorio').value);
    let vigencia = parseInt(document.getElementById('inputGroupSelectVigencia').value);
    var seleccionado= NomTerritorio.options[NomTerritorio.selectedIndex].text;
    var parametros={
        "comuna": territorio,
	    "vigencia":vigencia   
    }
    if(territorio!=0){  
        fetch('http://localhost:4000/api/comuna/dependencias',{
            method:'POST',
            body: JSON.stringify(parametros), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
         }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            let tam = response.data.length;
            for(var i =0; i<(tam) ;i++   ){
                 datos.push({
                "dependencias": response.data[i].nom_cortp,
                "total":Math.round(parseInt(response.data[i].total)/1000000),
            });
        }
        var chart = AmCharts.makeChart( "chartComVigDep", {
            "type": "serial",
            "theme": "none",
            "titles": [
		    {
                "id": "Title-1",
                "text": seleccionado
            },
            {
                "id": "Title-2",
                "text": vigencia
            }
	    ],

        "dataProvider": datos,
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
        "categoryField": "dependencias",
        "rotate": true,
        "categoryAxis": {
            "gridPosition": "start",
            "labelRotation": 90,
            "gridAlpha": 0,
            "tickPosition": "start",
            "tickLength": 20
        },
        "export": {
            "enabled": true
        }
              
        } );
        });
    }else{
        document.getElementById('inputGroupSelectTerritorio').value=0;
        document.getElementById('inputGroupSelectVigencia').value=0;
        document.getElementById('inputGroupSelectVigencia').disabled= true;
    }
    mapComuna(territorio)
}

async function mapComuna(territorio){
    document.getElementById('nombrecomuna').innerHTML= '<p><b>'+nombreComuna+'</b></p>';
    var container = L.DomUtil.get('map');
    if(container != null){
        container._leaflet_id = null;
    }
    var map = L.map('map', {
        // Set latitude and longitude of the map center (required)
        center: [6.2982733, -75.5459204],
        // Set the initial zoom level, values 0-18, where 0 is most zoomed-out (required)x
        zoom: 11,
       // maxZoom: 12,
       // minZoom: 8
      });
      // Create a Tile Layer and add it to the map
      var tiles = new L.tileLayer('http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://maps.stamen.com/#terrain/12/6.2518/-75.5636">maps.stamen.com</a> contributors'
      }).addTo(map);
      
    const geo_url= 'https://www.medellin.gov.co/mapas/rest/services/ServiciosCatastro/OPENDATA_Catastro/MapServer/6/query?where=comuna%3D'+territorio+'&f=geojson'
    fetch(geo_url)
    .then(res=>res.json())
    .then(data => {
       let geojsonlayer = L.geoJson(data, {
         style: style,
         onEachFeature: function (feature, layer) {
           let popupContent2 = `                       
            <div class="card" style="width: 18rem;">
                <!-aquí podemos colocar una imagen-->     
                <div class="card-body">
                    <h5 class="card-title">` + nombreComuna + `</h5>
                    <p class="card-text">
                    <p  class="text-muted"  ;">Ejecución Presupuestal `+  EstaVigencia+`</p>
                    <table class="table table-hover table-inverse table-responsive">
                    <tbody>
                        <tr>
                            <td>Inversión Localizada</td>
                            <td>` + LocalizadaInver + 
                            `</td>
                        </tr>
                        <tr>
                            <td>Inversión Ciudad</td>
                            <td>` + CiudadInver +
                            `</td>
                        </tr>
                        <tr>
                            <td>Inversión Presupuesto Participativo</td>
                            <td>` +  PPInverver + `</td>
                        </tr>
                        <tr>
                            <td>Total Inversión</td>
                            <td>` + VigenciaTotal + `
                            </td>
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
            this._div.innerHTML = '<p><b>'+EstaVigencia+'</b></p>';
            return this._div;
        };
        info.addTo(map);

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
    proyectosxcomuna(1)
}


async function proyectosxcomuna(bloque){
    try {
       
        let tabla='';let page_num='';
        let territorio = parseInt(document.getElementById('inputGroupSelectTerritorio').value);
        let vigencia = parseInt(document.getElementById('inputGroupSelectVigencia').value);
    
        var parametros={
            "comuna"    :   territorio,
            "vigencia"  :   vigencia,
            "page"      :   bloque
        }
      
        fetch('http://localhost:4000/api/comuna/proyectos/',{
            method: 'POST',
            body: JSON.stringify(parametros),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res=> res.json())
        .catch(error=> console.error('Error', error))
        .then(response=>{
            let tam = response.data.length;
            let pagination = response.pages

            console.log(response.Current)
            console.log(bloque)

            page_num +=` <li class="page-item">
            <a class="page-link" style="background:#FFDC15; " aria-label="Previous"> <span aria-hidden="true">Pág: `+response.Current+`</span></a></li>`;
            
            if(response.Current!=1){
                page_num +=` <li class="page-item">
                <a class="page-link"  aria-label="Previous" onclick="updatePages(`+ (response.Current-1)+`)"> <span aria-hidden="true">&laquo;</span></a></li>`;
            }
          
           
            for (let p=0; p<pagination;p++){
                page_num +='<li id=" li'+(p+1)+' "class="page-item"><a  class="page-link" style="color: #009FE3"  onclick="updatePages('+ (p+1)+')">'+(p+1)+' <span class="sr-only">(current)</span></a></li>'
            }
            
           
            if(response.Current!=pagination){
                page_num +=`  <li><a class="page-link" aria-label="Next" onclick="updatePages(`+ (response.Current+1)+`)"><span aria-hidden="true">&raquo;</span></a></li>`;
            }

            document.getElementById('page_num').innerHTML= page_num
            
            for(let i =0; i<(tam) ;i++   ){
                  tabla +='<tr>';
                    tabla +='<td style="text-align: center; font-size: 10px;">'+(parseInt(response.data[i].cod_dep))+'</td>';
                    tabla +='<td style="text-align:initial;font-size: 10px;">'+response.data[i].nombre_dep+'</td>';
                    tabla +='<td style="text-align:initial;font-size: 10px;">'+response.data[i].cod_bpin+'</td>';
                    tabla +='<td style="text-align:initial;font-size: 10px;">'+response.data[i].nomproy+'</td>';
                    tabla +='<td style="font-size: 10px;">'+formatter.format(parseInt((response.data[i].inversion)))+'</td>'
                    tabla +='<td style="font-size: 10px;">'+response.data[i].espp+'</td>'
                  tabla +='<tr>';
                  document.getElementById('reportxproyect').innerHTML=tabla;
  
              }  
        
        

        })

    } catch (error) {console.log(error)}

}


async function updatePages(p) {
   
    proyectosxcomuna(p)
    
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

function getColor(d) {
    return d > 400000000000  ? '#005a32' :
           d > 350000000000  ? '#238b45' :
           d > 300000000000  ? '#41ab5d' :
           d > 250000000000  ? '#74c476' :
           d > 200000000000  ? '#a1d99b' :
           d > 150000000000   ? '#c7e9c0' :
           d > 100000000000   ? '#e5f5e0' :
                               '#B4358B' ;
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