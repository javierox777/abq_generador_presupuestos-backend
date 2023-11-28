const CLIENT = require('../../model/client/client');
const ctrls = {};

ctrls.allClients = async (req, res) => {
  const data = await CLIENT.find();
  res.json(data);
};

ctrls.createClient = async (req, res) => {
  try {
    const { name, rut, phone, address, faenas } = req.body;
    const data = new CLIENT({
      name,
      rut,
      phone,
      address,
      faenas,
    });
    await data.save();
    res.json({
      message: 'success',
      body: data,
    });
  } catch (error) {
    res.json({
      message: 'error',
    });
  }
};

ctrls.updateClient = async (req, res) => {
  try {
    const data = await CLIENT.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    return res.json({
      message: 'success',
      body: data,
    });
  } catch (error) {
    return res.json({
      message: 'error',
      body: error,
    });
  }
};

ctrls.deleteClient = async (req, res) => {
  try {
    await CLIENT.findOneAndDelete({ _id: req.params.id });
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
