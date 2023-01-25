var fecha = 0;
let mespa = 0;
var valormaximopa = 0;
var valorminimopa = 0;
var vigencia = 0;
let mes = 0;
var fecha = '';
var fechaPA = '';
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

async function _main() {
    _avance_financiero()
    getCorteAvancePI()
    // tipoinversion()
    // columnDependencias()
}

async function _avance_financiero() {
    try {
        fetch('http://localhost:7001/pa/api/avancefinanciero')
            .then(res => res.json())
            .then(datos => {
                porc_avance_financiero(parseFloat(datos.data[0].pptoejecutado / datos.data[0].pptoajustado))
                graphPDA(parseFloat(datos.data[0].poai), parseFloat(datos.data[0].pptoajustado), parseFloat(datos.data[0].pptoejecutado))
                detallePpto(parseFloat(datos.data[0].compromisos), parseFloat(datos.data[0].disponible), parseFloat(datos.data[0].ordenado), parseFloat(datos.data[0].total))
            })
    } catch (error) {
        console.log('Error porc_avance_financiero ', error)
    }
}

async function getCorteAvancePI() {
    try {
        fetch(`http://localhost:7001/pi/api/avance/corte`)
            .then(res => res.json())
            .then(response => {
                let corteavance = new Date(response.data[0].corte)
                let mesavance = corteavance.getMonth(corteavance) + 1
                let vigencia = corteavance.getFullYear(corteavance)
                fecha = corteavance;
                fechaPA = corteavance
                _PASemaf(mesavance, vigencia, corteavance)
            })
    } catch (error) {
        console.error('Error getalerta ', error);
    }
}

async function _PASemaf(mes, vigencia, corte) {
    try {
       
        mespa = mes + 1 //fecha.getMonth(fecha)+1
        vigencia = vigencia //fecha.getFullYear(fecha)
        fetch(`http://localhost:7001/pa/semaforo-corte/${mespa}`)
            .then(res => res.json())
            .then(response => {
                valorminimopa = (response.data[0].rojo);
                valormaximopa = (response.data[0].verde);
                porc_avance_fisico(valorminimopa, valormaximopa)

            })
    } catch (error) {}
}

async function porc_avance_financiero(avance) {
    try {
        const dataSource = {
            chart: {
                caption: "% Ejecución Financiera Plan de Acción",
                lowerlimit: "0",
                upperlimit: "100",
                showvalue: "1",
                numbersuffix: "%",
                theme: "gammel",
                showtooltip: "0",
                valuefontsize: "25"
            },
            colorrange: {
                color: [{
                        minvalue: 0,
                        maxvalue: valorminimopa,
                        code: "#F2726F"
                    },
                    {
                        minvalue: valorminimopa,
                        maxvalue: valormaximopa,
                        code: "#FFC533"
                    },
                    {
                        minvalue: valorminimopa,
                        maxvalue: 100,
                        code: "#62B58F"
                    }
                ]
            },
            dials: {
                dial: [{
                    value: (avance) * 100
                }]
            }
        };
        FusionCharts.ready(function () {
            var myChart = new FusionCharts({
                type: "angulargauge",
                renderAt: "ejecfinanciera",
                width: "100%",
                height: "100%",
                dataFormat: "json",
                dataSource
            }).render();
        });
        avancefinaninst()
    } catch (error) {
        console.error(error);
    }
}

async function ejecfinanpp() {
    try {
        fetch('http://localhost:7001/pa/general/financiero/pp')
            .then(res => res.json())
            .then(datos => {
                const dataSource = {
                    chart: {
                        caption: "% Ejecución Financiera Presupuesto Participativo Plan de Acción",
                        lowerlimit: "0",
                        upperlimit: "100",
                        showvalue: "1",
                        numbersuffix: "%",
                        theme: "gammel",
                        showtooltip: "0",
                        valuefontsize: "25"
                    },
                    colorrange: {
                        color: [{
                                minvalue: 0,
                                maxvalue: valorminimopa,
                                code: "#F2726F"
                            },
                            {
                                minvalue: valorminimopa,
                                maxvalue: valormaximopa,
                                code: "#FFC533"
                            },
                            {
                                minvalue: valorminimopa,
                                maxvalue: 100,
                                code: "#62B58F"
                            }
                        ]
                    },
                    dials: {
                        dial: [{
                            value: (datos.data[0].porc_finan) * 100
                        }]
                    }
                };
                FusionCharts.ready(function () {
                    var myChart = new FusionCharts({
                        type: "angulargauge",
                        renderAt: "ejefinanpp",
                        width: "100%",
                        height: "100%",
                        dataFormat: "json",
                        dataSource
                    }).render();
                });


            })
    } catch (error) {
        console.error('Error ejecfinanpp: ', error);
    }
}

