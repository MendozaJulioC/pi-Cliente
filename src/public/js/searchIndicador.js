

async function  q_Indicador(){

    let cod_indicador= document.getElementById('indicadorquery').value;
    if (cod_indicador.length>=5){

        try {
            fetch(`http://localhost:7000/pi/api/indicador/${cod_indicador}`)
            .then(res => res.json())
            .then(datos => {

                if(datos.data.length>0){
                    document.getElementById('cod_linea').value=datos.data[0].cod_linea
                    document.getElementById('nom_linea').value=datos.data[0].nom_linea
                    document.getElementById('cod_componente').value=datos.data[0].cod_componente
                    document.getElementById('nom_componente').value=datos.data[0].nom_componente
                    document.getElementById('cod_programa').value=datos.data[0].cod_programa
                    document.getElementById('nom_programa').value=datos.data[0].nom_programa
                    document.getElementById('cod_indicador').value=datos.data[0].cod_indicador
                    document.getElementById('nom_indicador').value=datos.data[0].nom_indicador
                    document.getElementById('tipo_ind').value=datos.data[0].tipo_ind
                    document.getElementById('lb_ind').value=datos.data[0].lb_ind
                    document.getElementById('meta_plan').value=datos.data[0].meta_plan
                    document.getElementById('unidad').value=datos.data[0].unidad
                    document.getElementById('sentido').value=datos.data[0].sentido
                    document.getElementById('responsable_plan').value=datos.data[0].responsable_plan
                    document.getElementById('cod_responsable_reporte').value=datos.data[0].cod_responsable_reporte
                    document.getElementById('nombre_dep').value=datos.data[0].nombre_dep
                    $('#exampleModal').modal('show');
                    $(".modal-title").text(" "+datos.data[0].nom_indicador);
                }
                else{
                    alert('Por favor verifica el código del Indicador')
                    focusMethod()
                }
            })
        } catch (error) {console.log("Error q_Indicador: ",error)} 
    } else {
        alert('Por favor verifica el código del Indicador')
        focusMethod()
    }
} 

focusMethod = function getFocus() {           
    document.getElementById("indicadorquery").focus();
  }