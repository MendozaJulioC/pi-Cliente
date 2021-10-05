
<!DOCTYPE html>
<html lang="es">
  <head >
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.js" integrity="sha512-ICHkAOXzVDEkL5xkXjAWRV/hx6Bq4ID/uhRcnj9zS7QCdCbhVtfgjwt/vTfUBtW1wzBkErImU0huK3LDVeEr8g==" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/css/bootstrap.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.23/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="https://unpkg.com/bootstrap-table@1.18.2/dist/bootstrap-table.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.2.7/css/responsive.dataTables.min.css">
    <link rel="stylesheet" href="/css/geo.css">
    <link rel="stylesheet" href="/css/leaflet.label.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
    <style>  #container { padding-left: 100px; padding-right: 100px; padding-top: 5px; padding-bottom: 2px; } tr { height: 2px;}
            footer {background-color: rgb(60, 58, 58) ; padding: 10px;text-align: center;color: white;}
    </style>
    <link rel="stylesheet" href="https://www.amcharts.com/lib/3/plugins/export/export.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" />
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>


    <script type="text/javascript" src="https://cdn.fusioncharts.com/fusioncharts/latest/fusioncharts.js"></script>
    <script type="text/javascript" src="https://cdn.fusioncharts.com/fusioncharts/latest/themes/fusioncharts.theme.umber.js"></script>
    <script type="text/javascript" src="https://cdn.fusioncharts.com/fusioncharts/latest/themes/fusioncharts.theme.zune.js"></script>
    <script type="text/javascript" src="https://cdn.fusioncharts.com/fusioncharts/latest/themes/fusioncharts.theme.ocean.js"></script>
   
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.js" integrity="sha512-ICHkAOXzVDEkL5xkXjAWRV/hx6Bq4ID/uhRcnj9zS7QCdCbhVtfgjwt/vTfUBtW1wzBkErImU0huK3LDVeEr8g==" crossorigin="anonymous"></script>

    <title> <%= title %> </title>
    <%- include ('../partials/head.html') %>
  </head>
  <%- include ('../partials/menuplapp.html') %>
<body onload="inicia()">
  
  <div id="container" class="mt-5" >
    <div class="row mt-5">
      <div class="col-md-12 mt-4  shadow-sm bg-white rounded mb-2">
        <h6 class="text-muted" style="text-align: center;font-size: 34px;line-height: 20px;font-weight: 100;color: #73879C;
                  font-family: 'Helvetica Neue', Roboto, Arial, 'Droid Sans', sans-serif;">
                  <p style="align-items: center;"> <img src="/img/logo.png" style="width: 10%;" alt=""></p>
                  Seguimiento a la Obra Física  
        </h6>
        <h6 id="vigencia" class="text-muted" style="text-align: center;font-size: 18px;line-height: 20px;font-weight: 600;color: #73879C;
                font-family: 'Helvetica Neue', Roboto, Arial, 'Droid Sans', sans-serif;">
        </h6>
      </div>
     
      <div class="col-md-3 shadow-sm mb-1 p-3 mt-2 bg-white rounded ">
        <div class="card border-light shadow-sm p-3  bg-white rounded" style="width: auto;height: 460px;">
          <h5 style=" width: 100%; height: 50px;text-align: center;font-size: 30px;line-height: 30px;font-weight: 300;color: #511281;
                      font-family: 'Helvetica Neue', Roboto, Arial, 'Droid Sans', sans-serif;">Obras  </h5>
          <h5  class="row justify-content-center align-items-center minh-100 text-center"
            style=" width: 100%; height: 150px;text-align: center;font-size: 140px;line-height: 20px;font-weight: 600;color: #511281;
                    font-family: 'Helvetica Neue', Roboto, Arial, 'Droid Sans', sans-serif;">  <%= total_obras %>
          </h5>
          <div>
          
            <h5 style=" width: 100%; height: 50px;text-align: center;font-size: 30px;line-height: 130px;font-weight: 300;color: #511281;
                  font-family: 'Helvetica Neue', Roboto, Arial, 'Droid Sans', sans-serif;">Inversión  </h5>
                  <h5 style=" width: 100%; height: 10px;text-align: center;font-size: 26px;line-height: 110px;font-weight: 4  00;color: #511281;
                  font-family: 'Helvetica Neue', Roboto, Arial, 'Droid Sans', sans-serif;"><%= total_inver %>  
                 </h5>
          
          </div>
        </div>
      </div>
 
      <div class="col-md-4 shadow-sm mb-1 p-3 mt-2 bg-white rounded ">
        <div class="card border-light shadow-sm p-3  bg-white rounded">
          <div id="chartdiv" class="row justify-content-center align-items-center minh-100" style="width: 100%;height: 420px;" ></div>
        </div>
      </div>

      <div class="col-md-5 shadow-sm mb-1 p-3 mt-2 bg-white rounded ">
        <div class="card border-light shadow-sm p-3  bg-white rounded">
          <div id="estadomain" style="width: 100%; height: 430px;"> </div>
        </div>
      </div>

      <div class="col-md-6 shadow-sm mb-1 p-3 mt-2 bg-white rounded ">
        <div class="card border-light shadow-sm p-3  bg-white rounded">
          <div id="depobra" style=" width: auto; height: 620px; "></div>
        </div>
      </div>

      <div class="col-md-6 shadow-sm mb-1 p-3 mt-2 bg-white rounded ">
        <div class="row">
          <div class="col-md-8">
            <div   id="tipointervencion" style="width: auto;height: 620px;"></div>
          </div>

          <div class="col-md-4">
            <div class="row justify-content-center align-items-center minh-100 ">
              <div id="chart-tema" style="width: auto;height: 620px;"></div>
            </div>
           </div>
          </div>
      </div>