async function porc_avance_fisico(valorminimopa, valormaximopa) {
    try {
        fetch('http://localhost:7001/pa/general/fisico/pp')
            .then(res => res.json())
            .then(datos => {
                const dataSource = {
                    chart: {
                        caption: "% Ejecución Física Presupuesto Participativo",
                        lowerlimit: "0",
                        upperlimit: "100",
                        showvalue: "1",
                        numbersuffix: "%",
                        theme: "gammel",
                        showtooltip: "0",
                        valuefontsize: "25"
                    },
                    colorrange: {
                        color: [{
                                minvalue: "0",
                                maxvalue: valorminimopa,
                                code: "#F2726F"
                            },
                            {
                                minvalue: valorminimopa,
                                maxvalue: valormaximopa,
                                code: "#FFC533"
                            },
                            {
                                minvalue: valorminimopa,
                                maxvalue: "100",
                                code: "#62B58F"
                            }
                        ]
                    },
                    dials: {
                        dial: [{
                            value: (datos.data[0].porc_ejecfisica) * 100
                        }]
                    }
                };
                FusionCharts.ready(function () {
                    var myChart = new FusionCharts({
                        type: "angulargauge",
                        renderAt: "ejecfinanpp",
                        width: "100%",
                        height: "100%",
                        dataFormat: "json",
                        dataSource
                    }).render();
                });
            })
        ejecFisicaInst()
    } catch (error) {
        console.log('Error _avancePDM ', error)
    }
}

async function ejecFisicaInst() {
    try {
        fetch(`http://localhost:7001/pa/general/financiero/pp`).then(res => res.json())
            .then(response => {

                const dataSource = {
                    chart: {
                        caption: "% Ejecución Financiera Presupuesto Participativo",
                        lowerlimit: "0",
                        upperlimit: "100",
                        showvalue: "1",
                        numbersuffix: "%",
                        theme: "gammel",
                        showtooltip: "0",
                        valuefontsize: "25"
                    },
                    colorrange: {
                        color: [{
                                minvalue: "0",
                                maxvalue: valorminimopa,
                                code: "#F2726F"
                            },
                            {
                                minvalue: valorminimopa,
                                maxvalue: valormaximopa,
                                code: "#FFC533"
                            },
                            {
                                minvalue: valorminimopa,
                                maxvalue: "100",
                                code: "#62B58F"
                            }
                        ]
                    },
                    dials: {
                        dial: [{
                            value: (response.data[0].porc_finan) * 100
                        }]
                    }
                };
                FusionCharts.ready(function () {
                    var myChart = new FusionCharts({
                        type: "angulargauge",
                        renderAt: "ejecfisicainst",
                        width: "100%",
                        height: "100%",
                        dataFormat: "json",
                        dataSource
                    }).render();
                });
            })
        ejefisicapp()
    } catch (error) {
        console.error('Error ejecFisicaInst ', error);
    }
}

async function detallePpto(compromisos, disponible, ordenado, total) {
    // console.log(compromisos,disponible,ordenado, total);
    /*document.getElementById('compromisos').innerHTML=  formatter.format((compromisos));
    document.getElementById('disponible').innerHTML=  formatter.format((disponible));
    document.getElementById('ordenado').innerHTML=  formatter.format((ordenado));
    document.getElementById('totalppto').innerHTML=  formatter.format((total));*/
    const dataSource = {
        chart: {
            caption: "Detalle Presupuesto",
            subcaption: "en millones de pesos",
            showvalues: "1",
            decimals: "1",
            stack100percent: "1",
            valuefontcolor: "#FFFFFF",
            plottooltext: "$label has $dataValue (<b>$percentValue</b>) $seriesName",
            theme: "zune"
        },
        categories: [{
            category: [{
                label: "Presupuesto"
            }]
        }],
        dataset: [{
                seriesname: "Compromisos",
                data: [{
                    value: Math.ceil(compromisos)
                }]
            },
            {
                seriesname: "Disponible",
                data: [{
                    value: Math.ceil(disponible)
                }]
            },
            {
                seriesname: "Ordenado",
                data: [{
                    value: Math.ceil(ordenado)
                }]
            }
        ]
    };
    FusionCharts.ready(function () {
        var myChart = new FusionCharts({
            type: "scrollstackedbar2d",
            renderAt: "canvasdetallepptot",
            width: "100%",
            height: "100%",
            dataFormat: "json",
            dataSource
        }).render();
    });

}


