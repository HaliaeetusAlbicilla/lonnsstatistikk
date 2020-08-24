const express = require('express')
const router = express.Router()
const { poolPromise } = require('../db')

router.get("/", async (req, res) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            // .input('input_parameter', sql.Int, req.query.input_parameter)
            .query("SELECT CAST(Utdanningsretning AS char) as Utdanningsretning, \
            ROUND(AVG(Årslønn),0) AS Gjennomsnitt, ROUND(AVG(Eksamensår),0) AS 'gjEksamensår', COUNT(*) AS 'Antall' \
            FROM dbo.lonn2019 \
			GROUP BY Utdanningsretning \
			HAVING COUNT(*) > 10 \
            ORDER BY Antall DESC")
        res.json(result.recordset)

    } catch (err) {
        res.status(500)
        res.send(err.message)
    }
})

module.exports = router