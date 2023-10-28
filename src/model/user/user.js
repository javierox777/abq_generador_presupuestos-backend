const {Schema, model}= require("mongoose")


const schemaUser = new Schema({
    name:String,
    lastname:String,
    rut:String,
    phone:String,
    address:String,
    email:String,
    password:String,
    role:String
})



module.exports = model("users", schemaUser)