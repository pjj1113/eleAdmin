const express = require('express')

const router = express.Router()

const { user } = require('../db/index.js')

router.post('/', async(req, res, next) => {
    // console.log(req.body)
    const statet = await user.query(req.body)
    res.render('login', {
        data: JSON.stringify({
            status: statet.status,
            info: statet.info
        })
    })
})

module.exports = router