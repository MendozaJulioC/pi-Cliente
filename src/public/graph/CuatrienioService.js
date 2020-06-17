
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

function servCuatrienios() {
    const alonso = document.getElementById('alonso');
    const anibal = document.getElementById('anibal');
    const fico = document.getElementById('fico');

    fetch('http://localhost:4000/api/cuatrienios')
        .then(res => res.json())
        .then(datos => {
            // valores para la gráfica
            const grfAlonso = (parseInt(datos.data[0].alonso));
            const grfAnibal = (parseInt(datos.data[0].anibal));
            const grfFico = (parseInt(datos.data[0].fico));

            //valores para card principal
            /* alonso.innerHTML = formatter.format(parseInt(datos.data[0].alonso)/1000000);
            anibal.innerHTML = formatter.format(parseInt(datos.data[0].anibal)/1000000);
            fico.innerHTML = formatter.format(parseInt(datos.data[0].fico)/1000000);
            */

            // construyo la grafica

            // Themes begin
            am4core.useTheme(am4themes_material);
            am4core.useTheme(am4themes_animated);
            // Themes end
            /**
             * Chart design taken from Samsung health app
             */

            var chart = am4core.create("chartdiv", am4charts.XYChart);
            chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
            chart.paddingRight = 40;

            chart.data = [{
                "name": "Salazar",
                "steps": grfAlonso,
                "href": "/img/alonso.jpeg"
            }, {
                "name": "Gaviria",
                "steps": grfAnibal,
                "href": "/img/anibal.jpeg"
            }, {
                "name": "Gutiérrez",
                "steps": grfFico,
                "href": "/img/fico.jpeg"
            }];

            var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "name";
            categoryAxis.renderer.grid.template.strokeOpacity = 0;
            categoryAxis.renderer.minGridDistance = 10;
            categoryAxis.renderer.labels.template.dx = -40;
            categoryAxis.renderer.minWidth = 120;
            categoryAxis.renderer.tooltip.dx = -40;

            var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
            valueAxis.renderer.inside = true;
            valueAxis.renderer.labels.template.fillOpacity = 0.3;
            valueAxis.renderer.grid.template.strokeOpacity = 0;
            valueAxis.min = 0;
            valueAxis.cursorTooltipEnabled = false;
            //valueAxis.renderer.baseGrid.strokeOpacity = 0;
            valueAxis.renderer.labels.template.dy = 20;

            var series = chart.series.push(new am4charts.ColumnSeries);
            series.dataFields.valueX = "steps";
            series.dataFields.categoryY = "name";
            series.tooltipText = "{valueX.value}";
            series.tooltip.pointerOrientation = "vertical";
            series.tooltip.dy = -30;
            series.columnsContainer.zIndex = 100;

            var columnTemplate = series.columns.template;
            columnTemplate.height = am4core.percent(50);
            columnTemplate.maxHeight = 50;
            columnTemplate.column.cornerRadius(60, 10, 60, 10);
            columnTemplate.strokeOpacity = 0;

            series.heatRules.push({
                target: columnTemplate,
                property: "fill",
                dataField: "valueX",
                min: am4core.color("#e5dc36"),
                max: am4core.color("#5faa46")
            });
            series.mainContainer.mask = undefined;

            var cursor = new am4charts.XYCursor();
            chart.cursor = cursor;
            cursor.lineX.disabled = true;
            cursor.lineY.disabled = true;
            cursor.behavior = "none";

            var bullet = columnTemplate.createChild(am4charts.CircleBullet);
            bullet.circle.radius = 30;
            bullet.valign = "middle";
            bullet.align = "left";
            bullet.isMeasured = true;
            bullet.interactionsEnabled = false;
            bullet.horizontalCenter = "right";
            bullet.interactionsEnabled = false;

            var hoverState = bullet.states.create("hover");
            var outlineCircle = bullet.createChild(am4core.Circle);
            outlineCircle.adapter.add("radius", function (radius, target) {
                var circleBullet = target.parent;
                return circleBullet.circle.pixelRadius + 10;
            })

            var image = bullet.createChild(am4core.Image);
            image.width = 60;
            image.height = 60;
            image.horizontalCenter = "middle";
            image.verticalCenter = "middle";
            image.propertyFields.href = "href";

            image.adapter.add("mask", function (mask, target) {
                var circleBullet = target.parent;
                return circleBullet.circle;
            })

            var previousBullet;
            chart.cursor.events.on("cursorpositionchanged", function (event) {
                var dataItem = series.tooltipDataItem;

                if (dataItem.column) {
                    var bullet = dataItem.column.children.getIndex(1);

                    if (previousBullet && previousBullet != bullet) {
                        previousBullet.isHover = false;
                    }

                    if (previousBullet != bullet) {

                        var hs = bullet.states.getKey("hover");
                        hs.properties.dx = dataItem.column.pixelWidth;
                        bullet.isHover = true;

                        previousBullet = bullet;
                    }
                }
            })

        });
}

