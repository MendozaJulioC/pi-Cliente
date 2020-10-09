


async function _main(){
  _avancePDM()
  _avanceline()

}

async function _avancePDM(){

  try {
    fetch('https://sse-pdm-back.herokuapp.com/pi/api/total')
    .then(res=>res.json())
    .then(datos=>{
        graphPDM(datos.data[0].total_plan)
      })
  } catch (error) {
    console.log('Error _avancePDM ',error )
  }

}

async function _avanceline(){

    try {
      fetch('https://sse-pdm-back.herokuapp.com/pi/api/total-avance-lineas')
      .then(res=>res.json())
      .then(datos=>{
        graphlineas(datos.data[0].avance_linea)
        graphLine2(datos.data[1].avance_linea)
        graphLine3(datos.data[2].avance_linea)
        graphLine4(datos.data[3].avance_linea)
        graphLine5(datos.data[4].avance_linea)
 
      })
    } catch (error) {
      console.log('Error _avanceline ',error )
    }

}


async function graphlineas(avance1){

    const dataSource = {
        chart: {
          numbersuffix: "%",
          gaugefillmix: "{dark-20},{light+70},{dark-10}",
          theme: "fusion"
          
        },
        colorrange: {
          color: [
            {
              minvalue: "0",
              maxvalue: "45",
              label: "Bajo",
              code: "#F2726F"
            },
            {
              minvalue: "45",
              maxvalue: "67",
              label: "Medio",
              code: "#FFC533"
            },
            {
              minvalue: "67",
              maxvalue: "100",
              label: "Alto",
              code: "#62B58F"
            }
          ]
        },
        pointers: {
          pointer: [
            {
              value:Math.ceil(avance1) 
            }
          ]
        }
      };
      
      FusionCharts.ready(function() {
        var myChart = new FusionCharts({
          type: "hlineargauge",
          renderAt: "canvas1",
          width: "100%",
          height: "60%",
          dataFormat: "json",
          dataSource
        }).render();
      });   

    graphLine2()

}

async   function graphLine2(avance2){

    const dataSource = {
        chart: {
        
        numbersuffix: "%",
        gaugefillmix: "{dark-20},{light+70},{dark-10}",
        theme: "fusion",
       
        },
        colorrange: {
        color: [
            {
            minvalue: "0",
            maxvalue: "45",

           
            label: "Bajo",
            code: "#F2726F",
            
            },
            {
            minvalue: "45",
            maxvalue: "67",
            label: "Medio",
            code: "#FFC533"
            },
            {
            minvalue: "67",
            maxvalue: "100",
            label: "Alto",
            code: "#62B58F"
            }
        ]
        },
        pointers: {
        pointer: [
            {
              value:Math.ceil(avance2) 
            }
        ]
        }
    };
    
    FusionCharts.ready(function() {
        var myChart2 = new FusionCharts({
        type: "hlineargauge",
        renderAt: "canvas2",
        width: "100%",
        height: "60%",
        dataFormat: "json",
      
        dataSource
        }).render();
    });

    graphLine3()
}

async   function graphLine3(avance3){

    const dataSource = {
        chart: {
         
          numbersuffix: "%",
          gaugefillmix: "{dark-20},{light+70},{dark-10}",
          theme: "fusion"
        },
        colorrange: {
          color: [
            {
              minvalue: "0",
              maxvalue: "45",
              label: "Bajo",
              code: "#F2726F"
            },
            {
              minvalue: "45",
              maxvalue: "67",
              label: "Medio",
              code: "#FFC533"
            },
            {
              minvalue: "67",
              maxvalue: "100",
              label: "Alto",
              code: "#62B58F"
            }
          ]
        },
        pointers: {
          pointer: [
            {
              value:Math.ceil(avance3) 
            }
          ]
        }
      };
      
      FusionCharts.ready(function() {
        var myChart2 = new FusionCharts({
          type: "hlineargauge",
          renderAt: "canvas3",
          width: "100%",
          height: "60%",
          dataFormat: "json",
          dataSource
        }).render();
      });
    
      graphLine4()
}

