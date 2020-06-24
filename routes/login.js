const {Router}= require('express');
const Account=require('../services/account');
const asyncHandler = require('express-async-handler');
const router = Router();

var status=true;

router.get('/', function getLogin(req,res){
    res.render('login',{status : status});
});

router.post('/', asyncHandler(async function (req,res){
    const accountNumber = req.body.accountNumber;
    const password = req.body.password;

    const Acc = await Account.findAcc(accountNumber);

    

    if(!Acc){
        status=false;
        res.render('login',{status : status});
        status=true;
    }
    else{
        if(Acc.password == password){
            res.redirect('/');
        }
        else{
            status=false;
            res.render('login',{status : status});
            status=true;
        }
    }
}));
module.exports = router;