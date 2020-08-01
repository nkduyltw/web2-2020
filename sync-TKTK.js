require('dotenv').config();
const db = require('./services/db');
const Bluebird=require('bluebird');
const tktk = require('./services/TKTK');
const History = require('./services/transactionHistory');
const Account = require('./services/account');
const interest = require('./services/interestRate');



const SYNC_INTERVAL=Number(process.env.SYNC_INTERVAL || 30000*60*24);

db.sync().then(async function (){
    for(;;){
        const today = new Date();
        const data = await tktk.findAll({
            where: {
                done: false,
            }
        });
        var count = 0;
        await data.forEach(async item =>  {
            var date = new Date();
            if( date.setMonth(item.createdAt.getMonth() + item.duration) >= today ){

                const user = await Account.findAcc(item.accountNumber);
                if( item.curency == 1 ){
                    const money = await item.money + interest.interestCalculator( item.duration, item.money );
                    user.blanceSpendAccountVND += money ;

                    count++;
                }
                if( item.curency == 2 ){
                    const money = await item.money + interest.interestCalculator( item.duration, item.money );
                    user.blanceSpendAccountDollars += money ;

                    count++;
                }
                item.done = true;
                item.save();
            }
        });

        console.log('Đã hoàn tất : '+ count);
        await Bluebird.delay(SYNC_INTERVAL);
    }
}).catch(console.error);