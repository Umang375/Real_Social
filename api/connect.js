const sql  = require('mysql');

const db  = sql.createConnection({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    //if no password just leaving it empty
    database: process.env.MYSQL_ADDON_DB,
});



module.exports = db;