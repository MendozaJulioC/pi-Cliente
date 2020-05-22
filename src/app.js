const express = require('express');
const cors = require('cors');


const favicon = require('serve-favicon');
const path = require('path');



//settings
const app = express();
app.set('port',process.env.port||5000)
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

//static Files
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs' );
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//middlewares




module.exports =app;
