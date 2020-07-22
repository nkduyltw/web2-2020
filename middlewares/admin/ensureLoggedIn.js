module.exports = function enSureLoggedIn(req, res, next){
    if(req.curentAdmin){
        next();
    }
    else{
        res.redirect('/admin/login');
    }
};