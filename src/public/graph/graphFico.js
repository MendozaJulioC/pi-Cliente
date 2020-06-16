
function totalFico() {
    fetch('http://localhost:4000/api/cuatrienios/fico/total')
        .then(res => res.json())
        .then(datos => {
            // valores para la gráfica
            const Localizada = (parseInt(datos.data[0].total_localizada_fico) / 1000000);
            const Ciudad = (parseInt(datos.data[0].total_inversión_ciudad_fico) / 1000000);
            const PP = (parseInt(datos.data[0].ppfico) / 1000000);
            
            am4core.useTheme(am4themes_animated);
            // Themes end
            var chart = am4core.create("chartdiv_total2016_2019", am4charts.PieChart);
            chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
            chart.data = [{
                    comuna: "Localizada",
                    value: Math.round(Localizada)
                },
                {
                    comuna: "Ciudad",
                    value: Math.round(Ciudad)
                },
                {
                    comuna: "PP",
                    value: Math.round(PP)
                }
            ];
            chart.radius = am4core.percent(70);
            chart.innerRadius = am4core.percent(40);
            chart.startAngle = 180;
            chart.endAngle = 360;
            var series = chart.series.push(new am4charts.PieSeries());
            series.dataFields.value = "value";
            series.dataFields.category = "comuna";
            series.slices.template.cornerRadius = 10;
            series.slices.template.innerCornerRadius = 7;
            series.slices.template.draggable = true;
            series.slices.template.inert = true;
            series.alignLabels = false;
            series.hiddenState.properties.startAngle = 90;
            series.hiddenState.properties.endAngle = 90;
            chart.legend = new am4charts.Legend();

        });
    var fortInst= document.getElementById('ficoFortInst');
    fetch('http://localhost:4000/api/cuatrienios/fico/fortalecimiento')
    .then(res=> res.json())
    .then(datos=>{
       // console.log(datos)
        fortInst.innerHTML= new Intl.NumberFormat('en-US', {style:'currency', currency:'USD'}).format(parseInt(datos.data[0].localizada2016_2019)/1000000)

    })
   
    // Initialize the map and assign it to a variable for later use
    var map = L.map('map', {
        // Set latitude and longitude of the map center (required)
        center: [6.2982733, -75.5459204],
        // Set the initial zoom level, values 0-18, where 0 is most zoomed-out (required)
        zoom: 12,
        tileSize: 512,
    });

    // Create a Tile Layer and add it to the map
    var tiles = new L.tileLayer('http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://maps.stamen.com/#terrain/12/6.2518/-75.5636">maps.stamen.com</a> contributors'
    }).addTo(map);

    const geojson_url = "https://opendata.arcgis.com/datasets/283d1d14584641c9971edbd2f695e502_6.geojson";
    fetch(geojson_url)
        .then(res => res.json())
        .then(data => {
            let geojsonlayer = L.geoJson(data, {  
            }).bindPopup(function (layer) {
                return layer.feature.properties.NOMBRE;
            }).addTo(map)
            map.fitBounds(geojsonlayer.getBounds())
        })
        //var marker1 = L.marker([6.295596, -75.543217], {icon: myIcon}).addTo(map);
        // var marker2 = L.marker([6.306220, -75.553265], {icon: myIcon}).addTo(map);
    map.on('click', e => {
        //marker1.bindPopup(hola(1)).openPopup();
        // marker2.bindPopup(hola(2)).openPopup();
    })   
    let pointMarker = L.icon({
        iconUrl: '/img/placemoney.png',
        iconSize: [30, 30],
        shape: "square",
        popupAnchor: [-3, -76]
    })
    const geojson_url2 = "/GeoJson/map_med_fico.geojson";
    fetch(geojson_url2)
        .then(res => res.json())
        .then(data => {
            let geojsonlayer2 = L.geoJson(data, {
                onEachFeature: function (feature, layer) {
                    let popupContent2 = `                       
                        <div class="card" style="width: 18rem;">
                        <img src="` + feature.properties.imgUrl+ `" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">` + feature.properties.nom_comuna + `</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Comuna ` + feature.properties.cod_comuna + `</h6>
                        <p class="card-text">
                        <p  class="text-muted"  ;">Ejecución Presupuestal 2016-2019</p>
                        <table class="table table-hover table-inverse table-responsive">
                        <tbody>
                                <tr>
                                <td>Inversión Localizada</td>
                                <td scope="row">` + new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: 'USD'
                                            }).format(parseInt(feature.properties.localizada2016_2019)) + `</td>
                                </tr>
                                <tr>
                                <td>Inversión Ciudad</td>
                                <td>` + new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: 'USD'
                                            }).format(parseInt(feature.properties.percapita2016_2019)) + `</td>
                                </tr>
                                <tr>
                                <td>Ppto. Participativo</td>
                                <td>` + new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: 'USD'
                                            }).format(parseInt(feature.properties.pp2016_2019)) + `</td>
                                </tr>
                                <tr>
                                <td>Total Inversión Cuatrienio</td>
                                <td>`+ new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                }).format(parseInt(feature.properties.total_fico)) +` </td>
                                </tr>
                            </tbody>
                        </table>
                        </p>
                        </div>
                        </div>`
                    layer.bindPopup(popupContent2)
                    layer.setIcon(pointMarker)
                }
            }).addTo(map)
            map.fitBounds(geojsonlayer2.getBounds())
        })
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


    var data=[];

    fetch('http://localhost:4000/api/cuatrienios/fico')
        .then(res => res.json())
        .then(datos => {
         
        let tam = datos.data.length;
            for(var i =0; i<(tam) ;i++   ){
                
                if(datos.data[i].cod_comuna<=90){
                 
                 data.push({
                "comuna": datos.data[i].nom_comuna,
                "total":(parseInt(datos.data[i].total_fico)),
                "color": colorHEX()
                  });
                }
       

            }
            
            var chart = AmCharts.makeChart('chartdiv_comunas_2016_2019', {
                "theme": "none",
                "type": "serial",
                "startDuration": 2,

                "dataProvider": data,
                "valueAxes": [{
                    "position": "left",
                    "axisAlpha":0,
                    "gridAlpha":0
                }],
                "graphs": [{
                    "balloonText": "[[category]]: <b>[[value]]</b>",
                    "colorField": "color",
                    "fillAlphas": 0.85,
                    "lineAlpha": 0.1,
                    "type": "column",
                    "topRadius":1,
                    "valueField": "total"
                }],
                "depth3D": 40,
              "angle": 30,
                "chartCursor": {
                    "categoryBalloonEnabled": false,
                    "cursorAlpha": 0,
                    "zoomable": false
                },
                "categoryField": "comuna",
                "categoryAxis": {
                    "labelRotation": 90,
                    "gridPosition": "start",
                    "axisAlpha":0,
                    "gridAlpha":0
            
                },
                "export": {
                    "enabled": false
                 },
                 "titles": [
                    {
                        "id": "Title-1",
                        "size": 15,
                        "text": "Total Inversión Pública Acumulada 2016-2019"
                    }
                ],
            
            }, 0);



        })



}

