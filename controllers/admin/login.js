const Admin = require('../../services/admin');
const Account = require('../../services/account');
const { render } = require('ejs');

module.exports.get = async (req, res) =>{
    const admin = await Admin.findAll();
    if(admin.length == 0){
        Admin.create({
            name : 'admin',
            password : Account.hashPassword('root'),
        });
    }
    const result = [];
    res.render('admin/login', {result});
}


module.exports.post = async (req, res) =>{
   
        const {name, password} = req.body;
        const admin = await Admin.findName(name);
        if(admin){
        if(Admin.verifyPassword(password, admin.password)){
            req.session.name = admin.name;
            res.redirect('/admin/home');
        }
        else{
            const result = false;
            res.render('admin/login', {result});
        }
    }
    else{
        const result = false;
        res.render('admin/login', {result});
    }
   
}