const {Router}= require('express');


const router = Router();

const controller = require('../../controllers/user/logout');

router.get('/', controller.get);


module.exports=router;