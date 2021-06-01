const { GoogleSpreadsheet } =  require('google-spreadsheet');
const keys = require ('../keys/appReportActivitykeys.json');
let googleId = process.env.ikeypass;

async function getGoogleSheet(){
    const documento = new GoogleSpreadsheet(googleId);
    await documento.useServiceAccountAuth(keys);
    await documento.loadInfo();
    const sheet     = documento.sheetsByIndex[0];
    const reports   = await sheet.getRows();
    //console.log(reports); 
    //console.log(reports[0].lider); 
    return reports;
}

async function getGoogleSheetObrasDep(){
    const documento = new GoogleSpreadsheet(googleId);
    await documento.useServiceAccountAuth(keys);
    await documento.loadInfo();
    const sheetDependencias     = documento.sheetsByIndex[1];
    const dependencias   = await sheetDependencias.getRows();
    let total_dependencias=[];

    for (let x=0; x < dependencias.length; x++){
       
            total_dependencias.push({
                "cod_dependencia": dependencias[x].cod_dependencia,
                "nom_dependencia": dependencias[x].nom_dependencia,
                "total_obras": dependencias[x].total_obras,
                "obra_ejecutada": dependencias[x].obra_ejecutada,
                "otras_etapas": dependencias[x].otras_etapas
            })
       
    }
    return  total_dependencias;
}

async function qReportDepModal(dep){
    try {
        const documento = new GoogleSpreadsheet(googleId);
        await documento.useServiceAccountAuth(keys);
        await documento.loadInfo();
        const sheet     = documento.sheetsByIndex[0];
        const reports   = await sheet.getRows();
        let datos=[]
    // console.log('spread fecha: ',fecha);
        for(let x=0; x<reports.length; x++){
            if(reports[x].cod_dep== dep){
                //  console.log(reports[x].fecha_inicio);
                //  console.log((reports[x].fecha_inicio));
                datos.push({
                    "cod_dep" : reports[x].cod_dep,
                    "dependencia": reports[x].dependencia,
                    "cod_conjunto": reports[x].cod_conjunto,
                    "cod_intervencion": reports[x].cod_intervencion,
                    "tipo_intervencion": reports[x].tipo_intervencion,
                    "val_total_acumulado": reports[x].valor_total_acumulado,
                    "cod_etapa": reports[x].cod_etapa,
                    "etapa":reports[x].etapa,
                    "cod_alerta": reports[x].cod_alerta,
                    "alerta": reports[x].alerta,
                    "cod_tematica": reports[x].cod_tematica,
                    "tematica": reports[x].tematica
                })
            }
        }
        //console.log(datos);
        return datos;
    } catch (error) {
        console.log("Error qReportDepModal: ", error);
    }
}

