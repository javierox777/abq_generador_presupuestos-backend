const mongoose = require("mongoose")
var AutoIncrement = require('mongoose-sequence')(mongoose);



const schemaOrdenCompra = new mongoose.Schema({
  client:{},
  tableData:[],
  date:String,
  NameProyect:String,
  Observaciones:String
 

}) 

// schemaOrdenCompra.plugin(AutoIncrement, {id:'number_seq',inc_field: 'number'});//auto incremento


module.exports = mongoose.model('ordencompras', schemaOrdenCompra);





 

// module.exports = mongoose.model("presupuestos", ItemModel)