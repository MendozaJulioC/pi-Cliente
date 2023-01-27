var nomarchivopdf='';


async function query_valstat(){
  let valstat= document.getElementById('valstat').value
  try {
   let tablaValStadistico ='';
   fetch(`http://ec2-18-118-211-122.us-east-2.compute.amazonaws.com/pa/api/valor-estadistico/${valstat} `)
   .then(res => res.json())
   .then(response =>{
    // console.log(response);
    if(response.data.length==0){
      swal({
        title: "Hola!",
        text: "El valor estadístico ingresado no existe!!",
        icon: "warning",
        button: "Ok!",
      });
    }
    else{
      document.getElementById('cod').innerHTML= response.data[0].cod_val_stat
      document.getElementById('nom').innerHTML= response.data[0].nom_val_stat
      document.getElementById('proyecto').innerHTML= response.data[0].nom_proyecto
      document.getElementById('dependencia').innerHTML= response.data[0].nombre_dep
      let fecha = new Date(response.data[0].corte_ejecucion)
      document.getElementById('corte').innerHTML=(fecha.toLocaleDateString())
      document.getElementById('cod_linea').innerHTML= response.data[0].cod_linea
      document.getElementById('nom_linea').innerHTML= response.data[0].nom_linea
      document.getElementById('cod_componente').innerHTML= response.data[0].cod_componente
      document.getElementById('nom_componente').innerHTML= response.data[0].nom_componente
      document.getElementById('cod_programa').innerHTML= response.data[0].cod_programa
      document.getElementById('nom_programa').innerHTML= response.data[0].nom_programa
      tablaValStadistico += `<tr style="background-color:gray ;">
         <th   style="background-color:#28527a ;text-align: center; color: white;">Val. Est.</th>
          <th   colspan="2" style="background-color:#28527a ;text-align: center; color: white;">Producto/Bien/Servicio </th>
          <th   style="background-color:#28527a ;text-align: center; color: white;">SUIFP</th>
        </tr>
        <tr>
          <td   style="text-align: center;">${response.data[0].cod_val_stat}</td>
          <td   colspan="2" style="text-align: left;">${response.data[0].nom_val_stat} </td>
          <td   style="text-align: center;">${response.data[0].cod_siufp_catal}</td>     
        </tr>
        <tr>
          <th style="background-color:#28527a ;text-align: center; color: white;">Unidad</th>
          <th style="background-color:#28527a ;text-align: center; color: white;">Cantidad Planeada</th>
          <th style="background-color:#28527a ;text-align: center; color: white;">Cantidad Ejecutada</th>
          <th colspan="2" style="background-color:#28527a ;text-align: center; color: white;">Eficacia Producto</th>
        </tr>
        <tr>
          <td style="text-align: center;">${response.data[0].u_medida}</td>
          <td style="text-align: center;">${response.data[0].q_plan}</td>
          <td style="text-align: center;">${response.data[0].q_real}</td>
          <td colspan="2" style="text-align: center;">${Math.ceil(response.data[0].eficacia_ve)}%</td>
        </tr>
        <tr>
          <th colspan="2" style="background-color:#28527a ;text-align: center; color: white;" >Observación P/B/S</th>
          <th colspan="2" style="background-color:#28527a ;text-align: center; color: white;" >Observación Seguimiento</th>
        </tr>
        <tr>
          <td colspan="2" style="text-align: left;">${response.data[0].obs_cod_siufp}</td>
          <td colspan="2" style="text-align: left;">${response.data[0].obs_val_stat}</td>
        </tr>
        <tr><td colspan="4"><hr></td> </tr>  `
        document.getElementById('valStadistico').innerHTML=tablaValStadistico;  
        const dataSource = {
          chart: {
            caption: "% Eficacia",
            numbersuffix: "%",
            gaugefillmix: "{dark-20},{light+70},{dark-10}",
            theme: "zune"
          },
          colorrange: {
            color: [
              {
                minvalue: "0",
                maxvalue: "45",
                label: "Eficacia{br}Baja",
                code: "#F2726F"
              },
              {
                minvalue: "45",
                maxvalue: "75",
                label: "Eficacia {br} Media",
                code: "#FFC533"
              },
              {
                minvalue: "75",
                maxvalue: "100",
                label: "Eficacia {br} Alta",
                code: "#62B58F"
              }
            ]
          },
          pointers: {
            pointer: [
              {
                value: Math.ceil(response.data[0].eficacia_ve)
              }
            ]
          }
        };
        FusionCharts.ready(function() {
          var myChart = new FusionCharts({
            type: "hlineargauge",
            renderAt: "chart-eficacia",
            width: "100%",
            height: "100%",
            dataFormat: "json",
            dataSource
          }).render();
        });
        jQuery.noConflict();
        $('#infoValStat').modal('show');   
      }
    })
  } catch (error) {
    console.log('Error query_valstat :>> ', error);
  }
}


