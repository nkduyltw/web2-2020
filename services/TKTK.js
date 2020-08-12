const Sequelize = require('sequelize');
const db=require('./db');
const cryptoRandomString = require('crypto-random-string');

const Model=Sequelize.Model;
class TKTK extends Model{
    static createCode(){
       return  cryptoRandomString({length: 5, type: 'base64'});
    }
    static async addTKTK(accountNumber, currency, money, duration, note){
        const TKTKCode = this.createCode();
        return this.create({TKTKCode, accountNumber, currency, money, duration, note,done: false,status: 0});
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
        type: Sequelize.INTEGER,
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