const mongoose = require('mongoose')

const shopSchema = mongoose.Schema({
    id: String,
    name: String,
    address: String,
    phone: String,
    info: String,
    slogan: String,
    category: String,
    feature: String,
    delivery: String,
    price: String,
    startTime: String,
    endTime: String,
    image_logo: String,
    image_license: String,
    image_open: String
})

module.exports = shopSchema