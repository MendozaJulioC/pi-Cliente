const { Router} = require('express');
const router = Router();


const { getHome,getDash,getGeneral,getContacto, getIndicador, getEstructura} = require('../controllers/index.controllers');
    router.get('/', getHome);
    router.get('/dash', getDash)
    router.get('/general', getGeneral)
    router.get('/contacto', getContacto); 
    router.get('/indicadores', getIndicador)
    router.get('/estructura', getEstructura)

  
const {getLinea1, getLinea2, getLinea3, getLinea4, getLinea5}= require('../controllers/taskL');
router.get('/linea-1',getLinea1)
    .get('/linea-2',getLinea2)
    .get('/linea-3', getLinea3)
    .get('/linea-4', getLinea4)
    .get('/linea-5', getLinea5)



module.exports = router;