const mongoose = require("mongoose")
var AutoIncrement = require('mongoose-sequence')(mongoose);



const schemaOrdenCompra = new mongoose.Schema({
  numero:Number,
  client:{},
  tableData:[],
  date:String,
  agent:String,
  solicitante : String,
  proyecto:String,
  Observaciones:String,
  state:String
 

}) 

schemaOrdenCompra.plugin(AutoIncrement, {id:'number_seq',inc_field: 'numero'});//auto incremento


module.exports = mongoose.model('ordencompras', schemaOrdenCompra);





 

// module.exports = mongoose.model("presupuestos", ItemModel)