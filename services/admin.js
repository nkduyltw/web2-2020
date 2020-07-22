const Sequelize = require('sequelize');
const db=require('./db');
const bcrypt = require('bcrypt');
const { where } = require('sequelize');

const Model=Sequelize.Model;
class Admin extends Model{
    static async findName(name){
        return Admin.findOne({
            where : {
                name,
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
Admin.init({
    name:{
        type : Sequelize.STRING,
        allowNull : false,
        unique : true,
    },
    password:{
        type : Sequelize.STRING,
        allowNull : false
    },
},{
    sequelize : db,
    modelName: 'admin',
});

module.exports = Admin;