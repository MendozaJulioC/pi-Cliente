async function inicia(){
    estado()
    comunas()
    sumaobrasgeo()
    alertaobra()
}

const comunas = async (req, res)=>{
    var container = L.DomUtil.get('map1');
    if(container != null){
        container._leaflet_id = null;
    }
    var map1 = L.map('map1', {
        // Set latitude and longitude of the map center (required)
        center: [6.2508, -75.5738],
        // Set the initial zoom level, values 0-18, where 0 is most zoomed-out (required)
        zoom: 12,
      
      });
      // Create a Tile Layer and add it to the map
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map1);
    map1.whenReady(() => {
        setTimeout(() => {map1.invalidateSize();}, 200);
    })
}

async function estado(){
    const dataSource = {
        chart: {
          caption: "Etapas",
          subcaption: "Estado actual de la obra",
          showpercentvalues: "0",
          defaultcenterlabel: "Estado",
          aligncaptionwithcanvas: "0",
          captionpadding: "0",
          formatnumberscale: "0",
          plottooltext:
            "<b>$percentValue</b> <b>$label</b>",
          centerlabel: "<b>$label</b> $value",
          theme: "zune"
        },
        data: [
          {
            label: "Estudios Preliminares",
            value: "64"
          },
          {
            label: "Gestión social y predial",
            value: "6"
          },
          {
            label: "Diseños",
            value: "65"
          },
          {
            label: "Proceso de contratación",
            value: "28"
          },
          {
            label: "Etapa constructiva",
            value: "204"
          },
          {
            label: "Obra ejecutada",
            value: "652"
          }
        ]
      };
      
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "doughnut2d",
          renderAt: "estadomain",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });
 
}



async function sumaobrasgeo()
{
    const dataSource = {
        chart: {
          caption: "Lead sources by industry",
          yaxisname: "Number of Leads",
          aligncaptionwithcanvas: "0",
          plottooltext: "<b>$dataValue</b> leads received",
          theme: "ocean"
        },
        data: [
          {
            label: "Travel & Leisure",
            value: "41"
          },
          {
            label: "Advertising/Marketing/PR",
            value: "39"
          },
          {
            label: "Other",
            value: "38"
          },
          {
            label: "Real Estate",
            value: "32"
          },
          {
            label: "Communications/Cable/Phone",
            value: "26"
          },
          {
            label: "Construction",
            value: "25"
          },
          {
            label: "Entertainment",
            value: "25"
          },
          {
            label: "Staffing Firm/Full Time/Temporary",
            value: "24"
          },
          {
            label: "Transportation/Logistics",
            value: "23"
          },
          {
            label: "Utilities",
            value: "22"
          },
          {
            label: "Aerospace/Defense Products",
            value: "18"
          },
          {
            label: "Banking/Finance/Securities",
            value: "16"
          },
          {
            label: "Consumer Products - Non-Durables",
            value: "15"
          },
          {
            label: "Distribution",
            value: "13"
          },
          {
            label: "Education",
            value: "12"
          },
          {
            label: "Health Products & Services",
            value: "11"
          },
          {
            label: "Hospitality & Hotels",
            value: "10"
          },
          {
            label: "Non-Business/Residential",
            value: "6"
          },
          {
            label: "Pharmaceutical",
            value: "4"
          },
          {
            label: "Printing & Publishing",
            value: "1"
          },
          {
            label: "Professional Services",
            value: "1"
          }
        ]
      };
      
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "column2d",
          renderAt: "geoobra",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });
      sumaobrasdep()
}