async function qReporHitotDepModal(dep){
    try {
        const documento = new GoogleSpreadsheet(googleId);
        await documento.useServiceAccountAuth(keys);
        await documento.loadInfo();
        const sheet     = documento.sheetsByIndex[0];
        const detalledep   = await sheet.getRows();
        let hitos=[]
        let hito0=0, hito1=0, hito2=0, hito3=0,hito4=0,hito5=0,hito6=0,hito7=0, hito8=0,
            hito9=0,hito10=0,hito11=0,hito12=0,hito13=0,hito14=0,hito15=0,hito16=0,hito17=0,
            hito18=0,hito19=0,hito20=0,hito21=0,hito22=0,hito23=0,hito24=0,hito25=0,hito26=0,hito27=0,hito28=0,
            hito29=0,hito30=0,hito31=0,hito32=0,hito33=0;

        for(let index=0; index<reports.length; index++){
            if(reports[index].cod_dep== dep){
                if(detalledep[index].cod_hito=='0')  {hito0+=1}
                if(detalledep[index].cod_hito=='1')  {hito1+=1}
                if(detalledep[index].cod_hito=='2')  {hito2+=1}
                if(detalledep[index].cod_hito=='3')  {hito3+=1}
                if(detalledep[index].cod_hito=='4')  {hito4+=1}
                if(detalledep[index].cod_hito=='5')  {hito5+=1}
                if(detalledep[index].cod_hito=='6')  {hito6+=1}
                if(detalledep[index].cod_hito=='7')  {hito7+=1}
                if(detalledep[index].cod_hito=='8')  {hito8+=1}
                if(detalledep[index].cod_hito=='9')  {hito9+=1}
                if(detalledep[index].cod_hito=='10')  {hito10+=1}
                if(detalledep[index].cod_hito=='11')  {hito11+=1}
                if(detalledep[index].cod_hito=='12')  {hito12+=1}
                if(detalledep[index].cod_hito=='13')  {hito13+=1}
                if(detalledep[index].cod_hito=='14')  {hito14+=1}
                if(detalledep[index].cod_hito=='15')  {hito15+=1}
                if(detalledep[index].cod_hito=='16')  {hito16+=1}
                if(detalledep[index].cod_hito=='17')  {hito17+=1}
                if(detalledep[index].cod_hito=='18')  {hito18+=1}
                if(detalledep[index].cod_hito=='19')  {hito19+=1}
                if(detalledep[index].cod_hito=='20')  {hito20+=1}
                if(detalledep[index].cod_hito=='21')  {hito21+=1}
                if(detalledep[index].cod_hito=='22')  {hito22+=1}
                if(detalledep[index].cod_hito=='23')  {hito23+=1}
                if(detalledep[index].cod_hito=='24')  {hito24+=1}
                if(detalledep[index].cod_hito=='25')  {hito25+=1}
                if(detalledep[index].cod_hito=='26')  {hito26+=1}
                if(detalledep[index].cod_hito=='27')  {hito27+=1}
                if(detalledep[index].cod_hito=='28')  {hito28+=1}
                if(detalledep[index].cod_hito=='29')  {hito29+=1}
                if(detalledep[index].cod_hito=='30')  {hito30+=1}
                if(detalledep[index].cod_hito=='31')  {hito31+=1}
                if(detalledep[index].cod_hito=='32')  {hito32+=1}
                if(detalledep[index].cod_hito=='33')  {hito33+=1}
            }
        }
       // if(hito0>0){ hitos.push(  {"label": 'NA',     "value": hito0})}
        if(hito1>0){  hitos.push(  {"label": 'Centro ', "value": hito1})}
        if(hito2>0){  hitos.push(  {"label": 'Proyectos viales ',"value": hito2})}
        if(hito3>0){  hitos.push(  {"label": 'Parques', "value": hito3})}
        if(hito4>0){  hitos.push(  {"label": 'Ciclo rutas', "value": hito4})}
        if(hito5>0){  hitos.push(  {"label": 'Parques del rio', "value": hito5})}
        if(hito6>0){  hitos.push(  {"label": 'Corredor metro 80', "value": hito6})}
        if(hito7>0){  hitos.push(  {"label": 'PUI centro oriental', "value": hito7})}
        if(hito8>0){  hitos.push(  {"label": 'PUI comuna 13', "value": hito8})}
        if(hito9>0){  hitos.push(  {"label": 'PUI nor occidental',"value": hito9})}
        if(hito10>0){ hitos.push(  {"label": 'PUI iguana',"value": hito10})}
        if(hito11>0){ hitos.push(  {"label": 'Fonmalved',"value": hito11})}
        if(hito12>0){ hitos.push(  {"label": 'Andenes',"value": hito12})}
        if(hito13>0){ hitos.push(  {"label": 'Corredores verdes',"value": hito13})}
        if(hito14>0){ hitos.push(  {"label": 'Malla vial', "value": hito14})}
        if(hito15>0){ hitos.push(  {"label": 'Estabilizaciones', "value": hito15})}
        if(hito16>0){ hitos.push(  {"label": 'Plan vial rural', "value": hito16})}
        if(hito17>0){ hitos.push(  {"label": 'Puentes',"value": hito17})}
        if(hito18>0){ hitos.push(  {"label": 'JVE',"value": hito18})}
        if(hito19>0){ hitos.push(  {"label": 'PP',"value": hito19})}
       // if(hito20>0){ hitos.push(  {"label": 'Proyectos viales ',     "value": hito20})}
        if(hito21>0){ hitos.push(  {"label": 'CERROS',"value": hito21})}
        if(hito22>0){ hitos.push(  {"label": 'Subdirección de gestión Inmobiliaria',"value": hito22})}
        if(hito23>0){ hitos.push(  {"label": 'APP',"value": hito23})}
        if(hito24>0){ hitos.push(  {"label": 'Subdirección de gestión del paisaje y el patrimonio',"value": hito24})}
        if(hito25>0){ hitos.push(  {"label": 'Subdirección de gestion de APP',"value": hito25})}
        if(hito26>0){ hitos.push(  {"label": 'H11',"value": hito26})}
        if(hito27>0){ hitos.push(  {"label": 'UNIDOS POR EL AGUA',"value": hito27})}
        if(hito28>0){ hitos.push(  {"label": 'Salud',"value": hito28})}
        if(hito29>0){ hitos.push(  {"label": 'Centro-Ciclo rutas',"value": hito29})}
        if(hito30>0){ hitos.push(  {"label": 'SIT',"value": hito30})}
        if(hito31>0){ hitos.push(  {"label": 'Infraestructura verde',"value": hito31})}
        if(hito32>0){ hitos.push(  {"label": 'Lusitania',"value": hito32})}
        if(hito33>0){ hitos.push(  {"label": 'B_E',"value": hito33})}
        return hitos;
    } catch (error) {
        console.log("Error qReporHitotDepModal: ", error);
    }
}

