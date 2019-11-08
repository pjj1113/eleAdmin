const express = require('express')

const router = express.Router()

const { user } = require('../db/index')

router.route('/admin')
    .get(async(req, res, next) => {
        const result = await user.query()
        res.render('admin', {
            data: JSON.stringify({
                status: 200,
                info: "请求成功",
                list: result
            })

        })
    })
    .delete(async(req, res, next) => {

        let { _id } = req.body

        const result = await user.del(_id)
        res.render('admin', {
            data: JSON.stringify({
                status: result.status,
                info: result.info,
            })
        })
    })

module.exports = router