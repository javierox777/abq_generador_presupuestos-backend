const { Schema, model } = require('mongoose');

const schemaProvider = new Schema({
  name: String,
  rut: String,
  phone: String,
  address: String,
});

module.exports = model('providers', schemaProvider);
