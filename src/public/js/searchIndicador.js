var avance_cuatrienio= 0;
var cumplimiento_logro=0;



focusMethod = function getFocus() {           
    document.getElementById("indicadorquery").focus();
  }


async function indi(){
    _graphAvanceIndicador()
    _graphCumplimientoIndicador()
    _graphHistoryIndicador()
    _graphHistoryCumplimientoIndicador()
}

  
  async function _graphAvanceIndicador(avance_cuatrienio){

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
              value: "52",
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
              value: 20,
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


async function _graphHistoryIndicador(cumple_2020, cumple_2021, cumple_2022, cumple_2023){

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
                value: 20,
                tooltext: "2020: <b>$dataValue</b>"
              },
              {
                value: 21,
                tooltext: "2021 <b>$dataValue</b>"
              },
              {
                value: 22,
                tooltext: "2022: <b>$dataValue</b>"
              },
              {
                value: 23,
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


async function _graphHistoryCumplimientoIndicador(){

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
                value: "56.42",
                tooltext: "Junio 2020: <b>$dataValue</b>"
              },
              {
                value: "63.61",
                tooltext: "Octubre 2020: <b>$dataValue</b>"
              },
              {
                value: "67.36",
                tooltext: "Diciembre 2020: <b>$dataValue</b>"
              },
              {
                value: "60.59",
                tooltext: "Marzo 2021: <b>$dataValue</b>"
              },
              {
                value: "64.89",
                tooltext: "Junio 2021: <b>$dataValue</b>"
              },
              {
                value: "24.60",
                tooltext: "Octubre 2021: <b>$dataValue</b>"
              },
              {
                value: "77.93",
                tooltext: "Diciembre 2021: <b>$dataValue</b>"
              },
              {
                value: "81.04",
                tooltext: "Marzo 2022: <b>$dataValue</b>"
              },
              {
                value: "71.20",
                tooltext: "Junio 2022: <b>$dataValue</b>"
              },
              {
                value: 90.37,
                tooltext: "Octubre 2022: <b>$dataValue</b>"
              },
              {
                value: "73.53",
                tooltext: "Diciembre 2022: <b>$dataValue</b>"
              }
              ,
              {
                value: "73.53",
                tooltext: "Marzo 2023: <b>$dataValue</b>"
              },
              {
                value: "73.53",
                tooltext: "Junio 2023: <b>$dataValue</b>"
              }
              ,
              {
                value: "73.53",
                tooltext: "Octubre 2023: <b>$dataValue</b>"
              }
              ,
              {
                value: "73.53",
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


async function _getBuscaNombreIndicador(){
    let nom_Indicador = document.getElementById('browser').value
   
    try {
        fetch(`https://sse-pdm-back.herokuapp.com/pi/api/indicador/consulta/nombre/${nom_Indicador}`)
        .then(res=>res.json())
        .then(datos=>{
           
            if(datos.data.length>0){
            document.getElementById('nom_indicador1').innerHTML= datos.data[0].nom_indicador
            document.getElementById('metaplan1').innerHTML= datos.data[0].meta_plan
            document.getElementById('logroacumulado1').innerHTML= datos.data[0].logro_acumulado
            document.getElementById('peso-indicador').innerHTML=(datos.data[0].peso).substring(0,6)

//1.Información General
            document.getElementById('nom_indicador2').innerHTML= datos.data[0].nom_indicador
            document.getElementById('_cod_linea').value= datos.data[0].cod_linea
            document.getElementById('_nom_linea').value= datos.data[0].nom_linea
            document.getElementById('_cod_componente').value= datos.data[0].cod_componente
            document.getElementById('_nom_componente').value= datos.data[0].nom_componente
            document.getElementById('_cod_programa').value= datos.data[0].cod_programa
            document.getElementById('_nom_programa').value= datos.data[0].nom_programa
            document.getElementById('_cod_indicador').value= datos.data[0].cod_indicador
            document.getElementById('_nom_indicador3').value= datos.data[0].nom_indicador
            document.getElementById('definicion').value= datos.data[0].defincion
            document.getElementById('objetivo').value= datos.data[0].objetivo
//2. Seguimiento
            document.getElementById('_tipo_ind').value= datos.data[0].tipo_ind
            document.getElementById('_meta_plan').value= datos.data[0].meta_plan
            document.getElementById('_unidad').value= datos.data[0].unidad
            document.getElementById('_sentido').value= datos.data[0].sentido
            document.getElementById('_comportamiento').value= datos.data[0].comportamiento_deseado
            document.getElementById('_fc').value= datos.data[0].fc
            document.getElementById('lb').value= datos.data[0].lb_ind
            document.getElementById('incluye_lb').value= datos.data[0].incluye_lb
            document.getElementById('vigenia_lb').value= datos.data[0].vigencia_lb
            document.getElementById('tipo_lb').value= datos.data[0].tipo_lb
            document.getElementById('peso').value= datos.data[0].peso
            document.getElementById('periocidad').value= datos.data[0].periocidad_generacion

            document.getElementById('formula_indicador').value= datos.data[0].formula_indicador
            document.getElementById('descripcion_variable').value= datos.data[0].variable_operativa

            document.getElementById('meta_2020').value= datos.data[0].meta_2020
            document.getElementById('logro_2020').value= datos.data[0].logro_2020
            document.getElementById('cumple_2020').value= datos.data[0].cumple_2020

            document.getElementById('meta_2021').value= datos.data[0].meta_2021
            document.getElementById('logro_2021').value= datos.data[0].logro_2021
            document.getElementById('cumple_2021').value= datos.data[0].cumple_2021

            document.getElementById('meta_2022').value= datos.data[0].meta_2022
            document.getElementById('logro_2022').value= datos.data[0].logro_2022
            document.getElementById('cumple_2022').value= datos.data[0].cumple_2022

            document.getElementById('meta_2023').value= datos.data[0].meta_2023
            document.getElementById('logro_2023').value= datos.data[0].logro_2023
            document.getElementById('cumple_2023').value= datos.data[0].cumple_2023


//3. Responsables y observaciones


            document.getElementById('fuente').value= datos.data[0].fuente
            document.getElementById('tipo_fuente').value= datos.data[0].tipo_fuente


            document.getElementById('_responsable_plan').value= datos.data[0].responsable_plan
            document.getElementById('_cod_responsable_reporte').value= datos.data[0].cod_responsable_reporte
            document.getElementById('_nombre_dep').value= datos.data[0].nombre_dep
            document.getElementById('_instrumento_recoleccion').value= datos.data[0].instrumento_recoleccion
            document.getElementById('_responsable_reporte').value= datos.data[0].responsable_reporte
            document.getElementById('_observaciones').value= datos.data[0].observaciones



            //enviar datos a gráficas
             _graphAvanceIndicador(datos.data[0].avance_cuatrienio)
             _graphCumplimientoIndicador(datos.data[0].cumple_2020)
             _graphHistoryIndicador(datos.data[0].cumple_2020, datos.data[0].cumple_2021, datos.data[0].cumple_2022, datos.data[0].cumple_2023 )
            }
            else{
                alert('Por favor verifica el código del Indicador')
                document.getElementById('browser').value="";
                document.getElementById("browser").focus();
            }
        });
    } catch (error) {
        
    }
   
 }


 async function _getBuscaCodigoIndicador(){
    let cod_Indicador = document.getElementById('browser').value
    if (cod_Indicador.length>=5){

        try {
            fetch(`https://sse-pdm-back.herokuapp.com/pi/api/indicador/${cod_Indicador}`)
            .then(res => res.json())
            .then(datos => {

                if(datos.data.length>0){
                    document.getElementById('nom_indicador1').innerHTML= datos.data[0].nom_indicador
                    document.getElementById('metaplan1').innerHTML= datos.data[0].meta_plan
                    document.getElementById('logroacumulado1').innerHTML= datos.data[0].logro_acumulado
                    document.getElementById('peso-indicador').innerHTML=Math.round10(datos.data[0].peso,5)
        
        //1.Información General
                    document.getElementById('nom_indicador2').innerHTML= datos.data[0].nom_indicador
                    document.getElementById('_cod_linea').value= datos.data[0].cod_linea
                    document.getElementById('_nom_linea').value= datos.data[0].nom_linea
                    document.getElementById('_cod_componente').value= datos.data[0].cod_componente
                    document.getElementById('_nom_componente').value= datos.data[0].nom_componente
                    document.getElementById('_cod_programa').value= datos.data[0].cod_programa
                    document.getElementById('_nom_programa').value= datos.data[0].nom_programa
                    document.getElementById('_cod_indicador').value= datos.data[0].cod_indicador
                    document.getElementById('_nom_indicador3').value= datos.data[0].nom_indicador
                    document.getElementById('definicion').value= datos.data[0].defincion
                    document.getElementById('objetivo').value= datos.data[0].objetivo
        //2. Seguimiento
                    document.getElementById('_tipo_ind').value= datos.data[0].tipo_ind
                    document.getElementById('_meta_plan').value= datos.data[0].meta_plan
                    document.getElementById('_unidad').value= datos.data[0].unidad
                    document.getElementById('_sentido').value= datos.data[0].sentido
                    document.getElementById('_comportamiento').value= datos.data[0].comportamiento_deseado
                    document.getElementById('_fc').value= datos.data[0].fc
                    document.getElementById('lb').value= datos.data[0].lb_ind
                    document.getElementById('incluye_lb').value= datos.data[0].incluye_lb
                    document.getElementById('vigenia_lb').value= datos.data[0].vigencia_lb
                    document.getElementById('tipo_lb').value= datos.data[0].tipo_lb
                    document.getElementById('peso').value= datos.data[0].peso
                    document.getElementById('periocidad').value= datos.data[0].periocidad_generacion
        
                    document.getElementById('formula_indicador').value= datos.data[0].formula_indicador
                    document.getElementById('descripcion_variable').value= datos.data[0].variable_operativa
        
                    document.getElementById('meta_2020').value= datos.data[0].meta_2020
                    document.getElementById('logro_2020').value= datos.data[0].logro_2020
                    document.getElementById('cumple_2020').value= datos.data[0].cumple_2020
        
                    document.getElementById('meta_2021').value= datos.data[0].meta_2021
                    document.getElementById('logro_2021').value= datos.data[0].logro_2021
                    document.getElementById('cumple_2021').value= datos.data[0].cumple_2021
        
                    document.getElementById('meta_2022').value= datos.data[0].meta_2022
                    document.getElementById('logro_2022').value= datos.data[0].logro_2022
                    document.getElementById('cumple_2022').value= datos.data[0].cumple_2022
        
                    document.getElementById('meta_2023').value= datos.data[0].meta_2023
                    document.getElementById('logro_2023').value= datos.data[0].logro_2023
                    document.getElementById('cumple_2023').value= datos.data[0].cumple_2023
        
        
        //3. Responsables y observaciones
        
        
                    document.getElementById('fuente').value= datos.data[0].fuente
                    document.getElementById('tipo_fuente').value= datos.data[0].tipo_fuente
        
        
                    document.getElementById('_responsable_plan').value= datos.data[0].responsable_plan
                    document.getElementById('_cod_responsable_reporte').value= datos.data[0].cod_responsable_reporte
                    document.getElementById('_nombre_dep').value= datos.data[0].nombre_dep
                    document.getElementById('_instrumento_recoleccion').value= datos.data[0].instrumento_recoleccion
                    document.getElementById('_responsable_reporte').value= datos.data[0].responsable_reporte
                    document.getElementById('_observaciones').value= datos.data[0].observaciones
        
        
        
                    //enviar datos a gráficas
                     _graphAvanceIndicador(datos.data[0].avance_cuatrienio)
                     _graphCumplimientoIndicador(datos.data[0].cumple_2020)
                     _graphHistoryIndicador(datos.data[0].cumple_2020, datos.data[0].cumple_2021, datos.data[0].cumple_2022, datos.data[0].cumple_2023 )
                }
                else{
                    alert('Por favor verifica el código del Indicador')
                    document.getElementById('browser').value=" ";
                    document.getElementById("browser").focus();
                }
            })
        } catch (error) {console.log("Error q_Indicador: ",error)} 
    } else {
        alert('Por favor verifica el código del Indicador')
        document.getElementById('browser').value=" ";
    document.getElementById("browser").focus();
    }
   
 }

 async function _clearBusca(){
    document.getElementById('browser').value=" ";
    document.getElementById("browser").focus();
 }

