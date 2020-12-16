const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })
  
  
async function _main(){
  let dep = document.getElementById('inputGroupSelectDependencia').value
    _avancePDM(dep)
    _avance_financiero(dep)
    porc_avance_fisico(dep)
    tipoinversion(dep)
    columnGeo(dep)
    avance_linea_dep(dep)
    avance_prgs_dep(dep)
    avance_componente_dep(dep)
    total_proyectos_dep(dep)
    plan_accion_dep(dep)
}


async function dep_estado(cod_dep){
  let terminal = document.getElementById("inputGroupSelectDependencia");
  var selectedText = terminal.options[terminal.selectedIndex].text;   
  _avancePDM(cod_dep)
  _avance_financiero(cod_dep)
  porc_avance_fisico(cod_dep)
  tipoinversion(cod_dep)
  columnGeo(cod_dep)
  avance_linea_dep(cod_dep,selectedText)
  avance_prgs_dep(cod_dep, selectedText)
  avance_componente_dep(cod_dep, selectedText)
  total_proyectos_dep(cod_dep)
  plan_accion_dep(cod_dep)


}
  
async function _avancePDM(cod_dep){
    try {
      fetch(`https://sse-pdm-back.herokuapp.com/dep/api/avance/${cod_dep}`)
      .then(res=>res.json())
      .then(datos=>{
      

        let avance_dep = (datos.data[0].avance/datos.data[0].peso)*100

          graphPDM(avance_dep)
        })
    } catch (error) {
      console.log('Error _avancePDM ',error )
    }
}
  
async function graphPDM(total){
    //aqui un fetch para consultar el porcentaje de ejecución del pdm
    try {
      const dataSource = {
        chart: {
          caption: "% Avance cuatrienial PDM",
          lowerlimit: "0",
          upperlimit: "100",
          showvalue: "1",
          numbersuffix: "%",
          theme: "gammel",
          showtooltip: "0",
          valuefontsize: "25"
        },
        colorrange: {
          color: [
            {
              minvalue: "0",
              maxvalue: "50",
              code: "#B4358B"
            },
            {
              minvalue: "50",
              maxvalue: "75",
              code: "#FFDC15"
            },
            {
              minvalue: "75",
              maxvalue: "100",
              code: "#00853E"
            }
          ]
        },
        dials: {
          dial: [
            {
              value: (total)
            }
          ]
        }
      };
      
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "angulargauge",
          renderAt: "canvas-dep",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });
    } catch (error) {
      console.log('Error graphPDM: ', error)
    }
    
  
}
  
async function _avance_financiero(dep){
    try {
      fetch(`https://sse-pdm-back.herokuapp.com/pa/api/avancefinanciero/dep/${dep}`)
      .then(res=>res.json())
      .then(datos=>{
        porc_avance_financiero(datos.data[0].pptoejecutado/datos.data[0].pptoajustado) 
        graphPDA(parseInt(datos.data[0].poai), parseInt(datos.data[0].pptoajustado),parseInt(datos.data[0].pptoejecutado))
        detallePpto(datos.data[0].compromisos, datos.data[0].disponible, datos.data[0].ordenado, datos.data[0].total)
  
      })
    } catch (error) {
      console.log('Error porc_avance_financiero ',error )
    }
}
  
async function porc_avance_financiero(avance){  

    const dataSource = {
      chart: {
        caption: "% Ejecución Financiera",
        lowerlimit: "0",
        upperlimit: "100",
        showvalue: "1",
        numbersuffix: "%",
        theme: "gammel",
        showtooltip: "0",
        valuefontsize: "25"
      },
      colorrange: {
        color: [
          {
            minvalue: "0",
            maxvalue: "40",
            code: "#F2726F"
          },
          {
            minvalue: "40",
            maxvalue: "60",
            code: "#FFC533"
          },
          {
            minvalue: "60",
            maxvalue: "100",
            code: "#62B58F"
          }
        ]
        },
        dials: {
          dial: [
            {
              value: (avance)*100
            }
          ]
        }
      };
          
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "angulargauge",
          renderAt: "chart-ejecfinanciera-dep",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });
}
  
