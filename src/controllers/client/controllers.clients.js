const CLIENT = require('../../model/client/client');
const FAENA = require('../../model/faena/faena');
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
    });

    faenas.forEach(async (faena) => {
      if (faena.name) {
        const newFaena = new FAENA({
          name: faena.name,
          company: data._id,
        });
        await newFaena.save();
      }
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
    const updatedClient = {
      name: req.body.name,
      rut: req.body.rut,
      phone: req.body.phone,
      address: req.body.address,
    };

    const data = await CLIENT.findByIdAndUpdate(
      { _id: req.params.id },
      updatedClient,
      { new: true }
    );

    req.body.faenas.forEach(async (faena) => {
      if (faena.name) {
        const data = new FAENA({
          name: faena.name,
          company: req.params.id,
        });
        await data.save();
      }
    });

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
