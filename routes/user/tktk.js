const { Router } = require('express');
const controller = require('../../controllers/user/tktk');
const asyncHandler = require('express-async-handler');
const router = Router();

const ensureLoggedIn = require('../../middlewares/user/ensureLogin');
router.use(ensureLoggedIn);

router.get('/', asyncHandler(controller.get));
router.get('/:TKTKCode', asyncHandler(controller.doneTKTK));
router.post('/', asyncHandler(controller.post) );


module.exports = router;