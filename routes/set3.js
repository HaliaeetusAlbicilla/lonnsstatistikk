const express = require('express')
const router = express.Router()
const { poolPromise } = require('../db')

router.get("/", async (req, res) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            // .input('input_parameter', sql.Int, req.query.input_parameter)
            .query("select CAST(Eksamensår AS INT) as Eksamensår, Årslønn, Kjønn from dbo.lonn2019")

        res.json(result.recordset)
    } catch (err) {
        res.status(500)
        res.send(err.message)
    }
})

module.exports = router
