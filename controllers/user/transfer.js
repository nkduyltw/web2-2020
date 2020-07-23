const Account = require('../../services/account');
const History = require('../../services/transactionHistory');

module.exports.get = (req, res) =>{
    const errors = [];
    const status = null;
    res.render('user/transfer',{ status, errors })
}

module.exports.post =async (req, res) =>{
    var errors = [];
    const curentUser = req.curentUser;
    const {accountNumber, amountOfMoney, content, type} = req.body;
    if(curentUser.accountNumber.trim() == accountNumber.trim()){
        const error = 'M điên à, Sao tự chuyển tiền cho mình thế!' ;
        errors.push(error);
        const status = false;
        res.render('user/transfer',{ status, errors });
    }
    else{
        if(type ==1 ){
        if(amountOfMoney > curentUser.blanceSpendAccountVND){
            const error = 'Số dư không đủ' ;
            errors.push(error);
        }
        const user = await Account.findAcc(accountNumber);
        if(!user || user.token != null || user.status == false){
            const error = 'Số tài khoản hưởng thụ không hợp lệ' ;
            errors.push(error);
        }
        if(errors.lenght > 0){
            const status = false;
            res.render('user/transfer',{ status, errors });
        }
        else{
            curentUser.blanceSpendAccountVND = curentUser.blanceSpendAccountVND - amountOfMoney;
            user.blanceSpendAccountVND =  user.blanceSpendAccountVND + amountOfMoney;
            curentUser.save();
            user.save();
            History.add(curentUser.accountNumber,user.accountNumber, amountOfMoney, 1, content);
            const status = true;
            res.render('user/transfer',{ status, errors });
        }
    }
    if(type == 2){
        if(amountOfMoney > curentUser.blanceSpendAccountDollars){
            const error = 'Số dư không đủ' ;
            errors.push(error);
        }
        const user = await Account.findAcc(accountNumber);
        if(!user || user.token != null || user.status == false){
            const error = 'Số tài khoản hưởng thụ không hợp lệ' ;
            errors.push(error);
        }
        if(errors.lenght > 0){
            const status = false;
            res.render('user/transfer',{ status, errors });
        }
        else{
            curentUser.blanceSpendAccountDollars = curentUser.blanceSpendAccountDollars - amountOfMoney;
            user.blanceSpendAccountDollars =  user.blanceSpendAccountDollars + amountOfMoney;
            curentUser.save();
            user.save();
            History.add(curentUser.accountNumber,user.accountNumber, amountOfMoney, 2, content);
            const status = true;
            res.render('user/transfer',{ status, errors });
        }
    }
    }
    
}