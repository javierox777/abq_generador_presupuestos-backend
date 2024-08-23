const { model, Schema } = require('mongoose');
const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const schemaPresupuesto = new Schema({
  version: Number,
  number: Number,
  agent: String,
  brand: String,
  discount: String,
  client: { type: Schema.Types.ObjectId, ref: 'clients' },
  materialList: [],
  modelo: String,
  observation: String,
  patent: String,
  service: String,
  state: false,
  date: String,
  nOrdencompra: String,
  dateRecepcion: String,
  dateVencimientoOC: String,
  formaDePago: String,
  plazoEntrega: String,
  nInforme: String,
  faena: { type: Schema.Types.ObjectId, ref: 'faenas' },
  rev_nro: String,
  user: {},
  taskList: [],
  totalHours: [],
  paymentOption: String,
});

// schemaPresupuesto.plugin(AutoIncrement, {id:'number_seq',inc_field: 'number'});//auto incremento

module.exports = model('presupuestos', schemaPresupuesto);
