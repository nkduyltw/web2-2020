const { Router } = require('express');
const controller = require('../../controllers/user/otp');
const asyncHandler = require('express-async-handler');
const router = Router();

const ensureLoggedIn = require('../../middlewares/user/ensureLogin');
router.use(ensureLoggedIn);

router.get('/', controller.get);
router.post('/', asyncHandler(controller.post));

module.exports = router;