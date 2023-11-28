const { Schema, model } = require('mongoose');

const schemaClient = new Schema({
  name: String,
  rut: String,
  phone: String,
  address: String,
  faenas: [],
});

module.exports = model('clients', schemaClient);
