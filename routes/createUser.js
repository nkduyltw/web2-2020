const {Router}= require('express');
const Account=require('../services/account');
const asyncHandler = require('express-async-handler');
const cryptoRandomString = require('crypto-random-string');

const router = Router();

var status='';

var status='';
var identityCard='';
var name='';
var phoneNumber='';
var dateOfBirth=null;
var email='';
var address ='';

router.get('/', function getLogin(req,res){
    res.render('createUser',{status,identityCard,name,address,email,phoneNumber,dateOfBirth});
});

router.post('/', asyncHandler(async function (req,res){
     identityCard = req.body.identityCard;
     name = req.body.name;
     email = req.body.email;
     phoneNumber = req.body.phoneNumber;
     dateOfBirth = req.body.dateOfBirth;
     address = req.body.address;
    
    var userTest = await Account.findAccByIdentityCard(identityCard);
    if(userTest){
        status = 'CNDD / CCCD đã được đăng kí!'
        res.render('createUser',{status,identityCard,name,address,email,phoneNumber,dateOfBirth});
        return;
    }
    userTest = null;
    userTest = await Account.findAccByEmail(email);
    if(userTest){
        status = 'Email đã được đăng kí!'
        res.render('createUser',{status,identityCard,name,address,email,phoneNumber,dateOfBirth});
        return;
    }
    userTest = null;
    userTest = await Account.findAccByPhoneNumber(phoneNumber);
    if(userTest){
        status = 'Số điện thoại đã được đăng kí!'
        res.render('createUser',{status,identityCard,name,address,email,phoneNumber,dateOfBirth});
        return;
    }
    const password = Account.hashPassword(identityCard);
    var accountNumber;
    var temp;
    while(true){
        accountNumber = cryptoRandomString({length: 12, type: 'numeric'});
        temp = await Account.findAcc(accountNumber);
        if(!temp){
            break;
        }
    }
    const user = Account.create({
        accountNumber,
        identityCard,
        phoneNumber,
        email,
        name,
        dateOfBirth,
        address,
        password,
        balance : 50000,
    });
    status = ''
    res.render('createUser',{status,identityCard,name,address,email,phoneNumber,dateOfBirth});
}));
module.exports = router;