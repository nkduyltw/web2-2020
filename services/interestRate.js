const Sequelize = require('sequelize');
const db=require('./db');
const { where } = require('sequelize');

const Model=Sequelize.Model;
class interestRate extends Model{
    static async interestCalculator(month, money){
        if(month < 2){
            const data = await this.findOne({where:{month : 1}});
            return parseInt( money*data.interestrate / 100 );
        }
        else{
            if(month < 3){
                const data = await this.findOne({where:{month : 2}});
                return parseInt( money*data.interestrate / 100 );
            }
            else{
                if(month < 6){
                    const data = await this.findOne({where:{month : 3}});
                    return parseInt( money*data.interestrate / 100 );
                }
                else{
                    if(month < 9){
                        const data = await this.findOne({where:{month : 6}});
                        return parseInt( money*data.interestrate / 100 );
                    }
                    else{
                        if(month < 12){
                            const data = await this.findOne({where:{month : 9}});
                            return parseInt( money*data.interestrate / 100 );
                        }
                        else{
                            if(month < 24){
                                const data = await this.findOne({where:{month : 12}});
                                return parseInt( money*data.interestrate / 100 );
                            }
                            else{
                                if(month < 36){
                                    const interestrate = await this.findOne({where:{month : 24}});
                                    return parseInt( money*data.interestrate / 100 );
                                }
                                else{
                                    const interestrate = await this.findOne({where:{month : 36}});
                                    return parseInt( money*data.interestrate / 100 );
                                }
                            }
                        }
                    }
                }
            }
        }
        
    }
}

interestRate.init({
    month:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    
    interestrate:{
        type: Sequelize.FLOAT,
        allowNull: false,
    },
},{
    sequelize : db,
        modelName: 'interestRate',
}

);

module.exports = interestRate;