const express = require('express')
const router = express.Router()
const { poolPromise } = require('../db')

router.get("/", async (req, res) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            // .input('input_parameter', sql.Int, req.query.input_parameter)
            .query("WITH CTE AS \
            (SELECT  Sektor, \
            Årslønn, \
                [half1] = NTILE(2) OVER(PARTITION BY Sektor ORDER BY Årslønn), \
                [half2] = NTILE(2) OVER(PARTITION BY Sektor ORDER BY Årslønn DESC), \
                [half3] = NTILE(2) OVER(ORDER BY Årslønn), \
                [half4] = NTILE(2) OVER(ORDER BY Årslønn DESC) \
            FROM    dbo.lonn2019 \
            WHERE   Årslønn IS NOT NULL \
            ) \
            SELECT  Sektor, \
                (MAX(CASE WHEN half1 = 1 THEN Årslønn END) + \
                MIN(CASE WHEN half2 = 1 THEN Årslønn END)) / 2.0 \
            AS 'Medianlønn' \
            FROM    CTE \
            GROUP BY Sektor \
            UNION ALL \
            SELECT 'Alle' \
            AS Sektor, \
                    (MAX(CASE WHEN half3 = 1 THEN Årslønn END) + \
                    MIN(CASE WHEN half4 = 1 THEN Årslønn END)) / 2.0 \
            AS 'Medianlønn' \
            FROM CTE")

        res.json(result.recordset)
    } catch (err) {
        res.status(500)
        res.send(err.message)
    }
})

module.exports = router