const express = require('express')
const router = express.Router()
const { poolPromise } = require('../dbM')

router.get("/", async (req, res) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            // .input('input_parameter', sql.Int, req.query.input_parameter)
            .query("SELECT t1.utdanningsretning, COUNT( * ) AS 'ant' \
            FROM  Stage.Medlemmer t1 \
            WHERE t1.SysStartTime = (SELECT MAX(t2.SysStartTime) \
                             FROM Stage.Medlemmer t2 \
                             WHERE t2.medlemsnr = t1.medlemsnr) \
            AND status = 'Student' \
            AND isUtmeldt = 0 \
			AND utdanningssted = 'Universitetet I Oslo' \
            GROUP BY  t1.utdanningsretning;")

        res.json(result.recordset)
    } catch (err) {
        res.status(500)
        res.send(err.message)
    }
})

module.exports = router




