const express = require('express');
const app = express();
const fetch = require('node-fetch');

const getTerritorio = async (req, res) => {
    try {
       //const message = req.session.msg; delete req.session.msg;
        //const url = 'http://localhost:7000/geo/api/logros'
        //fetch(url)
       //.then(res=>res.json())
       //.then(data=>{
            //console.log(data.data);
            const message = req.flash('message')[0]  ;
            res.render('./territorios/territorio.html', {
                title: "Territorios-PDM",
             //   data: data.data,
                message
            })
        //})
       } catch (e) {
        console.error('Error getTerritorio ', e);
    }
}



module.exports = { getTerritorio }
