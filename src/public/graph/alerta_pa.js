var fecha =0; let mespa=0; var valormaximo=0; var valorminimo=0;var vigencia=0; let mes=0; let vlr_alerta=0;
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

async function alertamain(){
  getalerta()
}

async function getalerta(){
  try {
    fetch(`https://sse-pdm.herokuapp.com/pa/api/alerta/corte`)
    .then(res=>res.json())
    .then(response=>{
      let cortealerta= new Date(response.data[0].corte) 
      mespa = cortealerta.getMonth(cortealerta)+1
      vigencia = cortealerta.getFullYear(cortealerta)
      fetch(`https://sse-pdm.herokuapp.com/pa/api/alerta/valor/${mespa}`)
      .then(res=>res.json())
      .then(response=>{
        let alertavalor =  response.data[0].alerta
        vlr_alerta = alertavalor;
        document.getElementById('rangoalertafinanciera').innerHTML=(alertavalor*100).toFixed(2)+'%'
        alerta_financiera(alertavalor);
        alerta_fisica(alertavalor)
        alertafisicofinan(alertavalor)
      })
    })  
  } catch (error) {
    console.error('Error getalerta ', error);
  }
}

async  function alerta_financiera(alerta){
  try {
   
    let valor_alertafinanciera=[] 
    fetch(`https://sse-pdm.herokuapp.com/pa/api/alerta/financiera/${alerta}`)
    .then(res=> res.json()).then(response=>{
      document.getElementById('finanzas').innerHTML=  response.data.length
      medidafisica(alerta)
      for (let index = 0; index < response.data.length; index++) {
          valor_alertafinanciera.push([
              response.data[index].cod_dependencia,
              response.data[index].nom_dependencia,"",
              response.data[index].cod_proyecto,
              response.data[index].nom_proyecto,
              (response.data[index].poai),
              response.data[index].ppto_ajustado,
              (response.data[index].ejec_financiera*100).toFixed(2),
              (response.data[index].porc_eficacia_proyecto*100).toFixed(2),
              response.data[index].tipo_iniciativa
            ]); 
      }
      let tableAlertaFinanciera= $('#alerta_financiera').DataTable({
        data: valor_alertafinanciera,
          columns: [
            { title: "Cod_Dep" },
            { title: "Dependencia" },
            { title: " Ampliar" }, 
            { title: "Cod_Proyecto" },
            { title: "proyecto" },
            { title: "POAI" },
            { title: "Ppto. Ajustado" },
            { title: "% Ejecución Financiera" },
            { title: "% Eficacia" },
            { title: "Tipo Iniciativa" },
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
                            {/*nom_ind */  width: "90px", targets: 1  },
                            {/*ampliar*/  width: "70px",  targets: 2, className: "text-center" , data: "cod_dep", defaultContent: `<button class='btn btn-link'><i class="fa fa-search-plus fa-2x" style="color: #28527a;"></i></button>`  , searchable: false,orderable: false   } ,
                            {/*meta    */  width: "10px", targets: 3, className: "text-center"},
                            {/*unidad  */  width: "200px",targets: 4},
                            {/*sentido */  width: "70px", targets: 5, className: "text-center"},
                            {/*avance  */  width: "70px", targets: 6, className: "text-center"          },
                            {/*%obser  */  width: "10px", targets: 7, className: "text-center"          },
                            {/*%obser  */  width: "10px", targets: 8, className: "text-center"          },
                            {/*%obser  */  width: "10px", targets: 9, className: "text-center"          },
                          ],   
              bDestroy: true,
              order: [[ 1, 'asc' ]], createdRow: function(row, data){$('td', row).eq(7).css({'background-color':'#f05454'})}
      });
      $('#alerta_financiera tbody').on( 'click', 'button', function () {
          var data1 = tableAlertaFinanciera.row( $(this).parents('tr') ).data();
          buscavalstat(data1[4], data1[3], data1[9])
        } );
      })

    } catch (error) {
      console.error('Error alerta_financiera');
   }
}