async function geo_obras(){
    const documento = new GoogleSpreadsheet(googleId);
    await documento.useServiceAccountAuth(keys);
    await documento.loadInfo();
    const sheetTerritorio     = documento.sheetsByIndex[0];
    const territorios   = await sheetTerritorio.getRows();
    //console.log(territorios);
    let territorio=[];
    let comuna1=0, comuna2=0, comuna3=0,comuna4=0,comuna5=0,comuna6=0,comuna7=0, comuna8=0,
    comuna9=0,comuna10=0,comuna11=0,comuna12=0,comuna13=0,comuna14=0,comuna15=0,comuna16=0,comuna50=0,
    comuna60=0,comuna70=0,comuna80=0,comuna90=0;
    for (let index=0; index < territorios.length; index++){
        if(territorios[index].cod_comuna=='1'){comuna1+=1}
        if(territorios[index].cod_comuna=='2'){comuna2+=1}
        if(territorios[index].cod_comuna=='3'){comuna3+=1}
        if(territorios[index].cod_comuna=='4'){comuna4+=1}
        if(territorios[index].cod_comuna=='5'){comuna5+=1}
        if(territorios[index].cod_comuna=='6'){comuna6+=1}
        if(territorios[index].cod_comuna=='7'){comuna7+=1}
        if(territorios[index].cod_comuna=='8'){comuna8+=1}
        if(territorios[index].cod_comuna=='9'){comuna9+=1}
        if(territorios[index].cod_comuna=='10'){comuna10+=1}
        if(territorios[index].cod_comuna=='11'){comuna11+=1}
        if(territorios[index].cod_comuna=='12'){comuna12+=1}
        if(territorios[index].cod_comuna=='13'){comuna13+=1}
        if(territorios[index].cod_comuna=='14'){comuna14+=1}
        if(territorios[index].cod_comuna=='15'){comuna15+=1}
        if(territorios[index].cod_comuna=='16'){comuna16+=1}
        if(territorios[index].cod_comuna=='50'){comuna50+=1}
        if(territorios[index].cod_comuna=='60'){comuna60+=1}
        if(territorios[index].cod_comuna=='70'){comuna70+=1}
        if(territorios[index].cod_comuna=='80'){comuna80+=1}
        if(territorios[index].cod_comuna=='90'){comuna90+=1}
    }

    
       if(comuna1>0){  territorio.push(  {"label": 'Popular', "value": comuna1})}
       if(comuna2>0){  territorio.push(  {"label": 'Santa Cruz', "value": comuna2})}
       if(comuna3>0){  territorio.push(  {"label": 'Manrique', "value": comuna3})}
       if(comuna4>0){  territorio.push(  {"label": 'Aranjuez', "value": comuna4})}
       if(comuna5>0){  territorio.push(  {"label": 'Castilla', "value": comuna5})}
       if(comuna6>0){  territorio.push(  {"label": 'Doce de Octubre', "value": comuna6})}
       if(comuna7>0){  territorio.push(  {"label": 'Robledo', "value": comuna7})}
       if(comuna8>0){  territorio.push(  {"label": 'Villa Hermosa', "value": comuna8})}
       if(comuna9>0){  territorio.push(  {"label": 'Buenos Aires', "value": comuna9})}
       if(comuna10>0){  territorio.push(  {"label": 'La Candelaria', "value": comuna10})}
       if(comuna11>0){  territorio.push(  {"label": 'Laureles-Estadio', "value": comuna11})}
       if(comuna12>0){  territorio.push(  {"label": 'La América', "value": comuna12})}
       if(comuna13>0){  territorio.push(  {"label": 'San Javier', "value": comuna13})}
       if(comuna14>0){  territorio.push(  {"label": 'El Poblado', "value": comuna14})}
       if(comuna15>0){  territorio.push(  {"label": 'Guayabal', "value": comuna15})} 
       if(comuna16>0){  territorio.push(  {"label": 'Belén', "value": comuna16})}
       if(comuna50>0){  territorio.push(  {"label": 'Palmitas', "value": comuna50})}
       if(comuna60>0){  territorio.push(  {"label": 'San Cristóbal', "value": comuna60})}
       if(comuna70>0){  territorio.push(  {"label": 'Altavista', "value": comuna70})}
       if(comuna80>0){  territorio.push(  {"label": 'San Antonio', "value": comuna80})}
       if(comuna90>0){  territorio.push(  {"label": 'Santa Elena', "value": comuna90})}
  
       

    return  territorio;
}


module.exports = {
    getGoogleSheet          : getGoogleSheet,
    qReportDepModal         : qReportDepModal,
    getGoogleSheetObrasDep  : getGoogleSheetObrasDep,
    qReporHitotDepModal     : qReporHitotDepModal,
    geo_obras : geo_obras
    
}