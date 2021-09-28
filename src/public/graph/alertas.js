const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})
var mes=0, vigencia=0, minimovalue=0, maximovalue=0;
var colorfondo='';
let valores=[]; let valores2=[]; let valores3=[];

async function dateomain(){
   setTimeout(function(){ avance_linea_dep()   }, 4000);
  semaforo_inicial()
}

async function semaforo_inicial(){
  fetch(`https://sse-pdm.herokuapp.com/pi/api/semaforo-corte/total`)
  .then(res=> res.json())
  .then(response=>{
    document.getElementById('title-dep').innerHTML="PDM-2020-2023";
    noprogramadas(response.data[0].gris)
    rojo(response.data[0].rojo)
    amarillo(response.data[0].amarillo)
    verde(response.data[0].verde)
  })
}
async function avance_linea_dep(){
  try {
    let info=[];
    fetch('https://sse-pdm.herokuapp.com/dep/api/dependencias/avance')
    .then(res=>res.json())
    .then(datos=>{
      let tam = datos.data.length;
         for(let i =0; i<tam;i++){
        if (((datos.data[i].avance/datos.data[i].peso)*100)>=maximovalue){colorsemaf="#58AC84"}
        else if (((datos.data[i].avance/datos.data[i].peso)*100)<=minimovalue) {colorsemaf="#F06764"} 
        else {colorsemaf="#FFBD2E"}
        info.push({
          "label" : datos.data[i].nombre_dep,
          "value": (datos.data[i].avance/datos.data[i].peso)*100,
          "color": colorsemaf,
          "link": "j-showAlert-"+datos.data[i].cod_responsable_reporte
        })
      }
      info.sort((a, b) =>  b.value -a.value )
      const dataSource = {
        chart: {
          caption: "% Avance cuatrienial por Dependencias PDM",
          yaxisname: "Dependencias",
          aligncaptionwithcanvas: "0",
          theme: "zune",
          numbersuffix: "%"
        },
        data: info
      };
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "bar2d",
          renderAt: "chart-container",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource,
          events: {
            'dataplotClick': function(evt) {
              otragrafica( evt)
              window.showAlert = function(str) {
              };
            }
          }
        }).render();
      });
    })
  } catch (error) {
    console.error('Error _avancePDM ',error )
  }
  document.getElementById('minimorango').innerHTML= '< '+minimovalue.toFixed(2)
  document.getElementById('maximorango').innerHTML= '> '+maximovalue.toFixed(2)
  document.getElementById('intermediorango').innerHTML= minimovalue.toFixed(2) +'-'+ maximovalue.toFixed(2)
  _avancePDM()
  alertasGraph()
}
async function alertasGraph(){
  try {
    let tabla='';
    let sumInd=0, sumGris=0, sumRojo=0,  sumAmarillo=0, sumVerde=0;
    document.getElementById('tabla_alerta').innerHTML="";
    fetch(`https://sse-pdm.herokuapp.com/pi/api/semaforo-corte/alertas`)
    .then(res=> res.json())
    .then(datos=>{
    let tam = datos.data.length;
    var gris=0, rojo=0, amarillo=0, verde=0, avance=0;
    let back_semafav='';
     for(let i =0; i<tam;i++){
        if (datos.data[i].total_gris == null){ gris= 0 } else { gris = parseInt(datos.data[i].total_gris)  }
        if (datos.data[i].total_rojo == null){rojo= 0} else { rojo = parseInt(datos.data[i].total_rojo ) }
        if (datos.data[i].total_amarillo == null){ amarillo= 0} else { amarillo = parseInt(datos.data[i].total_amarillo ) }
        if (datos.data[i].total_verde == null){ verde= 0} else { verde = parseInt(  datos.data[i].total_verde )}
        if (datos.data[i].avance == null){avance= 0 ;}
        else {
          avance = parseFloat( datos.data[i].avance );
          if (avance<=minimovalue){
            back_semafav =  ` <i class="fa fa-times-circle fa-2x"style="color: #ff6b6b;"> </i>`;
          }else if (avance>=maximovalue){
            back_semafav =  `<i class="fa fa-check-circle fa-2x" style="color: #51cf66;"></i>`;
          }else{
            back_semafav =  ` <i class="fa fa-minus-circle fa-2x" style="color: #ff922b;"></i>`;
          }
        }
        if((parseFloat(datos.data[i].avance)).toFixed(2)< minimovalue ){colorfondo='#f06764'}
        else if ((parseFloat(datos.data[i].avance)).toFixed(2)>= maximovalue) {colorfondo='#58ac84'
        } else {colorfondo='#ffbd2e'}
          valores.push({
            "cod_dep" : datos.data[i].cod_dep,
            "nombre_dep": datos.data[i].nombre_dep,
            "total_gris": gris,
            "total_rojo": rojo,
            "total_amarillo": amarillo,
            "total_verde": verde,
            "avance": avance,
            "color" : colorfondo
          })

if(datos.data[i].cod_dep>700 && datos.data[i].cod_dep<950 && datos.data[i].cod_dep!=800){
  valores2.push([ datos.data[i].cod_dep, datos.data[i].nombre_dep,"",
  gris,( (gris/ (gris+rojo+amarillo+verde))*100 ).toFixed(2)+"%",  
  rojo,( (rojo/ (gris+rojo+amarillo+verde))*100 ).toFixed(2)+"%",  
  amarillo,( (amarillo/ (gris+rojo+amarillo+verde))*100 ).toFixed(2)+"%",  
  verde,( (verde/ (gris+rojo+amarillo+verde))*100 ).toFixed(2)+"%",  
  (avance).toFixed(2),(gris+rojo+amarillo+verde)
] )
}
          

      }
     valores.sort((b, a) =>  b.avance - a.avance )
     valores2.sort((b, a) =>  a.avance - b.avance )


     var table= $('#alerta_table').DataTable( {
      data: valores2,
      columns: [
          { title: "Cod_Dep" },
          { title: "Dependencia" },
          { title: " Ampliar" }, 
          { title: "No programados" },
          { title: "%" },
          { title: "Bajo" },
          { title: "%" },
          { title: "Medio" },
          { title: "%" },
          { title: "Alto" },
          { title: "%" },
          { title: " % Avance Cuatrienio" },
         { title: "Indicadores de Producto" },
        ] ,   
      scrollCollapse: true, 
      fixedColumns: {
        heightMatch: 'none'
    }, fixedHeader: true,
      stateSave: true,
        "language": {
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
            title : "Alerta_Dependencias",
            tittleAttr: 'Exportar a Excel',
            className: 'btn btn-success',
            autoFilter: true,
            sheetName: 'Alerta Dependencias'
           },
           {
            extend: 'pdfHtml5',
            text  : '<i class="fa fa-file-pdf-o"></i>' ,
            title : "Alerta_Dependencias",
            tittleAttr: 'Exportar a PDF',
            className: 'btn btn-danger',
            orientation: 'landscape',
            pageSize: 'LEGAL',
            messageTop: 'PDF created by Unidad de SegumientoPlan de Desarrollo-DAP.'
           },
           {
            extend: 'print',
            text  : '<i class="fa fa-print"></i>' ,
            title : "Alerta_Dependencias",
            tittleAttr: 'Imprimir',
            className: 'btn btn-info'
           },  {
            extend: 'csvHtml5',
            text: '<i class="fa fa-file-text"></i>',
            title : "Alerta_Dependencias",
            className: 'btn btn-warning',
            exportOptions: {
                modifier: {
                    search: 'none'
                }
            }
        }],
        columnDefs: [
          {/*cod_dep*/  width: "10px",  targets: 0, className: "text-center", searchable: false,orderable: false  },
          {/*nom_dep*/  width: "510px", targets: 1                                    },
          {/*ampliar*/  width: "70px",  targets: 2, className: "text-center" , data: "cod_dep", defaultContent: `<button class='btn btn-link'><i class="fa fa-search-plus fa-2x" style="color: #28527a;"></i></button>`  , searchable: false,orderable: false   } ,
          {/*no_prg*/  width: "70px",   targets: 3,  className: "text-center"         },
          {/*no prg*/   width: "70px",  targets: 4, className: "text-center"          },
          {/*%no prg*/  width: "70px",  targets: 5, className: "text-center"          },
          {/*rojo*/     width: "70px",  targets: 6, className: "text-center"          },
          {/*%rojo*/    width: "70px",  targets: 7, className: "text-center"          },
          {/*amarillo*/ width: "70px",  targets: 8, className: "text-center"          },
          {/*%amarillo*/width: "70px",  targets: 9, className: "text-center"          }, 
          {/*verde*/    width: "70px",  targets: 10, className: "text-center"         }, 
          {/*%verde*/   width: "70px",  targets: 11, className: "text-center"         },
          {/*total_indicadores*/  width: "100px", targets:12, className: "text-center"},
        ],
       
          order: [[ 1, 'asc' ]], createdRow: function(row, data){
          if(data[11]<=minimovalue){
            $('td', row).eq(11).css({
              'background-color':'#f05454'
            })
          }else if(data[11]>=maximovalue){
            $('td', row).eq(11).css({
              'background-color':'#00AF91'
            })
          }else{
            $('td', row).eq(11).css({
              'background-color':'#ffc764'
            })
          }
        }
    });

   // t.on( 'order.dt search.dt', function () {
     // t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
       //   cell.innerHTML = i+1;
     // } );
   // } ).draw();
     //let count =1; 

     $('#alerta_table tbody').on( 'click', 'button', function () {
      var data = table.row( $(this).parents('tr') ).data();
      hola( data[0], data[1], data[11]);
    } );



   })



   } catch (error) {
    console.error('Error alertasGraph ', error)
  }
}
$(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#tabla_alerta tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
async function _avancePDM(){
  try {
    fetch('https://sse-pdm.herokuapp.com/pi/api/total')
    .then(res=>res.json())
    .then(datos=>{
      let avance = parseFloat(datos.data[0].total_plan).toFixed(2)
     document.getElementById('avance_cuatrienio').innerHTML=avance+"%"
      })
  } catch (error) {
    console.error('Error _avancePDM ',error )
  }
}
async function otragrafica(data){
  //console.log(data.data);
  let cod_dep = (data.data.link).substring(12,15)
  //console.log(cod_dep);
  try {
    fetch(` https://sse-pdm.herokuapp.com/pi/api/semaforo-corte/contador/dependencias/${cod_dep}`)
    .then(res=> res.json())
    .then(response=> {
 //     console.log(response.data[0].gris);
      document.getElementById('title-dep').innerHTML=data.data.categoryLabel;
      noprogramadas(response.data[0].gris)
      rojo(response.data[0].rojo)
      amarillo(response.data[0].amarillo)
      verde(response.data[0].verde)
    })
  } catch (error) {
    console.log('object otragrafica :>> ', error);
  }

}


async function noprogramadas(gris){
  const dataSource = {
    chart: {
      upperlimit: "0",
      lowerlimit: "25",
      usecolornameasvalue: "1",
      placevaluesinside: "1",
      valuefontsize: "20",
      plottooltext: "$value No programados",
      theme: "fusion"
    },
    colorrange: {
      color: [
        {
          minvalue: "0",
          maxvalue: "100",
          label: gris,
          code: "#cdc9c3"
        }
      ]
    },
    value: gris
  };
  FusionCharts.ready(function() {
    var myChart = new FusionCharts({
      type: "bulb",
      renderAt: "gris",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource
    }).render();
  });
}
async function rojo(rojo){
  const dataSource = {
    chart: {
      upperlimit: "0",
      lowerlimit: "150",
      usecolornameasvalue: "1",
      placevaluesinside: "1",
      valuefontsize: "20",
      plottooltext: "$value Bajo",
      theme: "fusion"
    },
    colorrange: {
      color: [
        {
          minvalue: "0",
          maxvalue: "100",
          label: rojo,
          code: "#f05454"
        }
      ]
    },
    value: rojo
  };
  FusionCharts.ready(function() {
    var myChart = new FusionCharts({
      type: "bulb",
      renderAt: "rojo",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource
    }).render();
  });
}
async function amarillo(amarillo){
  const dataSource = {
    chart: {
      upperlimit: "0",
      lowerlimit: "25",
      usecolornameasvalue: "1",
      placevaluesinside: "1",
      valuefontsize: "20",
      plottooltext: "$value Medio",
      theme: "fusion"
    },
    colorrange: {
      color: [
        {
          minvalue: "0",
          maxvalue: "100",
          label: amarillo,
          code: "#ffc764"
        }
      ]
    },
    value: amarillo
  };
  FusionCharts.ready(function() {
    var myChart = new FusionCharts({
      type: "bulb",
      renderAt: "amarillo",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource
    }).render();
  });
}
async function verde(verde){
  const dataSource = {
    chart: {
      upperlimit: "0",
      lowerlimit: "25",
      usecolornameasvalue: "1",
      placevaluesinside: "1",
      valuefontsize: "20",
      plottooltext: "$value Alto",
      theme: "fusion"
    },
    colorrange: {
      color: [
        {
          minvalue: "0",
          maxvalue: "100",
          label: verde,
         
          code: "#00af91"
        }
      ]
    },
    value: verde
  };
  FusionCharts.ready(function() {
    var myChart = new FusionCharts({
      type: "bulb",
      renderAt: "verde",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource
    }).render();
  });
}
async function hola (cod_dep,nom_dep,avance){
  try {
    document.getElementById('nom_depencia_query').innerHTML=nom_dep
    back_semafav =  ` <i class="fa fa-times-circle fa-2x"style="color: #ff6b6b;"> </i>`;

    let parametros={
      "cod_semaforo": 1,
      "cod_dependencia": cod_dep
    }
    fetch(`https://sse-pdm.herokuapp.com/pi/api/semaforo-corte/dependencia/tipo/ `,{
      method:'POST',
      body: JSON.stringify(parametros), // data can be `string` or {object}!
      headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(res=> res.json())
      .then(datos=>{
        let tam = datos.data.length;
      valores3=[];

      let avance="";

        for(let i =0; i<tam;i++){
          if (datos.data[i].avance_cuatrienio== -1) {
            avance = "N/A"
            
          } else if(datos.data[i].avance_cuatrienio== -2){
            avance = "N/D"
          } else{
            avance = ((datos.data[i].avance_cuatrienio)*100).toFixed(2)
          }

          valores3.push(
            [ datos.data[i].cod_indicador,
              datos.data[i].nom_indicador,
              datos.data[i].meta_plan,
              datos.data[i].unidad,
              datos.data[i].sentido,
              avance,
              datos.data[i].observaciones_indicador,
              back_semafav
            ]
         )

        }

      //console.log(valores3);
        tableModal = $('#alerta_modal').DataTable({
          data: valores3,
          columns: [
            { title: "Cod_Ind" },
            { title: "Indicador" },
            { title: "Meta Plan" },
            { title: "Unidad" },
            { title: "Sentido" },
            { title: "%Avance" },
            { title: "Observaciones" },
            { title: "Estado" }
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
       // dom:'Bfrtlp',
     
        columnDefs: [
            {/*cod_ind */  width: "10px",  targets: 0, className: "text-center", searchable: false,orderable: false   },
            {/*nom_ind */  width: "550px", targets: 1  },
            {/*meta  */    width: "70px",  targets: 2, className: "text-center"},
            {/*unidad  */  width: "70px",  targets: 3, className: "text-center"},
            {/*sentido */  width: "70px",  targets: 4, className: "text-center"},
            {/*avance  */  width: "70px",  targets: 5, className: "text-center"          },
            {/*%obser  */  width: "200px", targets: 6, className: "text-center"          },
            {/*estado  */  width: "70px",  targets: 7, className: "text-center"          },
           ],   
             bDestroy: true
         });
      
     
      })
     
   
  } catch (error) { 
    console.log("Error function Hola ",error);
}
  jQuery.noConflict();
  $('#exampleModal5').modal('show'); 
}


async function alerta_rojos(){
try {
  swal("Reporte creado búsquelo al final de la página!");
  let valoresRojos=[]
  let avance=""
  fetch(`https://sse-pdm.herokuapp.com/pi/api/semaforo-corte/rojos`)
  .then(res=> res.json())
  .then(response=>{

    for (let index = 0; index < response.data.length; index++) {
      if (response.data[index].avance_cuatrienio== -1) {
        avance = "N/A"
      } else if(response.data[index].avance_cuatrienio== -2){
        avance = "N/D"
      } else{
        avance = ((response.data[index].avance_cuatrienio)*100).toFixed(2)
      }

      valoresRojos.push([
        response.data[index].cod_linea,
        response.data[index].nom_linea,
        response.data[index].cod_componente,
        response.data[index].nom_componente,
        response.data[index].cod_programa,
        response.data[index].nom_programa,
        response.data[index].tipo_ind,
        response.data[index].cod_indicador,
        response.data[index].nom_indicador, 
        response.data[index].meta_plan,
        response.data[index].cod_responsable_reporte,
        response.data[index].nom_cortp,
        avance,
        response.data[index].observaciones_indicador
      ])
    }
    var tableRed= $('#alerta_rojos').DataTable( {
      data: valoresRojos,
      columns: [
          { title: "Cod_Línea" },
          { title: "Línea" },
          { title: "cod_componente" }, 
          { title: "Componente" }, 
          { title: "cod_prg" },
          { title: "Programa" },
          { title: "Tipo_Ind" },
          { title: "Cod_Ind" },
          { title: "Nombre Indicador" },
          { title: "Meta plan" },
          { title: "Cod_dep" },
          { title: "Responsable reporte" },
         { title: "% Avance" },
         { title: "Obesrvaciones" },
        ] ,   
      scrollCollapse: true, 
      fixedColumns: {
        heightMatch: 'none'
    }, fixedHeader: true,
      stateSave: true,
        "language": {
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
            title : "Alerta_Dependencias",
            tittleAttr: 'Exportar a Excel',
            className: 'btn btn-success',
            autoFilter: true,
            sheetName: 'Alerta Indicadores Rojos'
           },
           {
            extend: 'pdfHtml5',
            text  : '<i class="fa fa-file-pdf-o"></i>' ,
            title : "Alerta_Dependencias",
            tittleAttr: 'Exportar a PDF',
            className: 'btn btn-danger',
            orientation: 'landscape',
            pageSize: 'LEGAL',
            messageTop: 'PDF created by Unidad de SegumientoPlan de Desarrollo-DAP.'
           },
           {
            extend: 'print',
            text  : '<i class="fa fa-print"></i>' ,
            title : "Alerta_Dependencias",
            tittleAttr: 'Imprimir',
            className: 'btn btn-info'
           },  {
            extend: 'csvHtml5',
            text: '<i class="fa fa-file-text"></i>',
            title : "Alerta_Dependencias",
            className: 'btn btn-warning',
            exportOptions: {
                modifier: {
                    search: 'none'
                }
            }
        }],
        columnDefs: [
          {/*cod_linea */ width: "10px",  targets: 0,   className: "text-center"  },
          {/*nom_linea*/  width: "100px", targets: 1,   className: "text-center"  },
          {/*nom_dep*/    width: "10px", targets: 2 ,    className: "text-center"    },                
          {/*nom_dep*/    width: "100px", targets: 3,                               },
          {/*no_prg*/     width: "10px", targets: 4,   className: "text-center"  },
          {/*no prg*/     width: "70px",  targets: 5,   className: "text-center"  },
          {/*%no prg*/    width: "70px",  targets: 6,   className: "text-center"  },
          {/*rojo*/       width: "70px",  targets: 7,   className: "text-center"  },
          {/*%rojo*/      width: "100px",  targets: 8,   className: "text-center"  },
          {/*rojo*/       width: "70px",  targets: 9,   className: "text-center"  },
          {/*%rojo*/      width: "70px",  targets: 10,  className: "text-center"  },
          {/*%rojo*/      width: "70px",  targets: 11,  className: "text-center"  },
          {/*%rojo*/      width: "70px",  targets: 12,  className: "text-center"  },
          {/*%rojo*/      width: "70px",  targets: 13,  className: "text-center"  },
       
      
        ],bDestroy: true,
       

    });


  
  })
} catch (error) {
  console.error('Error alerta_rojos', error)
}

}

