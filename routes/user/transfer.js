const {Router}= require('express');
const controller = require('../../controllers/user/transfer');

const ensureLoggedIn=require('../../middlewares/user/ensureLogin');
const asyncHandler = require('express-async-handler');
const router = Router();

router.use(ensureLoggedIn);

router.get('/',asyncHandler( (controller.get)));
router.post('/', asyncHandler(controller.post));

module.exports = router;