function graphPDA(poai, pptoajustado, ordenado){
    const dataSource = {
      chart: {
        caption: " Ejecución Financiera ",
        yaxisname: "(mill de $)",
        showvalues: "1",
        formatnumberscale: "0",
        plottooltext: "<b>$dataValue</b> Ppto",
        theme: "gammel",
        showvalues: "1",
        numberprefix: "$",
        decimalSeparator: ",",
        thousandSeparator: "."
      },
      data: [
        {
          label: "Ppto. Inicial",
          value: Math.ceil(poai),
          "color": "#009FE3"
        },
        {
          label: "Ppto. Ajustado",
          value: Math.ceil(pptoajustado),
          "color": "#009AB2"
        },
        {
          label: "Ppto. Ordenado",
          value: Math.ceil(ordenado) ,
          "color": "#EE7518"
        }
  
      ]
    };
    FusionCharts.ready(function() {
     var myChart = new FusionCharts({
        type: "bar2d",
        renderAt: "canvas-pa1-dep",
        width: "100%",
        height: "100%",
        dataFormat: "json",
        dataSource,
  
      }).render();
      
    });
}
  
async function detallePpto(compromisos, disponible, ordenado , total){
    document.getElementById('compromisos-dep').innerHTML=  formatter.format((compromisos));
    document.getElementById('disponible-dep').innerHTML=  formatter.format((disponible));
    document.getElementById('ordenado-dep').innerHTML=  formatter.format((ordenado));
    document.getElementById('total-dep').innerHTML=  formatter.format((total));
  
    const dataSource = {
      chart: {
        caption: "Detalle Presupuesto",
        subcaption:"en millones de pesos",
        showvalues: "1",
        decimals: "1",
        stack100percent: "1",
        valuefontcolor: "#FFFFFF",
        plottooltext:
          "$label has $dataValue (<b>$percentValue</b>) $seriesName",
        theme: "zune"
      },
      categories: [
        {category: [ { label: "Presupuesto" }]}
      ],
      dataset: [
        { seriesname: "Compromisos",
            data: [{value: Math.ceil(compromisos)}]
        },
        { seriesname: "Disponible",
           data: [{value: Math.ceil(disponible)}]
        },
        { seriesname: "Ordenado",
           data: [ { value: Math.ceil(ordenado) }]
        }
      ]
    };
    FusionCharts.ready(function() {
      var myChart = new FusionCharts({
        type: "scrollstackedbar2d",
        renderAt: "canvas-pa2-dep",
        width: "100%",
        height: "100%",
        dataFormat: "json",
        dataSource
      }).render();
    });
}
  
async function columnGeo(dep){
    try {
        fetch(`https://sse-pdm-back.herokuapp.com/geo/api/dependencias/territorio/${dep}`)
        .then(res=>res.json())
        .then(datos=>{
     
          const dataSource = {
            chart: {
              caption: "Inversión Pública por Comunas y Corregimientos",
              subcaption: "(millones de pesos)",
              xaxisname: "Territorio",
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
              }
              ,
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
              renderAt: "chart-geo-dep",
              width: "100%",
              height: "100%",
              dataFormat: "json",
              dataSource
            }).render();
          });

        })
    } catch (error) {
      console.log('Error columnGeo: ', error)
    }
}
  
async function porc_avance_fisico(dep){
    try {
      fetch(`https://sse-pdm-back.herokuapp.com/pa/api/avancefisico/dep/${dep}`)
      .then(res=>res.json())
      .then(datos=>{
          const dataSource = {
            chart: {
              caption: "% Ejecución Física",
              lowerlimit: "0",
              upperlimit: "100",
              showvalue: "1",
              numbersuffix: "%",
              theme: "gammel",
              showtooltip: "0",
              valuefontsize: "25"
            },
            colorrange: {
              color: [
                {
                  minvalue: "0",
                  maxvalue: "40",
                  code: "#F2726F"
                },
                {
                  minvalue: "40",
                  maxvalue: "60",
                  code: "#FFC533"
                },
                {
                  minvalue: "60",
                  maxvalue: "100",
                  code: "#62B58F"
                }
              ]
            },
            dials: {
              dial: [
                {
                  value: (datos.data[0].avance_fisico)*100
                }
              ]
            }
          };
          FusionCharts.ready(function() {
            var myChart = new FusionCharts({
              type: "angulargauge",
              renderAt: "chart-ejecfisica-dep",
              width: "100%",
              height: "100%",
              dataFormat: "json",
              dataSource
            }).render();
          });
        })
    } catch (error) {
      console.log('Error _avancePDM ',error )
    }
}
  
