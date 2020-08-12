const Account = require('../../services/account');
const cryptoRandomString = require('crypto-random-string');
const Email = require('../../services/email');

module.exports.get = (req, res) => {
    values = req.body;
    errors = [];
    res.render('user/signup', { errors, values });
}

module.exports.post = async(req, res) => {
    var errors = [];
    var values = req.body;

    //lay thong tin tu body
    identityCard = req.body.identityCard;
    name = req.body.name;
    email = req.body.email;
    phoneNumber = req.body.phoneNumber;
    dateOfBirth = req.body.dateOfBirth;
    address = req.body.address;
    password = req.body.password;
    status = false;
    token = cryptoRandomString({ length: 4, type: 'numeric' });

    //kiem tra cmnd
    var userTest = await Account.findAccByIdentityCard(identityCard);
    if (userTest) {
        errors.push('CMND/CCCD đã được đăng kí');
    }

    //kiem tra email
    userTest = null;
    userTest = await Account.findAccByEmail(email);
    if (userTest) {
        errors.push('Email đã được đăng kí');
    }

    //kiem tra sdt
    userTest = null;
    userTest = await Account.findAccByPhoneNumber(phoneNumber);
    if (userTest) {
        errors.push('Số điện thoại đã được đăng kí!');
    }
    if(errors.length != 0){
        res.render('user/signup', {errors, values});
    }
    else{
        password = Account.hashPassword(password);
        var accountNumber;
        var temp;
        while (true) {
            accountNumber = cryptoRandomString({ length: 13, type: 'numeric' });
            temp = await Account.findAcc(accountNumber);
            if (!temp) {
                break ;
            }
        }
        console.log(req.files)
        identityCardIMG1 = req.files['identityCardIMG1'][0].path.split('\\').slice(1).join('\\');
        identityCardIMG2 = req.files['identityCardIMG2'][0].path.split('\\').slice(1).join('\\');


        const result = Account.create({
            accountNumber,
            identityCard,
            identityCardIMG1,
            identityCardIMG2,
            phoneNumber,
            email,
            name,
            dateOfBirth,
            address,
            password,
            blanceSpendAccountVND: 0,
            blanceSpendAccountDollars: 0,
            status: false,
            token
        });
        const content = process.env.HOST_WEB + '/login/' + accountNumber + '/' + token;
        await Email.send(email, 'Mã kích hoạt tài khoản', content);
        res.redirect('/');
    }
}