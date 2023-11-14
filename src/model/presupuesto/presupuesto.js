const  {model, Schema } = require("mongoose")
const  mongoose = require("mongoose")
var AutoIncrement = require('mongoose-sequence')(mongoose);



const schemaPresupuesto = new Schema({
  number:Number,
  agent:String,
  brand:String,
  discount:String,
  client:{ type: Schema.Types.ObjectId, ref: 'clients' },
  materialList:[],
  modelo:String,
  observation:String,
  patent:String,
  service:String,
  state:false,
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


module.exports = model('presupuestos', schemaPresupuesto);





 

