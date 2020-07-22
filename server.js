const express=require('express');
const bodyParser = require('body-parser');
const app= express();
const cookieSession = require('cookie-session')
const db=require('./services/db');

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
    maxAge: 24*60*60*1000,
}));

//middlewares
app.use(require('./middlewares/admin/auth'));
app.use(require('./middlewares/auth'));




//app use routes user
app.get('/',require('./routes/index'));
app.use('/login',require('./routes/login'));
app.use('/logout',require('./routes/logout'));
app.use('/signup',require('./routes/signup'));


//app use routes admin
app.use('/admin/login',require('./routes/admin/login'));
app.use('/admin/logout',require('./routes/admin/logout'));
app.use('/admin/verifyUser',require('./routes/admin/verifyUser'));



db.sync().then(function(){
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}).catch(function(err){
    console.error(err);
});