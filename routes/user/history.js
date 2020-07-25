const {Router}= require('express');
const controller = require('../../controllers/user/history');
const asyncHandler = require('express-async-handler');
const router = Router();

const ensureLoggedIn=require('../../middlewares/user/ensureLogin');
router.use(ensureLoggedIn);

router.get('/',asyncHandler( (controller.get)));


module.exports = router;