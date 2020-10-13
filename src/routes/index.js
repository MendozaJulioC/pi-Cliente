const { Router} = require('express');
const router = Router();


const { getHome,getDash,getGeneral,getContacto, getIndicador, getEstructura} = require('../controllers/index.controllers');
    router.get('/', getHome);
    router.get('/dash', getDash)
    router.get('/general', getGeneral)
    router.get('/contacto', getContacto); 
    router.get('/indicadores', getIndicador)
    router.get('/estructura', getEstructura)

  
const {getLinea1,  getLinea2, getLinea3, getLinea4, getLinea5}= require('../controllers/taskL');
router.get('/linea-1',getLinea1)
    .get('/linea-2',getLinea2)
    .get('/linea-3', getLinea3)
    .get('/linea-4', getLinea4)
    .get('/linea-5', getLinea5)



const { getProjects, getProject1, 
        getProject2, getProject3,getProject4,getProject5,getProject6,
        getProject7,getProject8,getProject9,getProject10,getProject11,
        getProject12,getProject13,getProject14,getProject15,getProject16,getProject17,
} =require('../controllers/taskProjects');

router.get('/projects', getProjects)
router.get('/projects/estrategico/pe_1',getProject1)
    .get('/projects/estrategico/pe_2',getProject2)
    .get('/projects/estrategico/pe_3',getProject3)
    .get('/projects/estrategico/pe_4',getProject4)
    .get('/projects/estrategico/pe_5',getProject5)
    .get('/projects/estrategico/pe_6',getProject6)
    .get('/projects/estrategico/pe_7',getProject7)
    .get('/projects/estrategico/pe_8',getProject8)
    .get('/projects/estrategico/pe_9',getProject9)
    .get('/projects/estrategico/pe_10',getProject10)
    .get('/projects/estrategico/pe_11',getProject11)
    .get('/projects/estrategico/pe_12',getProject12)
    .get('/projects/estrategico/pe_13',getProject13)
    .get('/projects/estrategico/pe_14',getProject14)
    .get('/projects/estrategico/pe_15',getProject15)
    .get('/projects/estrategico/pe_16',getProject16)
    .get('/projects/estrategico/pe_17',getProject17);




module.exports = router;