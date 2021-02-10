

var avance_cuatrienio= 0;
var cumplimiento_logro=0;



focusMethod = function getFocus() {           
    document.getElementById("indicadorquery").focus();
  }


async function indi(){
    _graphAvanceComponente()


}

  
  async function _graphAvanceComponente(avance_cuatrienio){
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
            value:Math.ceil(avance_cuatrienio) ,
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
           // _graphCumplimientoComponente(avancecomponente)
            alerta_nomcomponente(nom_Componente)
             _graphAvanceComponente(avancecomponente)
             pptoComponente(datos.data[0].cod_componente)

             fetch(`https://sse-pdm-back.herokuapp.com/pi/api/componentes/consulta-programas/nombre/${nom_Componente}`)
             .then(res=>res.json())
             .then(response=>{
               let peso=0; let avance=0;
               let tabla=''
               let tam = response.data.length;
               document.getElementById('tbl_prg').innerHTML="";
               for(var i =0; i<(tam) ;i++){
                 if (response.data[i].avancexpeso ==null){
                  avance =0
                 }
                 else{
                  avance =response.data[i].avancexpeso
                 }
                 if (response.data[i].peso== null) {
                   peso=0;
                 } else {
                   peso= response.data[i].peso;
                 }
                tabla +='<tr  style="font-size: xx-small;">';
                tabla +='<td style="text-align: center; font-size: 10px;">'+(i+1)+'</td>';
                tabla +='<td style="text-align: left; font-size: 10px;">'+response.data[i].cod_programa+'</td>';
                tabla +='<td style="text-align: left; font-size: 10px;">'+((response.data[i].nom_programa))+'</td>';
                tabla +='<td style="text-align: center;font-size: 10px;">'+response.data[i].indicadores+'</td>';
                tabla +='<td style="text-align: center;font-size: 10px;">'+((avance/peso)*100).toFixed(2)+'%</td>';
                tabla +='<tr>';
                document.getElementById('tbl_prg').innerHTML=tabla;
               } 
             })
             fetch(`https://sse-pdm-back.herokuapp.com/pi/api/componentes/responsables/nombre/${nom_Componente}`)
            .then(res=>res.json())
            .then(response=>{
              let peso3=0; let avance3=0;  let formula=0;
              let tabla3=''
              let tam3 = response.data.length;
              document.getElementById('responsables_componente').innerHTML="";
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
              // _graphCumplimientoComponente(avancecomponente)
               alerta_nomcomponente(datos.data[0].nom_componente)
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


 





 async function alerta_nomcomponente(nom_Componente){

  try {
    fetch(`http://localhost:7000/pi/api/componentes/semaforo-corte/alerta/nombre/${nom_Componente}`)
    .then(res=> res.json())
    .then(response=>{
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
            value: response.data[0].verde,
            color: "#58ac84"
          },
          {
            label: "Medio",
            value: response.data[0].amarillo,
            color: "#ffbd2e"
          },
          {
            label: "Bajo",
            value: response.data[0].rojo,
             color: "#f06764"
          },
          {
            label: "No programado",
            value: response.data[0].gris,
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
    console.error('Error alerta_componente :>> ', error);
  }

}



async function pptoComponente(cod_componente){
  try {
    
        fetch(`http://localhost:7000/pi/api/componente/ppto/${cod_componente}`)
        .then(res=> res.json())
        .then(datos=>{
          const dataSource = {
            chart: {
              caption: `Ejecución Presupuestal Línea  ${cod_componente}`,
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
        })


  } catch (error) {
    console.error('Error pptoComponente :>error', error );

  }
}
