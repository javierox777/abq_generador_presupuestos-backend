const SUPPLIES = require('../../model/supplies/supplies');
const ctrls = {};

ctrls.getSuplies = async (rea, res) => {
  const data = await SUPPLIES.find();
  res.json({
    message: 'success',
    body: data,
  });
};

ctrls.createSupplie = async (req, res) => {
  const { sku, description, unitPrice } = req.body;

  const data = new SUPPLIES({
    sku,
    description,
    cantidad: 1,
    unitPrice,
    total: unitPrice,
  });
  await data.save();
  res.json({
    message: 'success',
    body: data,
  });
};

ctrls.deleteSupplies = async (req, res) => {
  try {
    await SUPPLIES.findOneAndDelete({ _id: req.params.id });
    res.json({
      message: 'success',
    });
  } catch (error) {
    res.json({
      message: 'error',
      body: error,
    });
  }
};
module.exports = ctrls;
