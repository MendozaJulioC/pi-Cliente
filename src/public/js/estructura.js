

async function linea(linea){
    try {
        spinner()
        let tabla=''
        fetch(`http://localhost:7000/pi/api/line/${linea}`)
        .then(res=>res.json())
        .then(datos=>{
            let tam = datos.data.length;
            document.getElementById('tabla_indicadores').innerHTML="";
            for(var i =0; i<(tam) ;i++){
                tabla +='<tr  style="font-size: xx-small;">';
                tabla +='<td style="text-align: center; font-size: 10px;">'+(i+1)+'</td>';
                tabla +='<td style="text-align: center; font-size: 10px;">'+datos.data[i].cod_linea+'</td>';
                tabla +='<td style="text-align: center; font-size: 10px;">'+((datos.data[i].nom_linea))+'</td>';
                tabla +='<td style="text-align: center;font-size: 10px;">'+datos.data[i].cod_componente+'</td>';
                tabla +='<td style="text-align:initial;font-size: 10px;">'+datos.data[i].nom_componente +'</td>';
                tabla +='<td style="text-align:center;font-size: 10px;">'+datos.data[i].cod_programa+'</td>';
                tabla +='<td style="text-align:initial;font-size: 10px;">'+datos.data[i].nom_programa+'</td>';
                tabla +='<td style="text-align:center;font-size: 10px;">'+datos.data[i].cod_indicador+'</td>';
                tabla +='<td style="text-align:initial;font-size: 10px;">'+datos.data[i].nom_indicador+'</td>';
                tabla +='<td style="text-align:initial;font-size: 10px;">'+datos.data[i].tipo_ind+'</td>';
                tabla +='<td style="text-align:center;font-size: 10px;">'+datos.data[i].meta_plan+'</td>';
                tabla +='<td style="text-align:initial;font-size: 10px;">'+datos.data[i].unidad+'</td>';
                tabla +='<td style="text-align:center;font-size: 10px;">'+datos.data[i].lb_ind+'</td>';
                tabla +='<td style="text-align:center;font-size: 10px;">'+datos.data[i].peso+'</td>';
                tabla +='<td style="text-align:initial;font-size: 10px;">'+datos.data[i].periocidad_generacion+'</td>';
                tabla +='<td style="text-align:initial;font-size: 10px;">'+datos.data[i].nombre_dep+'</td>';
                tabla +='<td style="text-align:center;font-size: 10px;">'+datos.data[i].avance_cuatrienio+'</td>';
                tabla +='<td style="text-align:center;font-size: 10px;">'+datos.data[i].logro_acumulado+'</td>';
                tabla +=`<td style="text-align:initial;font-size: 10px;"><button onclick="_codigoIndicador('${(datos.data[i].cod_indicador)}')" class="btn btn-outline-info btn-sm" >+</button></td>`;
                tabla +='<tr>';
                document.getElementById('tabla_indicadores').innerHTML=tabla;
            }  
            document.getElementById('totalindicadores').innerHTML= tam ;
            document.getElementById('nom').innerHTML= 'Línea    '+datos.data[0].nom_linea;
            if(i=tam){
                closespinner()
            }
        })
    } catch (error) {
        console.log('Error linea:' , error)
    }
}

async function componente(componente){
    try {
       
        let tabla=''
        fetch(`http://localhost:7000/pi/api/componentes/${componente}`)
        .then(res=>res.json())
        .then(datos=>{
            let tam = datos.data.length;
            document.getElementById('tabla_indicadores').innerHTML="";
            for(var i =0; i<(tam) ;i++){
                tabla +='<tr  style="font-size: xx-small;">';
                tabla +='<td style="text-align: center; font-size: 10px;">'+(i+1)+'</td>';
                tabla +='<td style="text-align: center; font-size: 10px;">'+datos.data[i].cod_linea+'</td>';
                tabla +='<td style="text-align: center; font-size: 10px;">'+((datos.data[i].nom_linea))+'</td>';
                tabla +='<td style="text-align: center;font-size: 10px;">'+datos.data[i].cod_componente+'</td>';
                tabla +='<td style="text-align:initial;font-size: 10px;">'+datos.data[i].nom_componente +'</td>';
                tabla +='<td style="text-align:center;font-size: 10px;">'+datos.data[i].cod_programa+'</td>';
                tabla +='<td style="text-align:initial;font-size: 10px;">'+datos.data[i].nom_programa+'</td>';
                tabla +='<td style="text-align:center;font-size: 10px;">'+datos.data[i].cod_indicador+'</td>';
                tabla +='<td style="text-align:initial;font-size: 10px;">'+datos.data[i].nom_indicador+'</td>';
                tabla +='<td style="text-align:initial;font-size: 10px;">'+datos.data[i].tipo_ind+'</td>';
                tabla +='<td style="text-align:center;font-size: 10px;">'+datos.data[i].meta_plan+'</td>';
                tabla +='<td style="text-align:initial;font-size: 10px;">'+datos.data[i].unidad+'</td>';
                tabla +='<td style="text-align:center;font-size: 10px;">'+datos.data[i].lb_ind+'</td>';
                tabla +='<td style="text-align:center;font-size: 10px;">'+datos.data[i].peso+'</td>';
                tabla +='<td style="text-align:initial;font-size: 10px;">'+datos.data[i].periocidad_generacion+'</td>';
                tabla +='<td style="text-align:initial;font-size: 10px;">'+datos.data[i].nombre_dep+'</td>';
                tabla +='<td style="text-align:center;font-size: 10px;">'+datos.data[i].avance_cuatrienio+'</td>';
                tabla +='<td style="text-align:center;font-size: 10px;">'+datos.data[i].logro_acumulado+'</td>';
                tabla +=`<td style="text-align:initial;font-size: 10px;"><button onclick="_codigoIndicador('${(datos.data[i].cod_indicador)}')" class="btn btn-outline-info btn-sm" >+</button></td>`;
                tabla +='<tr>';
                document.getElementById('tabla_indicadores').innerHTML=tabla;
            }  
            document.getElementById('totalindicadores').innerHTML= tam ;
            document.getElementById('nom').innerHTML='Componente    '+ datos.data[0].nom_componente;
            if(i=tam){
                closespinner()
            }
        })
    } catch (error) {
        console.log('Error componente:' , error)
    }
}


