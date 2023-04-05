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
helpers.isAdmin = (req, res, next)=>{
   
    let admin= req.params.admin
    if(admin ==1 || admin==9|| admin==87){return next()}
    else{
        req.flash('error', 'No tienes autorización!!')
        res.redirect('/');
    }
}
module.exports = helpers;
