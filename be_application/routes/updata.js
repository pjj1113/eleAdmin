const express = require('express')

const router = express.Router()

const { user } = require('../db/index.js')

router.post('/', async(req, res, next) => {

    const result = await user.update(req.body)
    res.render('updata', {
        data: JSON.stringify({
            status: result.status,
            info: result.info
        })
    })
})

module.exports = router