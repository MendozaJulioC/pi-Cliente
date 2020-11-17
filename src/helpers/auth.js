const helpers ={};


helpers.isAuthenticated=(req,res, next)=>{
    if (req.isAuthenticated()) {
       
        return next();

    } 
    req.flash('error', 'No tienes autorización')
    res.redirect('/');
}

helpers.notAuthenticated =(req,res,next)=>{
    if (req.isAuthenticated()) {
     
        res.redirect('/dash');
      
    }
    return next();
 
}
module.exports = helpers;
