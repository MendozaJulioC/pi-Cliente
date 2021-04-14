

 var  inversion=0;
async function queryDep(){
    var selectDep = document.getElementById('inputGroupSelectDependencia')
    var depQuery =selectDep.options[selectDep.selectedIndex].value
    let dep_text = selectDep.options[selectDep.selectedIndex].text
    document.getElementById('nom_dep').innerHTML=dep_text
    fetch('https://sse-pdm.herokuapp.com/api/dependencias/'+depQuery)
    .then(res=> res.json())
    .then(datos=>{
        am4core.useTheme(am4themes_animated);
        // Create chart instance
        var chart = am4core.create("chartdiv", am4charts.XYChart);
        chart.scrollbarX = new am4core.Scrollbar();
        // Add data
        chart.data = [{
        "vigencia": "2008",
        "visits": datos.data[0]._2008
        }, {
        "vigencia": "2009",
        "visits": datos.data[0]._2009
        }, {
        "vigencia": "2010",
        "visits": datos.data[0]._2010
        }, {
        "vigencia": "2011",
        "visits": datos.data[0]._2011
        }, {
        "vigencia": "2012",
        "visits": datos.data[0]._2012
        }, {
        "vigencia": "2013",
        "visits": datos.data[0]._2013
        }, {
        "vigencia": "2014",
        "visits": datos.data[0]._2014
        }, {
        "vigencia": "2015",
        "visits": datos.data[0]._2015
        }, {
        "vigencia": "2016",
        "visits": datos.data[0]._2016
        }, {
        "vigencia": "2017",
        "visits": datos.data[0]._2017
        }, {
        "vigencia": "2018",
        "visits": datos.data[0]._2018
        }, {
        "vigencia": "2019",
        "visits": datos.data[0]._2019
        }];
        // Create axes
        var title = chart.titles.create();
        title.text = "[bold font-size: 20]"+ datos.data[0].nombredep ;
        title.textAlign = "middle";
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "vigencia";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;
        categoryAxis.renderer.labels.template.horizontalCenter = "right";
        categoryAxis.renderer.labels.template.verticalCenter = "middle";
        categoryAxis.renderer.labels.template.rotation = 270;
        categoryAxis.tooltip.disabled = true;
        categoryAxis.renderer.minHeight = 110;
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.minWidth = 50;
        // Create series
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.sequencedInterpolation = true;
        series.dataFields.valueY = "visits";
        series.dataFields.categoryX = "vigencia";
        series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
        series.columns.template.strokeWidth = 0;
        series.tooltip.pointerOrientation = "vertical";
        series.columns.template.column.cornerRadiusTopLeft = 10;
        series.columns.template.column.cornerRadiusTopRight = 10;
        series.columns.template.column.fillOpacity = 0.8;
        // on hover, make corner radiuses bigger
        var hoverState = series.columns.template.column.states.create("hover");
        hoverState.properties.cornerRadiusTopLeft = 0;
        hoverState.properties.cornerRadiusTopRight = 0;
        hoverState.properties.fillOpacity = 1;
        series.columns.template.adapter.add("fill", function(fill, target) {
        return chart.colors.getIndex(target.dataItem.index);
        });
        // Cursor
        chart.cursor = new am4charts.XYCursor();
    })
    .catch()
}

