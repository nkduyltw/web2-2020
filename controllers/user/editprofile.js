const moment = require('moment');
module.exports.get = async(req, res) => {
    const curentUser = req.curentUser;
    res.render('user/editprofile', { moment });
}