async  function alerta_fisica(alerta){
  try {
    let valor_alertafinanciera=[] 
    fetch(`https://sse-pdm.herokuapp.com/pa/api/alerta/fisica/${alerta}`)
    .then(res=> res.json()).then(response=>{
      document.getElementById('fisica').innerHTML=  response.data.length
      document.getElementById('rangoalertafisica').innerHTML=(alerta*100).toFixed(2)+'%'
      document.getElementById('rangoalerta').innerHTML=(alerta*100).toFixed(2)+'%'

      for (let index = 0; index < response.data.length; index++) {
          valor_alertafinanciera.push([
            response.data[index].cod_dependencia,
            response.data[index].nom_dependencia,"",
            response.data[index].cod_proyecto,
            response.data[index].nom_proyecto,
            (response.data[index].poai),
            response.data[index].ppto_ajustado,
            (response.data[index].ejec_financiera*100).toFixed(2),
            (response.data[index].porc_eficacia_proyecto*100).toFixed(2),
            response.data[index].num_valstat
          ])
                
      }
      document.getElementById('alerta_fisica').innerHTML=""
      var tableAlertaFisica= $('#alerta_fisica').DataTable({
                data: valor_alertafinanciera,
                columns: [
                  { title: "Cod_Dep" },
                  { title: "Dependencia" },
                  { title: " Ampliar" }, 
                  { title: "Cod_Proyecto" },
                  { title: "proyecto" },
                  { title: "POAI" },
                  { title: "Ppto. Ajustado" },
                  { title: "% Ejecución Financiera" },
                  { title: "% Eficacia" },
                  { title: "Total Valores Estadisticos" },
                  
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
                  title : "Alerta_Baja_Ejecucion_Fisica",
                  tittleAttr: 'Exportar a Excel',
                  className: 'btn btn-success',
                  autoFilter: true,
                  sheetName: 'Alerta_Baja_Ejecucion_Fisica'
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
                  {/*cod_ind */  width: "10px",  targets: 0, className: "text-center"  },
                  {/*nom_ind */  width: "90px", targets: 1  },
                  {/*ampliar*/  width: "70px",  targets: 2, className: "text-center" , data: "cod_dep", defaultContent: `<button class='btn btn-link'><i class="fa fa-search-plus fa-2x" style="color: #28527a;"></i></button>`  , searchable: false,orderable: false   } ,
                  {/*meta  */    width: "10px",  targets: 2, className: "text-center"},
                  {/*unidad  */  width: "200px",  targets: 3},
                  {/*sentido */  width: "70px",  targets: 4, className: "text-center"},
                  {/*avance  */  width: "70px",  targets: 5, className: "text-center"          },
                  {/*%obser  */  width: "10px", targets: 6, className: "text-center"          },
                  {/*%obser  */  width: "10px", targets: 7, className: "text-center"          },
                  {/*%obser  */  width: "10px", targets: 8, className: "text-center"          },
                 ],   
                   bDestroy: true,
                   order: [[ 1, 'asc' ]], createdRow: function(row, data){
                      $('td', row).eq(8).css({
                        'background-color':'#f05454'
                      })
                  }
      });
      $('#alerta_fisica tbody').on( 'click', 'button', function () {
        var data1 = tableAlertaFisica.row( $(this).parents('tr') ).data();
        buscavalstat(data1[4], data1[3], data1[9])
      } );
  
  
     })
    } catch (error) {
        console.error('Error alerta_financiera');
    }
}