async function queryDepVig(){
    let selectDep = document.getElementById('inputGroupSelectDependencia');
    let dep_text = selectDep.options[selectDep.selectedIndex].text
    let depQuery  = selectDep.options[selectDep.selectedIndex].value;
    let selecVig  = document.getElementById('inputGroupSelectVigencia');
    let vigQuery  = selecVig.options[selecVig.selectedIndex].value;
    let parametros ={
        "dep": depQuery,
        "vigencia":vigQuery
    }
    var datos=[];
    fetch('https://sse-pdm.herokuapp.com/api/dependencias/vigencia',{
        method :'POST',
        body: JSON.stringify(parametros), // data can be `string` or {object}!
        headers:{
            'Content-Type': 'application/json'
        }

    })
    .then(res=>res.json())
    .then(response => {
        let tam = response.data.length;
        for(var i =0; i<(tam) ;i++   ){
             datos.push({
            "comuna": response.data[i].nom_corto_comuna,
            "total":Math.round(parseInt(response.data[i].total)/1000000),
        });
    }


    var chart = AmCharts.makeChart("chartdivComunas", {
        "type": "serial",
        "theme": "light",
        "categoryField": "comuna",
        "rotate": true,
        "startDuration": 1,
        "categoryAxis": {
          "gridPosition": "bottom",
          "position": "left"
        },
       
    
        "trendLines": [],
        "graphs": [
         
          {
            "balloonText": "total:[[value]]",
            "fillAlphas": 0.8,
            "id": "AmGraph-2",
            "lineAlpha": 0.2,
            "title": "total",
            "labelText": "[[value]]",
            "type": "column",
            "valueField": "total"
          }
        ],
        "guides": [],
        "valueAxes": [
          {
            "id": "ValueAxis-1",
            "position": "bottom",
            
            "axisAlpha": 0
          }
        ],
        "allLabels": [],
        "balloon": {},
        "titles": [
            {
                "id": "Title-1",
                "size": 18,
                "text": dep_text
            },
            {
                "bold": false,
                "id": "Title-2",
                "size": 13,
                "text": "(cifras en millones de pesos)"
            }
    
    
    ],
        "dataProvider": datos
         ,
          "export": {
              "enabled": true
           }
      
      });
    mapadep(depQuery,vigQuery);

    })
    .catch(error => console.error('Error:', error))
}

