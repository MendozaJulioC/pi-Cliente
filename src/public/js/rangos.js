function corteplan(){
  var fecha = new Date('08/31/2021');
  document.getElementById('fecha_corte').innerHTML= fecha.toLocaleDateString("en-US", { day:'numeric',month: 'short',year: 'numeric' })
  // mes = fecha.getMonth(fecha)
  vigencia = fecha.getFullYear(fecha)
  switch (vigencia) {
    case 2020:
      mes= fecha.getMonth(fecha)+1
    break;
    case 2021:
      mes= fecha.getMonth(fecha)+13
    break;
    case 2022:
      mes= fecha.getMonth(fecha)+25
    break;
    case 2023:
      mes= fecha.getMonth(fecha)+37
    break;
    default:
    break;
  }
  let parametros={
    "mesplan" : mes,
    "vigencia": vigencia
  }
  fetch(`https://sse-pdm.herokuapp.com/pi/api/semaforo-corte`,{
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
corteplan()