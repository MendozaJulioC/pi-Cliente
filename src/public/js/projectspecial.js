const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

async function _main(){
    tablarankespecial()
    swal("Espere mientras cargamos la información!",{
        buttons: false,
        icon: "info",
        timer: 8000,
      });
}



async function  tablarankespecial(){
    let valores1=[]; 
    fetch(`https://api.avanzamedellin.info/proyectos/admin/especial/seguimiento`)
    .then(res=>res.json())
    .then(datos=>{
       
      let tam = datos.data.data.length; 
    
      for(var i =0; i<(tam) ;i++){
        valores1.push([
            datos.data.data[i][0].cod_linea,
            datos.data.data[i][0].cod_componente,
            datos.data.data[i][0].cod_programa,
            datos.data.data[i][0].cod_proyecto,
            datos.data.data[i][0].nom_proyecto,
            ((datos.data.data[i][0].porc_eficacia_proyecto)*100).toFixed(2),
            ((datos.data.data[i][0].ejec_financiera)*100).toFixed(2),
            formatter.format(datos.data.data[i][0].poai),
            formatter.format(datos.data.data[i][0].ppto_ajustado),
            formatter.format(datos.data.data[i][0].ejecucion)
          ]
           
          );

        }
      
 
  
        
  document.getElementById('table_tipo1').innerHTML=""
    var table1 = $('#table_tipo1').DataTable({
        data: valores1,
        columns: [
       
          { title: "Línea" },
          { title: "Componente" },
          { title: "Programa" },
          { title: "BPIN" },
          { title: "Proyecto" },
          { title: "Eficacia" },
          { title: "%Ejec. Financiera" },
          { title: "POAI" },
          { title: "Ppto. Ajustado" },
          { title: "Ejec. Financiera" },
      
        ]  ,   
        scrollCollapse: true, 
    
        fixedColumns: {
          heightMatch: 'none'
        }, fixedHeader: true,
        stateSave: false,
        language: {
          "lengthMenu": "Mostrar _MENU_ registros por página",
          "emptyTable":     "No hay datos para este tipo de proyectos",
          "zeroRecords": "Nothing found - sorry",
          "info": "Vistas página _PAGE_ of _PAGES_",
          "infoEmpty": "No hay registros Disponibles",
          "infoFiltered": "(filtered from _MAX_ total registros)", 
          "zeroRecords": "No hay datos para este tipo de proyectos",
        paginate: {
          first: "Primera",
          last: "Última",
          next: "Siguiente",
          previous: "Anterior"
        },
        sProcessing:"Procesando..."
       },
       responsive:"true",
      dom:'frtlp',
     bDestroy: true,
      columnDefs: [
       
           {/*Componente*/   width: "5px",   targets: 0, className: "text-center"    },
          {/*Componente*/   width: "5px",   targets: 1, className: "text-center"    },
          {/*Programa*/     width: "5px",   targets: 2, className: "text-center"    },
          {/*BPIN  */       width: "50px",  targets: 3, className: "text-center"    },
          {/*Proyecto*/     width: "500px", targets: 4, className: "text-left"      },
          {/*Eficacia*/     width: "10px",  targets: 5, className: "text-center"    },
          {/*%Ejec  */      width: "70px",  targets: 6, className: "text-center"    },
          {/*POAI  */       width: "70px",  targets: 7, className: "text-center"    },
          {/*Ajustado*/     width: "70px",  targets: 8, className: "text-center"    },
          {/*Financiera*/   width: "70px",  targets: 9, className: "text-center"    },
       
         ],   
           bDestroy: true
       });


  
    })
   

}


