const {Schema, model} =require("mongoose")

const schemaInvoice = new Schema({
  
      
       
        taxes:Number,
        discount: Number,
        status: String,
        invoiceFrom:{},
        invoiceTo:{},
        items:[],
        seller:{ type: Schema.Types.ObjectId, ref: 'users' },
     
  
})


module.exports = model("invoices", schemaInvoice)