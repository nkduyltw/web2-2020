Account = require('../../services/account')

module.exports.get = async (req, res) =>{
    const data = await Account.findAllNotTrue();
    res.render('admin/verifyUser',{data});
}


module.exports.mashStatusTrue = async (req, res) =>{
    const {id} = req.params;
    const user = await Account.findById(id);
    if(user && user.status == false){
        user.status = true;
        user.save();
    }
    res.redirect('/admin/verifyUser');
}