async function busca_proyect(){
  
  try {
    let cod = document.getElementById('bpin').value
    
    fetch(`http://ec2-18-118-211-122.us-east-2.compute.amazonaws.com/pa/api/proyecto/${cod}`)
   .then(res=>res.json())
   .then(datos=>{
    if(datos.data.length==0){
      swal({
        title: "Hola!",
        text: "El número del proyecto ingresado no existe!!",
        icon: "warning",
        button: "Ok!",
      });
    }
    else{
    geoProyectqp((datos.data[0].nom_proyecto),cod)
     let tablaValStatqp ='';
     document.getElementById('valStatQproyect').innerHTML="";
     let tam = datos.data.length;
     document.getElementById('nomqp').innerHTML = datos.data[0].nom_proyecto;
     document.getElementById('nomprodetalleqp').innerHTML=datos.data[0].nom_proyecto;
     document.getElementById('codqp').innerHTML = cod;
     let fecha = new Date(datos.data[0].corte_ejecucion)
      document.getElementById('corteqp').innerHTML=(fecha.toLocaleDateString())
     document.getElementById('cod_lineaqp').innerHTML = datos.data[0].cod_linea;
     document.getElementById('nom_lineaqp').innerHTML = datos.data[0].nom_linea;
     document.getElementById('cod_componenteqp').innerHTML = datos.data[0].cod_componente;
     document.getElementById('nom_componenteqp').innerHTML = datos.data[0].nom_componente;
     document.getElementById('cod_programaqp').innerHTML = datos.data[0].cod_programa;
     document.getElementById('nom_programaqp').innerHTML = datos.data[0].nom_programa;
 
     document.getElementById('poaiqp').innerHTML = formatter.format(datos.data[0].y_dev_poai);
     document.getElementById('ppto_ajustadoqp').innerHTML = formatter.format(datos.data[0].y_dev_pptoajustado);
     document.getElementById('ejecqp').innerHTML = formatter.format(datos.data[0].y_dev_ejecucion);
     proyecto_fisicoqp(cod)
     for (let index = 0; index < tam; index++) {
      tablaValStatqp += `<tr style="background-color:gray ;">
                         <th   style="text-align: center;">Val. Est.</th>
                         <th   colspan="2" style="text-align: center;">Producto/Bien/Servicio </th>
                         <th   style="text-align: center;">SUIFP</th>
                       </tr>
                       <tr>
                         <td   style="text-align: center;">${datos.data[index].cod_val_stat}</td>
                         <td   colspan="2" style="text-align: left;">${datos.data[index].nom_val_stat} </td>
                         <th   style="text-align: center;">${datos.data[index].cod_siufp_catal}</th>     
                       </tr>
                       <tr>
                         <th style="text-align: center;">Unidad</th>
                         <th style="text-align: center;">Cantidad Planeada</th>
                         <th style="text-align: center;">Cantidad Ejecutada</th>
                         <th colspan="2" style="text-align: center;">Eficacia Producto</th>
                       </tr>
                       <tr>
                         <td style="text-align: center;">${datos.data[index].u_medida}</td>
                         <td style="text-align: center;">${datos.data[index].q_plan}</td>
                         <td style="text-align: center;">${datos.data[index].q_real}</td>
                         <td colspan="2" style="text-align: center;">${Math.ceil(datos.data[index].eficacia_ve)}%</td>
                       </tr>
                       <tr>
                         <th colspan="2">Descripción</th>
                         <th colspan="2">Observación Seguimiento</th>
                       </tr>
                       <tr>
                         <td colspan="2" style="text-align: left;">${datos.data[index].obs_cod_siufp}</td>
                         <td colspan="2" style="text-align: left;">${datos.data[index].obs_val_stat}</td>
                       </tr>
                       <tr><td colspan="4"><hr></td> </tr>  `
       document.getElementById('valStatQproyect').innerHTML=tablaValStatqp;  
     }
     jQuery.noConflict();
     $('#q_proyect').modal('show');   
    }
   })
  
  } catch (error) {
   console.log('Error buscavalstat ', error)
 }
 
}

