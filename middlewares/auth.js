const Account = require('../services/account');
asyncHandler = require('express-async-handler');
module.exports = asyncHandler( async function auth(req, res, next) {
    const accountNumber = req.session.accountNumber;
    res.locals.curentAdmin = null; 
    if( !accountNumber ){
        return next();
    }
    else{
        const user = await Account.findAcc(accountNumber);
        req.curentUser = user;
        req.type = 2;
        res.locals.curentUser = admin;
        res.locals.type = 2;
        next();
    }
});