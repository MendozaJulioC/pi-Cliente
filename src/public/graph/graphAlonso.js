

function  alonsocomuna(comuna, nomcomuna){
    let localizada1 = document.getElementById('localizada1')
    let ciudad1 = document.getElementById('ciudad1')
    let pp1 = document.getElementById('pp1')
    let total1 = document.getElementById('total1')
    fetch('http://localhost:4000/api/cuatrienios/detalle/'+comuna)
        .then(res => res.json())
        .then(datos => {
            //console.log(datos.data)
           //console.log(datos.data[0].cod_comuna) 
            localizada1.innerHTML = formatter.format(Math.round(datos.data[0].localizada2008_2011))
            ciudad1.innerHTML = formatter.format(Math.round(datos.data[0].percapita2008_2011))
            pp1.innerHTML = formatter.format(parseInt(datos.data[0].pp2008_2011))
            total1.innerHTML= formatter.format(parseInt(datos.data[0].pp2008_2011)+   Math.round(datos.data[0].percapita2008_2011) + Math.round(datos.data[0].localizada2008_2011)  )

            $('#exampleModal').modal('show');
            $(".modal-title").text("Inversión por Dependencias en "+nomcomuna);
        })
        depComuna(2008, 2011,comuna, nomcomuna)
        


}

function depComuna(vigencia1, vigencia2,comuna, nomcomuna){
  var parametros ={
    "vigencia1": vigencia1,
    "vigencia2": vigencia2,
    "cod_comuna": comuna
  }
var data=[]
  fetch('http://localhost:4000/api/cuatrienios/alonso/dependencias', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(parametros), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => {
       // console.log(JSON.stringify(response.data))
   let tam = response.data.length;
   for(var i =0; i<(tam) ;i++   ){
   
    data.push({
      "dependencia": response.data[i].nombre_dep,
      "total": parseInt(response.data[i].total)
    });

   }
    var chart = AmCharts.makeChart( "chartdivmodal2", {
      "type": "serial",
      "theme": "light",
      "rotate": true,
      "dataProvider": data,
      "valueAxes": [ {
        "gridColor": "#FFFFFF",
        "gridAlpha": 0.2,
        "dashLength": 0
      } ],
      "gridAboveGraphs": true,
      "startDuration": 1,
      "graphs": [ {
        "balloonText": "[[category]]: <b>[[value]]</b>",
        "fillAlphas": 0.8,
        "lineAlpha": 0.2,
        "type": "column",
        "valueField": "total"
      } ],
      "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
      },
      "categoryField": "dependencia",
      "categoryAxis": {
        "gridPosition": "start",
        "gridAlpha": 0,
        "tickPosition": "start",
        "tickLength": 20
      },
      "export": {
        "enabled": true
      }
    
    } );

    });

}