<!-- 

<div class="col-md-12 shadow-sm mb-1 p-3 mt-2 bg-white rounded">
        <a name="" id="" class="btn btn-info" href="https://public.tableau.com/app/profile/gabriela.planeacion/viz/Control_Privado_Marzo312021/Control_General" 
        target="_blank" role="button">
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-up-right" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5z"/>
          <path fill-rule="evenodd" d="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0v-5z"/>
        </svg>Ampliar Tableau</a>
      </div>

-->
      

    <div class="col-md-6 shadow-sm mb-1 p-3 mt-2 bg-white rounded">
      <div class="card-deck "> 
            <div class="card border-light  shadow-sm p-3 mb-4 bg-white rounded">
              <div class="card-body ">
                  <div id="map1" style=" width: 100%; height: 700px; " ></div>
              </div>
            </div>
         
        </div>
      </div>

      <div class="col-md-6 shadow-sm mb-1 p-3 mt-2 bg-white rounded">
        <div class="card-deck ">
            <div class="card border-light  shadow-sm p-3 mb-4 bg-white rounded">
              <div class="card-body ">
                <div id="geoobra" style=" width: 100%; height: 700px; " ></div>
              </div>
            </div>
            </div>
      </div>
    </div>
  </div>

  <footer>
    <div >
      <% if (user[0].email=='juliomendoza.medellin@gmail.com' || user[0].email=='gabriel.vasco@medellin.gov.co'  ) { %>
        <a class="btn btn-primary" onclick="actualizabd()" role="button"> Actualizar BD</a>
      <% } %>
    </div>
  </footer>
 


