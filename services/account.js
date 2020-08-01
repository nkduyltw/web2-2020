const Sequelize = require('sequelize');
const db = require('./db');
const bcrypt = require('bcrypt');
const { where } = require('sequelize');

const Model = Sequelize.Model;
class Account extends Model {
    static async findAcc(accountNumber) {
        return Account.findOne({
            where: {
                accountNumber,
            }
        });
    }
    static async findById(id) {
        return Account.findOne({
            where: {
                id
            }
        });
    }
    static async findAllNotTrue() {
        return Account.findAll({
            where: {
                token: null,
                status: false,
            }
        });
    }
    static async findAccByIdentityCard(identityCard) {
        return Account.findOne({
            where: {
                identityCard,
            }
        });
    }
    static async findAccByEmail(email) {
        return Account.findOne({
            where: {
                email,
            }
        });
    }
    static async findAccByPhoneNumber(phoneNumber) {
        return Account.findOne({
            where: {
                phoneNumber,
            }
        });
    }
    async recharge(amountOfMoney) {
        try {
            var balance = BigInt(this.balance);
            amountOfMoney = BigInt(amountOfMoney);
            balance += amountOfMoney;
            console.log(balance);
            this.balance = balance;
            this.save();
            return true;
        } catch (error) {
            return false;
        }
    }
    static hashPassword(password) {
        return bcrypt.hashSync(password, 10);
    }
    static verifyPassword(password, passwordHash) {
        return bcrypt.compareSync(password, passwordHash, function(err, valid) {
            res.json({ error: !!(err || !valid) });
        });
    }
}
Account.init({
    accountNumber: {
        type: Sequelize.CHAR,
        allowNull: false,
        unique: true,
    },

    identityCard: {
        type: Sequelize.CHAR,
        allowNull: false,
        unique: true,
    },
    identityCardIMG1: {
        type: Sequelize.CHAR,
        allowNull: false,
    },

    identityCardIMG2: {
        type: Sequelize.CHAR,
        allowNull: false,
    },

    phoneNumber: {
        type: Sequelize.CHAR,
        allowNull: false,
        unique: true,
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: false,
    },

    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    blanceSpendAccountVND: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    blanceSpendAccountDollars:{
        type : Sequelize.DOUBLE,
        allowNull : false,
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    token: {
        type: Sequelize.STRING,
        allowNull: true,
    }
}, {
    sequelize: db,
    modelName: 'account',
});

module.exports = Account;