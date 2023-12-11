const PROVIDER = require('../../model/provider/provider');
const ctrls = {};

ctrls.allProviders = async (req, res) => {
  const data = await PROVIDER.find();
  res.json(data);
};

ctrls.createProvider = async (req, res) => {
  try {
    const { name, rut, phone, address } = req.body;

    const data = new PROVIDER({
      name,
      rut,
      phone,
      address,
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

ctrls.updateProvider = async (req, res) => {
  try {
    const updatedClient = {
      name: req.body.name,
      rut: req.body.rut,
      phone: req.body.phone,
      address: req.body.address,
    };

    const data = await PROVIDER.findByIdAndUpdate(
      { _id: req.params.id },
      updatedClient,
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

ctrls.deleteProvider = async (req, res) => {
  try {
    await PROVIDER.findOneAndDelete({ _id: req.params.id });
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
