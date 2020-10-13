


async function indi(val){
  _buscaAvancelinea(val)
  _graphHistoryCumplimientoIndicador(val)
  componentelinea(val);
  programalinea(val);
}
  
async function _buscaAvancelinea(linea){
  try {
    let tabla=''
    fetch(`https://sse-pdm-back.herokuapp.com/pi/api/avance/line/${linea}`)
    .then(res=>res.json())
    .then(datos=>{
    
      _graphAvanceIndicador(datos.data[0].sum)
      _graphHistoryIndicador(datos.data[0].sum)
      _graphHistoryCumplimientoIndicador(datos.data[0].sum)

      fetch(`http://localhost:7000/pi/api/responsables/line/${linea}`)
      .then(res=>res.json())
      .then(response=>{
        console.log(response)
        let tam = response.data.length;
        document.getElementById('table_responsables').innerHTML="";
        for(var i =0; i<(tam) ;i++){
            tabla +='<tr  style="font-size: xx-small;">';
            tabla +='<td style="text-align: center; font-size: 10px;">'+(i+1)+'</td>';
            tabla +='<td style="text-align: left; font-size: 10px;">'+response.data[i].cod_responsable_reporte+'</td>';
            tabla +='<td style="text-align: left; font-size: 10px;">'+((response.data[i].nombre_dep))+'</td>';
            tabla +='<td style="text-align: center;font-size: 10px;">'+response.data[i].total_indicadores+'</td>';
                       tabla +='<tr>';
            document.getElementById('table_responsables').innerHTML=tabla;
        } 

      })
    })
    
  } catch (error) {
    console.log('Error _buscalinea')
  }

}

  
async function _graphAvanceIndicador(avance){

  const dataSource = {
      chart: {
        origw: "380",
        origh: "250",
        gaugestartangle: "135",
        gaugeendangle: "45",
        gaugeoriginx: "190",
        gaugeoriginy: "220",
        gaugeouterradius: "190",
        theme: "fusion",
        showvalue: "1",
        valuefontsize: "25",
        numbersuffix: "%",
      },
      colorrange: {
        color: [
          {
            minvalue: 0,
            maxvalue: 55,
            code: "#B4358B"
          },
          {
            minvalue: 55,
            maxvalue: 80,
            code: "#FFDC15"
          },
          {
            minvalue: 80,
            maxvalue: 100,
            code: "#009AB2"
          }
        ]
      },
      dials: {
        dial: [
          {
            value:Math.ceil(avance) ,
            tooltext: "% Avance"
          }
        ]
      }
    };
    
    FusionCharts.ready(function() {
      var myChart = new FusionCharts({
        type: "angulargauge",
        renderAt: "avance-indicador",
        width: "100%",
        height: "100%",
        dataFormat: "json",
        dataSource
      }).render();
    });
    


};


/*
async function _graphCumplimientoIndicador(cumple_2020){
  const dataSource = {
      chart: {
      
     
        origw: "380",
        origh: "250",
        gaugestartangle: "135",
        gaugeendangle: "45",
        gaugeoriginx: "190",
        gaugeoriginy: "220",
        gaugeouterradius: "190",
        theme: "fusion",
        showvalue: "1",
        valuefontsize: "25",
        numbersuffix: "%",
      },
      colorrange: {
        color: [
          {
            minvalue: 0,
            maxvalue: 55,
            code: "#B4358B"
          },
          {
            minvalue: 55,
            maxvalue: 80,
            code: "#FFDC15"
          },
          {
            minvalue: 80,
            maxvalue: 100,
            code: "#009AB2"
          }
        ]
      },
      dials: {
        dial: [
          {
            value: cumple_2020,
            tooltext: "% Cumplimiento"
          }
        ]
      }
    };
    
    FusionCharts.ready(function() {
      var myChart = new FusionCharts({
        type: "angulargauge",
        renderAt: "cumplimiento-indicador",
        width: "100%",
        height: "100%",
        dataFormat: "json",
        dataSource
      }).render();
    });
    


};
*/