async function tipoinversion(dep){
   try {
     fetch(`https://sse-pdm-back.herokuapp.com/geo/api/dependencias/tipo-inversion/${dep}`)
     .then(res=>res.json())
     .then(datos=> {
   
      document.getElementById('localizada').innerHTML = formatter.format(datos.data[0].localizada)
      document.getElementById('pp').innerHTML = formatter.format(datos.data[0].pp)
      document.getElementById('ciudad').innerHTML = formatter.format(datos.data[0].ciudad)
      document.getElementById('fortinst').innerHTML = formatter.format(datos.data[0].fortinst)

     })
    } catch (error) {
      console.log('Error tipoinversion', error)
    }
}

function stopEnterKey(evt) {
    var evt = (evt) ? evt : ((event) ? event : null);
    var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
    if ((evt.keyCode == 13) && (node.type == "text")) { return false; }
}
document.onkeypress = stopEnterKey;



async function total_proyectos_dep(dep){
  try {
 
    fetch(`https://sse-pdm-back.herokuapp.com/pa/api/tipo-iniciativa/dependencias/${dep}`)
    .then(res=>res.json())
    .then(datos=>{
 
      document.getElementById('inst').innerHTML=  datos.data[0].ini_inst
      document.getElementById('Proyectos_pp').innerHTML=  datos.data[0].pp
      document.getElementById('saldos_no_exec').innerHTML=  datos.data[0].saldos_no_exec
      document.getElementById('saldos_pendientes').innerHTML=  datos.data[0].saldos_pendientes

      const dataSource = {
        chart: {
          caption: "Presupuesto por tipo de iniciativa",
          xaxisname: "Tipo de iniciativa",
    yaxisname: "millones de pesos",
    drawcrossline: "1",
    plottooltext: "<b>$seriesName</b> expense in $label was <b>$$dataValue</b>",
    theme: "zune",
    showvalues: "1",
    formatnumberscale: "0"
  },
  categories: [
    {
      category: [
        {
          label: "Proyecto Iniciativa Institucional"
        },
        {
          label: "Proyectos Presuspuesto participativo"
        },
        {
          label: "Proyectos con saldos no ejecutables"
        },
        {
          label: "Proyectos con ejecución de saldos pendientes  (Vigencia Anterior)"
        }
      ]
    }
  ],
  dataset: [
    {
      seriesname: "POAI",
      data: [
        {
          value: (parseInt(datos.data[0].poai_ini_inst))
        },
        {
          value: (parseInt(datos.data[0].poai_pp))
        },
        {
          value: (parseInt(datos.data[0].poai_saldos_no_exec))
        },
        {
          value: (parseInt(datos.data[0].poai_saldos_pendientes))
        }
      
      ]
    },
    {
      seriesname: "Ppto. Ajustado",
      data: [
        {
          value: (parseInt(datos.data[0].ajustado_ini_inst))
        },
        {
          value: (parseInt(datos.data[0].ajustado_pp))
        },
        {
          value: (parseInt(datos.data[0].ajustado_saldos_no_exec))
        },
        {
          value: (parseInt(datos.data[0].ajustado_saldos_pendientes))
        }
      ]
    }
  ]
};

FusionCharts.ready(function() {
  var myChart = new FusionCharts({
    type: "msbar2d",
    renderAt: "chart-proyectos-dep",
    width: "100%",
    height: "100%",
    dataFormat: "json",
    dataSource
  }).render();
});


    
  })


} catch (error) {
  console.log('Error total_proyectos', error)
}






   
      
      
      
}




async function avance_linea_dep(dep, nom_dep){
  try {
    let valores =[];
    fetch(`https://sse-pdm-back.herokuapp.com/dep/api/avance/lineas/${dep}`)
    .then(res=>res.json())
    .then(datos=> {
      
      let tam = datos.data.length;
      for(let i =0; i<tam;i++){
        valores.push({
          "label" : datos.data[i].nom_linea,
          "value": (datos.data[i].avance/datos.data[i].peso)*100,
         
         
        })
      }
      const dataSource = {
        chart: {
          caption: "% Avance cuatrienial líneas "+ nom_dep +" PDM-2020/2023",
          yaxisname: "PDM-2020/2023",
          aligncaptionwithcanvas: "0",
          plottooltext: "<b>$dataValue</b> Avance",
          numbersuffix: "%",
          theme: "zune"
        },
        data: valores
      };
      
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "column2d",
          renderAt: "chart-lineas-dep",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });
      

    })
   } catch (error) {
     console.log('Error tipoinversion', error)
   }
}
   
