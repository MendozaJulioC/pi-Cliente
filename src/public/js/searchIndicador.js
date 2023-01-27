var avance_cuatrienio= 0;
var cumplimiento_logro=0;

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

focusMethod = function getFocus() {           
    document.getElementById("indicadorquery").focus();
  }


async function indi(){
    _graphAvanceIndicador()
   
}

  
  async function _graphAvanceIndicador(avance_cuatrienio){

    const dataSource = {
      chart: {
        caption: "Avance Cuatrienial PDM",
       // subcaption: "Mes "+ mes + " del Plan",
        numbersuffix: "%",
        theme: "fusion",
        valuefontsize: "25",
        plottooltext:
          "Avance  $datavalue del $targetDataValue esperado para este corte"
      },
      colorrange: {
        color: [
        {
          minvalue: 0,
          maxvalue:  document.getElementById('minimo-corte').value,
          code: "#f05454"
        },
        {
          minvalue: document.getElementById('minimo-corte').value,
          maxvalue: document.getElementById('maximo-corte').value,
          code: "#ffc764"
        },
        {
          minvalue: document.getElementById('maximo-corte').value,
          maxvalue: 100,
          code: "#00af91"
        }
      ]
    },
     value: avance_cuatrienio,
     target: document.getElementById('maximo-corte').value
    };
    FusionCharts.ready(function() {
      var myChart = new FusionCharts({
        type: "hbullet",
        renderAt: "avance-indicador",
        width: "90%",
        height: "100%",
        dataFormat: "json",
        dataSource
      }).render();
    });
      


};






