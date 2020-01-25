const express = require('express'); //Import Express
const app = express(); // Init app
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const rp = require('request-promise');
const https = require("https")
const http = require("http")
const fs = require("fs")

// Import the mssql package
const mssql = require("mssql"); //require the drivers
// Config object for Azure SQL connection
// const config = require('./config')


app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname, { dotfiles: 'allow' }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());


const set1Router = require("./routes/set1")
const set2Router = require("./routes/set2")


// ...
app.use("/set1", set1Router)
app.use("/set2", set2Router)

// No need to connect the pool
// Just start the web server




// //Letsencrypt Certificate
// const privateKey = fs.readFileSync('/etc/letsencrypt/live/naturviterne.northeurope.cloudapp.azure.com/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/naturviterne.northeurope.cloudapp.azure.com/cert.pem', 'utf8');
// const ca = fs.readFileSync('/etc/letsencrypt/live/naturviterne.northeurope.cloudapp.azure.com/chain.pem', 'utf8');

// const credentials = {
// 	key: privateKey,
// 	cert: certificate,
// 	ca: ca
// };

// // // Create an HTTPS service
// const httpsServer = https.createServer(credentials, app);

// httpsServer.listen(443, () => {
// 	console.log('HTTPS Server running on port 443');
// });

// // create an HTTP server on port 80 and redirect to HTTPS
// http.createServer(function (req, res) {
//     res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
//     res.end();
// }).listen(80);


// Bruk lokalt
const webserver = app.listen(3000, function () {
    console.log('ServsUp (3000)')
});