async function avance_componente_dep(dep , nom_dep){
  try {
    let valores =[];
    fetch(`https://sse-pdm-back.herokuapp.com/dep/api/avance/componentes/${dep}`)
    .then(res=>res.json())
    .then(datos=> {
      let tam = datos.data.length;
      for(let i =0; i<tam;i++){
        valores.push({
          "label" : datos.data[i].nom_componente,
          "value": (datos.data[i].avance/datos.data[i].peso)*100,
        })
      }
      const dataSource = {
        chart: {
          caption: "% Avance cuatrienial componentes "+ nom_dep +" PDM-2020/2023",
          yaxisname: "PDM-2020/2023",
          aligncaptionwithcanvas: "0",
          plottooltext: "<b>$dataValue</b> leads received",
          numbersuffix: "%",
          theme: "zune"
        },
        data: valores
      };
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "bar2d",
          renderAt: "chart-componentes-dep",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });
  } )
  }catch (error) {
    console.log('Error avance_componente_dep', error)
  }
}
  

async function avance_prgs_dep(dep, nom_dep){
  try {
    let info=[];
    fetch(`https://sse-pdm-back.herokuapp.com/dep/api/avance/programas/${dep}`)
    .then(res=>res.json())
    .then(datos=> {
      let tam = datos.data.length;
      for(let i =0; i<tam;i++){
        info.push({
          "label" : datos.data[i].nom_programa,
          "value": (datos.data[i].avance/datos.data[i].peso)*100,
         })
      }
      const dataSource = {
        chart: {
          caption: "% Avance cuatrienial programas "+ nom_dep +" ",
          yaxisname: "PDM-2020/2023",
          aligncaptionwithcanvas: "0",
          plottooltext: "<b>$dataValue</b> leads received",
          numbersuffix: "%",
          theme: "zune"
        },
        data: info
      };
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "bar2d",
          renderAt: "chart-programas-dep",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });
    })
  } catch (error) {
    console.log('Error avance_prgs_dep', error)
  }
}

