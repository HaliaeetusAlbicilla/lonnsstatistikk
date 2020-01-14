//https://www.highcharts.com/blog/post/visualize-wikipedia-data-with-nodejs-and-highcharts/

var express = require('express'); //Import Express
var app = express(); // Init app
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var Highcharts = require('highcharts');
var rp = require('request-promise');


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

// app.post('/einar/data', function(req, res) {
//     res.send('This was sent: ' + req.body.result)
// });

// app.post('/einar/post',function(req,res){
//     // console.log('i am in app post', req.body);
//     res.json({"name" : req.body.first +' '+req.body.last});
//   });

// app.use("/test", urlencoded, function(req, res){
//     res.send(req.body)
// });

// rp(options)
//   .then((parseBody) => {
//     var arrData = [];
//     var year, month, day;

//     for (i = 0; i < parseBody.items.length; i++) {
//       year = parseBody.items[i].timestamp.slice(0, 4);
//       month = parseBody.items[i].timestamp.slice(4, 6);
//       day = parseBody.items[i].timestamp.slice(6, 8);
//       arrData.push([new Date(year + '-' + month + '-' + day).toDateString(), parseBody.items[i].views]);
//     }

//     year = parseBody.items[0].timestamp.slice(0, 4);
//     month = parseBody.items[0].timestamp.slice(4, 6);
//     day = parseBody.items[0].timestamp.slice(6, 8);
module.exports = app;


//start server
const webserver = app.listen(3000, function () {
    console.log('ServsUp (3000)')
});
