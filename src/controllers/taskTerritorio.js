const express = require('express');
const app = express();
const fetch = require('node-fetch');

const getTerritorio = async (req, res) => {
    try {
       //const message = req.session.msg; delete req.session.msg;
   const message = req.flash('message')[0]  ;
   //console.log(message)
        res.render('./vigencias/vigencia.html', {
            title: "Territorios-PDM",
            message
        })
    } catch (e) {
        console.error('Error getTerritorio ', e);
    }
}



module.exports = { getTerritorio }
