const {Router}= require('express');


const router = Router();

const controller = require('../../controllers/admin/logout');

router.get('/', controller.get);


module.exports=router;