async function ejefisicapp() {
    try {
        fetch(`http://localhost:7001/pa/general/fisico/pp`).then(res => res.json())
            .then(response => {
                const dataSource = {
                    chart: {
                        caption: "% Ejecución Física Presupuesto Participativo del Plan de Acción",
                        lowerlimit: "0",
                        upperlimit: "100",
                        showvalue: "1",
                        numbersuffix: "%",
                        theme: "gammel",
                        showtooltip: "0",
                        valuefontsize: "25"
                    },
                    colorrange: {
                        color: [{
                                minvalue: "0",
                                maxvalue: valorminimopa,
                                code: "#F2726F"
                            },
                            {
                                minvalue: valorminimopa,
                                maxvalue: valormaximopa,
                                code: "#FFC533"
                            },
                            {
                                minvalue: valorminimopa,
                                maxvalue: "100",
                                code: "#62B58F"
                            }
                        ]
                    },
                    dials: {
                        dial: [{
                            value: (response.data[0].porc_ejecfisica) * 100
                        }]
                    }
                };
                FusionCharts.ready(function () {
                    var myChart = new FusionCharts({
                        type: "angulargauge",
                        renderAt: "ejecfisicapp",
                        width: "100%",
                        height: "100%",
                        dataFormat: "json",
                        dataSource
                    }).render();
                });
            })
        ejecfisicarank()

    } catch (error) {
        console.error('Error ejefisicapp: ', error);
    }
}

async function graphPDA(poai, pptoajustado, ordenado) {
    const dataSource = {
        chart: {
            caption: " Ejecución Financiera ",
            yaxisname: "(mill de $)",
            showvalues: "1",
            formatnumberscale: "0",
            plottooltext: "<b>$dataValue</b> (Millones)",
            theme: "gammel",
            showvalues: "1",
            numberprefix: "$",
            decimalSeparator: ",",
            thousandSeparator: "."
        },
        data: [{
                label: "Ppto. Inicial",
                value: Math.round(poai),
                "color": "#009FE3"
            },
            {
                label: "Ppto. Ajustado",
                value: Math.round(pptoajustado),
                "color": "#009AB2"
            },
            {
                label: "Ppto. Ejecutado",
                value: Math.round(ordenado),
                "color": "#EE7518"
            }
        ]
    };
    FusionCharts.ready(function () {
        var myChart = new FusionCharts({
            type: "bar2d",
            renderAt: "canvasfinan",
            width: "100%",
            height: "100%",
            dataFormat: "json",
            dataSource,
        }).render();
    });
}

function stopEnterKey(evt) {
    var evt = (evt) ? evt : ((event) ? event : null);
    var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
    if ((evt.keyCode == 13) && (node.type == "text")) {
        return false;
    }
}
document.onkeypress = stopEnterKey;

async function ejecfisica() {
    try {
        let infofisicadep = [];
        fetch(`http://localhost:7001/pa/api/ejecusion-fisica/dependencias`)
            .then(res => res.json())
            .then(datos => {
                let tam = datos.data.length;
                for (let i = 0; i < tam; i++) {
                    if (((datos.data[i].porc_ejecfisica) * 100) >= valormaximo) {
                        colorsemaf = "#58AC84"
                    } else if (((datos.data[i].porc_ejecfisica) * 100) <= valorminimo) {
                        colorsemaf = "#F06764"
                    } else {
                        colorsemaf = "#FFBD2E"
                    }
                    infofisicadep.push({
                        "label": datos.data[i].nom_dependencia,
                        "value": (datos.data[i].porc_ejecfisica) * 100,
                        "color": colorsemaf
                    })
                }
                infofisicadep.sort((a, b) => b.value - a.value)
                const dataSource = {
                    chart: {
                        aligncaptionwithcanvas: "0",
                        numbersuffix: "%",
                        plottooltext: "<b>$dataValue</b> leads received",
                        theme: "zune"
                    },
                    data: infofisicadep
                };
                FusionCharts.ready(function () {
                    var myChart = new FusionCharts({
                        type: "bar2d",
                        renderAt: "chart-ejecfisica-dep",
                        width: "100%",
                        height: "100%",
                        dataFormat: "json",
                        dataSource
                    }).render();
                });
            })
    } catch (error) {
        console.error('Error ejecfisica :>> ', error);
    }
    jQuery.noConflict();
    $('#ejecfisicaModal').modal('show');
}



