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

app.listen((process.env.PORT || 7500), function(){ console.log(`listening on * : ${process.env.PORT}`); }); 