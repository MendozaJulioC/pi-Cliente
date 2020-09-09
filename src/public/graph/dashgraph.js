

async function graphlineas(){

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
              value: "35"
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

async   function graphLine2(){

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
            value: "40"
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

async   function graphLine3(){

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
              value: "56"
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

async function  graphLine4(){
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
              value: "38"
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

async function   graphLine5(){
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
              value: "90"
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

      graphPDM()
}
  
async function graphPDM(){
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
              value: "81"
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
      
      graphPDA() 
}



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
            value: "50"
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

