const { Router } = require('express');
const controller = require('../../controllers/user/changepassword');
const asyncHandler = require('express-async-handler');
const ensureLoggedIn = require('../../middlewares/user/ensureLogin');

const router = Router();
router.use(ensureLoggedIn);



router.get('/', asyncHandler((controller.get)));
router.post('/', asyncHandler((controller.post)));

module.exports = router;