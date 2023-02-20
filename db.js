const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./database/employees.db', sqlite3.OPEN_READWRITE,
    (err) => {
        if (err) {
    console.error(err.message);
     } else
    console.log('Connected to the employees database.');
});

// db.run('CREATE TABLE IF NOT EXISTS emp(id TEXT, name TEXT)');

module.exports = db