const express = require('express')
const router = express.Router()
const { poolPromise } = require('../db')

router.get("/", async (req, res) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            // .input('input_parameter', sql.Int, req.query.input_parameter)
            .query("SELECT Sektor, \
            AVG(Årslønn) AS \"Gjennomsnittslønn\" \
            FROM dbo.lonn2019 \
            GROUP BY Sektor \
            UNION ALL \
            SELECT 'Alle' AS Sektor, \
            AVG(Årslønn) AS \"Gjennomsnittslønn\" \
            FROM dbo.lonn2019")

        res.json(result.recordset)
        console.log(recordset)
    } catch (err) {
        res.status(500)
        res.send(err.message)
    }
})

module.exports = router