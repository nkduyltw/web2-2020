const Accounts = require('../../services/account');
const Sequelize = require('sequelize');
const { text } = require('body-parser');
const Op = Sequelize.Op;

var user ;
module.exports.get =(req, res) => {
    user = null;
    const error = null;
    res.render('admin/profileUser',{user, error});
}
module.exports.get2 = async(req, res) =>{
    const {accountNumber} = req.params;
    user = null;
    const error = null;
    user = await Accounts.findAcc(accountNumber);
    res.render('admin/profileUser',{user, error});
}
module.exports.post = async(req, res) => {
    const {accountNumber, identityCard, phoneNumber, email, address, status} = req.body;
    const user = await Accounts.findAcc(accountNumber);
    let list = await Accounts.findAll({
        where:{
            [Op.or]:[
                {identityCard},
                {phoneNumber},
                {email}
            ]
        }
    });
    var error = [];
    list.forEach(item => {
        if(item.accountNumber.trim() != user.accountNumber.trim()){
            if(item.identityCard.trim() == identityCard )
            {
                error.push('CMND/CCCD đã được người khác đăng kí');
            }
            if(item.phoneNumber.trim() == user.phoneNumber.trim())
            {
                error.push('Số điện thoại đã được người khác đăng kí');
            }
            if(item.email.trim() == user.email.trim())
            {
                error.push('Email đã được người khác đăng kí');
            }
        }
    });
    if(error.length > 0){
        res.render('admin/profileUser',{user, error});
    }
    else{
        user.identityCard = identityCard.trim();
        user.phoneNumber = phoneNumber.trim();
        user.email = email.trim();
        user.address = address;
        if(status){
            user.status = true;
        }
        else{
            user.status = false;
        }
        user.save();
        res.redirect(`/admin/profileUser/${user.accountNumber}`);
    }
}