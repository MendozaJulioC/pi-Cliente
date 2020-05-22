const { Router} = require('express');
const router = Router();


const { getHome, getCuatrienio,
        getTotalesComuna, getVigencias,
        getComunas,getDependencia,
        getProyectos, getContacto,
        getAlonso , getAnibal, getFico
      } = require('../controllers/index.controllers');


router.get('/', getHome);
router.get('/cuatrienios', [getTotalesComuna, getCuatrienio,]);
router.get('/cuatrienios/alonso', getAlonso);
router.get('/cuatrienios/anibal', getAnibal);
router.get('/cuatrienios/fico', getFico);


router.get('/vigencias',getVigencias);
router.get('/comunas', getComunas);
router.get('/dependencias', getDependencia);
router.get('/proyectos', getProyectos);
router.get('/contacto', getContacto);

//router.get('/cuatrienios/detalle/:cod_comuna', getDetalleComuna)

/** tareas específicas */
const getTotales = require('../controllers/task1');
router.get('/totales', getTotales);






module.exports = router;