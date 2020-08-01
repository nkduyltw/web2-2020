
const Admin = require('../../services/admin');
asyncHandler = require('express-async-handler');
module.exports = asyncHandler( async function auth(req, res, next) {
    const adminName = req.session.name;
    res.locals.curentAdmin = null; 
    if( !adminName ){
        return next();
    }
    else{
        const admin = await Admin.findName(adminName);
        req.curentAdmin = admin;
        req.type = 1;
        res.locals.curentAdmin = admin;
        res.locals.type = 1;
        next();
    }
});