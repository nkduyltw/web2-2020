const {Router}= require('express');
var multer  = require('multer')

const asyncHandler = require('express-async-handler');
const controller = require('../../controllers/user/signup');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
})
var upload = multer({ storage: storage })

var cpUpload = upload.fields([{ name: 'identityCardIMG1', maxCount: 1 }, { name: 'identityCardIMG2', maxCount: 1 }]);

const router = Router();

router.get('/',asyncHandler(controller.get));

router.post('/', cpUpload, asyncHandler(controller.post));

module.exports = router;