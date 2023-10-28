const {Schema, model} = require("mongoose")



const schemaTask = new Schema({
    description:String,
    price:Number,
    hoursM:Number,
    cantidad:Number,
    total:Number
    
})


module.exports = model("tasks", schemaTask)