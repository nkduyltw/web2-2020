module.exports.get = (req, res) =>{
    delete req.session.name;
    res.redirect('/admin/login');
}