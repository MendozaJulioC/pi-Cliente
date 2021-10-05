async function inicia(){
  estado()
  comunas()
  sumaobrasgeo()
  alertaobra()
  tipo_etapa()
  tipo_intervencion()
  let x= document.getElementById('dep-hito');
  x.style.display='none'
}

const comunas = async (req, res)=>{
  var container = L.DomUtil.get('map1');
  if(container != null){
      container._leaflet_id = null;
  }
  var map1 = L.map('map1', {
      // Set latitude and longitude of the map center (required)
      center: [6.2508, -75.5738],
      // Set the initial zoom level, values 0-18, where 0 is most zoomed-out (required)
      zoom: 13,
      

    });
    // Create a Tile Layer and add it to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map1);

  let geo_url=""; 
  geo_url=`https://www.medellin.gov.co/mapas/rest/services/ServiciosCiudad/CartografiaBase/MapServer/11/query?where=1%3D1&text=&objectIds=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&parameterValues=&rangeValues=&f=geojson`

  fetch(geo_url)
  .then(res=>res.json())
  .then(data => {
    //document.getElementById('total').innerHTML= new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(parseInt(valor))
    let geojsonlayer2 = L.geoJson(data, {
          onEachFeature: async function (feature, layer) {
          let poputcontentMap=  ` <p class="card-title">` + feature.properties.NOMBRE +` </p>`
          layer.bindPopup(poputcontentMap)
       }
     }).addTo(map1)
      map1.fitBounds(geojsonlayer2.getBounds(),  {maxZoom: 15})
      L.Control.Watermark = L.Control.extend({
      onAdd: function(map1) {
        var img = L.DomUtil.create('img');
        img.src = '/img/logo.png';
        img.style.width = '100px';
        return img;
      },
      onRemove: function(map1) {
          // Nothing to do here
      }
      });
      L.control.watermark = function(opts) {
      return new L.Control.Watermark(opts);
      }
      L.control.watermark({ position: 'bottomleft' }).addTo(map1);
  });
  map1.whenReady(() => {
      setTimeout(() => {map1.invalidateSize();}, 200);
  })
}

async function estado(){
try {
  fetch(`/obra-fisica/etapa`)
  .then(res=> res.json())
  .then(response=>{

    const dataSource = {
      chart: {
        caption: "Etapas",
        subcaption: "Estado actual de la obra",
        showpercentvalues: "0",
        defaultcenterlabel: "Estado",
        aligncaptionwithcanvas: "0",
        captionpadding: "0",
        formatnumberscale: "0",
        doughnutRadius:"70%",
        baseFontSize:"1.5rem",
        plottooltext:
          "<b>$percentValue</b> <b>$label</b>",
        centerlabel: "<b>$label</b> $value",
        theme: "zune"
      },
      data: response.data
    };
    
    FusionCharts.ready(function() {
      var myChart = new FusionCharts({
        type: "doughnut2d",
        renderAt: "estadomain",
        width: "100%",
        height: "100%",
        dataFormat: "json",
        dataSource
      }).render();
    });

  })
} catch (error) {
  console.error('Error estado: ', error)
}
}

async function sumaobrasgeo()
{
try {

  fetch(`/obra-fisica/geo`)
  .then(res=>res.json())
  .then(response=>{
  //console.log(response.data);
    const dataSource = {
      chart: {
        caption: "Número de Obras en el Territorio",
        yaxisname: "Número de Intervenciones",
        aligncaptionwithcanvas: "0",
        plottooltext: "<b>$dataValue</b> leads received",
        theme: "ocean",
        labelDisplay: "rotate",
        slantLabel: "1"
      },
      data: response.data
};
FusionCharts.ready(function() {
      var myChart = new FusionCharts({
        type: "column2d",
        renderAt: "geoobra",
        width: "100%",
        height: "100%",
        dataFormat: "json",
        dataSource,
        events: {
          'dataplotClick': function(evt) {
            graficageodepobra( evt)
            window.showAlert = function(str) {
            };
          }
        }
      }).render();
});

  })

  
} catch (error) {
  console.error('Error sumaobrasgeo: ', error)
}

sumaobrasdep()
}