async function plan_accion_dep(dep)
{
  fetch(`https://sse-pdm-back.herokuapp.com/pa/api/plan/dependencias/${dep}`)
  .then(res=>res.json())
  .then(datos=>{
    let tabla='', tabla2='',tabla3='', tabla4='';
    let eficacia, finaciera, formula;
    let tam = datos.data.length;
    document.getElementById('p_tipo1').innerHTML="";
    document.getElementById('p_tipo2').innerHTML="";
    document.getElementById('p_tipo3').innerHTML="";
    document.getElementById('p_tipo4').innerHTML="";
    for(var i =0; i<(tam) ;i++){

     if (datos.data[i].tipo_iniciativa==1){
  
        if(datos.data[i].ejec_financiera== null || datos.data[i].ejec_financiera== 0 ){ formula =0}
        else{ formula = ( (    ((datos.data[i].porc_eficacia_proyecto))   / ((datos.data[i].ejec_financiera)))*100).toFixed(2)}
          tabla +='<tr  style="font-size: xx-small;">';
          tabla +='<td style="text-align: left; font-size: 10px;">'+datos.data[i].cod_proyecto+'</td>';
          tabla +='<td style="text-align: left; font-size: 10px;">'+((datos.data[i].nom_proyecto))+'</td>';
          tabla +='<td style="text-align: center;font-size: 10px;">'+((datos.data[i].porc_eficacia_proyecto)*100).toFixed(2)+'%</td>';
          tabla +='<td style="text-align: center;font-size: 10px;">'+((datos.data[i].ejec_financiera)*100).toFixed(2)+'%</td>';
          tabla +='<td style="text-align: center;font-size: 10px;">'+formula+'%</td>';
          tabla +='<td style="text-align: center;font-size: 10px;">'+formatter.format(datos.data[i].poai)+'</td>';
          tabla +='<td style="text-align: center;font-size: 10px;">'+formatter.format(datos.data[i].ppto_ajustado)+'</td>';
          tabla +='<td style="text-align: center;font-size: 10px;">'+formatter.format(datos.data[i].ejecucion)+'</td>';
          tabla +=`<td style="text-align: center;font-size: 10px;"><a name="" id="" class="btn btn-primary btn-sm" onclick="buscavalstat(    ' ${(datos.data[i].nom_proyecto)}' , ${datos.data[i].cod_proyecto})" role="button">+</a></td>`;
          tabla +='<tr>';
          document.getElementById('p_tipo1').innerHTML=tabla;
     }

   
     if (datos.data[i].tipo_iniciativa==2){
  
      if(datos.data[i].ejec_financiera== null || datos.data[i].ejec_financiera== 0 ){ formula =0}
      else{ formula = ( (    ((datos.data[i].porc_eficacia_proyecto))   / ((datos.data[i].ejec_financiera)))*100).toFixed(2)}
        tabla2 +='<tr  style="font-size: xx-small;">';
        tabla2 +='<td style="text-align: left; font-size: 10px;">'+datos.data[i].cod_proyecto+'</td>';
        tabla2 +='<td style="text-align: left; font-size: 10px;">'+((datos.data[i].nom_proyecto))+'</td>';
        tabla2 +='<td style="text-align: center;font-size: 10px;">'+((datos.data[i].porc_eficacia_proyecto)*100).toFixed(2)+'%</td>';
        tabla2 +='<td style="text-align: center;font-size: 10px;">'+((datos.data[i].ejec_financiera)*100).toFixed(2)+'%</td>';
        tabla2 +='<td style="text-align: center;font-size: 10px;">'+formula+'%</td>';
        tabla2 +='<td style="text-align: center;font-size: 10px;">'+formatter.format(datos.data[i].poai)+'</td>';
        tabla2 +='<td style="text-align: center;font-size: 10px;">'+formatter.format(datos.data[i].ppto_ajustado)+'</td>';
        tabla2 +='<td style="text-align: center;font-size: 10px;">'+formatter.format(datos.data[i].ejecucion)+'</td>';
        tabla2 +=`<td style="text-align: center;font-size: 10px;"><a name="" id="" class="btn btn-primary btn-sm" onclick="buscavalstat(    ' ${(datos.data[i].nom_proyecto)}' , ${datos.data[i].cod_proyecto})" role="button">+</a></td>`;
        tabla2 +='<tr>';
        document.getElementById('p_tipo2').innerHTML=tabla2;
   }



   if (datos.data[i].tipo_iniciativa==3){
  
    if(datos.data[i].ejec_financiera== null || datos.data[i].ejec_financiera== 0 ){ formula =0}
    else{ formula = ( (    ((datos.data[i].porc_eficacia_proyecto))   / ((datos.data[i].ejec_financiera)))*100).toFixed(2)}
      tabla3 +='<tr  style="font-size: xx-small;">';
      tabla3 +='<td style="text-align: left; font-size: 10px;">'+datos.data[i].cod_proyecto+'</td>';
      tabla3 +='<td style="text-align: left; font-size: 10px;">'+((datos.data[i].nom_proyecto))+'</td>';
      tabla3 +='<td style="text-align: center;font-size: 10px;">'+((datos.data[i].porc_eficacia_proyecto)*100).toFixed(2)+'%</td>';
      tabla3 +='<td style="text-align: center;font-size: 10px;">'+((datos.data[i].ejec_financiera)*100).toFixed(2)+'%</td>';
      tabla3 +='<td style="text-align: center;font-size: 10px;">'+formula+'%</td>';
      tabla3 +='<td style="text-align: center;font-size: 10px;">'+formatter.format(datos.data[i].poai)+'</td>';
      tabla3 +='<td style="text-align: center;font-size: 10px;">'+formatter.format(datos.data[i].ppto_ajustado)+'</td>';
      tabla3 +='<td style="text-align: center;font-size: 10px;">'+formatter.format(datos.data[i].ejecucion)+'</td>';
      tabla3 +=`<td style="text-align: center;font-size: 10px;"><a name="" id="" class="btn btn-primary btn-sm" onclick="buscavalstat(    ' ${(datos.data[i].nom_proyecto)}' , ${datos.data[i].cod_proyecto})" role="button">+</a></td>`;
      tabla3 +='<tr>';
      document.getElementById('p_tipo3').innerHTML=tabla3;
 }



 if (datos.data[i].tipo_iniciativa==4){
  
  if(datos.data[i].ejec_financiera== null || datos.data[i].ejec_financiera== 0 ){ formula =0}
  else{ formula = ( (    ((datos.data[i].porc_eficacia_proyecto))   / ((datos.data[i].ejec_financiera)))*100).toFixed(2)}
    tabla4 +='<tr  style="font-size: xx-small;">';
    tabla4 +='<td style="text-align: left; font-size: 10px;">'+datos.data[i].cod_proyecto+'</td>';
    tabla4 +='<td style="text-align: left; font-size: 10px;">'+((datos.data[i].nom_proyecto))+'</td>';
    tabla4 +='<td style="text-align: center;font-size: 10px;">'+((datos.data[i].porc_eficacia_proyecto)*100).toFixed(2)+'%</td>';
    tabla4 +='<td style="text-align: center;font-size: 10px;">'+((datos.data[i].ejec_financiera)*100).toFixed(2)+'%</td>';
    tabla4 +='<td style="text-align: center;font-size: 10px;">'+formula+'%</td>';
    tabla4 +='<td style="text-align: center;font-size: 10px;">'+formatter.format(datos.data[i].poai)+'</td>';
    tabla4 +='<td style="text-align: center;font-size: 10px;">'+formatter.format(datos.data[i].ppto_ajustado)+'</td>';
    tabla4 +='<td style="text-align: center;font-size: 10px;">'+formatter.format(datos.data[i].ejecucion)+'</td>';
    tabla4 +=`<td style="text-align: center;font-size: 10px;"><a name="" id="" class="btn btn-primary btn-sm" onclick="buscavalstat(    ' ${(datos.data[i].nom_proyecto)}' , ${datos.data[i].cod_proyecto})" role="button">+</a></td>`;
    tabla4 +='<tr>';
    document.getElementById('p_tipo4').innerHTML=tabla4;
   
}


    } 
  })

}

