require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cookieSession = require('cookie-session')
const db = require('./services/db');

const port = process.env.PORT || 3000;
//app  use EJS
app.set('views', './views');
app.set('view engine', 'ejs');

//app use static Folder public
app.use(express.static('public'));

//app body Parser
app.use(bodyParser.urlencoded({ extended: false }));

//cookie
app.use(cookieSession({
    name: 'session',
    keys: ['donglaobank'],
    maxAge: 24 * 60 * 60 * 1000,
}));

//middlewares
app.use(require('./middlewares/admin/auth'));
app.use(require('./middlewares/user/auth'));




//app use routes user
app.get('/', require('./routes/index'));

app.get('/changepassword', function(req, res) {
    res.render('user/changepassword');
});
app.use('/login', require('./routes/user/login'));
app.use('/logout', require('./routes/user/logout'));
app.use('/home', require('./routes/user/home'));
app.use('/signup', require('./routes/user/signup'));
app.use('/transfer', require('./routes/user/transfer'));
app.use('/otp', require('./routes/user/otp'));
app.use('/history', require('./routes/user/history'));
app.use('/profile', require('./routes/user/profile'));
app.use('/editprofile', require('./routes/user/editprofile'));

//app use routes admin
app.use('/admin/login', require('./routes/admin/login'));
app.use('/admin/logout', require('./routes/admin/logout'));
app.use('/admin/home', require('./routes/admin/home'));
app.use('/admin', require('./routes/admin/home'));
app.use('/admin/verifyUser', require('./routes/admin/verifyUser'));
app.use('/admin/findingCustomers', require('./routes/admin/findingCustomers'));
app.use('/admin/profileUser', require('./routes/admin/profileUser'));
app.use('/admin/recharge', require('./routes/admin/recharge'));
app.use('/admin/searchHistory', require('./routes/admin/searchHistory'));





db.sync().then(function() {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}!`)
    });
}).catch(function(err) {
    console.error(err);
});