async function graphCumplimientoPDM(avance) {
    try {
        mespa = fechaPA.getMonth(fechaPA) + 1
        vigencia = fechaPA.getFullYear(fecha)
        fetch(`http://localhost:7001/pa/semaforo-corte/${mespa}`)
            .then(res => res.json())
            .then(response => {
                valorminimo = (response.data[0].rojo) - 0.01;
                valormaximo = (response.data[0].verde);
                porc_avance_fisico(valorminimo, valormaximo)
                const dataSource = {
                    chart: {
                        caption: "% Cumplimiento PDM",
                        lowerlimit: "0",
                        upperlimit: "100",
                        showvalue: "1",
                        numbersuffix: "%",
                        theme: "gammel",
                        showtooltip: "0",
                        valuefontsize: "25"
                    },
                    colorrange: {
                        color: [{
                                minvalue: 0,
                                maxvalue: valorminimo,
                                code: "#F2726F"
                            },
                            {
                                minvalue: valorminimo,
                                maxvalue: valormaximo,
                                code: "#FFC533"
                            },
                            {
                                minvalue: valorminimo,
                                maxvalue: 100,
                                code: "#62B58F"
                            }
                        ]
                    },
                    dials: {
                        dial: [{
                            value: (avance)
                        }]
                    }
                };
                FusionCharts.ready(function () {
                    var myChart = new FusionCharts({
                        type: "angulargauge",
                        renderAt: "cumplimientovigencia",
                        width: "100%",
                        height: "100%",
                        dataFormat: "json",
                        dataSource
                    }).render();
                });
            })
    } catch (error) {
        console.error(error);
    }
}




async function ejecfisicarank() {
    try {
        let infofisicadep = [];
        fetch(`http://localhost:7001/pa/alertapp/rankfisico`)
            .then(res => res.json())
            .then(datos => {
                let tam = datos.data.length;
                for (let i = 0; i < tam; i++) {
                    if (((datos.data[i].porc_ejecfisica) * 100) >= valormaximopa) {
                        colorsemaf = "#58AC84"
                    } else if (((datos.data[i].porc_ejecfisica) * 100) <= valorminimopa) {
                        colorsemaf = "#F06764"
                    } else {
                        colorsemaf = "#FFBD2E"
                    }
                    infofisicadep.push({
                        "label": datos.data[i].nom_dependencia,
                        "value": (datos.data[i].porc_ejecfisica) * 100,
                        "color": colorsemaf
                    })
                }
                infofisicadep.sort((a, b) => b.value - a.value)
                const dataSource = {
                    chart: {
                        aligncaptionwithcanvas: "0",
                        numbersuffix: "%",
                        plottooltext: "<b>$dataValue</b> leads received",
                        theme: "zune"
                    },
                    data: infofisicadep
                };
                FusionCharts.ready(function () {
                    var myChart = new FusionCharts({
                        type: "bar2d",
                        renderAt: "rankppfisico",
                        width: "100%",
                        height: "100%",
                        dataFormat: "json",
                        dataSource
                    }).render();
                });
            })
        ejecfinanrank()
    } catch (error) {
        console.error('Error ejecfinanciera :>> ', error);
    }
    jQuery.noConflict();
    $('#ejecfinancieraModal').modal('show');;
}


async function ejecfinanrank() {
    try {
        let infofisicadep = [];
        fetch(`http://localhost:7001/pa/alertapp/rankfinanciero`)
            .then(res => res.json())
            .then(datos => {
                let tam = datos.data.length;
                for (let i = 0; i < tam; i++) {
                    if (((datos.data[i].porcexec_financiera) * 100) >= valormaximopa) {
                        colorsemaf = "#58AC84"
                    } else if (((datos.data[i].porcexec_financiera) * 100) <= valorminimopa) {
                        colorsemaf = "#F06764"
                    } else {
                        colorsemaf = "#FFBD2E"
                    }
                    infofisicadep.push({
                        "label": datos.data[i].nom_dependencia,
                        "value": (datos.data[i].porcexec_financiera) * 100,
                        "color": colorsemaf
                    })
                }
                infofisicadep.sort((a, b) => b.value - a.value)
                const dataSource = {
                    chart: {
                        aligncaptionwithcanvas: "0",
                        numbersuffix: "%",
                        plottooltext: "<b>$dataValue</b> leads received",
                        theme: "zune"
                    },
                    data: infofisicadep
                };
                FusionCharts.ready(function () {
                    var myChart = new FusionCharts({
                        type: "bar2d",
                        renderAt: "rankppfinan",
                        width: "100%",
                        height: "100%",
                        dataFormat: "json",
                        dataSource
                    }).render();
                });
            })
            tablapp()
    } catch (error) {
        console.error('Error ejecfisica :>> ', error);
    }
    jQuery.noConflict();
    $('#ejecfisicaModal').modal('show');
}


