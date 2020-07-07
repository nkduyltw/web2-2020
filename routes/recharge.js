const {Router}= require('express');
const Account=require('../services/account');
const History=require('../services/transactionHistory');
const asyncHandler = require('express-async-handler');
const router = Router();

var status=true;

router.get('/', function getLogin(req,res){
    res.render('recharge');
});

router.post('/', asyncHandler(async function (req,res){
    const account = await Account.findAcc(req.body.accountNumber);
    const amountOfMoney = BigInt(req.body.amountOfMoney);
    if(!account){
        res.redirect('/');
    }
    else{
        var result = await account.recharge(amountOfMoney); 
        console.log(result);
        if(result){
            await History.add(account.accountNumber,amountOfMoney);
            res.redirect('/recharge');
        }
        else{
            res.redirect('/recharge');
        }
    }
}));
module.exports = router;