async function sumaobrasdep()
{
fetch(`/obra-fisica/dep`)
.then(res=>res.json())
.then(response=>{
  const dataSource = {
    chart: {
      caption: "Obras por dependencias",
      subcaption: "Número de obras",
      xaxisname: "Dependencias",
      yaxisname: "Obras",
      placevaluesinside: "0",
      showvalues: "1",
      valuefontcolor: "#0c4271",
      plottooltext: "<b>$seriesName</b>  $label  <b>$dataValue</b>",
      labeldisplay: "Rotate",
      theme: "ocean",
    },
    data: 
     response.data
  };
  
  FusionCharts.ready(function() {
    var myChart = new FusionCharts({
      type: "bar2d",
      renderAt: "depobra",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource,
      events: {
        'dataplotClick': function(evt) {
          graficadepobra( evt)
          window.showAlert = function(str) {
          };
        }
      }
    }).render();
  });
})


    
}



async function graficadepobra(data){
//console.log(data);
let nom_dep= data.data.id
let cod_dep= (data.data.link).substring(12,15);
document.getElementById('obraModalLabel').innerHTML=nom_dep
let corte=''
fetch(`/obra-fisica/dep/detalle/${cod_dep}`)
.then(res=>res.json())
.then(response=>{
    let inversion_dep =response.inversion
     corte = response.corte
     const dataSource = {
      chart: {
        caption: "Tipo de Intervención",
        subcaption: "número de obras",
        xaxisname: "obras",
        yaxisname: "Tipo",
        showvalues:"1",
        theme: "umber"
      },
      data: response.data
    };
    FusionCharts.ready(function() {
      var myChart = new FusionCharts({
        type: "column2d",
        renderAt: "dep-tipo",
        width: "100%",
        height: "100%",
        dataFormat: "json",
        dataSource
      }).render();
    });
    document.getElementById('total_ivnersion_dep').innerHTML= inversion_dep
    //  console.log(corte);
    document.getElementById('corteOF').innerHTML= corte.substring(0, 10)
    depmodal_alerta(response.alerta)
    depetapamodal(response.etapa)
    obrascomunasdep(cod_dep)
    if(cod_dep=='741'){  hitograpg(response.hitos)}
})

  jQuery.noConflict();
  $('#obraModal').modal('show'); 
}


async function depmodal_alerta(data){
if(data.length==0){
     data= [{
        label:"Sin Alertas actuales",
        value: 0
    }]} 
let x= document.getElementById('dep-hito');
x.style.display='none'
const dataSource = {
  chart: {
    caption: "Tipo de Alerta",
    subcaption: "número de obras",
    xaxisname: "alerta",
    yaxisname: "total",
    showvalues:"1",
   // numbersuffix: "K",
    theme: "umber"
  },
  data: data
};

FusionCharts.ready(function() {
  var myChart = new FusionCharts({
    type: "bar2d",
    renderAt: "dep-alerta",
    width: "100%",
    height: "100%",
    dataFormat: "json",
    dataSource
  }).render();
});
}

async function depetapamodal(etapa){
const dataSource = {
  chart: {
    captionalignment: "right",
    caption: "Etapas",
    subcaption: "Estado actual de las obras",
    xaxisname: "etapas",
    yaxisname: "número de obras",
   // numbersuffix: "K",
   showvalues:"1",
    theme: "umber"
  },
  data: etapa
};

FusionCharts.ready(function() {
  var myChart = new FusionCharts({
    type: "column2d",
    renderAt: "dep-etapa",
    width: "100%",
    height: "100%",
    dataFormat: "json",
    dataSource
  }).render();
});

}

async function hitograpg(hitos)
{
try {
  let x= document.getElementById('dep-hito');
  x.style.display='block'
  const dataSource = {
    chart: {
      captionalignment: "right",
      caption: "Detalle Obras",
      subcaption: "Número de obras",
      xaxisname: "obra",
      yaxisname: "total",
      theme: "umber",
      showvalues:"1",
      labelDisplay: "rotate",
      slantLabel: "1",
    },
    data:hitos
  };
  
  FusionCharts.ready(function() {
    var myChart = new FusionCharts({
      type: "column2d",
      renderAt: "dep-hito",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource
    }).render();
  });
  
  
} catch (error) {
  console.error('Error hitograph'. error)
}
}


