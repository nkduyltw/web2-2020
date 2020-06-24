const Sequelize = require('sequelize');

const connectionString= process.env.DATABASE_URL || 'postgres://postgres:827276Duy@localhost:5432/DongLaoBank';
const db = new Sequelize(connectionString);
module.exports=db;