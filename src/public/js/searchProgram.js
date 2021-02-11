var avance_cuatrienio= 0;
var cumplimiento_logro=0;
focusMethod = function getFocus() {           
  document.getElementById("indicadorquery").focus();
}
async function prg(){
    _graphAvancePrograma()
    _graphCumplimientoPrograma()
    _graphHistoryPrograma()
    _graphHistoryCumplimientoPrograma()
}
async function _graphAvancePrograma(avance_cuatrienio){
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
async function _graphCumplimientoPrograma(avanceprograma){ 
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
              value: avanceprograma,
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
async function _graphHistoryPrograma(avanceprograma, cumple_2021, cumple_2022, cumple_2023){
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
                value: avanceprograma,
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
async function _graphHistoryCumplimientoPrograma( avance2020){
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
async function _getBuscaNombrePrograma(){
    let nom_Programa = document.getElementById('browser').value
    let _total_indicador =0; let peso_total=0; let avancexpeso=0;
    try {
        fetch(`http://localhost:7000/pi/api/programas/consulta/nombre/${nom_Programa}`)
        .then(res=>res.json())
        .then(datos=>{
            let tabla='';
            document.getElementById('responsables_programa').innerHTML="";
            if(datos.data.length>0){
            document.getElementById('tbl_prg').innerHTML= datos.data[0].nom_programa
            for (let index = 0; index < datos.data.length; index++) {
                _total_indicador = _total_indicador + parseInt(datos.data[index].indicador);
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
                if (datos.data[index].avancexpeso == null  ){
                    avance3 =0;
                    formula =0;
                   }
                   else{
                    formula =datos.data[index].avancexpeso/datos.data[index].peso
                   }
                   if (datos.data[index].peso== null) {
                     peso3=0;
                     formula =0;
                   } else {
                    formula =datos.data[index].avancexpeso/datos.data[index].peso
                   }
                  if (datos.data[index].avancexpeso == null && datos.data[index].peso== null ) {
                    formula=0;
                  }
                tabla +='<tr  style="font-size: xx-small;">';
                tabla +='<td style="text-align: center; font-size: 10px;">'+(index+1)+'</td>';
                tabla +='<td style="text-align: left; font-size: 10px;">'+datos.data[index].cod_indicador+'</td>';
                tabla +='<td style="text-align: left; font-size: 10px;">'+((datos.data[index].nom_indicador))+'</td>';
                tabla +='<td style="text-align: center;font-size: 10px;">'+((formula)*100).toFixed(2)+'%</td>';
                tabla +='<tr>';
                document.getElementById('tbl_prg').innerHTML=tabla;
           }
            let avanceprograma = (avancexpeso/peso_total)*100
              document.getElementById('nom_programa2').innerHTML= datos.data[0].nom_programa
              document.getElementById('_cod_linea').value= datos.data[0].cod_linea
              document.getElementById('_nom_linea').value= datos.data[0].nom_linea
              document.getElementById('_cod_componente').value= datos.data[0].cod_componente
              document.getElementById('_nom_componente').value= datos.data[0].nom_componente
              document.getElementById('_cod_programa').value= datos.data[0].cod_programa
              document.getElementById('_nom_programa').value= datos.data[0].nom_programa
              document.getElementById('total_indicador').value= _total_indicador
            _graphCumplimientoPrograma(avanceprograma)
             _graphHistoryPrograma(avanceprograma, datos.data[0].cumple_2021, datos.data[0].cumple_2022, datos.data[0].cumple_2023 )
             _graphHistoryCumplimientoPrograma(avanceprograma)
             _graphAvancePrograma(avanceprograma)
             fetch(`http://localhost:7000/pi/api/programas/responsables/nombre/${nom_Programa}`)
            .then(res=>res.json())
            .then(response=>{
              let peso3=0; let avance3=0;  let formula=0;
              let tabla3=''
              let tam3 = response.data.length;
              document.getElementById('responsables_programa').innerHTML="";
              for(var i =0; i<(tam3) ;i++){
                if (response.data[i].avancexpeso == null  ){
                  avance3 =0;
                  formula =0;
                 }
                 else{
                  formula =response.data[i].avancexpeso/response.data[i].peso
                 }
                 if (response.data[i].peso== null) {
                   peso3=0;
                   formula =0;
                 } else {
                  formula =response.data[i].avancexpeso/response.data[i].peso
                 }
                if (response.data[i].avancexpeso == null && response.data[i].peso== null ) {
                  formula=0;
                }
                tabla3 +='<tr  style="font-size: xx-small;">';
                tabla3 +='<td style="text-align: center; font-size: 10px;">'+(i+1)+'</td>';
                tabla3 +='<td style="text-align: left; font-size: 10px;">'+response.data[i].nombre_dep+'</td>';
                tabla3 +='<td style="text-align: left; font-size: 10px;">'+((response.data[i].indicadores))+'</td>';
                tabla3 +='<td style="text-align: center;font-size: 10px;">'+((formula)*100).toFixed(2)+'%</td>';
                tabla3 +='<tr>';
                document.getElementById('responsables_programa').innerHTML=tabla3;
              } 
            })
          }
          else{
            alert('Por favor verifica el código del Programa')
            document.getElementById('browser').value="";
            document.getElementById("browser").focus();
          }
        });
    } catch (error) {
    }
 }
 async function _getBuscaCodigoPrograma(){
    let cod_programa = document.getElementById('browser').value
    let _total_indicador =0; let peso_total=0; let avancexpeso=0;
    if (cod_programa.length>=5){
        try {
          fetch(`http://localhost:7000/pi/api/programas/consulta/codigo/${cod_programa}`)
            .then(res => res.json())
            .then(datos => {
              let tabla='';
              if(datos.data.length>0){
                document.getElementById('nom_programa').innerHTML= datos.data[0].nom_programa
                for (let index = 0; index < datos.data.length; index++) {
                    _total_indicador = _total_indicador + parseInt(datos.data[index].indicador);
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
                    if (datos.data[index].avancexpeso == null  ){
                      avance3 =0;
                      formula =0;
                     }
                     else{
                      formula =datos.data[index].avancexpeso/datos.data[index].peso
                     }
                     if (datos.data[index].peso== null) {
                       peso3=0;
                       formula =0;
                     } else {
                      formula =datos.data[index].avancexpeso/datos.data[index].peso
                     }
                    if (datos.data[index].avancexpeso == null && datos.data[index].peso== null ) {
                      formula=0;
                    }
                    tabla +='<tr  style="font-size: xx-small;">';
                    tabla +='<td style="text-align: center; font-size: 10px;">'+(index+1)+'</td>';
                    tabla +='<td style="text-align: left; font-size: 10px;">'+datos.data[index].cod_indicador+'</td>';
                    tabla +='<td style="text-align: left; font-size: 10px;">'+((datos.data[index].nom_indicador))+'</td>';
                    tabla +='<td style="text-align: center;font-size: 10px;">'+((formula)*100).toFixed(2)+'%</td>';
                    tabla +='<tr>';
                    document.getElementById('tbl_prg').innerHTML=tabla;
                  }
                  let avanceprograma = (avancexpeso/peso_total)*100
                  document.getElementById('nom_programa2').innerHTML= datos.data[0].nom_programa
                  document.getElementById('_cod_linea').value= datos.data[0].cod_linea
                  document.getElementById('_nom_linea').value= datos.data[0].nom_linea
                  document.getElementById('_cod_componente').value= datos.data[0].cod_componente
                  document.getElementById('_nom_componente').value= datos.data[0].nom_componente
                  document.getElementById('_cod_programa').value= datos.data[0].cod_programa
                  document.getElementById('_nom_programa').value= datos.data[0].nom_programa
                  document.getElementById('total_indicador').value= _total_indicador
                 //enviar datos a gráficas
                _graphCumplimientoPrograma(avanceprograma)
                _graphHistoryPrograma(avanceprograma, datos.data[0].cumple_2021, datos.data[0].cumple_2022, datos.data[0].cumple_2023 )
                _graphHistoryCumplimientoPrograma(avanceprograma)
                _graphAvancePrograma(avanceprograma)
                //responsables
                  fetch(`http://localhost:7000/pi/api/programas/responsables/codigo/${cod_programa}`)
                    .then(res=>res.json())
                    .then(response3=>{
                        let tabla3=''
                        let tam3 = response3.data.length;
                        document.getElementById('responsables_programa').innerHTML="";
                        for(var i =0; i<(tam3) ;i++){
                            tabla3 +='<tr  style="font-size: xx-small;">';
                            tabla3 +='<td style="text-align: center; font-size: 10px;">'+(i+1)+'</td>';
                            tabla3 +='<td style="text-align: left; font-size: 10px;">'+response3.data[i].nombre_dep+'</td>';
                            tabla3 +='<td style="text-align: left; font-size: 10px;">'+((response3.data[i].indicadores))+'</td>';
                            tabla3 +='<td style="text-align: center;font-size: 10px;">'+((response3.data[i].avancexpeso/response3.data[i].peso)*100).toFixed(2)+'%</td>';
                            tabla3 +='<tr>';
                            document.getElementById('responsables_programa').innerHTML=tabla3;
                        } 
                    })
              }
              else{
                  alert('Por favor verifica el código del Componente')
                  document.getElementById('browser').value="";
                  document.getElementById("browser").focus();
              }
          });
        } catch (error) {console.log("Error _getBuscaCodigoPrograma: ",error)} 
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