function servTotales() {

    fetch('http://localhost:4000/api/totales')
        .then(res => res.json())
        .then(datos => {
            am4core.useTheme(am4themes_animated);
            // Themes end
            var chart = am4core.create("chartdiv2", am4charts.XYChart);
            var data = [];
            var value = 0;
            var names = [
                "2008",
                "2009",
                "2010",
                "2011",
                "2012",
                "2013",
                "2014",
                "2015",
                "2016",
                "2017",
                "2018",
                "2019"
            ];
            let tam = (datos.data.length);
            for (var i = 0; i < (tam); i++) {
                data.push({
                    category: names[i],
                    value: new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    }).format(parseInt(datos.data[i].inversion_total) / 1000000)
                });
            }
            chart.data = data;
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.dataFields.category = "category";
            categoryAxis.renderer.minGridDistance = 15;
            categoryAxis.renderer.grid.template.location = 0.5;
            categoryAxis.renderer.grid.template.strokeDasharray = "1,3";
            categoryAxis.renderer.labels.template.rotation = -90;
            categoryAxis.renderer.labels.template.horizontalCenter = "left";
            categoryAxis.renderer.labels.template.location = 0.5;
            categoryAxis.renderer.labels.template.adapter.add("dx", function (dx, target) {
                return -target.maxRight / 2;
            })
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.tooltip.disabled = true;
            valueAxis.renderer.ticks.template.disabled = true;
            valueAxis.renderer.axisFills.template.disabled = true;
            var series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.categoryX = "category";
            series.dataFields.valueY = "value";
            series.tooltipText = "{valueY.value}";
            series.sequencedInterpolation = true;
            series.fillOpacity = 0;
            series.strokeOpacity = 1;
            series.strokeDashArray = "1,3";
            series.columns.template.width = 0.01;
            series.tooltip.pointerOrientation = "horizontal";
            var bullet = series.bullets.create(am4charts.CircleBullet);
            chart.cursor = new am4charts.XYCursor();
            chart.scrollbarX = new am4core.Scrollbar();
            chart.scrollbarY = new am4core.Scrollbar();
        })
}

function detallecomuna(comuna, nomcomuna) {
    let localizada1 = document.getElementById('localizada1')
    let ciudad1 = document.getElementById('ciudad1')
    let pp1 = document.getElementById('pp1')
    let localizada2 = document.getElementById('localizada2')
    let ciudad2 = document.getElementById('ciudad2')
    let pp2 = document.getElementById('pp2')
    let localizada3 = document.getElementById('localizada3')
    let ciudad3 = document.getElementById('ciudad3')
    let pp3 = document.getElementById('pp3')

    fetch('http://localhost:4000/api/cuatrienios/detalle/' + comuna)
        .then(res => res.json())
        .then(datos => {
            //console.log(datos.data)
            //console.log(datos.data[0].cod_comuna)
            localizada1.innerHTML = formatter.format(parseInt(datos.data[0].localizada2008_2011))
            ciudad1.innerHTML = formatter.format(Math.round(datos.data[0].percapita2008_2011))
            pp1.innerHTML = formatter.format(parseInt(datos.data[0].pp2008_2011))

            localizada2.innerHTML = formatter.format(parseInt(datos.data[0].localizada2012_2015))
            ciudad2.innerHTML = formatter.format(parseInt(datos.data[0].percapita2012_2015))
            pp2.innerHTML = formatter.format(parseInt(datos.data[0].pp2012_2015))

            localizada3.innerHTML = formatter.format(parseInt(datos.data[0].localizada2016_2019))
            ciudad3.innerHTML = formatter.format(parseInt(datos.data[0].percapita2016_2019))
            pp3.innerHTML = formatter.format(parseInt(datos.data[0].pp2016_2019))

            am4core.useTheme(am4themes_animated);
            // Themes end

            AmCharts.makeChart("chartdivmodal", {
                "type": "serial",
                "categoryField": "Cuatrienio",
                "startDuration": 1,
                "theme": "light",
                "export": {
                    "enabled": true,

                },
                "categoryAxis": {
                    "gridPosition": "start"
                },
                "trendLines": [],
                "graphs": [{
                        "balloonColor": "#B7EEB5",
                        "balloonText": "[[title]] de [[Cuatrienio]]:[[value]]",
                        "columnWidth": 0.79,
                        "fillAlphas": 1,
                        "id": "AmGraph-1",
                        "labelText": "[[value]]",
                        "tabIndex": -5,
                        "title": "Inversión Localizada",
                        "type": "column",
                        "labelRotation": -90,
                        "valueField": "Localizada"
                    },
                    {
                        "balloonColor": "#B7EEB5",
                        "balloonText": "[[title]] de [[Cuatrienio]]:[[value]]",
                        "columnWidth": 0.79,
                        "fillAlphas": 1,
                        "id": "AmGraph-2",
                        "labelText": "[[value]]",
                        "tabIndex": -5,
                        "title": "Inversión Ciudad",
                        "type": "column",
                        "labelRotation": -90,
                        "valueField": "Ciudad"
                    },
                    {
                        "balloonText": "[[title]] de [[Cuatrienio]]:[[value]]",
                        "columnWidth": 0.79,
                        "fillAlphas": 1,
                        "id": "AmGraph-3",
                        "labelText": "[[value]]",
                        "title": "Presupuesto Participativo",
                        "type": "column",
                        "labelRotation": -90,
                        "valueField": "PP"
                    }
                ],
                "guides": [],
                "valueAxes": [{
                    "axisTitleOffset": -1,
                    "id": "ValueAxis-1",
                    "synchronizationMultiplier": -30,
                    "autoGridCount": false,
                    "ignoreAxisWidth": false,
                    "labelRotation": -55.8,
                    "minHorizontalGap": 70,
                    "title": "Total Inversión (cifras en millones)",
                    "titleBold": true
                }],
                "allLabels": [],
                "balloon": {},
                "legend": {
                    "enabled": true,
                    "useGraphSettings": true
                },
                "titles": [{
                    "id": "Title-1",
                    "size": 12,
                    "text": "Inversión Cuatrienios en la comuna  " + nomcomuna,
                }],
                "dataProvider": [{
                        "Cuatrienio": "2008-2011",
                        "Localizada": Math.round((parseInt(datos.data[0].localizada2008_2011) / 1000000)),
                        "Ciudad": Math.round((parseInt(datos.data[0].percapita2008_2011) / 1000000)),
                        "PP": Math.round((parseInt(datos.data[0].pp2008_2011) / 1000000))
                    },
                    {
                        "Cuatrienio": "2012-2015",
                        "Localizada": Math.round((parseInt(datos.data[0].localizada2012_2015) / 1000000)),
                        "Ciudad": Math.round((parseInt(datos.data[0].percapita2012_2015) / 1000000)),
                        "PP": Math.round(parseInt(datos.data[0].pp2012_2015) / 1000000)
                    },
                    {
                        "Cuatrienio": "2016-2019",
                        "Localizada": Math.round((parseInt(datos.data[0].localizada2016_2019) / 1000000)),
                        "Ciudad": Math.round((parseInt(datos.data[0].percapita2016_2019) / 1000000)),
                        "PP": Math.round((parseInt(datos.data[0].pp2016_2019) / 1000000))
                    }
                ]
            });
            $('#exampleModal').modal('show');
            $(".modal-title").text(nomcomuna);
        })
}

