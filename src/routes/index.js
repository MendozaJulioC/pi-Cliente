const { Router} = require('express');
const router = Router();


const { getHome,getDash,getGeneral,getContacto} = require('../controllers/index.controllers');

    router.get('/', getHome);
    router.get('/dash', getDash)
    router.get('/general', getGeneral)
    router.get('/contacto', getContacto); 
    






module.exports = router;