//https://www.highcharts.com/blog/post/visualize-wikipedia-data-with-nodejs-and-highcharts/
//azure vm https://www.youtube.com/watch?v=mvW0tIsdnHI
//Husk at det er litt hazzle med linjeendinger i https-greiene. 
//LINUX: git config --global core.autocrlf input
// Da vil den endre fra CRLF (Windows) til LF (Linux)
// Nå endrer den i git repo, men ikke lokalt (på jobbmaskinen)


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


//start server

//HTTPS
// const options = {
//     // use server key
//     key: fs.readFileSync('ssh/nvlonnpriv.key'),
//     // use server cert
//     cert: fs.readFileSync('ssh/nvlonncert.crt'),
// };

//Husk å rydd opp i dette etter hvert. Hele dritten, egentlig.

//NY VARIANT LETSENCRYPT
//Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/naturviterne.northeurope.cloudapp.azure.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/naturviterne.northeurope.cloudapp.azure.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/naturviterne.northeurope.cloudapp.azure.com/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

app.use((req, res) => {
	res.send('Hello there !');
});


// const webserver = app.listen(3000, function () {
//     console.log('ServsUp (3000)')
// });


// // Create an HTTP service.
// // http.createServer(app).listen(3000);
// // Create an HTTPS service identical to the HTTP service.
// https.createServer(options, app).listen(443);

// // create an HTTP server on port 80 and redirect to HTTPS
// var http_server = http.createServer(function(req,res){    
//     // 301 redirect (reclassifies google listings)
//     res.writeHead(301, { "Location": "https://52.178.186.248/" + req.headers['host'] + req.url });
//     res.end();
// }).listen(80, function(err){
//     console.log("Node.js Express HTTPS Server Listening on Port 80");    
// });


//NY VERSJON MED LETSENCRYPT
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});

app.use(function(req, res, next) {
    if(!req.secure) {
    return res.redirect([‘https://http://naturviterne.northeurope.cloudapp.azure.com, req.get(‘Host’), req.baseUrl].join(‘’));
    }
    next();
    });

//HTTP
// app.listen(80, () => {
//     console.log('HTTP server running on port 80');
//   });