async function mapadep(depQuery, vigQuery){
 var container = L.DomUtil.get('map');
    if(container != null){
      container._leaflet_id = null;
    }


    let selectDep = document.getElementById('inputGroupSelectDependencia');
    let dep_text = selectDep.options[selectDep.selectedIndex].text

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

  const geojson_url = "/GeoJson/dependencias_territorio.geojson";
  fetch(geojson_url)
    .then(res => res.json())
    .then(data => {
    
      let geojsonlayer = L.geoJson(data, {
        style: style,
        onEachFeature: function (feature, layer) {
           

         switch (parseInt(depQuery)) {
            case 701:
            switch(parseInt(vigQuery))
            {
                case 2019: inversion = feature.properties.inver_vig_2019_701; break;
                case 2018: inversion = feature.properties.inver_vig_2018_701; break;
                case 2017: inversion = feature.properties.inver_vig_2017_701; break;
                case 2016: inversion = feature.properties.inver_vig_2016_701; break;
                case 2015: inversion = feature.properties.inver_vig_2015_701; break;
                case 2014: inversion = feature.properties.inver_vig_2014_701; break;
                case 2013: inversion = feature.properties.inver_vig_2013_701; break;
                case 2012: inversion = feature.properties.inver_vig_2012_701; break;
                case 2011: inversion = feature.properties.inver_vig_2011_701; break;
                case 2010: inversion = feature.properties.inver_vig_2010_701; break;
                case 2009: inversion = feature.properties.inver_vig_2009_701; break;
                case 2008: inversion = feature.properties.inver_vig_2008_701; break;
            }
            break;
            case 702:
            switch(parseInt(vigQuery))
            {
               case 2019: inversion = feature.properties.inver_vig_2019_702; break;
               case 2018: inversion = feature.properties.inver_vig_2018_702; break;
               case 2017: inversion = feature.properties.inver_vig_2017_702; break;
               case 2016: inversion = feature.properties.inver_vig_2016_702; break;
               case 2015: inversion = feature.properties.inver_vig_2015_702; break;
               case 2014: inversion = feature.properties.inver_vig_2014_702; break;
               case 2013: inversion = feature.properties.inver_vig_2013_702; break;
               case 2012: inversion = feature.properties.inver_vig_2012_702; break;
               case 2011: inversion = feature.properties.inver_vig_2011_702; break;
               case 2010: inversion = feature.properties.inver_vig_2010_702; break;
               case 2009: inversion = feature.properties.inver_vig_2009_702; break;
               case 2008: inversion = feature.properties.inver_vig_2008_702; break;
           }
            break;
            case 703:
            switch(parseInt(vigQuery))
            {
                case 2019: inversion = feature.properties.inver_vig_2019_703; break;
                case 2018: inversion = feature.properties.inver_vig_2018_703; break;
                case 2017: inversion = feature.properties.inver_vig_2017_703; break;
                case 2016: inversion = feature.properties.inver_vig_2016_703; break;
                case 2015: inversion = feature.properties.inver_vig_2015_703; break;
                case 2014: inversion = feature.properties.inver_vig_2014_703; break;
                case 2013: inversion = feature.properties.inver_vig_2013_703; break;
                case 2012: inversion = feature.properties.inver_vig_2012_703; break;
                case 2011: inversion = feature.properties.inver_vig_2011_703; break;
                case 2010: inversion = feature.properties.inver_vig_2010_703; break;
                case 2009: inversion = feature.properties.inver_vig_2009_703; break;
                case 2008: inversion = feature.properties.inver_vig_2008_703; break;
            }
            break;
            case 704:
            switch(parseInt(vigQuery))
            {
                case 2019: inversion = feature.properties.inver_vig_2019_704; break;
                case 2018: inversion = feature.properties.inver_vig_2018_704; break;
                case 2017: inversion = feature.properties.inver_vig_2017_704; break;
                case 2016: inversion = feature.properties.inver_vig_2016_704; break;
                case 2015: inversion = feature.properties.inver_vig_2015_704; break;
                case 2014: inversion = feature.properties.inver_vig_2014_704; break;
                case 2013: inversion = feature.properties.inver_vig_2013_704; break;
                case 2012: inversion = feature.properties.inver_vig_2012_704; break;
                case 2011: inversion = feature.properties.inver_vig_2011_704; break;
                case 2010: inversion = feature.properties.inver_vig_2010_704; break;
                case 2009: inversion = feature.properties.inver_vig_2009_704; break;
                case 2008: inversion = feature.properties.inver_vig_2008_704; break;
            }
        break;
        case 705:
            switch(parseInt(vigQuery))
            {
                case 2019: inversion = feature.properties.inver_vig_2019_705; break;
                case 2018: inversion = feature.properties.inver_vig_2018_705; break;
                case 2017: inversion = feature.properties.inver_vig_2017_705; break;
                case 2016: inversion = feature.properties.inver_vig_2016_705; break;
                case 2015: inversion = feature.properties.inver_vig_2015_705; break;
                case 2014: inversion = feature.properties.inver_vig_2014_705; break;
                case 2013: inversion = feature.properties.inver_vig_2013_705; break;
                case 2012: inversion = feature.properties.inver_vig_2012_705; break;
                case 2011: inversion = feature.properties.inver_vig_2011_705; break;
                case 2010: inversion = feature.properties.inver_vig_2010_705; break;
                case 2009: inversion = feature.properties.inver_vig_2009_705; break;
                case 2008: inversion = feature.properties.inver_vig_2008_705; break;
            }
            break;
        case 706:
            switch(parseInt(vigQuery))
            {
                case 2019: inversion = feature.properties.inver_vig_2019_706; break;
                case 2018: inversion = feature.properties.inver_vig_2018_706; break;
                case 2017: inversion = feature.properties.inver_vig_2017_706; break;
                case 2016: inversion = feature.properties.inver_vig_2016_706; break;
                case 2015: inversion = feature.properties.inver_vig_2015_706; break;
                case 2014: inversion = feature.properties.inver_vig_2014_706; break;
                case 2013: inversion = feature.properties.inver_vig_2013_706; break;
                case 2012: inversion = feature.properties.inver_vig_2012_706; break;
                case 2011: inversion = feature.properties.inver_vig_2011_706; break;
                case 2010: inversion = feature.properties.inver_vig_2010_706; break;
                case 2009: inversion = feature.properties.inver_vig_2009_706; break;
                case 2008: inversion = feature.properties.inver_vig_2008_706; break;
            }
            break;
            case 707:
                switch(parseInt(vigQuery))
                {
                    case 2019: inversion = feature.properties.inver_vig_2019_707; break;
                    case 2018: inversion = feature.properties.inver_vig_2018_707; break;
                    case 2017: inversion = feature.properties.inver_vig_2017_707; break;
                    case 2016: inversion = feature.properties.inver_vig_2016_707; break;
                    case 2015: inversion = feature.properties.inver_vig_2015_707; break;
                    case 2014: inversion = feature.properties.inver_vig_2014_707; break;
                    case 2013: inversion = feature.properties.inver_vig_2013_707; break;
                    case 2012: inversion = feature.properties.inver_vig_2012_707; break;
                    case 2011: inversion = feature.properties.inver_vig_2011_707; break;
                    case 2010: inversion = feature.properties.inver_vig_2010_707; break;
                    case 2009: inversion = feature.properties.inver_vig_2009_707; break;
                    case 2008: inversion = feature.properties.inver_vig_2008_707; break;
                }
                break;
                case 711:
                    switch(parseInt(vigQuery))
                    {
                        case 2019: inversion = feature.properties.inver_vig_2019_711; break;
                        case 2018: inversion = feature.properties.inver_vig_2018_711; break;
                        case 2017: inversion = feature.properties.inver_vig_2017_711; break;
                        case 2016: inversion = feature.properties.inver_vig_2016_711; break;
                        case 2015: inversion = feature.properties.inver_vig_2015_711; break;
                        case 2014: inversion = feature.properties.inver_vig_2014_711; break;
                        case 2013: inversion = feature.properties.inver_vig_2013_711; break;
                        case 2012: inversion = feature.properties.inver_vig_2012_711; break;
                        case 2011: inversion = feature.properties.inver_vig_2011_711; break;
                        case 2010: inversion = feature.properties.inver_vig_2010_711; break;
                        case 2009: inversion = feature.properties.inver_vig_2009_711; break;
                        case 2008: inversion = feature.properties.inver_vig_2008_711; break;
                    }
                    break;
                  

    }

    


          let popupContent2 = `                       
             <div class="card" style="width: 18rem;">
                 <!-aquí podemos colocar una imagen-->     
               <div class="card-body">
                  <h5 class="card-title">` + feature.properties.NOMBRE + `</h5>
                  <h6 class="card-subtitle mb-2 text-muted">` + feature.properties.IDENTIFICACION + `</h6>
                  <p class="card-text">
                  <p  class="text-muted";> `+ dep_text +` </p>
                  <table class="table table-hover table-inverse table-responsive">
                    <tbody>
                      <tr>
                        <td>inversion Localizada</td>
                      <td>` + new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(parseInt(inversion)) + `</td>
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

        this._div.innerHTML = '<p><b>' + vigQuery +'</b></p>';
      };

      info.addTo(map);
      var legend = L.control({
        position: 'bottomright'
        
      });

      legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 10000000000, 30000000000, 40000000000, 50000000000, 60000000000, 700000000, 100000000000],
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

    return d > 100000000000 ? '#005a32' :
           d > 70000000000  ? '#238b45' :
           d > 60000000000  ? '#41ab5d' :
           d > 50000000000  ? '#74c476' :
           d > 40000000000  ? '#a1d99b' :
           d > 30000000000  ? '#c7e9c0' :
           d > 10000000000  ? '#e5f5e0' :
                            '#f7fcf5' ;
  }
  
  function style(feature) {

    let selectDep = document.getElementById('inputGroupSelectDependencia');
    let depQuery  = selectDep.options[selectDep.selectedIndex].value;
    let selecVig  = document.getElementById('inputGroupSelectVigencia');
    let vigQuery  = selecVig.options[selecVig.selectedIndex].value;

    switch (parseInt(depQuery)) {
        case 701:
        switch(parseInt(vigQuery))
        {
            case 2019: inversion = feature.properties.inver_vig_2019_701; break;
            case 2018: inversion = feature.properties.inver_vig_2018_701; break;
            case 2017: inversion = feature.properties.inver_vig_2017_701; break;
            case 2016: inversion = feature.properties.inver_vig_2016_701; break;
            case 2015: inversion = feature.properties.inver_vig_2015_701; break;
            case 2014: inversion = feature.properties.inver_vig_2014_701; break;
            case 2013: inversion = feature.properties.inver_vig_2013_701; break;
            case 2012: inversion = feature.properties.inver_vig_2012_701; break;
            case 2011: inversion = feature.properties.inver_vig_2011_701; break;
            case 2010: inversion = feature.properties.inver_vig_2010_701; break;
            case 2009: inversion = feature.properties.inver_vig_2009_701; break;
            case 2008: inversion = feature.properties.inver_vig_2008_701; break;
        }
        break;
        case 702:
        switch(parseInt(vigQuery))
        {
           case 2019: inversion = feature.properties.inver_vig_2019_702; break;
           case 2018: inversion = feature.properties.inver_vig_2018_702; break;
           case 2017: inversion = feature.properties.inver_vig_2017_702; break;
           case 2016: inversion = feature.properties.inver_vig_2016_702; break;
           case 2015: inversion = feature.properties.inver_vig_2015_702; break;
           case 2014: inversion = feature.properties.inver_vig_2014_702; break;
           case 2013: inversion = feature.properties.inver_vig_2013_702; break;
           case 2012: inversion = feature.properties.inver_vig_2012_702; break;
           case 2011: inversion = feature.properties.inver_vig_2011_702; break;
           case 2010: inversion = feature.properties.inver_vig_2010_702; break;
           case 2009: inversion = feature.properties.inver_vig_2009_702; break;
           case 2008: inversion = feature.properties.inver_vig_2008_702; break;
       }
        break;
        case 703:
        switch(parseInt(vigQuery))
        {
            case 2019: inversion = feature.properties.inver_vig_2019_703; break;
            case 2018: inversion = feature.properties.inver_vig_2018_703; break;
            case 2017: inversion = feature.properties.inver_vig_2017_703; break;
            case 2016: inversion = feature.properties.inver_vig_2016_703; break;
            case 2015: inversion = feature.properties.inver_vig_2015_703; break;
            case 2014: inversion = feature.properties.inver_vig_2014_703; break;
            case 2013: inversion = feature.properties.inver_vig_2013_703; break;
            case 2012: inversion = feature.properties.inver_vig_2012_703; break;
            case 2011: inversion = feature.properties.inver_vig_2011_703; break;
            case 2010: inversion = feature.properties.inver_vig_2010_703; break;
            case 2009: inversion = feature.properties.inver_vig_2009_703; break;
            case 2008: inversion = feature.properties.inver_vig_2008_703; break;
        }
        break;
        case 704:
        switch(parseInt(vigQuery))
        {
            case 2019: inversion = feature.properties.inver_vig_2019_704; break;
            case 2018: inversion = feature.properties.inver_vig_2018_704; break;
            case 2017: inversion = feature.properties.inver_vig_2017_704; break;
            case 2016: inversion = feature.properties.inver_vig_2016_704; break;
            case 2015: inversion = feature.properties.inver_vig_2015_704; break;
            case 2014: inversion = feature.properties.inver_vig_2014_704; break;
            case 2013: inversion = feature.properties.inver_vig_2013_704; break;
            case 2012: inversion = feature.properties.inver_vig_2012_704; break;
            case 2011: inversion = feature.properties.inver_vig_2011_704; break;
            case 2010: inversion = feature.properties.inver_vig_2010_704; break;
            case 2009: inversion = feature.properties.inver_vig_2009_704; break;
            case 2008: inversion = feature.properties.inver_vig_2008_704; break;
        }
    break;
    case 705:
        switch(parseInt(vigQuery))
        {
            case 2019: inversion = feature.properties.inver_vig_2019_705; break;
            case 2018: inversion = feature.properties.inver_vig_2018_705; break;
            case 2017: inversion = feature.properties.inver_vig_2017_705; break;
            case 2016: inversion = feature.properties.inver_vig_2016_705; break;
            case 2015: inversion = feature.properties.inver_vig_2015_705; break;
            case 2014: inversion = feature.properties.inver_vig_2014_705; break;
            case 2013: inversion = feature.properties.inver_vig_2013_705; break;
            case 2012: inversion = feature.properties.inver_vig_2012_705; break;
            case 2011: inversion = feature.properties.inver_vig_2011_705; break;
            case 2010: inversion = feature.properties.inver_vig_2010_705; break;
            case 2009: inversion = feature.properties.inver_vig_2009_705; break;
            case 2008: inversion = feature.properties.inver_vig_2008_705; break;
        }
        break;
    case 706:
        switch(parseInt(vigQuery))
        {
            case 2019: inversion = feature.properties.inver_vig_2019_706; break;
            case 2018: inversion = feature.properties.inver_vig_2018_706; break;
            case 2017: inversion = feature.properties.inver_vig_2017_706; break;
            case 2016: inversion = feature.properties.inver_vig_2016_706; break;
            case 2015: inversion = feature.properties.inver_vig_2015_706; break;
            case 2014: inversion = feature.properties.inver_vig_2014_706; break;
            case 2013: inversion = feature.properties.inver_vig_2013_706; break;
            case 2012: inversion = feature.properties.inver_vig_2012_706; break;
            case 2011: inversion = feature.properties.inver_vig_2011_706; break;
            case 2010: inversion = feature.properties.inver_vig_2010_706; break;
            case 2009: inversion = feature.properties.inver_vig_2009_706; break;
            case 2008: inversion = feature.properties.inver_vig_2008_706; break;
        }
        break;
        case 707:
            switch(parseInt(vigQuery))
            {
                case 2019: inversion = feature.properties.inver_vig_2019_707; break;
                case 2018: inversion = feature.properties.inver_vig_2018_707; break;
                case 2017: inversion = feature.properties.inver_vig_2017_707; break;
                case 2016: inversion = feature.properties.inver_vig_2016_707; break;
                case 2015: inversion = feature.properties.inver_vig_2015_707; break;
                case 2014: inversion = feature.properties.inver_vig_2014_707; break;
                case 2013: inversion = feature.properties.inver_vig_2013_707; break;
                case 2012: inversion = feature.properties.inver_vig_2012_707; break;
                case 2011: inversion = feature.properties.inver_vig_2011_707; break;
                case 2010: inversion = feature.properties.inver_vig_2010_707; break;
                case 2009: inversion = feature.properties.inver_vig_2009_707; break;
                case 2008: inversion = feature.properties.inver_vig_2008_707; break;
            }
            break;
            case 711:
                switch(parseInt(vigQuery))
                {
                    case 2019: inversion = feature.properties.inver_vig_2019_711; break;
                    case 2018: inversion = feature.properties.inver_vig_2018_711; break;
                    case 2017: inversion = feature.properties.inver_vig_2017_711; break;
                    case 2016: inversion = feature.properties.inver_vig_2016_711; break;
                    case 2015: inversion = feature.properties.inver_vig_2015_711; break;
                    case 2014: inversion = feature.properties.inver_vig_2014_711; break;
                    case 2013: inversion = feature.properties.inver_vig_2013_711; break;
                    case 2012: inversion = feature.properties.inver_vig_2012_711; break;
                    case 2011: inversion = feature.properties.inver_vig_2011_711; break;
                    case 2010: inversion = feature.properties.inver_vig_2010_711; break;
                    case 2009: inversion = feature.properties.inver_vig_2009_711; break;
                    case 2008: inversion = feature.properties.inver_vig_2008_711; break;
                }
                break;
              

}

    return {
        fillColor: getColor(inversion),
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