async function alertafisicofinan(alerta){
  try {
   
    let valor_alertafiafin=[] 
    fetch(`https://sse-pdm.herokuapp.com/pa/api/alerta/finanfisica/${alerta}`)
    .then(res=>res.json())
    .then(response=>{
      document.getElementById('alertafisfin').innerHTML=response.data.length
      //falta generar la tabla dinamica con los proyectos generados por la consulta


      for (let index = 0; index < response.data.length; index++) {
        valor_alertafiafin.push([
          response.data[index].cod_dependencia,
          response.data[index].nom_dependencia,"",
          response.data[index].cod_proyecto,
          response.data[index].nom_proyecto,
          (response.data[index].poai),
          response.data[index].ppto_ajustado,
          (response.data[index].porc_ejec_financiera*100).toFixed(2),
          (response.data[index].porc_eficacia_proyecto*100).toFixed(2),
        
        ])
              
      }
      var tableAlertaFisicaFinan = $('#alerta_fisica_finan').DataTable({
        data: valor_alertafiafin,
        columns: [
          { title: "Cod_Dep" },
          { title: "Dependencia" },
          { title: "Cod_Proyecto" },
          { title: " Ampliar" }, 
          { title: "proyecto" },
          { title: "POAI" },
          { title: "Ppto. Ajustado" },
          { title: "% Ejecución Financiera" },
          { title: "% Eficacia" },
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
          title : "Alerta_Ejecucion_Fisica_Financiera",
          tittleAttr: 'Exportar a Excel',
          className: 'btn btn-success',
          autoFilter: true,
          sheetName: 'Alerta_Ejecucion_Fisica_Financiera"'
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
          {/*cod_ind */  width: "10px",  targets: 0, className: "text-center" },
          {/*nom_ind */  width: "90px", targets: 1  },
            {/*ampliar*/  width: "70px",  targets: 2, className: "text-center" , data: "cod_dep", defaultContent: `<button class='btn btn-link'><i class="fa fa-search-plus fa-2x" style="color: #28527a;"></i></button>`  , searchable: false,orderable: false   } ,
          {/*meta  */    width: "10px",  targets: 3, className: "text-center"},
          {/*unidad  */  width: "200px",  targets: 4},
          {/*sentido */  width: "70px",  targets: 5, className: "text-center"},
          {/*avance  */  width: "70px",  targets: 6, className: "text-center"          },
          {/*%obser  */  width: "10px", targets: 7, className: "text-center"          },
          {/*%obser  */  width: "10px", targets: 8, className: "text-center"          },
    
         ],   
           bDestroy: true,
           order: [[ 1, 'asc' ]], createdRow: function(row, data){
              $('td', row).eq(7).css({
                'background-color':'#f05454'
              })
              ,    $('td', row).eq(8).css({
                'background-color':'#f05454'
              })
          }
        });

        $('#alerta_fisica_finan tbody').on( 'click', 'button', function () {
          var data1 = tableAlertaFisicaFinan.row( $(this).parents('tr') ).data();
          buscavalstat(data1[4], data1[3], data1[9])
        } );



    })
  } catch (error) {
    console.error('Error  alertafisicofinan: ', error);
  }
  alertaponderado()
}

async function alertaponderado(){
  try {
    let alertasponds=[];
    fetch(`https://sse-pdm.herokuapp.com/pa/api/alerta/ponderado`)
    .then(res=>res.json())
    .then(response=>{
      for (let index = 0; index < response.data.length; index++) {
        if(response.data[index].ponderado<=0.40){
          alertasponds.push([
            response.data[index].cod_dependencia,
            response.data[index].nom_dependencia,"",
            response.data[index].cod_proyecto,
            response.data[index].nom_proyecto,
            (response.data[index].poai),
            response.data[index].ppto_ajustado,
            (response.data[index].ejec_financiera*100).toFixed(2),
            (response.data[index].porc_eficacia_proyecto*100).toFixed(2),
            (response.data[index].ponderado*100).toFixed(2)
          ])
        }
    }
    document.getElementById('alertaponds').innerHTML=alertasponds.length
    var tableAlertaPond = $('#alerta_ponds').DataTable({
      data: alertasponds,
      columns: [
        { title: "Cod_Dep" },
        { title: "Dependencia" },
        { title: "Cod_Proyecto" },
        { title: " Ampliar" }, 
        { title: "proyecto" },
        { title: "POAI" },
        { title: "Ppto. Ajustado" },
        { title: "% Ejecución Financiera" },
        { title: "% Eficacia" },
        { title: "% Ponderado" },
        
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
        title : "Alerta_Baja_Ponderación",
        tittleAttr: 'Exportar a Excel',
        className: 'btn btn-success',
        autoFilter: true,
        sheetName: 'Alerta_Baja_Ponderación'
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
        {/*cod_ind */  width: "10px",  targets: 0, className: "text-center"   },
        {/*nom_ind */  width: "90px", targets: 1  },
        {/*ampliar*/  width: "70px",  targets: 2, className: "text-center" , data: "cod_dep", defaultContent: `<button class='btn btn-link'><i class="fa fa-search-plus fa-2x" style="color: #28527a;"></i></button>`  , searchable: false,orderable: false   } ,
        {/*meta  */    width: "10px",  targets: 3, className: "text-center"},
        {/*unidad  */  width: "200px",  targets: 4},
        {/*sentido */  width: "70px",  targets: 5, className: "text-center"},
        {/*avance  */  width: "70px",  targets: 6, className: "text-center"          },
        {/*%obser  */  width: "10px", targets: 7, className: "text-center"          },
        {/*%obser  */  width: "10px", targets: 8, className: "text-center"          },
        {/*%obser  */  width: "10px", targets: 9, className: "text-center"          }
       ],   
         bDestroy: true,
         order: [[ 1, 'asc' ]], createdRow: function(row, data){
            $('td', row).eq(9).css({
              'background-color':'#f05454'
            })
        }
      });

      $('#alerta_ponds tbody').on( 'click', 'button', function () {
        var data1 = tableAlertaPond.row( $(this).parents('tr') ).data();
        buscavalstat(data1[4], data1[3], data1[9])
      } );

    })
    
  } catch (error) {
    console.error('Error alertaponderado: ', error);
    
  }
}


