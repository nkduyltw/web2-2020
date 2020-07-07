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
    keys: ['123456'],
    maxAge: 24*60*60*1000,
}));


//app use routes
app.get('/',require('./routes/index'));
app.use('/login',require('./routes/login'));
app.use('/recharge',require('./routes/recharge'));
app.use('/createUser',require('./routes/createUser'));

db.sync().then(function(){
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}).catch(function(err){
    console.error(err);
});