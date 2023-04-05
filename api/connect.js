const sql  = require('mysql');

const db  = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'Ujain7315@',
    database: 'real_social'
})

module.exports = db;