async function prg(programa){
    try {
       // spinner()
        let tabla=''
        fetch(`http://localhost:7000/pi/api/programas/${programa}`)
        .then(res=>res.json())
        .then(datos=>{
            let tam = datos.data.length;
            document.getElementById('tabla_indicadores').innerHTML="";
            for(var i =0; i<(tam) ;i++){
                tabla +='<tr  style="font-size: xx-small;">';
                tabla +='<td style="text-align: center; font-size: 10px;">'+(i+1)+'</td>';
                tabla +='<td style="text-align: center; font-size: 10px;">'+datos.data[i].cod_linea+'</td>';
                tabla +='<td style="text-align: center; font-size: 10px;">'+((datos.data[i].nom_linea))+'</td>';
                tabla +='<td style="text-align: center;font-size: 10px;">'+datos.data[i].cod_componente+'</td>';
                tabla +='<td style="text-align:initial;font-size: 10px;">'+datos.data[i].nom_componente +'</td>';
                tabla +='<td style="text-align:center;font-size: 10px;">'+datos.data[i].cod_programa+'</td>';
                tabla +='<td style="text-align:initial;font-size: 10px;">'+datos.data[i].nom_programa+'</td>';
                tabla +='<td style="text-align:center;font-size: 10px;">'+datos.data[i].cod_indicador+'</td>';
                tabla +='<td style="text-align:initial;font-size: 10px;">'+datos.data[i].nom_indicador+'</td>';
                tabla +='<td style="text-align:initial;font-size: 10px;">'+datos.data[i].tipo_ind+'</td>';
                tabla +='<td style="text-align:center;font-size: 10px;">'+datos.data[i].meta_plan+'</td>';
                tabla +='<td style="text-align:initial;font-size: 10px;">'+datos.data[i].unidad+'</td>';
                tabla +='<td style="text-align:center;font-size: 10px;">'+datos.data[i].lb_ind+'</td>';
                tabla +='<td style="text-align:center;font-size: 10px;">'+datos.data[i].peso+'</td>';
                tabla +='<td style="text-align:initial;font-size: 10px;">'+datos.data[i].periocidad_generacion+'</td>';
                tabla +='<td style="text-align:initial;font-size: 10px;">'+datos.data[i].nombre_dep+'</td>';
                tabla +='<td style="text-align:center;font-size: 10px;">'+datos.data[i].avance_cuatrienio+'</td>';
                tabla +='<td style="text-align:center;font-size: 10px;">'+datos.data[i].logro_acumulado+'</td>';
                tabla +=`<td style="text-align:initial;font-size: 10px;"><button onclick="_codigoIndicador('${(datos.data[i].cod_indicador)}')" class="btn btn-outline-info btn-sm" >+</button></td>`;
                tabla +='<tr>';
                document.getElementById('tabla_indicadores').innerHTML=tabla;
            }  
            document.getElementById('totalindicadores').innerHTML= tam ;
            document.getElementById('nom').innerHTML= 'Programa '+datos.data[0].nom_programa;
            if(i=tam){
                closespinner()
            }
        })

    } catch (error) {
        console.log('Error linea:' , error)
    }
}


