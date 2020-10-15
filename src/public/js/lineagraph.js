



async function indi(val){
  _buscaAvancelinea(val)
  _graphHistoryCumplimientoIndicador(val)
  componentelinea(val);
  programalinea(val);
  _tbl_Indicadores(val)

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
  
      document.getElementById('tbl_comp').innerHTML="";
      let tam = datos.data.length;
      for(let i =0; i<tam;i++){
      
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
        const dataSource = {
          chart: {
            caption: "Componentes Línea "+ linea,
            subcaption: "Avance",
            xaxisname: "Componentes",
            yaxisname: "% Avance",
            numbersuffix: "%",
            theme: "zune"
          },
          data:avance_Comp
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
    
      })
  } catch (error) {
    console.log('Error : _Componentes ', error)
  }
 

}

async function programalinea(linea){

  try {
    let avance_Prg =[];
    let tabla_prg='';
    fetch(`https://sse-pdm-back.herokuapp.com/pi/api/programas/avance/line/${linea}`)
    .then(res=> res.json())
    .then(datos=>{
      document.getElementById('tbl_programa').innerHTML="";
      let tam = datos.data.length;
      for(let i =0; i <tam; i++){
        avance_Prg.push({
          "label": datos.data[i].cod_programa,
          "value": Math.ceil((datos.data[i].peso_avance/datos.data[i].peso)*100)
        })
        tabla_prg +='<tr >';
        tabla_prg +='<td style="font-weight: 400; width: 10px;"">'+datos.data[i].cod_programa+'</td>';
        tabla_prg +='<td style="text-align: left; font-size: 10px;">'+((datos.data[i].nom_programa))+'</td>';
        tabla_prg +='<td style="font-weight: 400; width: 21px; text-align: center;"">'+datos.data[i].count+'</td>';
        tabla_prg +='<td style="font-weight: 400; width: 21px; text-align: center;">'+Math.ceil((datos.data[i].peso_avance/datos.data[i].peso)*100) +'%</td>';
        tabla_prg +='<tr>';
        document.getElementById('tbl_programa').innerHTML=tabla_prg;

      }
      const dataSource = {
        chart: {
          caption: "Programas Línea"+ linea,
          subcaption: "Avance",
          xaxisname: "Programas",
          yaxisname: "% Avance)",
          numbersuffix: "%",
          theme: "zune"
        },
        data: avance_Prg
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
    })
   

  } catch (error) {
    console.log('Error prgramalinea ', error)
  }





 
    
   
  

}


async function _tbl_Indicadores(linea)
{
  try {
    let tabla3 ='';
    fetch(`https://sse-pdm-back.herokuapp.com/pi/api/line/indicadores/resumen/${linea}`)
    .then(res=>res.json())
    .then(response=>{

      let tam = response.data.length;
      document.getElementById('tbl_indicadores_linea').innerHTML="";
      for(var i =0; i<(tam) ;i++){
   
          tabla3 +='<tr  style="font-size: xx-small;">';
          tabla3 +='<td style="text-align: center; font-size: 8px;">'+(i+1)+'</td>';
          tabla3 +='<td style="text-align: center; font-size: 10px;">'+response.data[i].cod_linea+'</td>';
          tabla3 +='<td style="text-align: center; font-size: 10px;">'+((response.data[i].cod_componente))+'</td>';
          tabla3 +='<td style="text-align: center;font-size: 10px;">'+response.data[i].cod_programa+'</td>';
          tabla3 +='<td style="text-align: center;font-size: 10px;">'+response.data[i].cod_indicador+'</td>';
          tabla3 +='<td style="text-align: left;font-size: 10px;">'+response.data[i].nom_indicador+'</td>';
          tabla3 +='<td style="text-align: center;font-size: 10px;">'+response.data[i].tipo_ind+'</td>';
          tabla3 +='<td style="text-align: center;font-size: 10px;">'+response.data[i].lb_ind+'</td>';
          tabla3 +='<td style="text-align: center;font-size: 10px;">'+response.data[i].meta_plan+'</td>';
          tabla3 +='<td style="text-align: center;font-size: 10px;">'+response.data[i].unidad+'</td>';
          tabla3 +='<td style="text-align: center;font-size: 10px;">'+Math.ceil(response.data[i].avance)+'%</td>';
          tabla3 +='<td style="text-align: center;font-size: 10px;">'+response.data[i].logro_2020+'</td>';
          tabla3 +='<td style="text-align: center;font-size: 10px;">'+response.data[i].nombre_dep+'</td>';
          tabla3 +='<tr>';
          document.getElementById('tbl_indicadores_linea').innerHTML=tabla3;
      } 




    })
  } catch (error) {
    console.log('Error _tbl_Indicadores ', error)
  }



}



$(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#tbl_indicadores_linea tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});