function totalAlonso() {
    fetch('http://localhost:4000/api/cuatrienios/alonso/total')
        .then(res => res.json())
        .then(datos => {
            // valores para la gráfica
            const Localizada = (parseInt(datos.data[0].total_localizada_alonso) / 1000000);
            const Ciudad = (parseInt(datos.data[0].total_inversión_ciudad) / 1000000);
            const PP = (parseInt(datos.data[0].ppalonso) / 1000000);
            
            am4core.useTheme(am4themes_animated);
            // Themes end
            var chart = am4core.create("chartdiv_total2008_2011", am4charts.PieChart);
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

        const geojson_url2 = "/GeoJson/map_med_alonso.geojson";
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
                        <p  class="text-muted"  ;">Ejecución Presupuestal 2008-2011</p>
                        <table class="table table-hover table-inverse table-responsive">
                        <tbody>
                                <tr>
                                <td>Inversión Localizada</td>
                                <td scope="row">` + new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: 'USD'
                                            }).format(parseInt(feature.properties.localizada2008_2011)) + `</td>
                                </tr>
                                <tr>
                                <td>Inversión Ciudad</td>
                                <td>` + new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: 'USD'
                                            }).format(parseInt(feature.properties.percapita2008_2011)) + `</td>
                                </tr>
                                <tr>
                                <td>Ppto. Participativo</td>
                                <td>` + new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: 'USD'
                                            }).format(parseInt(feature.properties.pp2008_2011)) + `</td>
                                </tr>
                                <tr>
                                <td>Total Inversión Cuatrienio</td>
                                <td>`+ new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                }).format(parseInt(feature.properties.total_alonso)) +` </td>
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

    fetch('http://localhost:4000/api/cuatrienios/alonso')
        .then(res => res.json())
        .then(datos => {
         
        let tam = datos.data.length;
        for(var i =0; i<(tam) ;i++   ){
                
            if(datos.data[i].cod_comuna<=90){
             
             data.push({
            "comuna": datos.data[i].nom_comuna,
            "total":(parseInt(datos.data[i].total_alonso)),
            "color": colorHEX()
              });
            }
   

        }
            
            var chart = AmCharts.makeChart('chartdiv_comunas_2008_2011', {
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
                        "text": "Total Inversión Pública Acumulada 2008-2011"
                    }
                ],
            
            }, 0);



        })
}

function generarLetra(){
	var letras = ["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"];
	var numero = (Math.random()*15).toFixed(0);
	return letras[numero];
}
	
function colorHEX(){
	var coolor = "";
	for(var i=0;i<6;i++){
		coolor = coolor + generarLetra() ;
	}
	return "#" + coolor;
}