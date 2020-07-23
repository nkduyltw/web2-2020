const {Router}= require('express');
const controller = require('../../controllers/admin/profileUser');
const asyncHandler = require('express-async-handler');
const ensureLoggedIn=require('../../middlewares/admin/ensureLoggedIn');

const router = Router();
router.use(ensureLoggedIn);

router.get('/',asyncHandler(controller.get));

router.get('/:accountNumber', asyncHandler(controller.get2));

module.exports=router;