async function proyecto_fisicoqp(cod){
  try {
     fetch(`http://ec2-18-118-211-122.us-east-2.compute.amazonaws.com/pa/api/avances/ejecucion/${cod}`)
    .then(res=> res.json())
    .then(response=>{
      let avanxcefisicoproject= parseFloat((response.data[0].porc_eficacia_proyecto)*100); 
      let avancexfinanciero= parseFloat((response.data[0].ejec_financiera)*100);proyecto_financieroqp(avancexfinanciero)
      let ffp = ( (parseFloat(response.data[0].porc_eficacia_proyecto))*0.50   +  (parseFloat(response.data[0].ejec_financiera))*0.50 )*100
      //console.log("fisico ",avanxcefisicoproject);
      //console.log("financiero ",avancexfinanciero);
      //console.log("ffp ",ffp);
      fifaponqp(ffp)
      nomarchivopdf=response.data[0].cod_proyecto;
      let tipo_proyecto="";
      if (response.data[0].tipo_iniciativa==1) {tipo_proyecto= "Proyecto de Iniciativa Institucional"}
      else if (response.data[0].tipo_iniciativa==2) { tipo_proyecto= " Proyecto de Presupuesto Participativo (Iniciativas Comunitarias)"}
      else if (response.data[0].tipo_iniciativa==3) { tipo_proyecto= "Proyecto con saldos no Ejecutables"}
      else {tipo_proyecto= "Proyecto con ejecución de saldos Pendientes (Vigencia Anterior)"}
  
        
  
      document.getElementById('tipo_proyectoqp').innerHTML= tipo_proyecto

      const dataSource = {
        chart: {
          caption: "% Ejecución Física ",
          lowerlimit: "0",
          upperlimit: "100",
          showvalue: "1",
          numbersuffix: "%",
          theme: "gammel",
          showtooltip: "0"
        },
        colorrange: {
          color: [
            {
              minvalue: "0",
              maxvalue: "50",
              code: "#F2726F"
            },
            {
              minvalue: "50",
              maxvalue: "75",
              code: "#FFC533"
            },
            {
              minvalue: "75",
              maxvalue: "100",
              code: "#62B58F"
            }
          ]
        },
        dials: {
          dial: [
            {
              value: avanxcefisicoproject
            }
          ]
        }
      };
      
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "angulargauge",
          renderAt: "chart-1qp",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });



    })
    
  } catch (error) {
    console.log('Error proyecto_fisico :>> ', error);
  }
 
 
}
async function proyecto_financieroqp(avancexfinanciero){

  const dataSource = {
    chart: {
      caption: "% Ejecución Financiera ",
      lowerlimit: "0",
      upperlimit: "100",
      showvalue: "1",
      numbersuffix: "%",
      theme: "gammel",
      showtooltip: "0"
    },
    colorrange: {
      color: [
        {
          minvalue: "0",
          maxvalue: "50",
          code: "#F2726F"
        },
        {
          minvalue: "50",
          maxvalue: "75",
          code: "#FFC533"
        },
        {
          minvalue: "75",
          maxvalue: "100",
          code: "#62B58F"
        }
      ]
    },
    dials: {
      dial: [
        {
          value:avancexfinanciero
        }
      ]
    }
  };
  
  FusionCharts.ready(function() {
    var myChart = new FusionCharts({
      type: "angulargauge",
      renderAt: "chart-2qp",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource
    }).render();
  });

}
async function fifaponqp(ffp){
  const dataSource = {
    chart: {
      caption: "% Cumplimiento",
     
      lowerlimit: "0",
      upperlimit: "100",
      showvalue: "1",
      numbersuffix: "%",
      theme: "gammel",
      showtooltip: "0"
    },
    colorrange: {
      color: [
        {
          minvalue: "0",
          maxvalue: "50",
          code: "#F2726F"
        },
        {
          minvalue: "50",
          maxvalue: "75",
          code: "#FFC533"
        },
        {
          minvalue: "75",
          maxvalue: "100",
          code: "#62B58F"
        }
      ]
    },
    dials: {
      dial: [
        {
          value: ffp
        }
      ]
    }
  };
  
  FusionCharts.ready(function() {
    var myChart = new FusionCharts({
      type: "angulargauge",
      renderAt: "chart-3qp",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource
    }).render();
  });
  
}
  
