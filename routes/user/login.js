const {Router}= require('express');
const controller = require('../../controllers/user/login');
const asyncHandler = require('express-async-handler');
const router = Router();



router.get('/',asyncHandler( (controller.get)));
router.get('/:accountNumber/:token',asyncHandler( (controller.getByEmail)));

router.post('/', asyncHandler(controller.post));

module.exports = router;