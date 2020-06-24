const Sequelize = require('sequelize');
const db=require('./db');
const bcrypt = require('bcrypt');
const { where } = require('sequelize');

const Model=Sequelize.Model;
class Account extends Model{
    static async findAcc(accountNumber){
        return Account.findOne({
            where : {
                accountNumber,
            }
        });
    }
    static hashPassword(password) {
        return bcrypt.hashSync(password, 10);
    }
    static verifyPassword(password,passwordHash){
        return bcrypt.compareSync(password,passwordHash);
    }
}
Account.init({
    accountNumber:{
        type: Sequelize.CHAR,
        allowNull: false,
        unique: true,
    },
    
    identityCard:{
        type: Sequelize.CHAR,
        allowNull: false,
        unique: true,
    },

    phoneNumber:{
        type: Sequelize.CHAR,
        allowNull: false,
        unique: true,
    },

    email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },

    name:{
        type: Sequelize.STRING,
        allowNull: false,
    },

    dateOfBirth:{
        type: Sequelize.DATE,
        allowNull: false,
    },

    password:{
        type: Sequelize.STRING,
        allowNull: false,
    },

    balance:{
        type : Sequelize.BIGINT,
        allowNull : false,
        defaultValue : 50000,
    }
},{
    sequelize : db,
    modelName: 'account',
});

module.exports = Account;