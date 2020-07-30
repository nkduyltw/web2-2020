const Admin = require('../../services/admin');
const Account = require('../../services/account');
const { render } = require('ejs');

module.exports.get = async (req, res) =>{
    const admin = await Admin.findAll();
    console.log(admin)
    if(admin.length == 0){
        Admin.create({
            name : 'admin',
            password : Account.hashPassword('root'),
        });
    }
    const result = true;
    res.render('admin/login', {result});
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
        else{
            const result = false;
            res.render('admin/login', {result});
        }
    }
    
   
}