
const express = require('express'); //Import Express
const app = express(); // Init app
const path = require('path');
const bodyParser = require('body-parser');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

//home
app.get('/index', function (req, res) {
    //res.sendFile(path.join(__dirname + '\\index.html'));
    res.sendFile(__dirname + '/index');
});



app.get('/einar/data', function (req, res) {
    console.log("POST");
    // Import the mssql package
    const sql = require("mssql"); //require the drivers

    // Config object for Azure SQL connection
  const config = require('./config')

    //Connect to DB
    sql.connect(config.dbConfig, function (err) {

        if (err) console.log(err);

        //New request object
        let request = new sql.Request();

        //query to DB and get record/fields in the data object
        let sqlQueryAll = 'Select * From lonn2019dummy';

        //    let sqlQueryKommune = 'select Lønn from lonn2019dummy where Sektor LIKE 'Kommune';');
        // let sqlQueryStat = 'select Lønn from lonn2019dummy where Sektor LIKE 'Stat';';
        // let sqlQueryPriv = 'select Lønn from lonn2019dummy where Sektor LIKE 'Privat';';

        //Run the query. Send output to console for now.
        request.query(sqlQueryAll, function (err, data) {

            if (err) console.log(err)

            //Display data
            console.log(data);

            //res.send(data); //output raw data
            //close connection

            sql.close();
        });

    });
});




//start server
const webserver = app.listen(3000, function () {
    console.log('ServsUp (3000)')
});
