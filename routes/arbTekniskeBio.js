const express = require('express')
const router = express.Router()
const { poolPromise } = require('../db')

router.get("/", async (req, res) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            // .input('input_parameter', sql.Int, req.query.input_parameter)
            .query("select CAST(Eksamensår AS INT) as Eksamensår, Årslønn from dbo.lonn2019 \
            where [Utdanningsretning] like 'Molekylærbiologi/Fysiologi' \
                or [Utdanningsretning] like 'Bioteknologi' \
                or [Utdanningsretning] like 'Farmasi' \
                or [Utdanningsretning] like 'Kjemi' \
                or [Utdanningsretning] like 'Molekylærbiologi'")
        res.json(result.recordset)
        console.log(recordset)
    } catch (err) {
        res.status(500)
        res.send(err.message)
    }
})

module.exports = router

