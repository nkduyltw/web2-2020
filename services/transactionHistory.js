const Sequelize = require('sequelize');
const db=require('./db');
const { where } = require('sequelize');
const cryptoRandomString = require('crypto-random-string');
const Op = Sequelize.Op;

const Model=Sequelize.Model;
class transactionHistory extends Model{

    static async createCode(){
        var tradingCode;
        var temp;
        while(true){
            tradingCode = cryptoRandomString({length: 10, type: 'numeric'});
            temp = await transactionHistory.findByTradingCode(tradingCode);
            if(!temp){
                return tradingCode;
            }
        }
    }
    // nhan tien tu admin
    static async add1(accountNumber,transactionBalance,currency,content){
        const type = 1;
        const tradingCode = await this.createCode();
        
        return transactionHistory.create({tradingCode: tradingCode,
                                          type: type,
                                          accountNumber: accountNumber,
                                          transactionBalance: transactionBalance,
                                          currency: currency,
                                          content: content});
    }
    //chuyen tien den 1 nguoi khac cung ngan hang
    static async add2(accountNumber,accountNumberReceive,transactionBalance,currency,content){
        const type = 2;
        const tradingCode = await this.createCode();
        return transactionHistory.create({
                                            tradingCode: tradingCode,
                                            type: type,
                                            accountNumber: accountNumber,
                                            accountNumberReceive: accountNumberReceive,
                                            transactionBalance: transactionBalance,
                                            currency: currency,
                                            content: content
                                        });
    }
    /*//nhan tien tu 1 nguoi khac cung ngan hang
    static async add3(accountNumber,accountNumberReceive,transactionBalance,currency,content){
        const type = 3;
        const tradingCode = await this.createCode();
        return transactionHistory.create({
            tradingCode: tradingCode,
            type: type,
            accountNumber: accountNumber,
            accountNumberReceive: accountNumberReceive,
            transactionBalance: transactionBalance,
            currency: currency,
            content: content
        });
    }*/
    // duyet lich su giao dich cua nguoi dung
    static async searchAllHistory(accountNumber){
        return transactionHistory.findAll({
            where :{
                [Op.or]: [
                            {accountNumber, type: 1}, 
                            {accountNumber, type: 2}, 
                            {accountNumberReceive: accountNumber, type: 2}
                        ]
            },
            order: [
                ['createdAt','DESC'],
            ],
        });
    }

    //tim chi tiet giao dich bang code
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
    // type = 1 : nap tien tu admin
    // type = 2 : chuyen tien den cung ngan hang
    // type = 3 : nhan tien tu nguoi khac cung ngan hang
    type:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    accountNumber:{
        type: Sequelize.CHAR,
        allowNull: false,
    },

    accountNumberReceive:{
        type: Sequelize.CHAR,
    },

    transactionBalance:{
        type : Sequelize.BIGINT,
        allowNull : false,
    },

    // currency = 1 : VND
    // currency = 2 : Dollars
    currency:{
        type : Sequelize.INTEGER,
        allowNull : false,
    },

    content:{
        type : Sequelize.STRING,
        allowNull : true,
    }
},{
    sequelize : db,
    modelName: 'transactionHistory',
});

module.exports = transactionHistory;