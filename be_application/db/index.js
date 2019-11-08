// 该模块用于操作数据库模块

const mongoose = require('mongoose')

const connect = require('./connect.js')

connect.init()


const { userSchema,shopSchema } = require('./schema/index.js')


const userModel = mongoose.model('users', userSchema)

const shopModel = mongoose.model('shops',shopSchema)

const db = {
    user: {
        add(data) {
            return new Promise((resolve, reject) => {
                userModel.find({}, (err, doc) => {
                    let f = doc.some(item => item.username == data.username)
                    if (f) {
                        resolve({
                            status: '2',
                            info: '用户名已存在'
                        })
                    } else {
                        const user = new userModel(data)
                        console.log(data)
                        user.save(err => {
                            if (err) {
                                resolve({
                                    status: '0',
                                    info: '存储错误'
                                })
                            } else {
                                resolve({
                                    status: '1',
                                    info: '注册成功'
                                })
                            }
                        })
                    }
                })
            })
        },
        del(_id) {
            return new Promise((resolve, reject) => {

                userModel.findById({ _id: _id }, (err, doc) => {
                    doc.remove(error => {
                        if (error) {
                            reject({
                                status: 0,
                                info: "请求错误请重试"
                            })
                        } else {
                            console.log(123, _id)
                            resolve({
                                status: 1,
                                info: "删除成功"
                            })
                        }
                    })
                })
            })
        },
        update(data) {
            return new Promise((resolve, reject) => {
                userModel.find({ username: data.username }, (err, doc) => {
                    const _id = doc[0]._id
                    console.log('_id', doc)
                    userModel.findById({ _id: _id }, (errs, docs) => {
                        docs.password = data.password
                        docs.save(error => {
                            if (error) {
                                reject({
                                    status: '0',
                                    info: "修改遇到错误"
                                })
                            } else {
                                resolve({
                                    status: '1',
                                    info: "修改成功"
                                })
                            }
                        })

                    })

                })

            })
        },
        query(data) {
            return new Promise((resolve, reject) => {
                if (data) {
                    userModel.find({}, (err, doc) => {
                        let f = doc.some(item => item.username == data.username)
                        console.log()
                        if (f) {
                            let has = doc.some(item => (item.username == data.username && item.password == data.password))
                            if (has) {
                                resolve({
                                    status: '1',
                                    info: "登录成功"
                                })
                            } else {
                                resolve({
                                    status: '0',
                                    info: "密码错误"
                                })
                            }
                        } else {
                            resolve({
                                status: '2',
                                info: "用户名不存在"
                            })
                        }

                    })
                } else {
                    userModel.find({}, (err, doc) => {
                        let newarr = []
                        doc.map((item, inidx) => {
                            newarr.push({ username: item.username, id: item._id })
                        })
                        resolve(newarr)
                    })
                }
            })
        }
    },
    shop:{
        add(data){
            return new Promise((resolve,reject) => {
                const shopEnity = new shopModel( data )
                shopModel.find({},(err,doc) =>{
                    const f = doc.some(item => item.id == data.id)
  
                    if(f){
                        resolve({
                            info:"你的店铺已经添加了",
                            status:0
                        })
                    }else{
                        shopEnity.save(err => {
                            if(err){
                                reject({
                                    info:"添加出现异常",
                                    status:1
                                })
                            }else{
                                resolve({
                                    info:"店铺添加成功",
                                    status:2
                                })
                            }
                        })
                    }
                })

            })
        },
        query(){
            return new Promise((resolve,reject) => {
                shopModel.find({},(err,docs) => {
                    if(err){
                        reject({
                            info:"查询失败",
                            status:0
                        })
                    } else {
                        resolve({
                            info:"查询成功",
                            status:2,
                            docs:docs
                        })
                    }
                })
            })
        },
        del(_id){
            return new Promise((resolve,reject) => {
                shopModel.findById({_id:_id},(err,docs) =>{
                  
                    docs.remove(error =>{
                        if(error){
                            reject({
                                info:"遇到错误，请重试^v^",
                                status:1
                            })
                        }else{
  
                            shopModel.find({},(err,docs) =>{
                                if(!err){
                                    resolve({
                                        info:"删除成功",
                                        status:2,
                                        docs:docs
                                    })
                                }
                            })
                            
                        }
                    })
                })
            })
        },
        modify ( data ) {
            return new Promise(( resolve,reject ) => {
              shopModel.findById( data._id, ( err,doc ) => {

                for( var i in data ) {
                    doc[ i ] = data[ i ]
                }
                doc.save( err => {
                  if( err ) {
                    reject({
                      info: '网路有异常，请您重试',
                      status: 0
                    })
                  } else {
                    resolve({
                      info: '修改数据成功',
                      status: 2
                    })
                  }
                })
                
              })
            })
          },
    }
}



module.exports = {
    user: db.user,
    shop:db.shop
}