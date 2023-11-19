const mongoose = require("mongoose")
const URI = "mongodb+srv://appabqltda:2tTB6FYL9p7XCqq3@abqdb.9nnbqyq.mongodb.net/?retryWrites=true&w=majority"
 //const URI = "mongodb://192.168.0.2:27017/algo"
//const URI ="mongodb://localhost/abq"



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