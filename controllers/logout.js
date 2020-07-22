module.exports.get = (req, res) =>{
    delete req.session.accountNumber;
    res.redirect('/');
}