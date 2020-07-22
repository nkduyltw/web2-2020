const {Router}= require('express');
const asyncHandler = require('express-async-handler');
const ensureLoggedIn=require('../../middlewares/admin/ensureLoggedIn');
const controller = require('../../controllers/admin/verifyUser');


const router = Router();
router.use(ensureLoggedIn);
router.get('/', asyncHandler(controller.get));
router.get('/:id', asyncHandler(controller.mashStatusTrue));
module.exports = router;