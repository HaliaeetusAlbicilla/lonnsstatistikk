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
const set3Router = require("./routes/set3")
const set4Router = require("./routes/set4")
const arbBiologi = require("./routes/arbBiologi")
const arbForvaltning = require("./routes/arbForvaltning")
const arbGeofag = require("./routes/arbGeofag")
const arbHusdyrfag = require("./routes/arbHusdyrfag")
const arbMatErn = require("./routes/arbMatErn")
const arbPlantefag = require("./routes/arbPlantefag")
const arbSkogfag = require("./routes/arbSkogfag")
const arbTekniskeBio = require("./routes/arbTekniskeBio")
const arbAvg = require("./routes/arbAvg")
const studentfordeling = require("./routes/studentfordeling")

// ...
app.use("/set1", set1Router)
app.use("/set2", set2Router)
app.use("/set3", set3Router)
app.use("/set4", set4Router)
app.use("/arbBiologi", arbBiologi)
app.use("/arbForvaltning", arbForvaltning)
app.use("/arbGeofag", arbGeofag)
app.use("/arbHusdyrfag", arbHusdyrfag)
app.use("/arbMatErn", arbMatErn)
app.use("/arbPlantefag", arbPlantefag)
app.use("/arbSkogfag", arbSkogfag)
app.use("/arbTekniskeBio", arbTekniskeBio)
app.use("/arbAvg", arbAvg)
app.use("/studentfordeling", studentfordeling)

//Letsencrypt-sertifikat
const privateKey = fs.readFileSync('/etc/letsencrypt/live/naturviterne.northeurope.cloudapp.azure.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/naturviterne.northeurope.cloudapp.azure.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/naturviterne.northeurope.cloudapp.azure.com/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

// Få opp HTTPS på VM
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});

// Lag HTTP-server på port 80, send til HTTPS
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);


// // Bruk denne lokalt
// const webserver = app.listen(3000, function () {
//     console.log('ServsUp (3000)')
// });
