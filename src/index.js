require('dotenv').config();
const app = require('./app');
const morgan = require ('morgan');
//middlewares
//app.set('port',process.env.PORT)
app.use(morgan('dev'));
//routes
app.use(require('./routes/index'));
//app.use(require('./controllers/task1'));
//star server

app.listen((process.env.AWS_PORT || 7500), function(){ console.log(`listening on * : ${process.env.AWS_PORT}`); }); 