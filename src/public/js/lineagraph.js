//import fetch from "node-fetch";

var dataSet = [];

async function indi(val){
  setTimeout(function(){ _buscaAvancelinea(val)   }, 3500);
  _tbl_Indicadores(val)
  alerta_linea(val)
  _graphCumplimientoPptal(val)
  document.getElementById('num_linea').innerHTML= val
}
  
async function _buscaAvancelinea(linea){
  try {
    let tabla=''
   let avance_Dep_Line=[];
    fetch(`https://sse-pdm-back.herokuapp.com/pi/api/avance/line/${linea}`)
    .then(res=>res.json())
    .then(datos=>{
    
      _graphAvanceIndicador(datos.data[0].sum)
   

      fetch(`https://sse-pdm-back.herokuapp.com/pi/api/responsables/line/${linea}`)
      .then(res=>res.json())
      .then(response=>{
 
        let tam = response.data.length;
        document.getElementById('table_responsables').innerHTML="";
        for(var i =0; i<(tam) ;i++){
          avance_Dep_Line.push({
            label: response.data[i].nombre_dep,
              value: ((response.data[i].pesoxavnt/response.data[i].peso)*100).toFixed(2),
          })
            tabla +='<tr  style="font-size: xx-small;">';
            tabla +='<td style="text-align: center; font-size: 10px;">'+(i+1)+'</td>';
            tabla +='<td style="text-align: left; font-size: 10px;">'+response.data[i].cod_responsable_reporte+'</td>';
            tabla +='<td style="text-align: left; font-size: 10px;">'+((response.data[i].nombre_dep))+'</td>';
            tabla +='<td style="text-align: center;font-size: 10px;">'+response.data[i].total_indicadores+'</td>';
            tabla +='<td style="text-align: center;font-size: 10px;">'+((response.data[i].pesoxavnt/response.data[i].peso)*100).toFixed(2)+'%</td>';
            tabla +='<tr>';
            document.getElementById('table_responsables').innerHTML=tabla;
        } 

      avance_Dep_Line.sort((a, b) => b.value - a.value)
        
        const dataSource = {
          chart: {
            caption: "Avance por Dependencias",
            subcaption: `Avance de Dependencias con Indicadores en la línea${linea}`,
            xaxisname: "Dependencias",
            yaxisname: "Avance",
            numbersuffix: "%",
            theme: "zune"
          },
          data:avance_Dep_Line
        };
        
        FusionCharts.ready(function() {
          var myChart = new FusionCharts({
            type: "bar2d",
            renderAt: "cumplimiento-linea-dep",
            width: "100%",
            height: "100%",
            dataFormat: "json",
            dataSource
          }).render();
        });
        

  


      })



    })
    
  } catch (error) {
    console.log('Error _buscalinea')
  }

}

