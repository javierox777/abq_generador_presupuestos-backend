const {Schema,  model} = require("mongoose")

const schemaClient = new Schema({
    name:String,
    rut:String,
    phone:String,
    address:String

})




module.exports = model("clients", schemaClient)