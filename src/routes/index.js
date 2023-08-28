const { Router} = require('express');
const router = Router();

const { isAuthenticated, notAuthenticated, isAdmin }= require('../helpers/auth');

const { getHome,getDash,getGeneral,getContacto, getIndicador, getEstructura, 
    getComponente, getPrograma, getAlertas, getSiem , getAlertasPA, getPlanAccion, getAlertPP} = require('../controllers/index.controllers');
    router.get('/',notAuthenticated, getHome);
    router.get('/dash',isAuthenticated, getDash)
    router.get('/general', isAuthenticated,getGeneral)
    router.get('/contacto', getContacto); 
    router.get('/indicadores',isAuthenticated, getIndicador)
    router.get('/estructura', isAuthenticated,getEstructura)
    router.get('/componentes',isAuthenticated,getComponente)
    router.get('/programas', isAuthenticated,getPrograma)
    router.get('/alertas', isAuthenticated,getAlertas)
    router.get('/alertas-pa', isAuthenticated,getAlertasPA)
    router.get('/indicadores/siem', isAuthenticated,getSiem)
    router.get('/plan_a', isAuthenticated,getPlanAccion)
    .get('/alert/pp', isAuthenticated,getAlertPP)

  
const {getLinea1,  getLinea2, getLinea3, getLinea4, getLinea5}= require('../controllers/taskL');
router.get('/linea-1',isAuthenticated,getLinea1)
    .get('/linea-2',isAuthenticated,getLinea2)
    .get('/linea-3', isAuthenticated,getLinea3)
    .get('/linea-4', isAuthenticated,getLinea4)
    .get('/linea-5', isAuthenticated,getLinea5)


const { getTerritorio }= require('../controllers/taskTerritorio'); 
router.get('/territorio', isAuthenticated, getTerritorio)

const { getProjects, getProject1, 
        getProject2, getProject3,getProject4,getProject5,getProject6,
        getProject7,getProject8,getProject9,getProject10,getProject11,
        getProject12,getProject13,getProject14,getProject15,getProject16,getProject17,getProjectEspecial,
        getEspecialIndicadores

} =require('../controllers/taskProjects');


router.get('/projects', getProjects)
router.get('/projects/estrategico/pe_1',isAuthenticated,getProject1)
    .get('/projects/estrategico/pe_2',isAuthenticated,getProject2)
    .get('/projects/estrategico/pe_3',isAuthenticated,getProject3)
    .get('/projects/estrategico/pe_4',isAuthenticated,getProject4)
    .get('/projects/estrategico/pe_5',isAuthenticated,getProject5)
    .get('/projects/estrategico/pe_6',isAuthenticated,getProject6)
    .get('/projects/estrategico/pe_7',isAuthenticated,getProject7)
    .get('/projects/estrategico/pe_8',isAuthenticated,getProject8)
    .get('/projects/estrategico/pe_9',isAuthenticated,getProject9)
    .get('/projects/estrategico/pe_10',isAuthenticated,getProject10)
    .get('/projects/estrategico/pe_11',isAuthenticated,getProject11)
    .get('/projects/estrategico/pe_12',isAuthenticated,getProject12)
    .get('/projects/estrategico/pe_13',isAuthenticated,getProject13)
    .get('/projects/estrategico/pe_14',isAuthenticated,getProject14)
    .get('/projects/estrategico/pe_15',isAuthenticated,getProject15)
    .get('/projects/estrategico/pe_16',isAuthenticated,getProject16)
    .get('/projects/estrategico/pe_17',isAuthenticated,getProject17)

    .get('/especial/seguimiento/proyectos', isAuthenticated,getProjectEspecial)
    .get('/especial/seguimiento/indicadores', isAuthenticated,getEspecialIndicadores)

const {getRegister, postRegister, postLoguin, getLogout, getAdminUsuarios, deleteAdminUser, editAdminUser, putEditUsuario} = require ('../controllers/auth.controllers')
router.get('/auth/register', getRegister)
        .post('/auth/register',postRegister)



router.post('/auth/login',notAuthenticated,postLoguin)
router.get('/auth/logout', getLogout)

router.get('/auth/administrador/:admin',isAuthenticated, isAdmin,  getAdminUsuarios )

router.get(`/api/auth/admin/:admin/gestion/borrar/:user`,isAdmin,  deleteAdminUser)
router.get(`/api/auth/actualizar/:admin/register/:user/`, editAdminUser)


router.post('/auth/register/edit',  putEditUsuario)




const {getDependencias} = require ('../controllers/taskDependencias')
router.get('/dependencias',isAuthenticated, getDependencias)
      
const {getObras, getAlertaObra, getObraTema,getObraTipo, getObraEtapas, getObraDep, getObraDepDetalle, getObrasGeo } = require ('../controllers/taskObrafisica')
router.get('/obra-fisica',isAuthenticated, getObras )
router.get('/obra-fisica/alerta',isAuthenticated,getAlertaObra)
router.get('/obra-fisica/temas', isAuthenticated, getObraTema)
router.get('/obra-fisica/tipo', isAuthenticated, getObraTipo)
router.get('/obra-fisica/etapa', isAuthenticated, getObraEtapas)
router.get('/obra-fisica/dep', isAuthenticated, getObraDep)
router.get('/obra-fisica/dep/detalle/:cod_dep', isAuthenticated, getObraDepDetalle)
router.get('/obra-fisica/geo', isAuthenticated, getObrasGeo)

const {getGeneralPI, getGeneralPI_Lineas} = require('../controllers/taskPiGoogle')
router.get('/pi/google',isAuthenticated, getGeneralPI)
router.get('/pi/google/lineas',isAuthenticated, getGeneralPI_Lineas)




router.get('*', function (req, res) {res.render('./partials/lost.html', {title: "Perdido"})})
router.post('*', function (req, res) {res.render('./partials/lost.html', {title: "Perdido"})})


        

module.exports = router;