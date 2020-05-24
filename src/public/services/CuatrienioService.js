
//const fetch = require ('node-fetch');
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

function servCuatrienios(){
  const alonso = document.getElementById('alonso');
  const anibal = document.getElementById('anibal');
  const fico = document.getElementById('fico');

 fetch('http://localhost:4000/api/cuatrienios')
  .then(res =>res.json())
  .then(datos=>{
    // valores para la gráfica
    const grfAlonso =(parseInt(datos.data[0].alonso));
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
            "steps":  grfAlonso,
            "href": "data:image/jpeg;base64,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"
        }, {
            "name": "Gaviria",
            "steps": grfAnibal,
            "href": "data:image/jpeg;base64,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"
        }, {
            "name": "Gutiérrez",
            "steps": grfFico,
            "href": "data:image/jpeg;base64,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"
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
        series.tooltip.dy = - 30;
        series.columnsContainer.zIndex = 100;
        
        var columnTemplate = series.columns.template;
        columnTemplate.height = am4core.percent(50);
        columnTemplate.maxHeight = 50;
        columnTemplate.column.cornerRadius(60, 10, 60, 10);
        columnTemplate.strokeOpacity = 0;
        
        series.heatRules.push({ target: columnTemplate, property: "fill", dataField: "valueX", min: am4core.color("#e5dc36"), max: am4core.color("#5faa46") });
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

function servTotales(){
    
    fetch('http://localhost:4000/api/totales')
    .then(res=>res.json())
    .then(datos=>{
       

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


    let tam= (datos.data.length);



    for (var i = 0; i <(tam); i++) {
        data.push({ category: names[i], value: new Intl.NumberFormat('en-US', {style:'currency', currency:'USD'}).format(parseInt(datos.data[i].inversion_total)/1000000)});
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

    categoryAxis.renderer.labels.template.adapter.add("dx", function(dx, target) {
        return -target.maxRight /2;
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

function detallecomuna(comuna, nomcomuna){
    let localizada1 = document.getElementById('localizada1')
    let ciudad1 = document.getElementById('ciudad1')
    let pp1 = document.getElementById('pp1')
    let localizada2 = document.getElementById('localizada2')
    let ciudad2 = document.getElementById('ciudad2')
    let pp2 = document.getElementById('pp2')
    let localizada3 = document.getElementById('localizada3')
    let ciudad3 = document.getElementById('ciudad3')
    let pp3 = document.getElementById('pp3')

    fetch('http://localhost:4000/api/cuatrienios/detalle/'+ comuna)
    .then(res=>res.json())
    .then(datos=>{
        console.log(datos.data)
        console.log(datos.data[0].cod_comuna)
        localizada1.innerHTML= formatter.format(parseInt(datos.data[0].localizada2008_2011))
        ciudad1.innerHTML= formatter.format(Math.round(datos.data[0].percapita2008_2011))
        pp1.innerHTML=formatter.format(parseInt(datos.data[0].pp2008_2011))

        localizada2.innerHTML= formatter.format(parseInt(datos.data[0].localizada2012_2015))
        ciudad2.innerHTML= formatter.format(parseInt(datos.data[0].percapita2012_2015))
        pp2.innerHTML=formatter.format(parseInt(datos.data[0].pp2012_2015))

        localizada3.innerHTML= formatter.format(parseInt(datos.data[0].localizada2016_2019))
        ciudad3.innerHTML= formatter.format(parseInt(datos.data[0].percapita2016_2019))
        pp3.innerHTML=formatter.format(parseInt(datos.data[0].pp2016_2019))
        am4core.useTheme(am4themes_animated);
        // Themes end
        
        AmCharts.makeChart("chartdivmodal",
			{
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
            "graphs": [
            {
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
            "valueAxes": [
            {
                "axisTitleOffset": -1,
                "id": "ValueAxis-1",
                "synchronizationMultiplier": -30,
                "autoGridCount": false,
                "ignoreAxisWidth": false,
                "labelRotation": -55.8,
                "minHorizontalGap": 70,
                "title": "Total Inversión (cifras en millones)",
                "titleBold": true
            }
            ],
                "allLabels": [],
                "balloon": {},
                "legend": {
                "enabled": true,
                "useGraphSettings": true
            },
            "titles": [
            {
                "id": "Title-1",
                "size": 12,
                "text": "Inversión Cuatrienios en la comuna  "+nomcomuna,
            }
            ],
            "dataProvider": [
            {
                "Cuatrienio": "2008-2011",
                "Localizada": Math.round((parseInt(datos.data[0].localizada2008_2011)/1000000)) ,
                "Ciudad":Math.round((parseInt(datos.data[0].percapita2008_2011)/1000000)) ,
                "PP": Math.round((parseInt(datos.data[0].pp2008_2011)/1000000))
            },
            {
                "Cuatrienio": "2012-2015",
                "Localizada": Math.round((parseInt(datos.data[0].localizada2012_2015)/1000000)),
                "Ciudad":Math.round((parseInt(datos.data[0].percapita2012_2015)/1000000)) ,
                "PP": Math.round(parseInt(datos.data[0].pp2012_2015)/1000000)
            },
            {
                "Cuatrienio": "2016-2019",
                "Localizada":Math.round((parseInt(datos.data[0].localizada2016_2019)/1000000)),
                "Ciudad":Math.round((parseInt(datos.data[0].percapita2016_2019)/1000000)) ,
                "PP": Math.round((parseInt(datos.data[0].pp2016_2019)/1000000))
            }
            ]
            }
		);
  
       $('#exampleModal').modal('show');
       $(".modal-title").text(nomcomuna); 


      
    })

 



}