/****** */


function buscavalstat(nomproyecto, cod, ejec){
 
  try {
  
     fetch(`https://sse-pdm.herokuapp.com/pa/api/proyecto/${cod}`)
    .then(res=>res.json())
    .then(datos=>{
      geoProyect(nomproyecto,cod)
      let tablaValStat ='';
      document.getElementById('valStat').innerHTML="";
      let tam = datos.data.length;
      document.getElementById('nom1').innerHTML = nomproyecto;
      document.getElementById('nomprodetalle').innerHTML=nomproyecto;
      document.getElementById('cod1').innerHTML = cod;
      let fecha = new Date(datos.data[0].corte_ejecucion)
       document.getElementById('corte1').innerHTML=(fecha.toLocaleDateString())
      document.getElementById('cod_linea1').innerHTML = datos.data[0].cod_linea;
      document.getElementById('nom_linea1').innerHTML = datos.data[0].nom_linea;
      document.getElementById('cod_componente1').innerHTML = datos.data[0].cod_componente;
      document.getElementById('nom_componente1').innerHTML = datos.data[0].nom_componente;
      document.getElementById('cod_programa1').innerHTML = datos.data[0].cod_programa;
      document.getElementById('nom_programa1').innerHTML = datos.data[0].nom_programa;
  
      document.getElementById('poai1').innerHTML = formatter.format(datos.data[0].y_dev_poai);
      document.getElementById('ppto_ajustado1').innerHTML = formatter.format(datos.data[0].y_dev_pptoajustado);
      document.getElementById('ejec1').innerHTML = formatter.format(datos.data[0].y_dev_ejecucion);
      proyecto_fisico(cod)
      for (let index = 0; index < tam; index++) {
       tablaValStat += `<tr style="background-color:gray ;">
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
        document.getElementById('valStat').innerHTML=tablaValStat;  
      }
    })
   
  } catch (error) {
    console.log('Error buscavalstat ', error)
  }
  jQuery.noConflict();
    $('#exampleModal2').modal('show'); ;
  }
  async function proyecto_fisico(cod){
    try {
      fetch(`https://sse-pdm.herokuapp.com/pa/semaforo-corte/${mespa}`)
      .then(res=>res.json())
      .then(response=>{
  
        valorminimo = (response.data[0].rojo)-0.01;
        valormaximo = (response.data[0].verde);
        fetch(`https://sse-pdm.herokuapp.com/pa/api/avances/ejecucion/${cod}`)
        .then(res=> res.json())
        .then(response=>{
          let avanxcefisicoproject= (parseFloat(response.data[0].porc_eficacia_proyecto)*100); 
          let avancexfinanciero= parseFloat((response.data[0].porc_ejec_financiera)*100);
          console.log(avancexfinanciero);
         proyecto_financiero(avancexfinanciero)
          let ffp = ( (parseFloat(response.data[0].porc_eficacia_proyecto))*0.50   +  (parseFloat(response.data[0].ejec_financiera))*0.50 )*100
          //console.log("fisico ",avanxcefisicoproject);
          //console.log("financiero ",avancexfinanciero);
          //console.log("ffp ",ffp);
         fifapon(ffp)
          nomarchivopdf=response.data[0].cod_proyecto;
          let tipo_proyecto="";
          if (response.data[0].tipo_iniciativa==1) {tipo_proyecto= "Proyecto de Iniciativa Institucional"}
          else if (response.data[0].tipo_iniciativa==2) { tipo_proyecto= " Proyecto de Presupuesto Participativo (Iniciativas Comunitarias)"}
          else if (response.data[0].tipo_iniciativa==3) { tipo_proyecto= "Proyecto con saldos no Ejecutables"}
          else {tipo_proyecto= "Proyecto con ejecución de saldos Pendientes (Vigencia Anterior)"}
      
            
      
          document.getElementById('tipo_proyecto').innerHTML= tipo_proyecto
    
          const dataSource = {
            chart: {
              caption: "% Ejecución Física",
              lowerlimit: "0",
              upperlimit: "100",
              showvalue: "1",
              numbersuffix: "%",
              theme: "fusion",
              showtooltip: "0"
            },
            colorrange: {
              color: [
                {
                  minvalue: "0",
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
              renderAt: "chart-1",
              width: "100%",
              height: "100%",
              dataFormat: "json",
              dataSource
            }).render();
          });
    
    
    
        })
      })
     
      
    } catch (error) {
      console.log('Error proyecto_fisico :>> ', error);
    }
   
   
  }
  async function proyecto_financiero(avancexfinanciero){
    
    const dataSource = {
      chart: {
        caption: "% Ejecución Financiera ",
        lowerlimit: "0",
        upperlimit: "100",
        showvalue: "1",
        numbersuffix: "%",
        theme: "fusion",
        showtooltip: "0"
      },
      colorrange: {
        color: [
          {
            minvalue: "0",
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
        renderAt: "chart-2",
        width: "100%",
        height: "100%",
        dataFormat: "json",
        dataSource
      }).render();
    });
  
  }
  async function fifapon(ffp){
    const dataSource = {
      chart: {
        caption: "% Cumplimiento",
       
        lowerlimit: "0",
        upperlimit: "100",
        showvalue: "1",
        numbersuffix: "%",
        theme: "fusion",
        showtooltip: "0"
      },
      colorrange: {
        color: [
          {
            minvalue: "0",
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
        renderAt: "chart-3",
        width: "100%",
        height: "100%",
        dataFormat: "json",
        dataSource
      }).render();
    });
    
  }
  async function geoProyect( nom, cod){
    try {
      fetch(`https://sse-pdm.herokuapp.com/geo/api/dependencias/proyectos/${cod}`)
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
          renderAt: "chart-geoproyect",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });
      document.getElementById('inv_territorio_project').innerHTML="";
  
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
      document.getElementById('inv_territorio_project').innerHTML=tabla;
     
      })
  
  
  
    } catch (error) {
    console.log('Error groProyect', error)      
    }
  }


  async function medidafisica(alerta)
  {
    try {
      fetch(`https://sse-pdm.herokuapp.com/pa/semaforo-corte/${mespa}`)
      .then(res=>res.json())
      .then(response=>{
  
        valorminimo = (response.data[0].rojo)-0.01;
        valormaximo = (response.data[0].verde);
      const dataSource = {
        chart: {
          caption: 'Alerta % Ejecución   <'+ (alerta*100).toFixed(2)+'%',
          subcaption: "Rangos Plan de Acción",
          numbersuffix: "%",
          valuefontsize: "12",
          labelfontsize:"12",
          theme: "fusion",
          plottooltext:
            "Porcentaje de ejecución $datavalue establecido como alerta para lo esperado  de $targetDataValue"
        },
        colorrange: {
          color: [
            {
              minvalue: "0",
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
              maxvalue: "100",
              code: "#62B58F"
            }
          ]
        },
        value: (alerta*100).toFixed(2),
        target: valorminimo+0.01
      };
      
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "hbullet",
          renderAt: "muestrafinanciera", 
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });

      FusionCharts.ready(function() {
        var myChart2 = new FusionCharts({
          type: "hbullet",
          renderAt: "muestrafinanciera2", 
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });

      medidafisfin(alerta)
    })
      
    } catch (error) {
      
    }
  }

  async function medidafisfin(alerta)
  {

    const dataSource = {
      chart: {
        caption: " %Ejec. Financiera >80% vs  %Ejec Física <"+ (alerta*100).toFixed(2)+'%',

    
        numbersuffix: "%",
        drawcrossline: "1",
        theme: "gammel",
        showvalues: "1",
        valuefontsize: "12",
        labelfontsize:"8",
      },
      categories: [
        {
          category: [
            {
              label: "Alerta"
            },
           
           
          ]
        }
      ],
      dataset: [
        {
          seriesname: "%Ejec. Financiera",
          data: [
            {
              value: "80",
             color: "#62B58F"
            }
          ]
        },
        {
          seriesname: "%Ejec. Física",
          data: [
            {
              value:  (alerta*100).toFixed(2),
             // color: "#F2726F"
            }
          ]
        }
      ]
    };
    
    FusionCharts.ready(function() {
      var myChart = new FusionCharts({
        type: "overlappedbar2d",
        renderAt: "chart-fisfin",
        width: "100%",
        height: "100%",
        dataFormat: "json",
        dataSource
      }).render();
    });
    
    mediponds()
  }


  async function mediponds(){
    try {
      fetch(`https://sse-pdm.herokuapp.com/pa/semaforo-corte/${mespa}`)
      .then(res=>res.json())
      .then(response=>{
  
        valorminimo = (response.data[0].rojo)-0.01;
        valormaximo = (response.data[0].verde);
      const dataSource = {
        chart: {
         
          subcaption: "Rangos Plan de Acción",
          numbersuffix: "%",
          valuefontsize: "12",
          labelfontsize:"12",
          theme: "fusion",
          plottooltext:
            "Porcentaje de ejecución $datavalue establecido como alerta para lo esperado  de % Cumplimiento"
        },
        colorrange: {
          color: [
            {
              minvalue: 0,
              maxvalue: valorminimo,
              code: "#F2726F",
              label: "Bajo{br}Average",
            
            },
            {
              minvalue: valorminimo,
              maxvalue: valormaximo,
              code: "#FFC533",
              label: "Average",
           
            },
            {

          

              minvalue: valormaximo,
              maxvalue: 100,
              code: "#62B58F",
              label: "Cumpliendo",
        
            }
          ]
        },
        pointers: {
          pointer: [
            {
              value: valorminimo+0.01 ,
            }
          ]
        },
        value: valorminimo,
        target: valorminimo
      };
      
   
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "hlineargauge",
          renderAt: "chart-pond",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });

    })
      
    } catch (error) {
    };
    
  }



  async function alertafisicamodal() {
    try {
      let countalertdep = [];
      fetch(`https://sse-pdm.herokuapp.com/pa/pi/alerta/cuentadepfisica/${vlr_alerta}`).
      then(res => res.json()).then(response => {
        for (let index = 0; index < response.data.length; index++) {
          countalertdep.push({
            label: response.data[index].nom_dependencia,
            value: parseInt(response.data[index].total_dep)
          })
        }
        pintalertcountdep(countalertdep)
        jQuery.noConflict();
        $('#alertaejecfisicaModal').modal('show');
      })
    } catch (error) {
      console.error('Error alertafisicamodal');
    }
  }
  
async function pintalertcountdep(countalertdep){
  try {
    
    const dataSource = {
      chart: {
        caption: "Deficiente desempeño",
        subcaption: "Número de proyectos",
        yaxisname: "Total de proyectos en alerta",
        
        showvalues: "1",
        theme: "candy"
      },
      data: 
        countalertdep
      
    };
    
    FusionCharts.ready(function() {
      var myChart = new FusionCharts({
        type: "bar2d",
        renderAt: "chart-CountAlertDep",
        width: "100%",
        height: "100%",
        dataFormat: "json",
        dataSource
      }).render();
    });
    
  

    
  } catch (error) {
    console.error('Errror pintalertcountdep');
    
  }
}