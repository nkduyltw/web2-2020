const Sequelize = require('sequelize');
const db=require('./db');
const { where } = require('sequelize');
const cryptoRandomString = require('crypto-random-string');

const Model=Sequelize.Model;
class transactionHistory extends Model{
    static async add(accountNumber,transactionBalance){
        var tradingCode;
        var temp;
        while(true){
            tradingCode = cryptoRandomString({length: 10, type: 'numeric'});
            temp = await transactionHistory.findByTradingCode(tradingCode);
            if(!temp){
                break;
            }
        }
        return transactionHistory.create({tradingCode,accountNumber,transactionBalance});
    }
    static async findByTradingCode(tradingCode){
        return transactionHistory.findOne({
            where : {tradingCode,}
        });
    }
}
transactionHistory.init({

    tradingCode:{
        type: Sequelize.CHAR,
        allowNull: false,
        unique: true,
    },

    accountNumber:{
        type: Sequelize.CHAR,
        allowNull: false,
    },

    transactionBalance:{
        type : Sequelize.BIGINT,
        allowNull : false,
    }
},{
    sequelize : db,
    modelName: 'transactionHistory',
});

module.exports = transactionHistory;