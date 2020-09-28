 componentelinea(1);
programalinea(1);
  
async function componentelinea(linea){

    const dataSource = {
        chart: {
          caption: "Componentes Línea "+ linea,
          subcaption: "Avance",
          xaxisname: "Componentes",
          yaxisname: "% Avance",
          numbersuffix: "%",
          theme: "zune"
        },
        data: [
          {
            label: "Talento Humano y Empleo",
            value: "290"
          },
          {
            label: "Ciencia, Tecnología, Innovación y Emprendimiento: CTI + E",
            value: "260"
          },
          {
            label: "Productividad, competitividad e internacionalización",
            value: "180"
          },
          {
            label: "	Información, datos y generación de valor público",
            value: "140"
          },
          {
            label: "Inglés para Valle del Software",
            value: "115"
          }
        ]
      };
      
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "column2d",
          renderAt: "linea-componente",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });
    

}

async function programalinea(linea){

    const dataSource = {
        chart: {
          caption: "Programas Línea"+ linea,
          subcaption: "Avance",
          xaxisname: "Programas",
          yaxisname: "% Avance)",
          numbersuffix: "%",
          theme: "zune"
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
          }
        ]
      };
      
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "column2d",
          renderAt: "linea-programa",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });
    

}