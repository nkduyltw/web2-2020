const {Router}= require('express');
const controller = require('../../controllers/user/home');
const asyncHandler = require('express-async-handler');
const ensureLoggedIn=require('../../middlewares/user/ensureLogin');

const router = Router();
router.use(ensureLoggedIn);

router.get('/',asyncHandler(controller.get));


module.exports=router;