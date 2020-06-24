

async function modalGraphLocalizada(){
    try {
        let data=[];  let tabla='';
        let vigencia_query = document.getElementById('inputGroupSelect04').value
        document.getElementById('actualVigencia').innerHTML="Inversión Localizada  " +vigencia_query
        fetch('http://localhost:4000/api/vigencias/total-comuna/'+vigencia_query)
        .then(res=>res.json())
        .then(datos=>{
          let tam = datos.data.length;
          document.getElementById('vig_tabla').innerHTML=(parseInt(datos.data[0].ano))
          //console.log(datos)
          for(var i =0; i<(tam) ;i++   ){
            if(datos.data[i].comuna<=90){
                tabla +='<tr>';
                tabla +='<td style="text-align:center;font-size: 9px;">'+vigencia_query+'</td>';
                tabla +='<td style="text-align:center;font-size:9px;">'+(datos.data[i].comuna)+'</td>';
                tabla +='<td style="text-align:left;font-size: 9px;">'+(datos.data[i].nom_comuna)+'</td>';
                tabla +='<td  style="font-size: 9px;">'+formatter.format(parseInt((datos.data[i].inver_localizada)))+'</td>';
            
              tabla +='<tr>';
              document.getElementById('resultInverLocalizada').innerHTML=tabla;
              data.push({
                "comuna": datos.data[i].nom_comuna,
                "total":(parseInt(datos.data[i].inver_localizada))
              });
            }
          }
          var chart = AmCharts.makeChart( "chartModalVigencia", {
            "type": "serial",
            "theme": "light",
          
            "rotate": true,
            "titles": [{
              "text": "Inversión Localizada  "+datos.data[0].ano,
              "size": 10
          }],
            "dataProvider": data,
            "gridAboveGraphs": true,
            "startDuration": 1,
            "graphs": [ {
              "balloonText": "[[category]]: <b>[[value]]</b>",
              "fillAlphas": 0.8,
              "lineAlpha": 0.2,
              "type": "column",
              "valueField": "total",
              "fillColors": "#EE7518"
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
              "tickLength": 5
            },
            "export": {
              "enabled": true
            }
          
          } );  
        })
      } catch (error) {}
    
      $('#exampleModal').modal('show');
}


async function modalGraphCiudad(){
    try {
        let data=[];  let tabla='';
        let vigencia_query = document.getElementById('inputGroupSelect04').value
        document.getElementById('actualVigencia').innerHTML="Inversión de Ciudad  " +vigencia_query
        document.getElementById('resultInverLocalizada').innerHTML=" ";
        fetch('http://localhost:4000/api/vigencias/total-comuna/'+vigencia_query)
        .then(res=>res.json())
        .then(datos=>{
          let tam = datos.data.length;
          document.getElementById('vig_tabla').innerHTML=(parseInt(datos.data[0].ano))
         console.log(datos)
          for(var i =0; i<(tam) ;i++   ){
            if(datos.data[i].comuna<=90){
                tabla +='<tr>';
                tabla +='<td style="text-align:center;font-size: 9px;">'+vigencia_query+'</td>';
                tabla +='<td style="text-align:center;font-size:9px;">'+(datos.data[i].comuna)+'</td>';
                tabla +='<td style="text-align:left;font-size: 9px;">'+(datos.data[i].nom_comuna)+'</td>';
                tabla +='<td  style="font-size: 9px;">'+formatter.format(parseInt((datos.data[i].inver_ciudad)))+'</td>';
              tabla +='<tr>';
              document.getElementById('resultInverLocalizada').innerHTML=tabla;
              data.push({
                "comuna": datos.data[i].nom_comuna,
                "total":(parseInt(datos.data[i].inver_ciudad))
              });
            }
          }
          var chart = AmCharts.makeChart( "chartModalVigencia", {
            "type": "serial",
            "theme": "light",
          
            "rotate": true,
            "titles": [{
              "text": "Inversión de  "+datos.data[0].ano,
              "size": 10
          }],
            "dataProvider": data,
            "gridAboveGraphs": true,
            "startDuration": 1,
            "graphs": [ {
              "balloonText": "[[category]]: <b>[[value]]</b>",
              "fillAlphas": 0.8,
              "lineAlpha": 0.2,
              "type": "column",
              "valueField": "total",
              "fillColors": "#B4358B"
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
              "tickLength": 5
            },
            "export": {
              "enabled": true
            }
          
          } );  
        })
      } catch (error) {}
    
      $('#exampleModal').modal('show');
}

async function modalGraphPP(){
    try {
        let data=[];  let tabla='';
        let vigencia_query = document.getElementById('inputGroupSelect04').value
        document.getElementById('actualVigencia').innerHTML="Inversión de Ciudad  " +vigencia_query
        document.getElementById('resultInverLocalizada').innerHTML=" ";
        fetch('http://localhost:4000/api/vigencias/total-comuna/'+vigencia_query)
        .then(res=>res.json())
        .then(datos=>{
          let tam = datos.data.length;
          document.getElementById('vig_tabla').innerHTML=(parseInt(datos.data[0].ano))
         // console.log(datos)
          for(var i =0; i<(tam) ;i++   ){
            if(datos.data[i].comuna<=90){
                tabla +='<tr>';
                tabla +='<td style="text-align:center;font-size: 9px;">'+vigencia_query+'</td>';
                tabla +='<td style="text-align:center;font-size:9px;">'+(datos.data[i].comuna)+'</td>';
                tabla +='<td style="text-align:left;font-size: 9px;">'+(datos.data[i].nom_comuna)+'</td>';
                tabla +='<td  style="font-size: 9px;">'+formatter.format(parseInt((datos.data[i].inver_pp)))+'</td>';
              tabla +='<tr>';
              document.getElementById('resultInverLocalizada').innerHTML=tabla;
              data.push({
                "comuna": datos.data[i].nom_comuna,
                "total":(parseInt(datos.data[i].inver_pp))
              });
            }
          }
          var chart = AmCharts.makeChart( "chartModalVigencia", {
            "type": "serial",
            "theme": "light",
          
            "rotate": true,
            "titles": [{
              "text": "Inversión Presupuesto Participativo  "+datos.data[0].ano,
              "size": 10
          }],
            "dataProvider": data,
            "gridAboveGraphs": true,
            "startDuration": 1,
            "graphs": [ {
              "balloonText": "[[category]]: <b>[[value]]</b>",
              "fillAlphas": 0.8,
              "lineAlpha": 0.2,
              "type": "column",
              "valueField": "total",
              "fillColors": "#00853E"
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
              "tickLength": 5
            },
            "export": {
              "enabled": true
            }
          
          } );  
        })
      } catch (error) {}
    
      $('#exampleModal').modal('show');
}