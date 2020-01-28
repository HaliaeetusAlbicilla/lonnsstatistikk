const express = require('express')
const router = express.Router()
const { poolPromise } = require('../db')

router.get("/", async (req, res) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            // .input('input_parameter', sql.Int, req.query.input_parameter)
            .query("SELECT AVG(Årslønn) AS Gjennomsnitt, CAST(Eksamensår AS INT) as Eksamensår, Kjønn \
            FROM dbo.lonn2019 \
            GROUP BY Eksamensår, Kjønn \
            ORDER BY Eksamensår")

        res.json(result.recordset)
    } catch (err) {
        res.status(500)
        res.send(err.message)
    }
})

module.exports = router




