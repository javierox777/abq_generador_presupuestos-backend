const mongoose = require("mongoose")
var AutoIncrement = require('mongoose-sequence')(mongoose);



const schemaPresupuesto = new mongoose.Schema({
  number:Number,
  agent:String,
  brand:String,
  discount:String,
  client:{},
  materialList:[],
  modelo:String,
  observation:String,
  patent:String,
  service:String,
  state:Boolean,
  date:String, 
  nOrdencompra:String,
  dateRecepcion:String,
  dateVencimientoOC:String,
  formaDePago:String,
  plazoEntrega:String,
  nInforme:String,
  faena:String,
  user:{},
  taskList:[],
  totalHours:[]


}) 

schemaPresupuesto.plugin(AutoIncrement, {id:'number_seq',inc_field: 'number'});//auto incremento


module.exports = mongoose.model('presupuestos', schemaPresupuesto);





 

// module.exports = mongoose.model("presupuestos", ItemModel)