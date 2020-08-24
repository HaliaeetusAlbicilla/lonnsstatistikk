const express = require('express')
const router = express.Router()
const { poolPromise } = require('../db')

router.get("/", async (req, res) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            // .input('input_parameter', sql.Int, req.query.input_parameter)
            .query("select CAST(Eksamensår AS INT) as Eksamensår, Årslønn from dbo.lonn2019 \
            where [Spesifisering utdanningsretning] like 'Plantefag' \
                or [Utdanningsretning] like 'Plantefag' \
                or [Utdanningsretning] like 'Hagebruk' \
                or [Utdanningsretning] like 'Hagebruk/Grøntmiljø' \
                or [Utdanningsretning] like 'Jord- og plantefag'")
        res.json(result.recordset)
        console.log(recordset)
    } catch (err) {
        res.status(500)
        res.send(err.message)
    }
})

module.exports = router

