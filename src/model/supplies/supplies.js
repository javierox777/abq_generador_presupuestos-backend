const {Schema, model} = require("mongoose")


const schemaSupplies = new Schema({
    sku:Number,
    description:String,
    cantidad:Number,
    unitPrice:Number,
    total:Number



})

module.exports = model("supplies", schemaSupplies)