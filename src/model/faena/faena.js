const { Schema, model } = require('mongoose');

const schemaFaena = new Schema({
  name: String,
  company: { type: Schema.Types.ObjectId, ref: 'clients' },
  state: { type: Boolean },
});

module.exports = model('faenas', schemaFaena);