async function _graphHistoryIndicador(avance2020){

  const dataSource = {
      chart: {
        caption: "Comportamiento Avance",
        subcaption: "(2020-2023)",
        charttopmargin: "10",
        numbersuffix: "%",
        theme: "gammel"
      },
      dataset: [
        {
          data: [
            {
              value: avance2020,
              tooltext: "2020: <b>$dataValue</b>"
            },
            {
              value: 0,
              tooltext: "2021 <b>$dataValue</b>"
            },
            {
              value: 0,
              tooltext: "2022: <b>$dataValue</b>"
            },
            {
              value: 0,
              tooltext: "2023: <b>$dataValue</b>"
            } ]
        }
      ]
    };
    
    FusionCharts.ready(function() {
      var myChart = new FusionCharts({
        type: "sparkcolumn",
        renderAt: "history-indicador",
        width: "100%",
        height: "100%",
        dataFormat: "json",
        dataSource
      }).render();
    });
    
}


async function _graphHistoryCumplimientoIndicador(avance_agosto_2020){

  const dataSource = {
      chart: {
        caption: "Comportamiento Cumplimiento",
        subcaption: "(2020)",
        charttopmargin: "10",
        numbersuffix: "%",
        theme: "gammel"
      },
      dataset: [
        {
          data: [
            
            {
              value: avance_agosto_2020,
              tooltext: "Agosto 2020: <b>$dataValue</b>"
            },
            {
              value: 0,
              tooltext: "Diciembre 2020: <b>$dataValue</b>"
            },
            {
              value: 0,
              tooltext: "Marzo 2021: <b>$dataValue</b>"
            },
            {
              value: 0,
              tooltext: "Junio 2021: <b>$dataValue</b>"
            },
            {
              value: 0,
              tooltext: "Octubre 2021: <b>$dataValue</b>"
            },
            {
              value: 0,
              tooltext: "Diciembre 2021: <b>$dataValue</b>"
            },
            {
              value: 0,
              tooltext: "Marzo 2022: <b>$dataValue</b>"
            },
            {
              value: 0,
              tooltext: "Junio 2022: <b>$dataValue</b>"
            },
            {
              value: 0,
              tooltext: "Octubre 2022: <b>$dataValue</b>"
            },
            {
              value: 0,
              tooltext: "Diciembre 2022: <b>$dataValue</b>"
            }
            ,
            {
              value: 0,
              tooltext: "Marzo 2023: <b>$dataValue</b>"
            },
            {
              value: 0,
              tooltext: "Junio 2023: <b>$dataValue</b>"
            }
            ,
            {
              value: 0,
              tooltext: "Octubre 2023: <b>$dataValue</b>"
            }
            ,
            {
              value: 0,
              tooltext: "Diciembre 2023: <b>$dataValue</b>"
            }
          ]
        }
      ]
    };
    
    FusionCharts.ready(function() {
      var myChart = new FusionCharts({
        type: "sparkcolumn",
        renderAt: "history-cumplimiento-indicador",
        width: "100%",
        height: "100%",
        dataFormat: "json",
        dataSource
      }).render();
    });
    
}



async function componentelinea(linea){
  try {
    let avance_Comp=[]; 
    let tabla='';
    fetch('https://sse-pdm-back.herokuapp.com/pi/api/componentes/avance/line/'+linea)
    .then(res=>res.json())
    .then(datos=>{
      console.log(datos)
      document.getElementById('tbl_comp').innerHTML="";
      let tam = datos.data.length;
      for(let i =0; i<tam;i++){
        if ((datos.data[i].cod_linea) =="1"){
          avance_Comp.push({
            "label" : datos.data[i].nom_componente,
            "value": Math.ceil((datos.data[i].peso_avance/datos.data[i].peso)*100)
          })
          tabla +='<tr >';
          tabla +='<td style="font-weight: 400; width: 10px;"">'+datos.data[i].cod_componente+'</td>';
          tabla +='<td style="text-align: left; font-size: 10px;">'+((datos.data[i].nom_componente))+'</td>';
          tabla +='<td style="font-weight: 400; width: 21px; text-align: center;"">'+datos.data[i].count+'</td>';
          tabla +='<td style="font-weight: 400; width: 21px; text-align: center;">'+Math.ceil((datos.data[i].peso_avance/datos.data[i].peso)*100) +'%</td>';
          tabla +='<tr>';
          document.getElementById('tbl_comp').innerHTML=tabla;
        }
      }
    
      })
  } catch (error) {
    console.log('Error : _Componentes ', error)
  }
 

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


async function graphComponente()
{
  const dataSource = {
    chart: {
      caption: "Componentes Línea "+ linea,
      subcaption: "Avance",
      xaxisname: "Componentes",
      yaxisname: "% Avance",
      numbersuffix: "%",
      theme: "zune"
    },
    data:avance_Comp1
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