async function buscavalstat(nomproyecto, cod){
 
try {
  
   fetch(`https://sse-pdm-back.herokuapp.com/pa/api/proyecto/${cod}`)
  .then(res=>res.json())
  .then(datos=>{
  geoProyect(nomproyecto,cod)
    let tablaValStat ='';
    document.getElementById('valStat').innerHTML="";
    let tam = datos.data.length;
    document.getElementById('cod').innerHTML = nomproyecto;
 
    for (let index = 0; index < tam; index++) {
     tablaValStat += `<tr style="background-color:gray ;">
                        <th>Código</th>
                        <th style="text-align: center;">Producto</th>
                        <th style="text-align: center;">Unidad</th>
                        <th style="text-align: center;">Cantidad Planeada</th>
                        <th style="text-align: center;">Cantidad Ejecutada</th>
                        <th style="text-align: center;">Eficacia Producto</th>
                      </tr>
                      <tr>
                        <td style="text-align: center;">${datos.data[index].cod_val_stat}</td>
                        <td style="text-align: left;">${datos.data[index].nom_val_stat} </td>
                        <td style="text-align: center;">${datos.data[index].u_medida}</td>
                        <td style="text-align: center;">${datos.data[index].q_plan}</td>
                        <td style="text-align: center;">${datos.data[index].q_real}</td>
                        <td style="text-align: center;">${Math.ceil(datos.data[index].eficacia_ve)}%</td>
                      </tr>
                      <tr>
                        <th colspan="3"> Observación Val_Stat </th>
                        <th colspan="2">Observación SIUF</th>
                        <th colspan="1" style="text-align: center;">${datos.data[index].cod_siufp_catal}</th>              
                      </tr>
                      <tr>
                        <td colspan="3" style="text-align: left;">${datos.data[index].obs_val_stat}</td>
                        <td colspan="3" style="text-align: left;">${datos.data[index].obs_val_stat}</td>
                      </tr>
                      <tr><td colspan="6"><hr></td> </tr>  `
      document.getElementById('valStat').innerHTML=tablaValStat;  
    }
  })
} catch (error) {
  console.log('Error buscavalstat ', error)
}
  $('#exampleModal2').modal('show'); ;
}


async function geoProyect( nom, cod){
  try {
      
    fetch(`https://sse-pdm-back.herokuapp.com/geo/api/dependencias/proyectos/${cod}`)
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
                }
                ,
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
        renderAt: "chart-geoproyect",
        width: "100%",
        height: "100%",
        dataFormat: "json",
        dataSource
      }).render();
    });
    })


  } catch (error) {
  console.log('Error groProyect', error)      
  }




  
  
}