async function  graphLine4(avance4){
    const dataSource = {
        chart: {
         
          numbersuffix: "%",
          gaugefillmix: "{dark-20},{light+70},{dark-10}",
          theme: "fusion"
        },
        colorrange: {
          color: [
            {
              minvalue: "0",
              maxvalue: "45",
              label: "Bajo",
              code: "#F2726F"
            },
            {
              minvalue: "45",
              maxvalue: "67",
              label: "Medio",
              code: "#FFC533"
            },
            {
              minvalue: "67",
              maxvalue: "100",
              label: "Alto",
              code: "#62B58F"
            }
          ]
        },
        pointers: {
          pointer: [
            {
              value:Math.ceil(avance4) 
            }
          ]
        }
      };
      
      FusionCharts.ready(function() {
        var myChart2 = new FusionCharts({
          type: "hlineargauge",
          renderAt: "canvas4",
          width: "100%",
          height: "60%",
          dataFormat: "json",
          dataSource
        }).render();
      });

      graphLine5()
}

async function   graphLine5(avance5){
    const dataSource = {
        chart: {
         
          numbersuffix: "%",
          gaugefillmix: "{dark-20},{light+70},{dark-10}",
          theme: "fusion"
        },
        colorrange: {
          color: [
            {
              minvalue: "0",
              maxvalue: "45",
              label: "Bajo",
              code: "#F2726F"
            },
            {
              minvalue: "45",
              maxvalue: "67",
              label: "Medio",
              code: "#FFC533"
            },
            {
              minvalue: "67",
              maxvalue: "100",
              label: "Alto",
              code: "#62B58F"
            }
          ]
        },
        pointers: {
          pointer: [
            {
              value:Math.ceil(avance5) 
            }
          ]
        }
      };
      
      FusionCharts.ready(function() {
        var myChart2 = new FusionCharts({
          type: "hlineargauge",
          renderAt: "canvas5",
          width: "100%",
          height: "60%",
          dataFormat: "json",
          dataSource
        }).render();
      });

      
}
  
async function graphPDM(total){

  //aqui un fetch para consultar el porcentaje de ejecución del pdm
  try {


    
    const dataSource = {
      chart: {
     
        lowerlimit: "0",
        upperlimit: "100",
        showvalue: "1",
        numbersuffix: "%",
        theme: "fusion",
        showtooltip: "0"
      },
      colorrange: {
        color: [
          {
            minvalue: "0",
            maxvalue: "50",
            code: "#B4358B"
          },
          {
            minvalue: "50",
            maxvalue: "75",
            code: "#FFDC15"
          },
          {
            minvalue: "75",
            maxvalue: "100",
            code: "#00853E"
          }
        ]
      },
      dials: {
        dial: [
          {
            value: Math.ceil(total)
          }
        ]
      }
    };
    
    FusionCharts.ready(function() {
      var myChart = new FusionCharts({
        type: "angulargauge",
        renderAt: "canvas",
        width: "100%",
        height: "70%",
        dataFormat: "json",
        dataSource
      }).render();
    });
  } catch (error) {
    console.log('Error graphPDM: ', error)
  }
  
      
     // graphPDA() 
}

/*

async function graphPDA(){
  const dataSource = {
      chart: {
     
        lowerlimit: "0",
        upperlimit: "100",
        showvalue: "1",
        numbersuffix: "%",
        theme: "fusion",
        showtooltip: "0"
      },
      colorrange: {
        color: [
          {
            minvalue: "0",
            maxvalue: "50",
            code: "#B4358B"
          },
          {
            minvalue: "50",
            maxvalue: "75",
            code: "#FFDC15"
          },
          {
            minvalue: "75",
            maxvalue: "100",
            code: "#00853E"
          }
        ]
      },
      dials: {
        dial: [
          {
            value: "200"
          }
        ]
      }
    };
    
    FusionCharts.ready(function() {
      var myChart = new FusionCharts({
        type: "angulargauge",
        renderAt: "canvas-pa1",
        width: "100%",
        height: "70%",
        dataFormat: "json",
        dataSource
      }).render();
    });
    
    
}

*/