const express = require('express')
const router = express.Router()
const { poolPromise } = require('../dbM')

router.get("/", async (req, res) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            // .input('input_parameter', sql.Int, req.query.input_parameter)
            .query("SELECT t1.utdanningssted, COUNT( * ) AS 'ant' \
            FROM  Stage.MedlemmerHistory t1 \
            WHERE t1.SysEndTime = (SELECT MAX(t2.SysEndTime) \
                             FROM Stage.MedlemmerHistory t2 \
                             WHERE t2.medlemsnr = t1.medlemsnr) \
            AND status = 'Student' \
            AND isUtmeldt = 0 \
            GROUP BY  t1.utdanningssted;")

        res.json(result.recordset)
    } catch (err) {
        res.status(500)
        res.send(err.message)
    }
})

module.exports = router




