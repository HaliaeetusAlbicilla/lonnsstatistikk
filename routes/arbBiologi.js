const express = require('express')
const router = express.Router()
const { poolPromise } = require('../db')

router.get("/", async (req, res) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            // .input('input_parameter', sql.Int, req.query.input_parameter)
            .query("SELECT CAST(Eksamensår AS INT) as Eksamensår, Årslønn from dbo.lonn2019 \
            where [Utdanningsretning] like 'Biologiske fag (biologi/botanikk/zoologi)' \
                or [Utdanningsretning] like 'Kulturminnefag' \
                or [Utdanningsretning] like 'Økologi/Botanikk/Zoologi' \
                or [Utdanningsretning] like 'Toksikologi/Miljøbiologi' \
                or [Utdanningsretning] like 'Økologi '")
        res.json(result.recordset)

    } catch (err) {
        res.status(500)
        res.send(err.message)
    }
})

module.exports = router