async function _getBuscaNombreIndicador(){
    let nom_Indicador = document.getElementById('browser').value
   
    try {
        fetch(`http://ec2-18-118-211-122.us-east-2.compute.amazonaws.com/pi/api/indicador/consulta/nombre/${nom_Indicador}`)
        .then(res=>res.json())
        .then(datos=>{
  
          if(datos.data.length>0){
            document.getElementById('nom_indicador1').innerHTML= datos.data[0].nom_indicador
            //   document.getElementById('metaplan1').innerHTML= datos.data[0].meta_plan
            //   document.getElementById('logroacumulado1').innerHTML= datos.data[0].logro_acumulado
            //   document.getElementById('peso-indicador').innerHTML=(datos.data[0].peso).substring(0,6)
             document.getElementById('obserindi').innerHTML=(datos.data[0].observaciones_indicador)
            //1.Información General
            document.getElementById('nom_indicador2').innerHTML= datos.data[0].nom_indicador
            document.getElementById('_cod_linea').value= datos.data[0].cod_linea
            document.getElementById('_nom_linea').value= datos.data[0].nom_linea
            document.getElementById('_cod_componente').value= datos.data[0].cod_componente
            document.getElementById('_nom_componente').value= datos.data[0].nom_componente
            document.getElementById('_cod_programa').value= datos.data[0].cod_programa
            document.getElementById('_nom_programa').value= datos.data[0].nom_programa
            document.getElementById('_cod_indicador').value= datos.data[0].cod_indicador
            document.getElementById('_nom_indicador3').value= datos.data[0].nom_indicador
            document.getElementById('definicion').value= datos.data[0].defincion
            document.getElementById('objetivo').value= datos.data[0].objetivo
            //2. Seguimiento
            document.getElementById('_tipo_ind').value= datos.data[0].tipo_ind
            document.getElementById('_meta_plan').value= datos.data[0].meta_plan
            document.getElementById('_unidad').value= datos.data[0].unidad
            document.getElementById('_sentido').value= datos.data[0].sentido
            document.getElementById('_comportamiento').value= datos.data[0].comportamiento_deseado
            document.getElementById('_fc').value= datos.data[0].fc
            document.getElementById('lb').value= datos.data[0].lb_ind
            document.getElementById('incluye_lb').value= datos.data[0].incluye_lb
            document.getElementById('vigenia_lb').value= datos.data[0].vigencia_lb
            document.getElementById('tipo_lb').value= datos.data[0].tipo_lb
            document.getElementById('peso').value= datos.data[0].peso
            document.getElementById('periocidad').value= datos.data[0].periocidad_generacion
            document.getElementById('formula_indicador').value= datos.data[0].formula_indicador
            document.getElementById('descripcion_variable').value= datos.data[0].variable_operativa
            document.getElementById('meta_2020').value= datos.data[0].meta_2020
            document.getElementById('logro_2020').value= datos.data[0].logro_2020
            document.getElementById('cumple_2020').value= ((datos.data[0].cumple_2020)*100).toFixed(2)+'%'
            document.getElementById('meta_2021').value= datos.data[0].meta_2021
            document.getElementById('logro_2021').value= datos.data[0].logro_2021
            document.getElementById('cumple_2021').value= ((datos.data[0].cumple_2021)*100).toFixed(2)+'%'
            document.getElementById('meta_2022').value= datos.data[0].meta_2022
            document.getElementById('logro_2022').value= datos.data[0].logro_2022
            document.getElementById('cumple_2022').value= ((datos.data[0].cumple_2022)*100).toFixed(2)+'%'
            document.getElementById('meta_2023').value= datos.data[0].meta_2023
            document.getElementById('logro_2023').value= datos.data[0].logro_2023
            document.getElementById('cumple_2023').value= ((datos.data[0].cumple_2023)*100).toFixed(2)+'%'
            //3. Responsables y observaciones
            document.getElementById('fuente').value= datos.data[0].fuente
            document.getElementById('tipo_fuente').value= datos.data[0].tipo_fuente
            document.getElementById('_responsable_plan').value= datos.data[0].responsable_plan
            document.getElementById('_cod_responsable_reporte').value= datos.data[0].cod_responsable_reporte
            document.getElementById('_nombre_dep').value= datos.data[0].nombre_dep
            document.getElementById('_instrumento_recoleccion').value= datos.data[0].instrumento_recoleccion
            document.getElementById('_responsable_reporte').value= datos.data[0].responsable_reporte
            document.getElementById('_observaciones').value= datos.data[0].observaciones
            //enviar datos a gráficas
           // if (datos.data[0].tipo_ind=='Resultado'){
              let avance = (datos.data[0].avance_cuatrienio)*100
             _graphAvanceIndicador(avance)
             semaforo(avance)
            /*}else{
              let avance = (datos.data[0].pesoxavnt/datos.data[0].peso )*100
              _graphAvanceIndicador(avance)
              semaforo(avance)
            }
             */
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


 async function _getBuscaCodigoIndicador(){
    let cod_Indicador = document.getElementById('browser').value
    if (cod_Indicador.length>=5){

        try {
            fetch(`http://ec2-18-118-211-122.us-east-2.compute.amazonaws.com/pi/api/indicador/${cod_Indicador}`)
            .then(res => res.json())
            .then(datos => {
            
                if(datos.data.length>0){
                  let peso;
                  if(datos.data[0].peso==null){peso=0}else{peso=((datos.data[0].peso).substring(0,6))}
                 
                    document.getElementById('nom_indicador1').innerHTML= datos.data[0].nom_indicador
                   // document.getElementById('metaplan1').innerHTML= datos.data[0].meta_plan
                   // document.getElementById('logroacumulado1').innerHTML= datos.data[0].logro_acumulado
                    //document.getElementById('peso-indicador').innerHTML=(peso)
                    document.getElementById('obserindi').innerHTML=(datos.data[0].observaciones_indicador)
        
        //1.Información General
                    document.getElementById('nom_indicador2').innerHTML= datos.data[0].nom_indicador
                    document.getElementById('_cod_linea').value= datos.data[0].cod_linea
                    document.getElementById('_nom_linea').value= datos.data[0].nom_linea
                    document.getElementById('_cod_componente').value= datos.data[0].cod_componente
                    document.getElementById('_nom_componente').value= datos.data[0].nom_componente
                    document.getElementById('_cod_programa').value= datos.data[0].cod_programa
                    document.getElementById('_nom_programa').value= datos.data[0].nom_programa
                    document.getElementById('_cod_indicador').value= datos.data[0].cod_indicador
                    document.getElementById('_nom_indicador3').value= datos.data[0].nom_indicador
                    document.getElementById('definicion').value= datos.data[0].defincion
                    document.getElementById('objetivo').value= datos.data[0].objetivo
        //2. Seguimiento
                    document.getElementById('_tipo_ind').value= datos.data[0].tipo_ind
                    document.getElementById('_meta_plan').value= datos.data[0].meta_plan
                    document.getElementById('_unidad').value= datos.data[0].unidad
                    document.getElementById('_sentido').value= datos.data[0].sentido
                    document.getElementById('_comportamiento').value= datos.data[0].comportamiento_deseado
                    document.getElementById('_fc').value= datos.data[0].fc
                    document.getElementById('lb').value= datos.data[0].lb_ind
                    document.getElementById('incluye_lb').value= datos.data[0].incluye_lb
                    document.getElementById('vigenia_lb').value= datos.data[0].vigencia_lb
                    document.getElementById('tipo_lb').value= datos.data[0].tipo_lb
                    document.getElementById('peso').value= peso
                    document.getElementById('periocidad').value= datos.data[0].periocidad_generacion
        
                    document.getElementById('formula_indicador').value= datos.data[0].formula_indicador
                    document.getElementById('descripcion_variable').value= datos.data[0].variable_operativa
        
                    document.getElementById('meta_2020').value= datos.data[0].meta_2020
                    document.getElementById('logro_2020').value= datos.data[0].logro_2020
                    document.getElementById('cumple_2020').value= ((datos.data[0].cumple_2020)*100).toFixed(2)+'%'
        
                    document.getElementById('meta_2021').value= datos.data[0].meta_2021
                    document.getElementById('logro_2021').value= datos.data[0].logro_2021
                    document.getElementById('cumple_2021').value= ((datos.data[0].cumple_2021)*100).toFixed(2)+'%'
        
                    document.getElementById('meta_2022').value= datos.data[0].meta_2022
                    document.getElementById('logro_2022').value= datos.data[0].logro_2022
                    document.getElementById('cumple_2022').value= ((datos.data[0].cumple_2022)*100).toFixed(2)+'%'
        
                    document.getElementById('meta_2023').value= datos.data[0].meta_2023
                    document.getElementById('logro_2023').value= datos.data[0].logro_2023
                    document.getElementById('cumple_2023').value= ((datos.data[0].cumple_2023)*100).toFixed(2)+'%'
        
        
        //3. Responsables y observaciones
        
        
                    document.getElementById('fuente').value= datos.data[0].fuente
                    document.getElementById('tipo_fuente').value= datos.data[0].tipo_fuente
        
        
                    document.getElementById('_responsable_plan').value= datos.data[0].responsable_plan
                    document.getElementById('_cod_responsable_reporte').value= datos.data[0].cod_responsable_reporte
                    document.getElementById('_nombre_dep').value= datos.data[0].nombre_dep
                    document.getElementById('_instrumento_recoleccion').value= datos.data[0].instrumento_recoleccion
                    document.getElementById('_responsable_reporte').value= datos.data[0].responsable_reporte
                    document.getElementById('_observaciones').value= datos.data[0].observaciones
        
               
                    //if (datos.data[0].tipo_ind=='Resultado'){
                      let avance = (datos.data[0].avance_cuatrienio)*100
                     _graphAvanceIndicador(avance)
                     semaforo(avance)
                   /* }else{
                      let avance = (datos.data[0].pesoxavnt/datos.data[0].peso )*100
                      _graphAvanceIndicador(avance)
                      semaforo(avance)
                    }
                     */
                    }
                  else{
                    alert('Por favor verifica el código del Indicador')
                    document.getElementById('browser').value="";
                    document.getElementById("browser").focus();
                  }
             
            })
        } catch (error) {console.log("Error q_Indicador: ",error)} 
    } else {
        alert('Por favor verifica el código del Indicador')
        document.getElementById('browser').value=" ";
    document.getElementById("browser").focus();
    }
   
 }

 async function _clearBusca(){
    document.getElementById('browser').value=" ";
    document.getElementById("browser").focus();
 }


 async function semaforo(avance){

  const dataSource = {
    chart: {
      //caption: "RAM Overload Indicator",
      upperlimit: "0",
      lowerlimit: "25",
      usecolornameasvalue: "1",
      placevaluesinside: "1",
      valuefontsize: "30",
      plottooltext: "$value",
      theme: "fusion"
    },
    colorrange: {
      color: [
        {
          minvalue: "0",
          maxvalue:  document.getElementById('minimo-corte').value,
          label: "BAJO",
          code: "#f05454"
        },
        {
          minvalue: document.getElementById('minimo-corte').value,
          maxvalue: document.getElementById('maximo-corte').value,
          label: "MEDIO",
          code: "#FFC764"
        },
        {
          minvalue: document.getElementById('maximo-corte').value,
          maxvalue: "100",
          label: "ALTO",
          code: "#00af91"
        }
      ]
    },
    value: avance
  };
  
  FusionCharts.ready(function() {
    var myChart = new FusionCharts({
      type: "bulb",
      renderAt: "semafav-indicador",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource
    }).render();
  });
  

 }