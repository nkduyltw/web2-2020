const Sequelize = require('sequelize');
const db=require('./db');
const bcrypt = require('bcrypt');
const { where } = require('sequelize');

const Model=Sequelize.Model;
class TKTK extends Model{
    static async addTKTK(accountNumber, currency, money, duration){
        TKTKCode = cryptoRandomString({length: 10, type: 'numeric'});
            temp = await TKTK.findAll({where: {TKTKCode} });
            if(temp.length){
                break;
            }
        return TKTK.create(TKTKCode,accountNumber,currency,money,duration);
    }
    static async search(accountNumber){
        return TKTK.findAll({
            where:{
                accountNumber,
            }
        })
    }
}

TKTK.init({
    TKTKCode:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    accountNumber:{
        type: Sequelize.CHAR,
        allowNull: false,
    },
    // 1 có kỳ hạn
    // 2 không kỳ hạn
    type:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    // currency = 1 : VND
    // currency = 2 : Dollars
    currency:{
        type : Sequelize.INTEGER,
        allowNull : false,
    },
    money:{
        type : Sequelize.BIGINT,
        allowNull : false,
    },
    
    duration:{
        type: Sequelize.DATE,
        allowNull: true,
    }
});

module.exports = TKTK;