async function alertaobra(){
try {
fetch(`/obra-fisica/alerta`)
.then(res=> res.json())
.then(response=>{

  const dataSource = {
    chart: {
      caption: "Alertas",
      yaxisname: "Número de Obras",
      aligncaptionwithcanvas: "0",
      plottooltext: "<b>$dataValue</b> $label",
      theme: "zune"
    },
    data: response.data
  };
  FusionCharts.ready(function() {
    var myChart = new FusionCharts({
      type: "bar2d",
      renderAt: "chartdiv",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource
    }).render();
  });
})
 
} catch (error) {
 console.error('Error alertaobra: ', error)
}

}


async function tipo_etapa(){

try {
fetch(`/obra-fisica/temas`)
.then(res=> res.json())
.then(datos=>{
  //console.log('Temas: ',datos);
  const dataSource = {
    chart: {
      caption: "Distribución por temática",
      subcaption: "Número de obras por tema",
      decimals: "1",
      showvalues: "1",
      plottooltext: "$label: <b>$dataValue</b>",
      plotfillalpha: "70",
      theme: "ocean",
      streamlineddata: "0"
    },
    data: datos.data
  };
  
  FusionCharts.ready(function() {
    var myChart = new FusionCharts({
      type: "funnel",
      renderAt: "tipointervencion",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource
    }).render();
  });
})
} catch (error) {
console.error('Error tipo_tema: ', error)
}



}


async function  tipo_intervencion(){
try {
fetch(`/obra-fisica/tipo`)
.then(res=> res.json())
.then(response=>{
//  console.log(response.data);
  const dataSource = {
    chart: {
      caption: "Obras por tipo de intervención",
      subcaption: "Número de obras",
      xaxisname: "Tipo",
      yaxisname: "Obras",
      labelDisplay: "rotate",
      slantLabel: "1",
     
      theme: "ocean"
    },
    data: response.data
  };
  
  FusionCharts.ready(function() {
    var myChart = new FusionCharts({
      type: "column2d",
      renderAt: "chart-tema",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource
    }).render();
  });

})    

} catch (error) {
  console.error('Error tipo_intervencion: ', error)
}



}


function style2(valor) {
return {
    fillColor: getColor(valor),
    weight: 2,
    opacity: 1,
    color: 'blue',
    dashArray: '3',
    fillOpacity: 0.7
};
}


async function actualizabd(){
 try {
  swal("Iniciamos el proceso de actualización... Espera!!!", {
    icon: "info",
    button:false,
    timer: 1000000,
  });
  fetch(`https://sse-pdm.herokuapp.com/obrafisica/api/update`)
  .then(res=> res.json())
  .then(datos=>{
    swal("Listo!", "La base de datos ha sido actualizada!", "success");
  })
 } catch (error) {
   console.error('Error ', error);
 }
}




async function dowloadOF (){
const invoice = this.document.getElementById('invoiceOFproyect');
// console.log(invoice);
//console.log(window);
var opt = {
  margin:       1,
  filename:     'ReporteObraFísica.pdf',
  image:        { type: 'jpeg', quality: 0.98 },
  html2canvas:  { scale: 3 , letterRending:true },
  pagebreak: { mode: 'avoid-all', before: '#page2el' },
  jsPDF:        { unit: 'in', format: 'a3', orientation: 'portrait' }
};
html2pdf().from(invoice).set(opt).save();

}

