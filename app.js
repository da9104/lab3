const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const path = require("path");
const app = express();
const router = require('./router');

app.use(express.urlencoded({extended: false }));
app.use(express.static('public'))
app.set('views', 'views')
app.set('view engine', 'ejs')

let db = new sqlite3.Database('./database/employees.db', sqlite3.OPEN_READWRITE,
    (err) => {
        if (err) {
    console.error(err.message);
     } else
    console.log('Connected to the employees database.');
});

// db.run('CREATE TABLE IF NOT EXISTS emp(id TEXT, name TEXT)');

//Display interface
app.use('/', router)

app.listen(3008,() => {
    console.log("Server listening on port: 3000");
});