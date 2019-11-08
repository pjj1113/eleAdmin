const express = require( 'express' )

const router = express.Router()

const fs = require( 'fs' )

const path = require( 'path' )

var multer = require('multer');
const { shop } = require( '../db/index' )

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join( __dirname,'../public/upload'))
    },
    filename: function (req, file, cb) {

      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
  var upload = multer({ storage: storage })
  

router.route('/')
.post(upload.any(),async (req,res,next) => {

    const result = await shop.add( req.body )
    console.log('result',result)
    res.render('shop',{
        data:JSON.stringify({
            info:result.info,
            status:result.status
        })
    })
})
.get(async ( req,res,next ) => {
    const result = await shop.query()
    console.log('result',result)
    res.render('shop',{
      data: JSON.stringify({
        info: result.info,
        status: result.status,
        result: result.docs
      })
    })
})
.delete(async (req,res,next) => {
  console.log(req.query._id)
  const result = await shop.del(req.query._id)
  res.render('shop',{
    data:JSON.stringify({
      info: result.info,
      status: result.status,
      result: result.docs
    })
  })
})
.put(upload.any(),async ( req,res,next ) => {
  console.log(req.body)
  const result = await shop.modify( req.body )
  console.log(2)
  res.render('shop',{
    data: JSON.stringify({
      info: result.info,
      status: result.status,
      result: result.result
    })
  })
  res.send('fsdfs')
})

module.exports =router
