const Sequelize = require('sequelize');
const db=require('./db');
const bcrypt = require('bcrypt');
const { where } = require('sequelize');
const History =  require('./transactionHistory');

const Model=Sequelize.Model;
class TKTK extends Model{
    static async createCode(){
        TKTKCode = cryptoRandomString({length: 5, type: 'base64'});
            temp = await TKTK.findAll({where: {TKTKCode} });
            if(temp.length){
                return TKTKCode;
            }
    }
    static async addTKTK(accountNumber, currency, money, duration, note){
        const TKTKCode = await createCode();
        return TKTK.create(TKTKCode, accountNumber, currency, money, duration, note, false, 0);
    }
    static async search(accountNumber){
        return TKTK.findAll({
            where:{
                accountNumber,
                status: 1,
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
    },

    note:{
        type: Sequelize.STRING
    },

    done:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    status:{
        type: Sequelize.INTEGER,
        defaultValue: 0,
    }
},
    {
        sequelize : db,
        modelName: 'TKTK',
    }
);

module.exports = TKTK;