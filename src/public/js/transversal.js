


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
        document.getElementById('actualVigencia').innerHTML="Inversión Presupuesto participativo " +vigencia_query
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

async function timeVigencias(){
    
    am4core.ready(function() { // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    var chart = am4core.create("chartdivPlay", am4charts.XYChart);
    chart.padding(40, 40, 40, 40);
    chart.numberFormatter.bigNumberPrefixes = [
      { "number": 1e+3, "suffix": "" },
      { "number": 1e+6, "suffix": "" },
      { "number": 1e+9, "suffix": "" }
    ];
    var label = chart.plotContainer.createChild(am4core.Label);
    label.x = am4core.percent(97);
    label.y = am4core.percent(95);
    label.horizontalCenter = "right";
    label.verticalCenter = "middle";
    label.dx = -15;
    label.fontSize = 60;
    var playButton = chart.plotContainer.createChild(am4core.PlayButton);
    playButton.x = am4core.percent(97);
    playButton.y = am4core.percent(95);
    playButton.dy = -2;
    playButton.verticalCenter = "middle";
    playButton.events.on("toggled", function(event) {
      if (event.target.isActive) {
        play();
      }
      else {
        stop();
      }
    })
    var stepDuration = 4000;

    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "network";
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;
    
    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.rangeChangeEasing = am4core.ease.linear;
    valueAxis.rangeChangeDuration = stepDuration;
    valueAxis.extraMax = 0.1;
    
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = "network";
    series.dataFields.valueX = "MAU";
    series.tooltipText = "{valueX.value}"
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;
    series.interpolationDuration = stepDuration;
    series.interpolationEasing = am4core.ease.linear;
    
    var labelBullet = series.bullets.push(new am4charts.LabelBullet())
    labelBullet.label.horizontalCenter = "right";
    labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
    labelBullet.label.textAlign = "end";
    labelBullet.label.dx = -10;
    
    chart.zoomOutButton.disabled = true;
    
    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", function(fill, target){
      return chart.colors.getIndex(target.dataItem.index);
    });
    
    var year = 2008;
    label.text = year.toString();
    
    var interval;
    
    function play() {
      interval = setInterval(function(){
        nextYear();
      }, stepDuration)
      nextYear();
    }
    
    function stop() {
      if (interval) {
        clearInterval(interval);
      }
    }
    
    function nextYear() {
      year++
    
      if (year > 2019) {
        year = 2008;
      }
    
      var newData = allData[year];
      var itemsWithNonZero = 0;
      for (let i = 0; i < chart.data.length; i++) {
        chart.data[i].MAU = newData[i].MAU;
        if (chart.data[i].MAU > 0) {
          itemsWithNonZero++;
        }
      }
    
      if (year == 2008) {
        series.interpolationDuration = stepDuration / 4;
        valueAxis.rangeChangeDuration = stepDuration / 4;
      }
      else {
        series.interpolationDuration = stepDuration;
        valueAxis.rangeChangeDuration = stepDuration;
      }
    
      chart.invalidateRawData();
      label.text = year.toString();
    
      categoryAxis.zoom({ start: 0, end: itemsWithNonZero / categoryAxis.dataItems.length });
    }
  

    
    categoryAxis.sortBySeries = series;
    
    var allData = {
        "2008": [{"network":"Popular","MAU":121894189035},{"network":"Santa Cruz","MAU":93395212606},{"network":"Manrique","MAU":120221535692},{"network":"Aranjuez","MAU":159426193602},{"network":"Castilla","MAU":101346909536},{"network":"Doce de Octubre","MAU":127720307521},{"network":"Robledo","MAU":128767055141},{"network":"Villa Hermosa","MAU":127866985792},{"network":"Buenos Aires","MAU":94968721254},{"network":"La Candelaria","MAU":73669191102},{"network":"Laureles - Estadio","MAU":55432623773},{"network":"La América","MAU":68208349070},{"network":"San Javier","MAU":112952340046},{"network":"El Poblado","MAU":84929760409},{"network":"Guayabal","MAU":53792050280},{"network":"Belén","MAU":108711691908},{"network":"Palmitas","MAU":7628520019},{"network":"San Cristóbal","MAU":57549247317},{"network":"Altavista","MAU":17491546929},{"network":"San Antonio","MAU":55686628699},{"network":"Santa Elena","MAU":23558698598}],
        "2009": [{"network":"Popular","MAU":118446957768},{"network":"Santa Cruz","MAU":91391516603},{"network":"Manrique","MAU":137301982663},{"network":"Aranjuez","MAU":127049965970},{"network":"Castilla","MAU":107414115527},{"network":"Doce de Octubre","MAU":142312947287},{"network":"Robledo","MAU":167609810484},{"network":"Villa Hermosa","MAU":122290776997},{"network":"Buenos Aires","MAU":99811308664},{"network":"La Candelaria","MAU":100032602639},{"network":"Laureles - Estadio","MAU":145112077010},{"network":"La América","MAU":65308824008},{"network":"San Javier","MAU":119552679223},{"network":"El Poblado","MAU":85554962343},{"network":"Guayabal","MAU":62168274211},{"network":"Belén","MAU":106283823214},{"network":"Palmitas","MAU":30913225508},{"network":"San Cristóbal","MAU":82531327892},{"network":"Altavista","MAU":36504318520},{"network":"San Antonio","MAU":73562955491},{"network":"Santa Elena","MAU":35164406312}],
        "2010": [{"network":"Popular","MAU":149668408922},{"network":"Santa Cruz","MAU":105356200352},{"network":"Manrique","MAU":149977063901},{"network":"Aranjuez","MAU":181936231818},{"network":"Castilla","MAU":115562495557},{"network":"Doce de Octubre","MAU":196541779423},{"network":"Robledo","MAU":138431371765},{"network":"Villa Hermosa","MAU":167871068766},{"network":"Buenos Aires","MAU":140522579925},{"network":"La Candelaria","MAU":104483423880},{"network":"Laureles - Estadio","MAU":77553939263},{"network":"La América","MAU":65715000910},{"network":"San Javier","MAU":168582048896},{"network":"El Poblado","MAU":80475880319},{"network":"Guayabal","MAU":100752821967},{"network":"Belén","MAU":137422835953},{"network":"Palmitas","MAU":32178624522},{"network":"San Cristóbal","MAU":110313422640},{"network":"Altavista","MAU":40022357178},{"network":"San Antonio","MAU":70574997950},{"network":"Santa Elena","MAU":31854333567}],
        "2011": [{"network":"Popular","MAU":163694924419},{"network":"Santa Cruz","MAU":112219644213},{"network":"Manrique","MAU":165350766327},{"network":"Aranjuez","MAU":165258803636},{"network":"Castilla","MAU":117248004209},{"network":"Doce de Octubre","MAU":144830195771},{"network":"Robledo","MAU":155842614192},{"network":"Villa Hermosa","MAU":274571324199},{"network":"Buenos Aires","MAU":225129511773},{"network":"La Candelaria","MAU":192090694643},{"network":"Laureles - Estadio","MAU":77677059902},{"network":"La América","MAU":64574730587},{"network":"San Javier","MAU":150275684355},{"network":"El Poblado","MAU":103766124885},{"network":"Guayabal","MAU":100274288881},{"network":"Belén","MAU":115414265507},{"network":"Palmitas","MAU":30920417192},{"network":"San Cristóbal","MAU":92853077544},{"network":"Altavista","MAU":39278311818},{"network":"San Antonio","MAU":98251873513},{"network":"Santa Elena","MAU":33780002837}],
        "2012": [{"network":"Popular","MAU":174424552200},{"network":"Santa Cruz","MAU":129288860662},{"network":"Manrique","MAU":199742262732},{"network":"Aranjuez","MAU":182186475308},{"network":"Castilla","MAU":170759778664},{"network":"Doce de Octubre","MAU":161884584050},{"network":"Robledo","MAU":184846834305},{"network":"Villa Hermosa","MAU":182397778733},{"network":"Buenos Aires","MAU":132394957167},{"network":"La Candelaria","MAU":122539256097},{"network":"Laureles - Estadio","MAU":86841735771},{"network":"La América","MAU":70870821993},{"network":"San Javier","MAU":141454863070},{"network":"El Poblado","MAU":79192368577},{"network":"Guayabal","MAU":87703657743},{"network":"Belén","MAU":146607859306},{"network":"Palmitas","MAU":18951974218},{"network":"San Cristóbal","MAU":80584723355},{"network":"Altavista","MAU":36042444058},{"network":"San Antonio","MAU":89201181549},{"network":"Santa Elena","MAU":34679232379}],
        "2013": [{"network":"Popular","MAU":202370254907},{"network":"Santa Cruz","MAU":157090267042},{"network":"Manrique","MAU":210082946208},{"network":"Aranjuez","MAU":232940825655},{"network":"Castilla","MAU":211193848247},{"network":"Doce de Octubre","MAU":216840045486},{"network":"Robledo","MAU":203442661521},{"network":"Villa Hermosa","MAU":288628881228},{"network":"Buenos Aires","MAU":185343867756},{"network":"La Candelaria","MAU":165749383549},{"network":"Laureles - Estadio","MAU":87119621513},{"network":"La América","MAU":100764419017},{"network":"San Javier","MAU":176806829068},{"network":"El Poblado","MAU":105914283535},{"network":"Guayabal","MAU":121096503171},{"network":"Belén","MAU":181454830317},{"network":"Palmitas","MAU":24831751319},{"network":"San Cristóbal","MAU":145722134173},{"network":"Altavista","MAU":46197352535},{"network":"San Antonio","MAU":133763769082},{"network":"Santa Elena","MAU":30918322667}],
        "2014": [{"network":"Popular","MAU":200326455082},{"network":"Santa Cruz","MAU":155536510627},{"network":"Manrique","MAU":200159912217},{"network":"Aranjuez","MAU":209060732007},{"network":"Castilla","MAU":188047384995},{"network":"Doce de Octubre","MAU":202088050158},{"network":"Robledo","MAU":199962162672},{"network":"Villa Hermosa","MAU":262657491388},{"network":"Buenos Aires","MAU":187499361712},{"network":"La Candelaria","MAU":166642157439},{"network":"Laureles - Estadio","MAU":93249789102},{"network":"La América","MAU":86786599494},{"network":"San Javier","MAU":194955661520},{"network":"El Poblado","MAU":112644222413},{"network":"Guayabal","MAU":97738402769},{"network":"Belén","MAU":151002819873},{"network":"Palmitas","MAU":41156253920},{"network":"San Cristóbal","MAU":144184311863},{"network":"Altavista","MAU":60271475943},{"network":"San Antonio","MAU":109785688262},{"network":"Santa Elena","MAU":54187449245}],
        "2015": [{"network":"Popular","MAU":235427358826},{"network":"Santa Cruz","MAU":174598858394},{"network":"Manrique","MAU":224933060333},{"network":"Aranjuez","MAU":247196633916},{"network":"Castilla","MAU":209135733409},{"network":"Doce de Octubre","MAU":224066906968},{"network":"Robledo","MAU":233152933348},{"network":"Villa Hermosa","MAU":220979952304},{"network":"Buenos Aires","MAU":179589799316},{"network":"La Candelaria","MAU":161271053024},{"network":"Laureles - Estadio","MAU":87033016179},{"network":"La América","MAU":107066667680},{"network":"San Javier","MAU":205350530052},{"network":"El Poblado","MAU":89707888842},{"network":"Guayabal","MAU":89364553930},{"network":"Belén","MAU":162430149905},{"network":"Palmitas","MAU":34499081242},{"network":"San Cristóbal","MAU":117827334811},{"network":"Altavista","MAU":44556104400},{"network":"San Antonio","MAU":116071406428},{"network":"Santa Elena","MAU":39192175357}],
        "2016": [{"network":"Popular","MAU":223118018316},{"network":"Santa Cruz","MAU":173280723148},{"network":"Manrique","MAU":230182404509},{"network":"Aranjuez","MAU":237294705274},{"network":"Castilla","MAU":197826324545},{"network":"Doce de Octubre","MAU":227528642592},{"network":"Robledo","MAU":223002064486},{"network":"Villa Hermosa","MAU":225642752948},{"network":"Buenos Aires","MAU":169438097675},{"network":"La Candelaria","MAU":158803751412},{"network":"Laureles - Estadio","MAU":89155885471},{"network":"La América","MAU":98215042075},{"network":"San Javier","MAU":197813035723},{"network":"El Poblado","MAU":88949334051},{"network":"Guayabal","MAU":91110112220},{"network":"Belén","MAU":174612624119},{"network":"Palmitas","MAU":19018818171},{"network":"San Cristóbal","MAU":116818144600},{"network":"Altavista","MAU":37167052710},{"network":"San Antonio","MAU":116912768433},{"network":"Santa Elena","MAU":29776447387}],
        "2017": [{"network":"Popular","MAU":260338980649},{"network":"Santa Cruz","MAU":243736112802},{"network":"Manrique","MAU":280241115686},{"network":"Aranjuez","MAU":299051327686},{"network":"Castilla","MAU":283494024519},{"network":"Doce de Octubre","MAU":342625533197},{"network":"Robledo","MAU":336711593586},{"network":"Villa Hermosa","MAU":286324605150},{"network":"Buenos Aires","MAU":216723818913},{"network":"La Candelaria","MAU":367576362802},{"network":"Laureles - Estadio","MAU":125183153722},{"network":"La América","MAU":119023330021},{"network":"San Javier","MAU":248983354606},{"network":"El Poblado","MAU":155545913820},{"network":"Guayabal","MAU":130567846539},{"network":"Belén","MAU":225285604388},{"network":"Palmitas","MAU":38296737843},{"network":"San Cristóbal","MAU":136135810255},{"network":"Altavista","MAU":71945878004},{"network":"San Antonio","MAU":131223457188},{"network":"Santa Elena","MAU":67022888110}],
        "2018": [{"network":"Popular","MAU":292272194467},{"network":"Santa Cruz","MAU":245711238061},{"network":"Manrique","MAU":332537631618},{"network":"Aranjuez","MAU":306130629387},{"network":"Castilla","MAU":267480053471},{"network":"Doce de Octubre","MAU":322351778728},{"network":"Robledo","MAU":378321311475},{"network":"Villa Hermosa","MAU":307672317406},{"network":"Buenos Aires","MAU":245656474673},{"network":"La Candelaria","MAU":343261760161},{"network":"Laureles - Estadio","MAU":147135853900},{"network":"La América","MAU":143318297647},{"network":"San Javier","MAU":293810236737},{"network":"El Poblado","MAU":157754937869},{"network":"Guayabal","MAU":133636268693},{"network":"Belén","MAU":290643951780},{"network":"Palmitas","MAU":36985246240},{"network":"San Cristóbal","MAU":201391196173},{"network":"Altavista","MAU":89173650230},{"network":"San Antonio","MAU":183993908834},{"network":"Santa Elena","MAU":48954425688}],
        "2019": [{"network":"Popular","MAU":308007593501},{"network":"Santa Cruz","MAU":245371139251},{"network":"Manrique","MAU":348763350351},{"network":"Aranjuez","MAU":302871971839},{"network":"Castilla","MAU":251439073243},{"network":"Doce de Octubre","MAU":328588238947},{"network":"Robledo","MAU":369523732625},{"network":"Villa Hermosa","MAU":312392943745},{"network":"Buenos Aires","MAU":270765647862},{"network":"La Candelaria","MAU":229959967133},{"network":"Laureles - Estadio","MAU":130300952836},{"network":"La América","MAU":145544111672},{"network":"San Javier","MAU":291961128373},{"network":"El Poblado","MAU":140168109953},{"network":"Guayabal","MAU":136572356954},{"network":"Belén","MAU":258664517424},{"network":"Palmitas","MAU":38316295517},{"network":"San Cristóbal","MAU":212071754382},{"network":"Altavista","MAU":113561329858},{"network":"San Antonio","MAU":197813326858},{"network":"Santa Elena","MAU":58134199060}]
    }
    
    chart.data = JSON.parse(JSON.stringify(allData[year]));
    categoryAxis.zoom({ start: 0, end: 1 / chart.data.length });
    
    series.events.on("inited", function() {
      setTimeout(function() {
        playButton.isActive = true; // this starts interval
      }, 5000)
    })
    
   




}); // end am4core.ready()
$('#playModal').modal('show');

}
