const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

async function _main(){
    tablarankindiespecial()
    swal("Espere mientras cargamos la información!",{
        buttons: false,
        icon: "info",
        timer: 10000,
      });
}



async function  tablarankindiespecial(){

    let valores1=[]; 
    fetch(`https://api.avanzamedellin.info/proyectos/admin/especial/indicadores`)
    .then(res=>res.json())
    .then(datos=>{
 
       console.log(datos.indicadorespecial);
      let tam = datos.indicadorespecial.length; 
 
    
      for(var i =0; i<(tam) ;i++){
        valores1.push([
            datos.indicadorespecial[i][0].cod_indicador,
            datos.indicadorespecial[i][0].nom_indicador,
            ((datos.indicadorespecial[i][0].avance_cuatrienio)*100).toFixed(2),
            datos.indicadorespecial[i][0].definicion,
            datos.indicadorespecial[i][0].objetivo,
            datos.indicadorespecial[i][0].observaciones
            ]
          );
        }
   
  document.getElementById('table_tipo2').innerHTML=""
    var table1 = $('#table_tipo2').DataTable({
        data: valores1,
        columns: [
       
          { title: "CodIndicador" },
          { title: "Indicador" },
          { title: "Avance" },
          { title: "Definición" },
          { title: "Objetivo" },
          { title: "Obervaciones" },
       
      
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
       
           {/*Componente*/   width: "2px",   targets: 0, className: "text-center"    },
          {/*Componente*/   width: "20px",   targets: 1, className: "text-center"    },
          {/*Programa*/     width: "20px",   targets: 2, className: "text-center"    },
          {/*BPIN  */       width: "20px",  targets: 3, className: "text-center"    },
          {/*Proyecto*/     width: "20px", targets: 4, className: "text-left"      },
          {/*Eficacia*/     width: "20px",  targets: 5, className: "text-center"    },

       
         ],   
           bDestroy: true
       });


  
    })
   

}


