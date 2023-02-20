const Emplyer = require('../model/Employer')
const path = require("path");

const db = require('../db')

exports.home = function(req, res) {
    res.render('index')
}
exports.showAll = function(req, res) {
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
}
exports.close = function (req, res) {
        db.close((err) => {
            if (err) {
            res.send('There is some error in closing the database');
            return console.error(err.message);
            }
            console.log('Closing the database connection.');
            res.send('Database connection successfully closed');
            });
}
exports.delete = function(req, res) {
    db.serialize(() => {
    db.run('DELETE FROM emp WHERE id = ?', req.body.id, function(err) {
        if (err) {
        res.send("Error encountered while deleting");
         return console.error(err.message);
       }
         res.send("Entry deleted");
         console.log("Entry deleted");
         });
    });
}

exports.view = function (req, res){
    db.serialize(() => {
        db.each('SELECT id ID, name NAME FROM emp WHERE id =?', [req.body.id],
            function (err,row) {
        if (err) {
        res.send("Error encountered while displaying");
        return console.error(err.message);
        }
    res.send(` ID: ${row.ID}, Name: ${row.NAME}`);
    console.log("Entry displayed successfully");
    });
 });
}

exports.update = function(req, res){
    db.serialize(()=>{
    db.run('UPDATE emp SET name = ? WHERE id = ?', [req.body.name,req.body.id],
    function(err){
     if(err){
     res.send("Error encountered while updating");
     return console.error(err.message);
  
    }
     res.send("Entry updated successfully");
      console.log("Entry updated successfully");
    });
 });
}


exports.add = function(req, res) {
    db.serialize(() => {
        db.run('INSERT INTO emp(id,name) VALUES(?,?)', [req.body.id, req.body.name],
        function(err) {
        if (err) {
            return console.log(err.message);
        }
        console.log("New employee has been added");
        res.redirect('/')
            });
        });
    }

