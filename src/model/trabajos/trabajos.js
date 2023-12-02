const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
var autoIncrement = require('mongoose-sequence')(mongoose);

const schemaSale = new Schema({
  date: String,
  numero: Number,
  supervisor: String,
  trabajadores: [],
  comentarios: [
    {
      paso: Number,
      comentario: String,
    },
  ],
  progress: Number,
  fechaEnd: String,
  nOrdenCompra: Number,
  presupuesto: { type: Schema.Types.ObjectId, ref: 'presupuestos' },
  gastos: [
    {
      numero: Number,
      nombre: String,
      descripcion: String,
      cantidad: Number,
      precioUnitario: Number,
      total: Number,
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  cloudFileId: String,
});

schemaSale.plugin(autoIncrement, {
  id: 'sale_seq',
  inc_field: 'number',
}); //auto incremento

module.exports = model('trabajos', schemaSale);
