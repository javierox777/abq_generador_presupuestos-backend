const {Schema, model} = require("mongoose")




const schemaSale = new Schema({
    date:Date,
    iva:Number,    
    products:[],
    total:Number,

    seller:{ type: Schema.Types.ObjectId, ref: 'users' },

})



module.exports = model("sales", schemaSale)