function  ficomuna(comuna, nomcomuna){
    let localizada1 = document.getElementById('localizada1')
    let ciudad1 = document.getElementById('ciudad1')
    let pp1 = document.getElementById('pp1')
    let total1 = document.getElementById('total1')
    fetch('http://localhost:4000/api/cuatrienios/detalle/'+comuna)
        .then(res => res.json())
        .then(datos => {
            //console.log(datos.data)
           //console.log(datos.data[0].cod_comuna) 
            localizada1.innerHTML = formatter.format(Math.round(datos.data[0].localizada2016_2019))
            ciudad1.innerHTML = formatter.format(Math.round(datos.data[0].percapita2016_2019))
            pp1.innerHTML = formatter.format(parseInt(datos.data[0].pp2016_2019))
            total1.innerHTML= formatter.format(Math.round(datos.data[0].pp2016_2019) + Math.round(datos.data[0].percapita2016_2019) + Math.round(datos.data[0].localizada2016_2019)  )
            /*localizada2.innerHTML = formatter.format(parseInt(datos.data[0].localizada2012_2015))
            ciudad2.innerHTML = formatter.format(parseInt(datos.data[0].percapita2012_2015))
            pp2.innerHTML = formatter.format(parseInt(datos.data[0].pp2012_2015))

            localizada3.innerHTML = formatter.format(parseInt(datos.data[0].localizada2016_2019))
            ciudad3.innerHTML = formatter.format(parseInt(datos.data[0].percapita2016_2019))
            pp3.innerHTML = formatter.format(parseInt(datos.data[0].pp2016_2019))*/

            $('#exampleModal').modal('show');
            $(".modal-title").text("Inversión por Dependencias en "+nomcomuna);
        })
        depComuna(2016, 2019,comuna, nomcomuna)
        


}

function depComuna(vigencia1, vigencia2, comuna, nomcomuna) {
    var parametros = {
        "vigencia1": vigencia1,
        "vigencia2": vigencia2,
        "cod_comuna": comuna
    }
    var data = []
    fetch('http://localhost:4000/api/cuatrienios/fico/dependencias', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(parametros), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            // console.log(JSON.stringify(response.data))
            let tam = response.data.length;
            for (var i = 0; i < (tam); i++) {

                data.push({
                    "dependencia": response.data[i].nombre_dep,
                    "total": parseInt(response.data[i].total)
                });

            }
            var chart = AmCharts.makeChart("chartdivmodal2", {
                "type": "serial",
                "theme": "light",
                "rotate": true,
                "dataProvider": data,
                "valueAxes": [{
                    "gridColor": "#FFFFFF",
                    "gridAlpha": 0.2,
                    "dashLength": 0
                }],
                "gridAboveGraphs": true,
                "startDuration": 1,
                "graphs": [{
                    "balloonText": "[[category]]: <b>[[value]]</b>",
                    "fillAlphas": 0.8,
                    "lineAlpha": 0.2,
                    "type": "column",
                    "valueField": "total"
                }],
                "chartCursor": {
                    "categoryBalloonEnabled": false,
                    "cursorAlpha": 0,
                    "zoomable": false
                },
                "categoryField": "dependencia",
                "categoryAxis": {
                    "gridPosition": "start",
                    "gridAlpha": 0,
                    "tickPosition": "start",
                    "tickLength": 20
                },
                "export": {
                    "enabled": true
                }

            });
        });
}

