const mongoose = require("mongoose")
//const URI = "mongodb+srv://javier:12345@cluster0.n0q4k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
 //const URI = "mongodb://192.168.0.2:27017/algo"
const URI ="mongodb://localhost/abq"


mongoose.connect(URI,{
    useNewUrlParser: true ,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false
})

const connections = mongoose.connection


connections.once("open",()=>{
    console.log("db is ok")
})