async function geoProyectqp( nom, cod){
  try {
    fetch(`http://ec2-18-118-211-122.us-east-2.compute.amazonaws.com/geo/api/dependencias/proyectos/${cod}`)
    .then(res=>res.json())
    .then(datos=>{
      const dataSource = {
        chart: {
          caption: "Inversión Pública por Comunas y Corregimientos",
          subcaption: nom,
          axisname: "Territorio",
          yaxisname: "cifras en millones de pesos",
          showvalues: "1",
          formatnumberscale: "0",
          numberprefix: "$",
          theme: "zune",
          labeldisplay: "ROTATE",
          decimalSeparator: ",",
          thousandSeparator: ".",
          plottooltext: `<div id='divTable'>
                          <table id='dataTable' class="table table-sm table-responsive-sm table-hover" style="font-size: small;" width='200px'>
                            <tr style="color:white" >
                              <th>Territorio</th>
                              <td>$label</td>
                            </tr>
                            <tr style="color:white" >
                              <th>Inversión (en millones de pesos)</th>
                              <td>$dataValue</td>
                            </tr>
                          </table>
                        </div>`,
        },
        data: [
                {
                  label: "Popular",
                  value: Math.ceil(parseInt(datos.data[0].popular)/1000000)
                  ,color:"#009AB2"
                },
                {
                  label: "Santa Cruz",
                  value: Math.ceil(parseInt(datos.data[0].santa_cruz)/1000000)
                  ,color:"#009AB2"
                },
                {
                  label: "Manrique",
                  value: Math.ceil(parseInt(datos.data[0].manrique)/1000000)
                  ,color:"#009AB2"
                },
                {
                  label: "Aranjuez",
                  value: Math.ceil(parseInt(datos.data[0].aranjuez)/1000000) ,  color:"#009AB2"
                },
                {
                  label: "Castilla",
                  value: Math.ceil(parseInt(datos.data[0].castilla)/1000000) , color:"#009AB2"
                },
                {
                  label: "Doce de Octubre",
                  value: Math.ceil(parseInt(datos.data[0].doce_de_octubre)/1000000) , color:"#009AB2"
                },
                {
                  label: "Robledo",
                  value: Math.ceil(parseInt(datos.data[0].robledo)/1000000) ,color:"#009AB2"
                },
                {
                  label: "Villa Hermosa",
                  value: Math.ceil(parseInt(datos.data[0].villa_hermosa)/1000000) ,color:"#009AB2"
                },
                {
                  label: "Buenos Aires",
                  value: Math.ceil(parseInt(datos.data[0].buenos_aires)/1000000) ,color:"#009AB2"
                },
                {
                  label: "La Candelaria",
                  value: Math.ceil(parseInt(datos.data[0].la_candelaria)/1000000) ,color:"#009AB2"
                },
                {
                  label: "Laureles Estadio",
                  value: Math.ceil(parseInt(datos.data[0].laureles_estadio)/1000000) ,color:"#009AB2"
                },
                {
                  label: "La América",
                  value: Math.ceil(parseInt(datos.data[0].la_america)/1000000) ,color:"#009AB2"
                },
                {
                  label: "San Javier",
                   value: Math.ceil(parseInt(datos.data[0].san_javier)/1000000) ,color:"#009AB2"
                },
                {
                  label: "El Poblado",
                  value: Math.ceil(parseInt(datos.data[0].el_poblado)/1000000) ,color:"#009AB2"
                },
                {
                  label: "Guayabal",
                  value: Math.ceil(parseInt(datos.data[0].guayabal)/1000000) ,color:"#009AB2"
                },
                {
                  label: "Belén",
                  value: Math.ceil(parseInt(datos.data[0].belen)/1000000) ,color:"#009AB2"
                },
                {
                  label: "Palmitas",
                  value: Math.ceil(parseInt(datos.data[0].palmitas)/1000000) ,color:"#009AB2"
                },
                {
                  label: "San Cristóbal",
                  value: Math.ceil(parseInt(datos.data[0].san_cristobal)/1000000) ,color:"#009AB2"
                },
                {
                  label: "Altavista",
                  value: Math.ceil(parseInt(datos.data[0].altavista)/1000000) ,color:"#009AB2"
                },
                {
                  label: "San Antonio",
                   value: Math.ceil(parseInt(datos.data[0].san_antonio)/1000000) ,color:"#009AB2"
                },
                {
                  label: "Santa Elena",
                  value: Math.ceil(parseInt(datos.data[0].santa_elena)/1000000) ,color:"#009AB2"
                },
                {
                  label: "Ciudad",
                  value: Math.ceil(parseInt(datos.data[0].ciudad)/1000000) ,color:"#009AB2"
                },
                {
                  label: "Fort. Inst",
                  value: Math.ceil(parseInt(datos.data[0].fort_inst)/1000000) ,color:"#009AB2"
                }
              ]
      };
     FusionCharts.ready(function() {
      var myChart = new FusionCharts({
        type: "column2d",
        renderAt: "chart-geoQproyect",
        width: "100%",
        height: "100%",
        dataFormat: "json",
        dataSource
      }).render();
    });
    document.getElementById('inv_territorio_qproject').innerHTML="";

    let tabla='';
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">Popular</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].popular)))+'</td>';
    tabla +='</tr>';
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">Santa Cruz</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].santa_cruz)))+'</td>';
    tabla +='</tr>';
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">Manrique</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].manrique)))+'</td>';
    tabla +='</tr>';
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">Aranjuez</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].aranjuez)))+'</td>';
    tabla +='</tr>';
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">Castilla</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].castilla)))+'</td>';
    tabla +='</tr>';
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">Doce de Octubre</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].doce_de_octubre)))+'</td>';
    tabla +='</tr>';
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">Robledo</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].robledo)))+'</td>';
    tabla +='</tr>';
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">Villa Hermosa</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].villa_hermosa)))+'</td>';
    tabla +='</tr>';
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">Buenos Aires</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].buenos_aires)))+'</td>';
    tabla +='</tr>';
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">La Candelaria</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].la_candelaria)))+'</td>';
    tabla +='</tr>';
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">Lureles - Estadio</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].laureles_estadio)))+'</td>';
    tabla +='</tr>';
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">La América</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].la_america)))+'</td>';
    tabla +='</tr>';
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">San Javier</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].san_javier)))+'</td>';
    tabla +='</tr>';
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">El Poblado</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].el_poblado)))+'</td>';
    tabla +='</tr>'; 
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">Guayabal</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].guayabal)))+'</td>';
    tabla +='</tr>';                
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">Belén</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].belen)))+'</td>';
    tabla +='</tr>';                
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">San Sebastían de Palmitas</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].palmitas)))+'</td>';
    tabla +='</tr>';  
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">San Cristóbal</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].san_cristobal)))+'</td>';
    tabla +='</tr>';      
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">Altavista</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].altavista)))+'</td>';
    tabla +='</tr>';  
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">San Antonio de Prado</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].san_antonio)))+'</td>';
    tabla +='</tr>';  
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">Santa Elena</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].santa_elena)))+'</td>';
    tabla +='</tr>';  
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">Ciudad</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].ciudad)))+'</td>';
    tabla +='</tr>';  
    tabla +='<tr  style="font-size: xx-small;">';
      tabla +='<td style="text-align: left; font-size: 10px;">Fortalecimiento Institucional</td>';   
      tabla +='<td style="text-align: left; font-size: 10px;">'+ formatter.format(Math.ceil(parseInt(datos.data[0].fort_inst)))+'</td>';
    tabla +='</tr>';      
    document.getElementById('inv_territorio_qproject').innerHTML=tabla;
   
    })



  } catch (error) {
  console.log('Error groProyect', error)      
  }
}



async function dowloadRepor (){

  let codvalstat = document.getElementById('valstat').value
  const invoice = this.document.getElementById('invoicevalstat');
  // console.log(invoice);
  //console.log(window);
  var opt = {
    margin:       1,
    filename:     codvalstat+'.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 3 , letterRending:true },
    pagebreak: { mode: 'avoid-all', before: '#page2el' },
    jsPDF:        { unit: 'in', format: 'a3', orientation: 'portrait' }
  };
  html2pdf().from(invoice).set(opt).save();

}
  


async function dowloadQP (){

  let codvalstat = document.getElementById('bpin').value
  const invoice = this.document.getElementById('invoiceQproyect');
  // console.log(invoice);
  //console.log(window);
  var opt = {
    margin:       1,
    filename:     codvalstat+'.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 3 , letterRending:true },
    pagebreak: { mode: 'avoid-all', before: '#page2el' },
    jsPDF:        { unit: 'in', format: 'a3', orientation: 'portrait' }
  };
  html2pdf().from(invoice).set(opt).save();

}
  