getCorteAvancePI()

async function tablapp()
{
    let valor_alertafinanciera=[] 
    fetch(`http://localhost:7001/pa/alertapp/projects`)
    .then(res=> res.json()).then(response=>{
  
      
      for (let index = 0; index < response.data.length; index++) {
          valor_alertafinanciera.push([
              response.data[index].cod_dependencia,
              response.data[index].nom_dependencia,
              response.data[index].cod_proyecto,
              response.data[index].nom_proyecto,
              (response.data[index].poai),
              response.data[index].ppto_ajustado,
              (response.data[index].ejec_financiera*100).toFixed(2),
              (response.data[index].porc_eficacia_proyecto*100).toFixed(2),
              response.data[index].num_valstat,  
            ]);
                
      }
      let tableAlertaFinanciera= $('#alerta_financierapp').DataTable({
        data: valor_alertafinanciera,
          columns: [
            { title: "Cod_Dep" },
            { title: "Dependencia" },
            { title: "Cod_Proyecto" },
            { title: "Proyecto" },
            { title: "POAI" },
            { title: "Ppto. Ajustado" },
            { title: "% Ejecución Financiera" },
            { title: "% Eficacia" },
            { title: "Valores Estadisticos" },
          ]  ,   
          scrollCollapse: true, 
          fixedColumns: {
              heightMatch: 'none'
          }, fixedHeader: true,
          stateSave: false,
          language: {
                    "lengthMenu": "Mostrar _MENU_ registros por página",
                    "zeroRecords": "Nothing found - sorry",
                    "info": "Vistas página _PAGE_ of _PAGES_",
                    "infoEmpty": "No hay registros Disponibles",
                    "infoFiltered": "(filtered from _MAX_ total registros)", 
                    paginate: {
                        first: "Primera",
                        last: "Última",
                        next: "Siguiente",
                        previous: "Anterior"
                    },
                    sProcessing:"Procesando..."
              },
              responsive:"true",
              dom:'Bfrtlp',
              buttons:[
                {
                  extend: 'excelHtml5',
                  text  : '<i class="fa fa-file-excel-o"></i>' ,
                title : "Alerta_Baja_Ejecucion_Financiera",
                  tittleAttr: 'Exportar a Excel',
                  className: 'btn btn-success',
                  autoFilter: true,
                  sheetName: 'Alerta_Baja_Ejecucion_Financiera'
                 },
                 {
                  extend: 'pdfHtml5',
                  text  : '<i class="fa fa-file-pdf-o"></i>' ,
                  title : "Alerta_Plan_de_Acción",
                  tittleAttr: 'Exportar a PDF',
                  className: 'btn btn-danger',
                  orientation: 'landscape',
                  pageSize: 'LEGAL',
                  messageTop: 'PDF created by Unidad de SegumientoPlan de Desarrollo-DAP.'
                 },
                 {
                  extend: 'print',
                  text  : '<i class="fa fa-print"></i>' ,
                  title : "Alerta_Plan_de_Acción",
                  tittleAttr: 'Imprimir',
                  className: 'btn btn-info'
                 },  {
                  extend: 'csvHtml5',
                  text: '<i class="fa fa-file-text"></i>',
                  title : "Alerta_Plan_de_Acción",
                  className: 'btn btn-warning',
                  exportOptions: {
                      modifier: {
                          search: 'none'
                      }
                  }
              }],
              columnDefs: [
                            {/*cod_ind */  width: "10px", targets: 0, className: "text-center"  },
                            {/*nom_ind */  width: "90px", targets: 1, className: "text-center"  },
                            {/*ampliar*/   width: "10px",  targets: 2, className: "text-center"  },
                            {/*meta    */  width: "90px", targets: 3, className: "text-center"  },
                            {/*unidad  */  width: "70px",targets: 4, className: "text-center"  },
                            {/*sentido */  width: "70px", targets: 5, className: "text-center"  },
                            {/*avance  */  width: "70px", targets: 6, className: "text-center"  },
                            {/*%obser  */  width: "70px", targets: 7, className: "text-center"  },
                            {/*%obser  */  width: "10px", targets: 8, className: "text-center"  },
                          
                          ],   
              bDestroy: true,
             
      });
  
      })
     
      
}
