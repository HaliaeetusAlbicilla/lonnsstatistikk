const sql = require('mssql')
const config = require('./configM')

const poolPromise = new sql.ConnectionPool
(config.dbConfigM)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL')
        return pool
    })
    .catch(err => console.log('Database connection failed! Bad config: ', err))

    module.exports = {
        sql, poolPromise
    }