async function graficageodepobra(data){
//  console.log(data);
let nom_comuna= data.data.id
let data_index= (data.data.dataIndex)+1
//let cod_dep= (data.data.link).substring(12,15);
document.getElementById('obraModalLabel').innerHTML=nom_comuna
let corte=''
let dateo=[]
if(data_index>16){
 switch (data_index) {
   case 17:data_index=50;break;
   case 18:data_index=60;break;
   case 19:data_index=70;break;
   case 20:data_index=80;break;
   case 21:data_index=90;break;
   default:break;
 }
}
fetch(`https://sse-pdm.herokuapp.com/obrafisica/api/geo/territorio/${data_index}`)
  .then(res=>res.json())
  .then(response=>{
    //console.log(response);
    for (let index = 0; index < response.data.length; index++) {
      dateo.push({
        label:  response.data[index].nom_cortp,
        value:  response.data[index].num_obras
       })
     }
     //let inversion_dep =response.inversion
     //corte = response.corte
     const dataSource = {
      chart: {
        caption: 'Total Obras por Dependencias en '+nom_comuna,
        subcaption: "número de obras",
        xaxisname: "Dependencias",
        yaxisname: "obras",
        showvalues:"1",
        theme: "umber"
      },
      data: dateo
    };
    FusionCharts.ready(function() {
      var myChart = new FusionCharts({
        type: "column2d",
        renderAt: "dep-geo",
        width: "100%",
        height: "100%",
        dataFormat: "json",
        dataSource
      }).render();
    });
    document.getElementById('geoModalLabel').innerHTML=nom_comuna
    alertageo(data_index)
  })
  jQuery.noConflict();
  $('#obraModalDep').modal('show'); 
}


async function alertageo (geo){
let alerta=[];
let cortecomuna='';
fetch(` https://sse-pdm.herokuapp.com/obrafisica/api/geo/alerta/${geo}`)
.then(res=>res.json())
.then(response=>{
  if(response.length==0){
    alerta= [{
    label:"Sin Alertas actuales",
    value: 0
  }]} 
  cortecomuna= response.data[0].corte
  for (let index = 0; index < response.data.length; index++) {
    if (response.data[index].cod_alerta!=0) {
      alerta.push({
        label:  response.data[index].alerta,
        value:  response.data[index].total_alerta,
        color : " #e6550d"
      })
    }
  }
 const dataSource = {
  chart: {
    caption: "Alertas",
    yaxisname: "Número de Obras",
    aligncaptionwithcanvas: "0",
    plottooltext: "<b>$dataValue</b> $label",
    theme: "umber",
    showvalues:"1",
  },
  data: alerta
};
FusionCharts.ready(function() {
  var myChart = new FusionCharts({
    type: "bar2d",
    renderAt: "geo-alerta",
    width: "100%",
    height: "100%",
    dataFormat: "json",
    dataSource
  }).render();
});
document.getElementById('corteOFcomuna').innerHTML= cortecomuna.substring(0,10)
intervenciongeo(geo)
})

}


async function intervenciongeo(geo){
let intervencion=[];
try {
  fetch(`https://sse-pdm.herokuapp.com/obrafisica/api/geo/intervencion/${geo}`)
  .then(res=>res.json())
  .then(response=>{

    for (let index = 0; index < response.data.length; index++) {
    intervencion.push({
      label: response.data[index].tipo_intervencion,
      value: response.data[index].total_intervencion
    })
      
    }
    const dataSource = {
      chart: {
        caption: "Obras por tipo de intervención",
        subcaption: "Número de obras",
        xaxisname: "Tipo",
        yaxisname: "Obras",
        labelDisplay: "rotate",
        slantLabel: "1",
        showvalues:"1",
        theme: "umber"
      },
      data: intervencion
    };
    
    FusionCharts.ready(function() {
      var myChart = new FusionCharts({
        type: "column2d",
        renderAt: "geo-intervencion",
        width: "100%",
        height: "100%",
        dataFormat: "json",
        dataSource
      }).render();
    });
  })
} catch (error) {
  console.error('Error intervenciongeo: ', error);
  
}

}

async function obrascomunasdep(cod_dep){
try {
  let geointervenciondep=[];
  fetch(`https://sse-pdm.herokuapp.com/obrafisica/api/geo/dependencia/${cod_dep}`)
  .then(res=> res.json())
  .then(response=>{
    //console.log(response.data);
      for (let index = 0; index < response.data.length; index++) {
        geointervenciondep.push({
          label: response.data[index].nom_comuna,
          value: response.data[index].tot_obra
        })
      }

      const dataSource = {
        chart: {
          caption: "Número de Obras por Territorio",
          subcaption: "Número de obras",
          xaxisname: "Territorio",
          yaxisname: "Obras",
          labelDisplay: "rotate",
          slantLabel: "1",
          showvalues:"1",
          theme: "umber"
        },
        data: geointervenciondep
      };
      
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "column2d",
          renderAt: "num-obras-dep-geo",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });



  })

} catch (error) {
  console.error('Error ');
  
}
}