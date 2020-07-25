const Admin = require('../../services/admin');
const { render } = require('ejs');

module.exports.get = (req, res) =>{
    res.render('admin/login');
}


module.exports.post = async (req, res) =>{
    const {name, password} = req.body;
    const admin = await Admin.findName(name);
    if(name){
        if(Admin.verifyPassword(password, admin.password)){
            delete req.session.name;
            req.session.name = admin.name;
            res.redirect('/admin/home');
        }
    }
}