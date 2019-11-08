var express = require('express')

const { user } = require('../db/index.js')

var router = express.Router()

router.post('/', async(req, res, next) => {
    const result = await user.add(req.body)
    res.render('reg', {
        data: JSON.stringify({
            status: result.status,
            info: result.info
        })
    })
})
module.exports = router