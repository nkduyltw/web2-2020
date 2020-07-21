const {Router}= require('express');
const Account=require('../services/account');
const asyncHandler = require('express-async-handler');

const router = Router();
router.get('/', asyncHandler(async function (req,res){
    titel = 'Chứng thực tài khoản';
    const data = await Account.findAllNotTrue();
    console.log(data);
    res.render('admin/verifyUser',{titel,data});
}));

module.exports = router;