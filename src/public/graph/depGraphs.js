


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
    
}



async function dep_estado(cod_dep){
  _avancePDM(cod_dep)
  _avance_financiero(cod_dep)
  porc_avance_fisico(cod_dep)
  tipoinversion(cod_dep)
  columnGeo(cod_dep)


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



async function total_proyectos_dep(){
    const dataSource = {
        chart: {
            decimalSeparator: ",",
            thousandSeparator: ".",
          caption: "Tipos de proyectos",
   
          showpercentvalues: "0",
          formatnumberscale: "0",
          aligncaptionwithcanvas: "0",
          captionpadding: "0",
          decimals: "1",
          plottooltext:
            "<b>$Value</b>  proyectos <b>$label</b>",
          centerlabel: "$value",
          theme: "gammel"
        },
        data: [
          {
            label: "Iniciativa Institucional",
            value: "1000"
          },
          {
            label: "Presupuesto Participativo",
            value: "5300"
          }
        ]
      };
      
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "doughnut2d",
          renderAt: "chart-proyectos-dep",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });
      
}


async function avance_linea_dep(){
    const dataSource = {
        chart: {
          caption: "Lead sources by industry",
          yaxisname: "Number of Leads",
          aligncaptionwithcanvas: "0",
          plottooltext: "<b>$dataValue</b> leads received",
          theme: "gammel"
        },
        data: [
          {
            label: "Travel & Leisure",
            value: "41"
          },
          {
            label: "Advertising/Marketing/PR",
            value: "39"
          },
          {
            label: "Other",
            value: "38"
          },
          {
            label: "Real Estate",
            value: "32"
          },
          {
            label: "Communications/Cable/Phone",
            value: "26"
          },
          {
            label: "Construction",
            value: "25"
          },
          {
            label: "Entertainment",
            value: "25"
          },
          {
            label: "Staffing Firm/Full Time/Temporary",
            value: "24"
          },
          {
            label: "Transportation/Logistics",
            value: "23"
          },
          {
            label: "Utilities",
            value: "22"
          },
          {
            label: "Aerospace/Defense Products",
            value: "18"
          },
          {
            label: "Banking/Finance/Securities",
            value: "16"
          },
          {
            label: "Consumer Products - Non-Durables",
            value: "15"
          },
          {
            label: "Distribution",
            value: "13"
          },
          {
            label: "Education",
            value: "12"
          },
          {
            label: "Health Products & Services",
            value: "11"
          },
          {
            label: "Hospitality & Hotels",
            value: "10"
          },
          {
            label: "Non-Business/Residential",
            value: "6"
          },
          {
            label: "Pharmaceutical",
            value: "4"
          },
          {
            label: "Printing & Publishing",
            value: "1"
          },
          {
            label: "Professional Services",
            value: "1"
          },
          {
            label: "VAR/ISV",
            value: "1"
          },
          {
            label: "Warranty Administrators",
            value: "1"
          }
        ]
      };
      
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "bar2d",
          renderAt: "chart-lineas-dep",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });
      
}

async function avance_componente_dep(){
    const dataSource = {
        chart: {
          caption: "Lead sources by industry",
          yaxisname: "Number of Leads",
          aligncaptionwithcanvas: "0",
          plottooltext: "<b>$dataValue</b> leads received",
          theme: "gammel"
        },
        data: [
          {
            label: "Travel & Leisure",
            value: "41"
          },
          {
            label: "Advertising/Marketing/PR",
            value: "39"
          },
          {
            label: "Other",
            value: "38"
          },
          {
            label: "Real Estate",
            value: "32"
          },
          {
            label: "Communications/Cable/Phone",
            value: "26"
          },
          {
            label: "Construction",
            value: "25"
          },
          {
            label: "Entertainment",
            value: "25"
          },
          {
            label: "Staffing Firm/Full Time/Temporary",
            value: "24"
          },
          {
            label: "Transportation/Logistics",
            value: "23"
          },
          {
            label: "Utilities",
            value: "22"
          },
          {
            label: "Aerospace/Defense Products",
            value: "18"
          },
          {
            label: "Banking/Finance/Securities",
            value: "16"
          },
          {
            label: "Consumer Products - Non-Durables",
            value: "15"
          },
          {
            label: "Distribution",
            value: "13"
          },
          {
            label: "Education",
            value: "12"
          },
          {
            label: "Health Products & Services",
            value: "11"
          },
          {
            label: "Hospitality & Hotels",
            value: "10"
          },
          {
            label: "Non-Business/Residential",
            value: "6"
          },
          {
            label: "Pharmaceutical",
            value: "4"
          },
          {
            label: "Printing & Publishing",
            value: "1"
          },
          {
            label: "Professional Services",
            value: "1"
          },
          {
            label: "VAR/ISV",
            value: "1"
          },
          {
            label: "Warranty Administrators",
            value: "1"
          }
        ]
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
      
}

async function avance_prgs_dep(){
    const dataSource = {
        chart: {
          caption: "Lead sources by industry",
          yaxisname: "Number of Leads",
          aligncaptionwithcanvas: "0",
          plottooltext: "<b>$dataValue</b> leads received",
          theme: "gammel"
        },
        data: [
          {
            label: "Travel & Leisure",
            value: "41"
          },
          {
            label: "Advertising/Marketing/PR",
            value: "39"
          },
          {
            label: "Other",
            value: "38"
          },
          {
            label: "Real Estate",
            value: "32"
          },
          {
            label: "Communications/Cable/Phone",
            value: "26"
          },
          {
            label: "Construction",
            value: "25"
          },
          {
            label: "Entertainment",
            value: "25"
          },
          {
            label: "Staffing Firm/Full Time/Temporary",
            value: "24"
          },
          {
            label: "Transportation/Logistics",
            value: "23"
          },
          {
            label: "Utilities",
            value: "22"
          },
          {
            label: "Aerospace/Defense Products",
            value: "18"
          },
          {
            label: "Banking/Finance/Securities",
            value: "16"
          },
          {
            label: "Consumer Products - Non-Durables",
            value: "15"
          },
          {
            label: "Distribution",
            value: "13"
          },
          {
            label: "Education",
            value: "12"
          },
          {
            label: "Health Products & Services",
            value: "11"
          },
          {
            label: "Hospitality & Hotels",
            value: "10"
          },
          {
            label: "Non-Business/Residential",
            value: "6"
          },
          {
            label: "Pharmaceutical",
            value: "4"
          },
          {
            label: "Printing & Publishing",
            value: "1"
          },
          {
            label: "Professional Services",
            value: "1"
          },
          {
            label: "VAR/ISV",
            value: "1"
          },
          {
            label: "Warranty Administrators",
            value: "1"
          }
        ]
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
        
}