async function _codigoIndicador(cod_indicador){

        try {
            let tabla='', tabla2='';
            fetch(`http://localhost:7000/pi/api/indicador/${cod_indicador}`)
            .then(res => res.json())
            .then(datos => {
                document.getElementById('_nom_indicador2').innerHTML= datos.data[0].nom_indicador
                tabla +='<tr  style="font-size: xx-small;">';
                tabla +='<td style="text-align: center; font-size: 10px;">'+datos.data[0].cod_linea+'</td>';
                tabla +='<td style="text-align: center;font-size: 10px;">'+datos.data[0].cod_componente+'</td>';
                tabla +='<td style="text-align:center;font-size: 10px;">'+datos.data[0].cod_programa+'</td>';
                tabla +='<td style="text-align:center;font-size: 10px;">'+datos.data[0].peso+'</td>';
                tabla +='<td style="text-align:center;font-size: 10px;">'+datos.data[0].nombre_dep+'</td>';
                tabla +='<td style="text-align:center;font-size: 10px;">'+datos.data[0].meta_plan+'</td>';
                tabla +='<td style="text-align:center;font-size: 10px;">'+datos.data[0].avance_cuatrienio+'</td>';
                tabla +='<td style="text-align:center;font-size: 10px;">'+datos.data[0].logro_acumulado+'</td>';
                tabla +='<tr>';
                document.getElementById('indicador_query').innerHTML=tabla;
                document.getElementById('_definicion').value= datos.data[0].defincion
                document.getElementById('_objetivo').value= datos.data[0].objetivo
                tabla2 +='<tr  style="font-size: xx-small;">';
                tabla2 +='<td style="text-align: center; font-size: 10px;">'+datos.data[0].meta_2020+'</td>';
                tabla2 +='<td style="text-align: center;font-size: 10px;">'+datos.data[0].logro_2020+'</td>';
                tabla2 +='<td style="text-align:center;font-size: 10px;">'+datos.data[0].cumple_2020+'</td>';
                tabla2 +='<td style="text-align: center; font-size: 10px;">'+datos.data[0].meta_2021+'</td>';
                tabla2 +='<td style="text-align: center;font-size: 10px;">'+datos.data[0].logro_2021+'</td>';
                tabla2 +='<td style="text-align:center;font-size: 10px;">'+datos.data[0].cumple_2021+'</td>';
                tabla2 +='<td style="text-align: center; font-size: 10px;">'+datos.data[0].meta_2022+'</td>';
                tabla2 +='<td style="text-align: center;font-size: 10px;">'+datos.data[0].logro_2022+'</td>';
                tabla2 +='<td style="text-align:center;font-size: 10px;">'+datos.data[0].cumple_2022+'</td>';
                tabla2 +='<td style="text-align: center; font-size: 10px;">'+datos.data[0].meta_2023+'</td>';
                tabla2 +='<td style="text-align: center;font-size: 10px;">'+datos.data[0].logro_2023+'</td>';
                tabla2 +='<td style="text-align:center;font-size: 10px;">'+datos.data[0].cumple_2023+'</td>';
                tabla2 +='<tr>';
                document.getElementById('indicador_logros').innerHTML=tabla2;
            })
            $('#exampleModal3').modal('show'); grafica1();
        } catch (error) {console.log("Error q_Indicador: ",error)} 
    } 
   

function spinner(){$('#exampleModal2').modal('show');}

function closespinner(){
    $("#exampleModal2").modal("hide");
}

async function grafica1(){
    const dataSource = {
        chart: {
          caption: "Avance Cuatrienial Indicador 2020-2023",
          
          numbersuffix: "%",
          gaugefillmix: "{dark-20},{light+70},{dark-10}",
          theme: "zune"
        },
        colorrange: {
          color: [
            {
              minvalue: "0",
              maxvalue: "55",
              label: "Below{br}Average",
              code: "#F2726F"
            },
            {
              minvalue: "55",
              maxvalue: "75",
              label: "Average",
              code: "#FFC533"
            },
            {
              minvalue: "75",
              maxvalue: "100",
              label: "High",
              code: "#62B58F"
            }
          ]
        },
        pointers: {
          pointer: [
            {
              value: "5"
            }
          ]
        }
      };
      
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "hlineargauge",
          renderAt: "chart1",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });
      grafica2()
}

async function grafica2(){
    const dataSource = {
        chart: {
          caption: "Cumplimiento Anual 2020",
         
          numbersuffix: "%",
          gaugefillmix: "{dark-20},{light+70},{dark-10}",
          theme: "zune"
        },
        colorrange: {
          color: [
            {
              minvalue: "0",
              maxvalue: "55",
              label: "Below{br}Average",
              code: "#F2726F"
            },
            {
              minvalue: "55",
              maxvalue: "75",
              label: "Average",
              code: "#FFC533"
            },
            {
              minvalue: "75",
              maxvalue: "100",
              label: "High",
              code: "#62B58F"
            }
          ]
        },
        pointers: {
          pointer: [
            {
              value: "5"
            }
          ]
        }
      };
      
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "hlineargauge",
          renderAt: "chart2",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });
      
}