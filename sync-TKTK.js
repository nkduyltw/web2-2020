require('dotenv').config();
const db = require('./services/db');
const Bluebird=require('bluebird');
const tktk = require('./services/TKTK');
const History = require('./services/transactionHistory');
const Account = require('./services/account');
const interest = require('./services/interestRate');



const SYNC_INTERVAL=Number(process.env.SYNC_INTERVAL || 1000*60*60);

db.sync().then(async function (){
    for(;;){
        const today = new Date();
        const data = await tktk.findAll({
            where: {
                done: false,
                status: 1,
            }
        });
        await data.forEach(async item =>  {
            var date = new Date();
            date.setMonth(item.createdAt.getMonth() + item.duration)
            var nd = new Date(date);
            if(today.getTime() >= nd.getTime()){

                const user = await Account.findAcc(item.accountNumber);
                const temp = await interest.interestCalculator( item.duration, item.money );
                const money =  parseInt(item.money)  + temp;

                if( item.currency == 1 ){
                    
                    user.blanceSpendAccountVND = user.blanceSpendAccountVND + money ;
                }
                if( item.currency == 2 ){
                    
                    user.blanceSpendAccountDollars = user.blanceSpendAccountDollars + money ;
                }
                await History.add4(item.accountNumber, money, item.currency, item.TKTKCode)
                item.done = true;
                item.save();
                user.save();
            }
        });
        await Bluebird.delay(SYNC_INTERVAL);
    }
}).catch(console.error);