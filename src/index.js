require('dotenv').config();
const app = require('./app');
const morgan = require ('morgan');
//middlewares
app.use(morgan('dev'));
//routes
app.use(require('./routes/index'));
app.use(require('./controllers/task1'));
//star server
app.listen(app.get('port'),()=>{
    console.log ('Server Port', app.get('port'));
})