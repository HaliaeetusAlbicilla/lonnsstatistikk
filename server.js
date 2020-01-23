const express = require('express'); //Import Express
const app = express(); // Init app
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const Highcharts = require('highcharts');
const rp = require('request-promise');
const https = require("https")
const http = require("http")
const fs = require("fs")

app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname, { dotfiles: 'allow' } ));
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


//Letsencrypt Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/naturviterne.northeurope.cloudapp.azure.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/naturviterne.northeurope.cloudapp.azure.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/naturviterne.northeurope.cloudapp.azure.com/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

// // Create an HTTPS service
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});

// create an HTTP server on port 80 and redirect to HTTPS
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);
