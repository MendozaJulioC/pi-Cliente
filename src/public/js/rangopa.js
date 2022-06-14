
async function getCorteAvancePA(){
    try {
      
      fetch(`https://sse-pdm.herokuapp.com/pi/api/avance/corte`)
      .then(res=>res.json())
      .then(response=>{
        
        let corteavance= new Date(response.data[0].corte) ;
        let mesavance = corteavance.getMonth(corteavance)+1
        let vigencia = corteavance.getFullYear(corteavance)
        let dia= corteavance.getDate(corteavance)
        corteavance.setDate(dia+1)
        document.getElementById('fecha_corte').innerHTML = corteavance.toLocaleDateString("en-US", {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })
         corteplan(mesavance, vigencia, corteavance, dia)   
      })
    } catch (error) {
      console.error('Error getalerta ', error);
    }
  }
   
   
  getCorteAvancePA()
   async function corteplan(mesavance, vigenciaavance, corte, dia){
    corte.setDate(dia+1)

 
    let vigencia = vigenciaavance //corte.getFullYear(corte)
    switch (vigencia) {
      case 2020:
        mes = corte.getMonth(corte) + 1
        break;
      case 2021:
        mes = corte.getMonth(corte) + 13
        break;
      case 2022:
        mes = corte.getMonth(corte) + 25
      
        break;
      case 2023:
        mes = corte.getMonth(corte) + 37
        break;
      default:
        break;
    }
      
      let parametros={
        "mesplan" : mes,
        "vigencia": vigencia
      }
  
      fetch(`https://sse-pdm.herokuapp.com/pa/semaforo-corte/${mesavance}`)
      
     
      .then(res=> res.json())
      .then(response=>{
          minimovalue= (response.data[0].rojo);
        maximovalue =(response.data[0].verde);
        document.getElementById('minimo-corte').value= minimovalue
        document.getElementById('maximo-corte').value= maximovalue
      })
        swal( {
            title: "SSE-PDM!",
            text: "Hola, está cargando espere un momento!",
            icon: "info",
            buttons: false,
            timer: 3000
          });
    }
  