function buscar_vigencia(){

    var vigencia_query = document.getElementById('inputGroupSelect04').value
    try {
        let inverTotal= document.getElementById('totalVIgencia');
        let vigencia = document.getElementById('vigencia');
        let localizada = document.getElementById('inverLocalizada');
        let ciudad = document.getElementById('inverCiudad');
        let pp = document.getElementById('pp');
        let fortInst= document.getElementById('fortInst')
       fetch('http://localhost:4000/api/vigencias/'+vigencia_query)
       .then(res=>res.json())
       .then(datos=>{
 
           inverTotal.innerHTML= formatter.format(Math.round(datos.data[0].inversion_total))
           vigencia.innerHTML= datos.data[0].ano
           localizada.innerHTML=formatter.format(Math.round(datos.data[0].total_localizada))
           ciudad.innerHTML= formatter.format(Math.round(datos.data[0].total_ciudad))
           pp.innerHTML= formatter.format(Math.round(datos.data[0].inversion_pp))
       })
       .catch(error=>{ console.log(error)})
   
     } catch (error) {}
     try {
        fetch('http://localhost:4000/api/vigencias/fortalecimiento/'+vigencia_query)
        .then(res=> res.json())
        .then(datos=>{
          fortInst.innerHTML= formatter.format(Math.round(datos.data[0].inver_total))
        })
    } catch (error) {
        
    }

    try {
        var data=[];
        fetch('http://localhost:4000/api/vigencias/total-comuna/'+vigencia_query)
        .then(res=>res.json())
        .then(datos=>{
    
          let tam = datos.data.length;
          for(var i =0; i<(tam) ;i++   ){
              
              if(datos.data[i].comuna<=90){
               
               data.push({
              "comuna": datos.data[i].nom_comuna,
              "total":(parseInt(datos.data[i].inver_total))
             
                });
              }
          }
    
          var chart = AmCharts.makeChart( "chartdiv_comunas_vigencia", {
            "type": "serial",
            "theme": "dark",
            "titles": [{
              "text": "Total de Inversión por Comunas y Corregimientos "+datos.data[0].ano,
              "size": 15
          }],
            "dataProvider":data,
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
            "categoryField": "comuna",
            "categoryAxis": {
              "gridPosition": "start",
              "gridAlpha": 0,
              "tickPosition": "start",
              "tickLength": 20,
              "labelRotation": 45
            },
            "export": {
              "enabled": true
            }
          
          } );
    
    
              
                })
      } catch (error) {}
     
    




   
}

