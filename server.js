//https://www.highcharts.com/blog/post/visualize-wikipedia-data-with-nodejs-and-highcharts/
//azure vm https://www.youtube.com/watch?v=mvW0tIsdnHI
//Husk at det er litt hazzle med linjeendinger i https-greiene. 
//LINUX: git config --global core.autocrlf input
// Da vil den endre fra CRLF (Windows) til LF (Linux)
// Nå endrer den i git repo, men ikke lokalt (på jobbmaskinen)


var express = require('express'); //Import Express
var app = express(); // Init app
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var Highcharts = require('highcharts');
var rp = require('request-promise');
//HTTPS
// var https = require("https")

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

//home
app.get('/', function (req, res) {
    //res.sendFile(path.join(__dirname + '\\index.html'));
    res.sendFile(__dirname + '/index.html');
});

app.get('/einar/data', function (req, res) {
    console.log("GET");
    // Import the mssql package
    const sql = require("mssql"); //require the drivers

    // Config object for Azure SQL connection
    const config = require('./config')
    //Connect to DB
    sql.connect(config.dbConfig, function (err) {
        if (err) console.log(err)
        //New request object
        let request = new sql.Request();
        //query to DB and get record/fields in the data object
        // let sqlQueryAll = 'SELECT * FROM dbo.lonn2019dummy';
        request.query("SELECT Sektor, AVG(Lønn) AS \"Gjennomsnittslønn\" FROM dbo.lonn2019dummy GROUP BY Sektor UNION ALL SELECT 'Alle' AS Sektor, AVG(Lønn) AS \"Gjennomsnittslønn\" FROM dbo.lonn2019dummy", function (err, result) {
            if (err) console.log(err)
            //Display data
            console.log(result);
            let recordset = result.recordset;
            //Output data
            //callback(result);
            res.json(recordset);
            sql.close(); //Trengs det?
        });
    });
});

module.exports = app;


//start server

//HTTPS
// var options = {
//     key: fs.readFileSync('ssh/key.pem'),
//     cert: fs.readFileSync('ssh/cert.pem')
//   };


const webserver = app.listen(3000, function () {
    console.log('ServsUp (3000)')
});

//HTTPS
// // Create an HTTP service.
// http.createServer(app).listen(80);
// // Create an HTTPS service identical to the HTTP service.
// https.createServer(options, app).listen(443);