
async function getCorteAvancePI(){
  try {
    
    fetch(`http://localhost:7001/pi/api/avance/corte`)
    .then(res=>res.json())
    .then(response=>{
      
      let corteavance= new Date(response.data[0].corte) ;
      let mesavance = corteavance.getMonth(corteavance)+1
      let vigencia = corteavance.getFullYear(corteavance)
      let dia= corteavance.getDate(corteavance)
      
       corteplan(mesavance, vigencia, corteavance, dia)   
    })
  } catch (error) {
    console.error('Error getalerta ', error);
  }
}
 
 
getCorteAvancePI()

 
 async function corteplan(mesavance, vigenciaavance, corte, dia){
  corte.setDate(dia)

  document.getElementById('fecha_corte').innerHTML = corte.toLocaleDateString("en-US", {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
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

    fetch(`http://localhost:7001/pi/api/semaforo-corte`,{
      method:'POST',
      body: JSON.stringify(parametros), // data can be `string` or {object}!
      headers:{
          'Content-Type': 'application/json'
      }
    }).then(res=> res.json())
    .then(response=>{
        minimovalue= (response.data[0].rojo)*100;
      maximovalue =(response.data[0].verde)*100;
      document.getElementById('minimo-corte').value= minimovalue.toFixed(2)
      document.getElementById('maximo-corte').value= maximovalue.toFixed(2)
    })
swal( {
    title: "SSE-PDM!",
    text: "Hola, está cargando espere un momento!",
    icon: "info",
    buttons: false,
    timer: 3000
  });
  }