<!-- Modal -->
<div class="modal fade" id="obraModal" tabindex="-1" aria-labelledby="obraModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div id="invoiceOFproyect">
      <div class="modal-content">
        <div class="modal-header row justify-content-center align-items-center minh-100 text-center">
          <h5 id="obraModalLabel"  style="text-align: center;font-size: 40px;line-height: 50px;font-weight: 300;color: #511281;
                    font-family: 'Helvetica Neue', Roboto, Arial, 'Droid Sans', sans-serif;">
          </h5>
        
        </div>
       
        <div class="modal-body">
          <div class="row">
            <div class="col-md-12">
              <h5 class="modal-header row justify-content-center align-items-center minh-100 text-center" id="total_ivnersion_dep" 
              style="text-align: center;font-size: 30px;line-height: 30px;font-weight: 300;color: #511281;
              font-family: 'Helvetica Neue', Roboto, Arial, 'Droid Sans', sans-serif;" >
            </h5>
            </div>
            <div class="col-md-12">
              <h2 class="modal-header row justify-content-center align-items-center minh-100 text-center" id="corteOF" 
              style="text-align: center;font-size: 16px;line-height: 30px;font-weight: 200;color: #511281;
              font-family: 'Helvetica Neue', Roboto, Arial, 'Droid Sans', sans-serif;" >
            </h2>
            </div>
            <div class="col-md-6" id="dep-tipo" style="width: auto; height: 300px;"></div>
            <div class="col-md-6" id="dep-alerta" style="width: auto; height: 300px;"></div>
            <div class="col-md-12 mt-2" id="dep-etapa" style="width: auto; height: 300px;"></div>
            <div class="col-md-12 mt-2" id="dep-hito" style="width: auto; height: 300px;"></div>
           <div class="col-md-12 mt-2" id="num-obras-dep-geo" style="width: auto; height: 300px;"></div>
          </div>
        </div>
    
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <!--
          <div class="col-md-2">
            <button class="btn btn-danger btn-sm" id="downloadQproyect"  onclick="dowloadOF()">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
              </svg>
            </button>
          </div>


          -->

        </div>
      </div>

    </div>
   
   
  </div>
</div>

<div class="modal fade" id="obraModalDep" tabindex="-1" aria-labelledby="obraModalDepLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div id="invoiceOFproyect">
      <div class="modal-content">
        <div class="modal-header row justify-content-center align-items-center minh-100 text-center">
          <h5 id="geoModalLabel"  style="text-align: center;font-size: 40px;line-height: 50px;font-weight: 300;color: #511281;
                    font-family: 'Helvetica Neue', Roboto, Arial, 'Droid Sans', sans-serif;">
          </h5>
        </div>
       
        <div class="modal-body">
          <div class="row">
            <div class="col-md-12">
              <h2 class="modal-header row justify-content-center align-items-center minh-100 text-center" id="corteOFcomuna" 
              style="text-align: center;font-size: 24px;line-height: 10px;font-weight: 100;color: #511281;
              font-family: 'Helvetica Neue', Roboto, Arial, 'Droid Sans', sans-serif;" >
            </h2>
            </div>
            <div class="col-md-12" id="dep-geo" style="width: auto; height: 300px;"></div>
            <div class="col-md-6 mt-1" id="geo-alerta" style="width: auto; height: 300px;"></div>
            <div class="col-md-6 mt-1" id="geo-intervencion" style="width: auto; height: 300px;"></div>
          </div>
        </div>
    
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <!--

  <div class="col-md-2">
            <button class="btn btn-danger btn-sm" id="downloadQproyect"  onclick="dowloadOF()">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
              </svg>
            </button>
          </div>

          -->
        
        </div>
      </div>

    </div>
   
   
  </div>
</div>
</body>
  <%- include ('../partials/scriptsHome.html')%>
  <script src="/js/htmltoexcel.js"></script>
  <script src="/js/obraFisica.js"></script>
  <script src="/js/transversal.js" ></script>
  <script src="/js/leaflet.label.js"></script>
  <script src="/js/leaflet.label-src.js"></script>
  <script src="https://www.amcharts.com/lib/3/amcharts.js"></script>
  <script src="https://www.amcharts.com/lib/3/serial.js"></script>
  <script src="https://www.amcharts.com/lib/3/plugins/export/export.min.js"></script>
  <link rel="stylesheet" href="https://www.amcharts.com/lib/3/plugins/export/export.css" type="text/css" media="all" />
  <script type="text/javascript" src="https://www.amcharts.com/lib/3/themes/light.js"></script>
  <script src="https://www.amcharts.com/lib/4/core.js"></script>
  <script src="https://www.amcharts.com/lib/4/charts.js"></script>
  <script src="https://www.amcharts.com/lib/4/themes/animated.js"></script>
  <script src="https://www.amcharts.com/lib/4/themes/material.js"></script>
  <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
  <script src="https://api.tiles.mapbox.com/mapbox.js/v2.1.9/mapbox.js"></script>
  <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js" integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew==" crossorigin=""></script>
  <script type="text/javascript" src="http://maps.stamen.com/js/tile.stamen.js?v1.3.0"></script>

</html>





