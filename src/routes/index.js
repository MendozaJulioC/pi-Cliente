const { Router} = require('express');
const router = Router();


const { getHome,getDash,
    
    
        getCuatrienio, getTotalesComuna, getVigencias,getComunas,
        getProyectos, getContacto, getAlonso, getAnibal, 
        getFico, getTotalAlonso, getTotalAnibal, getTotalFico


    } = require('../controllers/index.controllers');
const {getDependencia}= require('../controllers/taskTools');


// en términos de cutarienio
router.get('/', getHome);
router.get('/cuatrienios', [getTotalesComuna, getCuatrienio]);
router.get('/cuatrienios/alonso', [getTotalAlonso,getAlonso]);
router.get('/cuatrienios/anibal', [getTotalAnibal, getAnibal]);
router.get('/cuatrienios/fico', [getTotalFico,getFico]);

// en términos de vigencias
router.get('/vigencias',getVigencias);
// en términos de comunas
router.get('/comunas', getComunas);
//en términos de depedencias
router.get('/dependencias', getDependencia);
//en términos de proyectos
router.get('/proyectos', getProyectos);
//otras opciones


router.get('/contacto', getContacto); 


router.get('/dash', getDash)




//router.get('/cuatrienios/detalle/:cod_comuna', getDetalleComuna)
/** tareas específicas */
const getTotales = require('../controllers/task1');
router.get('/totales', getTotales);






module.exports = router;