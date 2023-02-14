const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const path = require("path");
const app = express();

app.use(express.urlencoded({extended: false }));
app.use(express.static(path.join(__dirname,'./public')));

let db = new sqlite3.Database('./database/employees.db', sqlite3.OPEN_READWRITE,
    (err) => {
        if (err) {
    console.error(err.message);
     } else
    console.log('Connected to the employees database.');
});

db.run('CREATE TABLE IF NOT EXISTS emp(id TEXT, name TEXT)');
//Display interface
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'./public/index.html'));
    });
// Insert
app.post('/add', function(req,res){
db.serialize(() => {
        db.run('INSERT INTO emp(id,name) VALUES(?,?)', [req.body.id, req.body.name],
        function(err) {
        if (err) {
            return console.log(err.message);
        }
        console.log("New employee has been added");
        res.sendFile(path.join(__dirname,'./public/index.html'));
            });
        });
    });
    
// View
app.post('/view', function(req,res){
db.serialize(()=>{
db.each('SELECT id ID, name NAME FROM emp WHERE id =?', [req.body.id],
function(err,row){
if(err){
res.send("Error encountered while displaying");
return console.error(err.message);
}
res.send(` ID: ${row.ID}, Name: ${row.NAME}`);
console.log("Entry displayed successfully");
});
});
});
//Update
app.post('/update', function(req,res){
db.serialize(()=>{
db.run('UPDATE emp SET name = ? WHERE id = ?', [req.body.name,req.body.id],
function(err){
if(err){
res.send("Error encountered while updating");
return console.error(err.message);
// LAB 3 16
}
res.send("Entry updated successfully");
console.log("Entry updated successfully");
});
});
});
//Delete
app.post('/delete', function(req,res){
db.serialize(()=>{
db.run('DELETE FROM emp WHERE id = ?', req.body.id, function(err) {
if (err) {
res.send("Error encountered while deleting");
return console.error(err.message);
}
res.send("Entry deleted");
console.log("Entry deleted");
});
});
});
app.post("/showAll",function (req, res) {
db.serialize(()=>{
db.all("SELECT * FROM emp", function(err, rows) {
if (err) {
res.status(400).json({"error":err.message});
return;
}
res.json({
"message":"success",
"data":rows
})
});
});
});
//Close
app.get('/close', function(req,res){
db.close((err) => {
if (err) {
res.send('There is some error in closing the database');
return console.error(err.message);
}
console.log('Closing the database connection.');
res.send('Database connection successfully closed');
});
});
app.listen(3008,()=>{
console.log("Server listening on port: 3000");
});