async function sumaobrasdep()
{
    const dataSource = {
        chart: {
          caption: "Lead sources by industry",
          yaxisname: "Number of Leads",
          aligncaptionwithcanvas: "0",
          plottooltext: "<b>$dataValue</b> leads received",
          theme: "zune"
        },
        data: [
          {
            label: "Travel & Leisure",
            value: "41"
          },
          {
            label: "Advertising/Marketing/PR",
            value: "39"
          },
          {
            label: "Other",
            value: "38"
          },
          {
            label: "Real Estate",
            value: "32"
          },
          {
            label: "Communications/Cable/Phone",
            value: "26"
          },
          {
            label: "Construction",
            value: "25"
          },
          {
            label: "Entertainment",
            value: "25"
          },
          {
            label: "Staffing Firm/Full Time/Temporary",
            value: "24"
          },
          {
            label: "Transportation/Logistics",
            value: "23"
          },
          {
            label: "Utilities",
            value: "22"
          },
          {
            label: "Aerospace/Defense Products",
            value: "18"
          },
          {
            label: "Banking/Finance/Securities",
            value: "16"
          },
          {
            label: "Consumer Products - Non-Durables",
            value: "15"
          },
          {
            label: "Distribution",
            value: "13"
          },
          {
            label: "Education",
            value: "12"
          },
          {
            label: "Health Products & Services",
            value: "11"
          },
          {
            label: "Hospitality & Hotels",
            value: "10"
          },
          {
            label: "Non-Business/Residential",
            value: "6"
          },
          {
            label: "Pharmaceutical",
            value: "4"
          },
          {
            label: "Printing & Publishing",
            value: "1"
          },
          {
            label: "Professional Services",
            value: "1"
          }
        ]
      };
      
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "bar2d",
          renderAt: "depobra",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });
      
}


async function alertaobra(){
    am4core.ready(function() {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end
        
        
        
        // Create chart instance
        var chart = am4core.create("chartdiv", am4charts.RadarChart);
        
        // Add data
        chart.data = [{
          "category": "Gestión del proceso",
          "value": 0,
          "full": 100
        }, {
          "category": "Criterio técnico",
          "value": 35,
          "full": 100
        }, {
          "category": "Cumplimiento",
          "value": 92,
          "full": 100
        }, {
          "category": "Déficit presupuestal",
          "value": 68,
          "full": 100
        }
        , {
            "category": "Funcionamiento",
            "value": 68,
            "full": 100
          }, {
            "category": "Múltiples alertas",
            "value": 68,
            "full": 100
          }, {
            "category": "Suspendida",
            "value": 0,
            "full": 100
          }, {
            "category": "Siguiente Administración",
            "value": 68,
            "full": 100
          }
    
    ];
        
        // Make chart not full circle
        chart.startAngle = -90;
        chart.endAngle = 180;
        chart.innerRadius = am4core.percent(20);
        
        // Set number format
        chart.numberFormatter.numberFormat = "#.#";
        
        // Create axes
        var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "category";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.grid.template.strokeOpacity = 0;
        categoryAxis.renderer.labels.template.horizontalCenter = "right";
        categoryAxis.renderer.labels.template.fontWeight = 500;
        categoryAxis.renderer.labels.template.adapter.add("fill", function(fill, target) {
          return (target.dataItem.index >= 0) ? chart.colors.getIndex(target.dataItem.index) : fill;
        });
        categoryAxis.renderer.minGridDistance = 10;
        
        var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.grid.template.strokeOpacity = 0;
        valueAxis.min = 0;
        valueAxis.max = 100;
        valueAxis.strictMinMax = true;
        
        // Create series
        var series1 = chart.series.push(new am4charts.RadarColumnSeries());
        series1.dataFields.valueX = "full";
        series1.dataFields.categoryY = "category";
        series1.clustered = false;
        series1.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
        series1.columns.template.fillOpacity = 0.08;
        series1.columns.template.cornerRadiusTopLeft = 20;
        series1.columns.template.strokeWidth = 0;
        series1.columns.template.radarColumn.cornerRadius = 20;
        
        var series2 = chart.series.push(new am4charts.RadarColumnSeries());
        series2.dataFields.valueX = "value";
        series2.dataFields.categoryY = "category";
        series2.clustered = false;
        series2.columns.template.strokeWidth = 0;
        series2.columns.template.tooltipText = "{category}: [bold]{value}[/]";
        series2.columns.template.radarColumn.cornerRadius = 20;
        
        series2.columns.template.adapter.add("fill", function(fill, target) {
          return chart.colors.getIndex(target.dataItem.index);
        });
        
        // Add cursor
        chart.cursor = new am4charts.RadarCursor();
        
        }); // end am4core.ready()
}