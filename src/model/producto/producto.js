const {Schema, model} = require("mongoose")
const schemaProducto = new Schema({
    name:String,
    price:Number,
    description:String,
    sku:String,
    total:Number

})



module.exports = model("productos", schemaProducto)