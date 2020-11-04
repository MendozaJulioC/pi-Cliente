var avance_cuatrienio= 0;
var cumplimiento_logro=0;



focusMethod = function getFocus() {           
    document.getElementById("indicadorquery").focus();
  }


async function indi(){
    _graphAvanceComponente()
    _graphCumplimientoComponente()
    _graphHistoryComponente()
    _graphHistoryCumplimientoComponente()
}

  
  async function _graphAvanceComponente(avance_cuatrienio){

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
              value: avance_cuatrienio,
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

async function _graphCumplimientoComponente(avancecomponente){ 
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
              value: avancecomponente,
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


async function _graphHistoryComponente(avancecomponente, cumple_2021, cumple_2022, cumple_2023){

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
                value: avancecomponente,
                tooltext: "2020: <b>$dataValue</b>"
              },
              {
                value:cumple_2021 ,
                tooltext: "2021 <b>$dataValue</b>"
              },
              {
                value: cumple_2022,
                tooltext: "2022: <b>$dataValue</b>"
              },
              {
                value: cumple_2023,
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


async function _graphHistoryCumplimientoComponente( avance2020){

    const dataSource = {
        chart: {
          caption: "Comportamiento Cumplimiento",
      
          charttopmargin: "10",
          numbersuffix: "%",
          theme: "gammel"
        },
        dataset: [
          {
            data: [
             
              {
                value: avance2020,
                tooltext: "Octubre 2020: <b>$dataValue</b>"
              },
              {
                value: 0,
                tooltext: "Diciembre 2020: <b>$dataValue</b>"
              },
              {
                value:0,
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
                value:0,
                tooltext: "Junio 2022: <b>$dataValue</b>"
              },
              {
                value: 0,
                tooltext: "Octubre 2022: <b>$dataValue</b>"
              },
              {
                value: 0,
                tooltext: "Diciembre 2022: <b>$dataValue</b>"
              },
              {
                value:0,
                tooltext: "Marzo 2023: <b>$dataValue</b>"
              },
              {
                value:0,
                tooltext: "Junio 2023: <b>$dataValue</b>"
              },
              {
                value:0,
                tooltext: "Octubre 2023: <b>$dataValue</b>"
              },
              {
                value:0,
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


async function _getBuscaNombreComponente(){
    let nom_Componente = document.getElementById('browser').value
    let _total_indicador =0; let peso_total=0; let avancexpeso=0;
    try {
        fetch(`https://sse-pdm-back.herokuapp.com/pi/api/componentes/consulta/nombre/${nom_Componente}`)
        .then(res=>res.json())
        .then(datos=>{
          if(datos.data.length>0){
            document.getElementById('nom_componente').innerHTML= datos.data[0].nom_componente
            for (let index = 0; index < datos.data.length; index++) {
                _total_indicador = _total_indicador + parseInt(datos.data[index].indicadores);
                if(datos.data[index].peso== null){
                    peso_total = peso_total + 0;
                }else{
                    peso_total = peso_total + parseFloat(datos.data[index].peso);
                }
                if(datos.data[index].avancexpeso== null){
                  avancexpeso = avancexpeso + 0;
                }else{
                  avancexpeso = avancexpeso + parseFloat(datos.data[index].avancexpeso);
                }
            }
                let avancecomponente = (avancexpeso/peso_total)*100
             //  document.getElementById('peso-indicador').innerHTML=(datos.data[0].peso).substring(0,6)
             //1.Información General
              document.getElementById('nom_componente2').innerHTML= datos.data[0].nom_componente
              document.getElementById('_cod_linea').value= datos.data[0].cod_linea
              document.getElementById('_nom_linea').value= datos.data[0].nom_linea
              document.getElementById('_cod_componente').value= datos.data[0].cod_componente
              document.getElementById('_nom_componente').value= datos.data[0].nom_componente
              document.getElementById('total_indicador').value= _total_indicador
            //enviar datos a gráficas
            _graphCumplimientoComponente(avancecomponente)
             _graphHistoryComponente(avancecomponente, datos.data[0].cumple_2021, datos.data[0].cumple_2022, datos.data[0].cumple_2023 )
             _graphHistoryCumplimientoComponente(avancecomponente)
             _graphAvanceComponente(avancecomponente)
             fetch(`https://sse-pdm-back.herokuapp.com/pi/api/componentes/consulta-programas/nombre/${nom_Componente}`)
             .then(res=>res.json())
             .then(response=>{
               let tabla=''
               let tam = response.data.length;
               document.getElementById('tbl_prg').innerHTML="";
               for(var i =0; i<(tam) ;i++){
                tabla +='<tr  style="font-size: xx-small;">';
                tabla +='<td style="text-align: center; font-size: 10px;">'+(i+1)+'</td>';
                tabla +='<td style="text-align: left; font-size: 10px;">'+response.data[i].cod_programa+'</td>';
                tabla +='<td style="text-align: left; font-size: 10px;">'+((response.data[i].nom_programa))+'</td>';
                tabla +='<td style="text-align: center;font-size: 10px;">'+response.data[i].indicadores+'</td>';
                tabla +='<td style="text-align: center;font-size: 10px;">'+((response.data[i].avancexpeso/response.data[i].peso)*100).toFixed(2)+'%</td>';
                tabla +='<tr>';
                document.getElementById('tbl_prg').innerHTML=tabla;
               } 
             })
             fetch(`https://sse-pdm-back.herokuapp.com/pi/api/componentes/responsables/nombre/${nom_Componente}`)
            .then(res=>res.json())
            .then(response=>{
              let tabla3=''
              let tam3 = response.data.length;
              document.getElementById('responsables_componente').innerHTML="";
              for(var i =0; i<(tam3) ;i++){
                tabla3 +='<tr  style="font-size: xx-small;">';
                tabla3 +='<td style="text-align: center; font-size: 10px;">'+(i+1)+'</td>';
                tabla3 +='<td style="text-align: left; font-size: 10px;">'+response.data[i].nombre_dep+'</td>';
                tabla3 +='<td style="text-align: left; font-size: 10px;">'+((response.data[i].indicadores))+'</td>';
                tabla3 +='<td style="text-align: center;font-size: 10px;">'+((response.data[i].avancexpeso/response.data[i].peso)*100).toFixed(2)+'%</td>';
                tabla3 +='<tr>';
                document.getElementById('responsables_componente').innerHTML=tabla3;
              } 
            })
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

 async function _getBuscaCodigoComponente(){
    let cod_componente = document.getElementById('browser').value
    let _total_indicador =0; let peso_total=0; let avancexpeso=0;
    if (cod_componente.length>=3){
        try {
          fetch(`https://sse-pdm-back.herokuapp.com/pi/api/componentes/consulta/codigo/${cod_componente}`)
            .then(res => res.json())
            .then(datos => {
              if(datos.data.length>0){
                document.getElementById('nom_componente').innerHTML= datos.data[0].nom_componente
                for (let index = 0; index < datos.data.length; index++) {
                    _total_indicador = _total_indicador + parseInt(datos.data[index].indicadores);
                    if(datos.data[index].peso== null){
                      peso_total = peso_total + 0;
                    }else{
                      peso_total = peso_total + parseFloat(datos.data[index].peso);
                    }
                    if(datos.data[index].avancexpeso== null){
                      avancexpeso = avancexpeso + 0;
                    }else{
                      avancexpeso = avancexpeso + parseFloat(datos.data[index].avancexpeso);
                    }
                  }
                  let avancecomponente = (avancexpeso/peso_total)*100
                //  document.getElementById('peso-indicador').innerHTML=(datos.data[0].peso).substring(0,6)
                //1.Información General
                document.getElementById('nom_componente2').innerHTML= datos.data[0].nom_componente
                document.getElementById('_cod_linea').value= datos.data[0].cod_linea
                document.getElementById('_nom_linea').value= datos.data[0].nom_linea
                document.getElementById('_cod_componente').value= datos.data[0].cod_componente
                document.getElementById('_nom_componente').value= datos.data[0].nom_componente
                document.getElementById('total_indicador').value= _total_indicador
                //enviar datos a gráficas
               _graphCumplimientoComponente(avancecomponente)
               _graphHistoryComponente(avancecomponente, datos.data[0].cumple_2021, datos.data[0].cumple_2022, datos.data[0].cumple_2023 )
               _graphHistoryCumplimientoComponente(avancecomponente)
               _graphAvanceComponente(avancecomponente)
               fetch(`https://sse-pdm-back.herokuapp.com/pi/api/componentes/consulta-programas/codigo/${cod_componente}`)
               .then(res=>res.json())
               .then(response=>{
                  let tabla=''
                  let tam = response.data.length;
                  document.getElementById('tbl_prg').innerHTML="";
                  for(var i =0; i<(tam) ;i++){
                      tabla +='<tr  style="font-size: xx-small;">';
                      tabla +='<td style="text-align: center; font-size: 10px;">'+(i+1)+'</td>';
                      tabla +='<td style="text-align: left; font-size: 10px;">'+response.data[i].cod_programa+'</td>';
                      tabla +='<td style="text-align: left; font-size: 10px;">'+((response.data[i].nom_programa))+'</td>';
                      tabla +='<td style="text-align: center;font-size: 10px;">'+response.data[i].indicadores+'</td>';
                      tabla +='<td style="text-align: center;font-size: 10px;">'+((response.data[i].avancexpeso/response.data[i].peso)*100).toFixed(2)+'%</td>';
                      tabla +='<tr>';
                      document.getElementById('tbl_prg').innerHTML=tabla;
                    } 
                  })
                  //responsables
                 

                     fetch(`https://sse-pdm-back.herokuapp.com/pi/api/componentes/responsables/codigo/${cod_componente}`)
                     .then(res=>res.json())
                     .then(response3=>{
                        let tabla3=''
                        let tam3 = response3.data.length;
                        document.getElementById('responsables_componente').innerHTML="";
                        for(var i =0; i<(tam3) ;i++){
                            tabla3 +='<tr  style="font-size: xx-small;">';
                            tabla3 +='<td style="text-align: center; font-size: 10px;">'+(i+1)+'</td>';
                            tabla3 +='<td style="text-align: left; font-size: 10px;">'+response3.data[i].nombre_dep+'</td>';
                            tabla3 +='<td style="text-align: left; font-size: 10px;">'+((response3.data[i].indicadores))+'</td>';
                            tabla3 +='<td style="text-align: center;font-size: 10px;">'+((response3.data[i].avancexpeso/response3.data[i].peso)*100).toFixed(2)+'%</td>';
                            tabla3 +='<tr>';
                            document.getElementById('responsables_componente').innerHTML=tabla3;
                          } 
                        })
   




              }
              else{
                  alert('Por favor verifica el código del Componente')
                  document.getElementById('browser').value="";
                  document.getElementById("browser").focus();
              }
          });
        } catch (error) {console.log("Error q_Indicador: ",error)} 
    } else {
        alert('Por favor verifica el código del Componente')
        document.getElementById('browser').value=" ";
    document.getElementById("browser").focus();
    }
  }
 async function _clearBusca(){
    document.getElementById('browser').value="";
    document.getElementById("browser").focus();
 }