async function _graphAvanceIndicador(avance){
  const dataSource = {
      chart: {
        theme: "fusion",
        showvalue: "1",
        valuefontsize: "25",
        numbersuffix: "%",
      },
      colorrange: {
        color: [
          {
            minvalue: 0,
            maxvalue: document.getElementById('minimo-corte').value,
            code: "#B4358B"
          },
          {
            minvalue:  document.getElementById('minimo-corte').value,
            maxvalue:  document.getElementById('maximo-corte').value,
            code: "#FFDC15"
          },
          {
            minvalue: document.getElementById('maximo-corte').value,
            maxvalue: 100,
            code: "#00853E"
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
      },
      trendpoints: {
        point: [
          {
            startvalue:  document.getElementById('maximo-corte').value,
            displayvalue: "Esperado",
            thickness: "4",
            color: "#E15A26",
            usemarker: "1",
            markerbordercolor: "#E15A26",
            markertooltext:  document.getElementById('maximo-corte').value + "%"
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

async function _graphCumplimientoPptal(linea){
  try {
  
    fetch(`https://sse-pdm-back.herokuapp.com/pi/api/line/financiera/${linea}`)
    .then(res=>res.json())
    .then(datos=>{
      const dataSource = {
        chart: {
          caption: `Ejecución Presupuestal Línea  ${linea}`,
          //subcaption: "" ,
          //xaxisname: "Month",
          yaxisname: "Cifras en miillones de pesos (In COP)",
          drawcrossline: "1",
          numberprefix: "$",
          formatnumberscale: "0",
          plottooltext: "<b>$seriesName</b> expense in $label was <b>$$dataValue</b>",
          theme: "zune",
          showvalues: "1"
        },
        categories: [
          {
            category: [
              {
                label: "Presupuesto"
              }
            ]
          }
        ],
        dataset: [
          {
            seriesname: "Ajustado",
            data: [
              {
                value: datos.data[0].pptoajustado/1000000
              }
            ]
          }, {
            seriesname: "Ejecutado",
            data: [
              {
                value: datos.data[0].ejecutado/1000000
              }
            ]
          },
        ]
      };
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "overlappedbar2d",
          renderAt: "ejecucion-pptal",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });
      componentelinea(linea);
      programalinea(linea);
    })
  } catch (error) {
    console.error('Error _graphCumplimientoPptal', error)
  }
};


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
        if ((Math.ceil((datos.data[i].peso_avance/datos.data[i].peso)*100))>=document.getElementById('maximo-corte').value){colorsemaf="#58ac84"}
        else if ((Math.ceil((datos.data[i].peso_avance/datos.data[i].peso)*100))<=document.getElementById('minimo-corte').value) {colorsemaf="#f06764"}
         else {colorsemaf="#ffbd2e"}
          avance_Comp.push({
            "label" : datos.data[i].nom_componente,
            "value": ((datos.data[i].peso_avance/datos.data[i].peso)*100).toFixed(2),
            "color": colorsemaf
          })
          tabla +='<tr >';
          tabla +='<td style="font-weight: 400; width: 10px;"">'+datos.data[i].cod_componente+'</td>';
          tabla +='<td style="text-align: left; font-size: 10px;">'+((datos.data[i].nom_componente))+'</td>';
          tabla +='<td style="font-weight: 400; width: 21px; text-align: center;"">'+datos.data[i].count+'</td>';
          tabla +='<td style="font-weight: 400; width: 21px; text-align: center;">'+((datos.data[i].peso_avance/datos.data[i].peso)*100).toFixed(2) +'%</td>';
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
        if ((Math.ceil((datos.data[i].peso_avance/datos.data[i].peso)*100))>=document.getElementById('maximo-corte').value){colorsemaf="#58ac84"}
        else if ((Math.ceil((datos.data[i].peso_avance/datos.data[i].peso)*100))<=document.getElementById('minimo-corte').value) {colorsemaf="#f06764"}
         else {colorsemaf="#ffbd2e"}
        avance_Prg.push({
          "label": datos.data[i].nom_programa,
          "value": ((datos.data[i].peso_avance/datos.data[i].peso)*100).toFixed(2),
          "color": colorsemaf
        })

        tabla_prg +='<tr >';
        tabla_prg +='<td style="font-weight: 400; width: 10px;"">'+datos.data[i].cod_programa+'</td>';
        tabla_prg +='<td style="text-align: left; font-size: 10px;">'+((datos.data[i].nom_programa))+'</td>';
        tabla_prg +='<td style="font-weight: 400; width: 21px; text-align: center;"">'+datos.data[i].count+'</td>';
        tabla_prg +='<td style="font-weight: 400; width: 21px; text-align: center;">'+((datos.data[i].peso_avance/datos.data[i].peso)*100).toFixed(2) +'%</td>';
        tabla_prg +='<tr>';
        document.getElementById('tbl_programa').innerHTML=tabla_prg;

      }
           avance_Prg.sort((a, b) => b.value - a.value)

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
          type: "bar2d",
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
      let back_semafav='';
      let tam = response.data.length;
     // document.getElementById('tbl_indicadores_linea').innerHTML="";
  
    
      for(var i =0; i<(tam) ;i++){
    
        if ((response.data[i].semafav ) == 0)
        {
          back_semafav =  ` <i class="fa fa-clock-o fa-3x" ></i>`;
        }
        if ((response.data[i].semafav )== 1){
          back_semafav =  ` <i class="fa fa-times-circle fa-3x"style="color: #ff6b6b;"> </i>`;
        }
        if ((response.data[i].semafav) == 2){
          back_semafav =  ` <i class="fa fa-minus-circle fa-3x" style="color: #ff922b;"></i>`;
        }
        if ((response.data[i].semafav )== 3){
          back_semafav =  `<i class="fa fa-check-circle fa-3x" style="color: #51cf66;"></i>`;
        }
   

        dataSet.push([  
          response.data[i].cod_linea,
          response.data[i].cod_componente,
          response.data[i].cod_programa,
          response.data[i].cod_indicador,
          response.data[i].nom_indicador,
          response.data[i].tipo_ind ,
          response.data[i].lb_ind,
          response.data[i].meta_plan,
          response.data[i].unidad,
          ((response.data[i].pesoxavnt/response.data[i].peso)*100).toFixed(2)+'%',
          back_semafav, 
          response.data[i].nombre_dep
        ] )

      /*
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
          tabla3 +='<td style="text-align: center;font-size: 10px;">'+((response.data[i].pesoxavnt/response.data[i].peso)*100).toFixed(2)+'%</td>';
          tabla3+=back_semafav;
         
          tabla3 +='<td style="text-align: center;font-size: 10px;">'+response.data[i].nombre_dep+'</td>';
          tabla3 +='<tr>';
         document.getElementById('tbl_indicadores_linea').innerHTML=tabla3;
      */

      } 

      document.getElementById('num_linea_tbl_ind').innerHTML= linea
      $('#example').DataTable( {
          data: dataSet,
          columns: [
              { title: "Cod_Línea" },
              { title: "Cod_compenente" },
              { title: "Cod_Programa" },
              { title: "Cod_Inidicador" },
              { title: "Indicador" },
              { title: "Tipo Indi" },
              { title: "Línea Base" },
              { title: "Meta Plan" },
              { title: "Unidad" },
              { title: "Avance" },
              { title: "Estado" },
              { title: "Responsable" }
          ] ,scrollY:        "500px",
            scrollCollapse: true,
            stateSave: true
      } );

    })
  } catch (error) {
    console.log('Error _tbl_Indicadores ', error)
  }

}

 async function alerta_linea(linea){
  try {
    fetch(`https://sse-pdm-back.herokuapp.com/pi/api/line/semafav/${linea}`)
    .then(res=>res.json()).then(datos=>{

      const dataSource = {
        chart: {
          caption: "Semáforo Estado de Cumplimiento de Indicadores",
          yaxisname: "Número de Indicadores de Producto",
          aligncaptionwithcanvas: "0",
          plottooltext: "<b>$dataValue</b> leads received",
          theme: "zune",
        },
        data: [
          {
            label: "Alto",
            value: datos.data[0].verde,
            color: "#58ac84"
          },
          {
            label: "Medio",
            value: datos.data[0].amarillo,
            color: "#ffbd2e"
          },
          {
            label: "Bajo",
            value: datos.data[0].rojo,
             color: "#f06764"
          },
          {
            label: "No programado",
            value: datos.data[0].gris,
             color: "#B2B1A7"
          },
         
        ]
      };
      
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "bar2d",
          renderAt: "chart-alerta",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });

    })
  } catch (error) {
    console.error('Eror alerta_linea ', error)
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