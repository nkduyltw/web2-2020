const {Router}= require('express');
const controller = require('../controllers/login');
const asyncHandler = require('express-async-handler');
const router = Router();



router.get('/',asyncHandler( controller.get));

router.post('/', asyncHandler(controller.post));

module.exports = router;