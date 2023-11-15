const PRESUPUESTO = require('../../model/presupuesto/presupuesto');
const OC = require('../../model/ordendeCompra/ordenCompra');
const moment = require('moment');
const ctrls = {};
const hoy = moment().format('YYYY-MM-DD');

ctrls.createOC = async (req, res) => {
  try {
    console.log('presupuesto', req.body);

    const { tableData, agent, client, Observaciones } = req.body;

    const data = new OC({
      tableData,
      agent,
      client,
      Observaciones,

      date: moment().format('YYYY-MM-DD'),
    });

    await data.save();

    res.json({
      message: 'success',
      body: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'error',
      body: error,
    });
  }
};

ctrls.allOC = async (req, res) => {
  try {
    const data = await OC.find().sort({ number: -1 });

    res.json({
      mmessage: 'success',
      body: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error',
      body: error,
    });
  }
};

ctrls.updateTask = async (req, res) => {
  const { description, price } = req.body;
  const oldTask = await TASK.findById(req.params.id);

  if (oldTask.description == description) {
    const data = await TASK.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    return res.json({
      message: 'success',
      body: data,
    });
  } else {
    const repeated = await TASK.findOne({ description: description });
    if (repeated) {
      return res.json({
        message: 'error',
        body: 'task/description-already-in-use',
      });
    } else {
      const data = await TASK.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      return res.json({
        message: 'success',
        body: data,
      });
    }
  }
};

ctrls.deletePresupuesto = async (req, res) => {
  console.log('id a borrar', req.params.id);
  try {
    await PRESUPUESTO.findByIdAndDelete({ _id: req.params.id });
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

ctrls.getPresupuestoId = async (req, res) => {
  const data = await PRESUPUESTO.findById({ _id: req.params.id });
  res.json(data);
};

ctrls.updatePresupuesto = async (req, res) => {
  console.log('id a update', req.params.id);
  const { nOrdencompra, dateVencimientoOC, state, dateRecepcion } = req.body;

  const update = await PRESUPUESTO.findOneAndUpdate(
    { _id: req.params.id },
    {
      nOrdencompra,
      dateVencimientoOC,
      state,
      dateRecepcion,
    }
  );

  res.json({
    message: 'ok',
    update,
  });
};

ctrls.updateAllPresupuesto = async (req, res) => {
  console.log('id a update', req.body);
  const {
    agent,
    brand,
    discount,
    modelo,
    observation,
    patent,
    service,
    date,
    formaDePago,
    plazoEntrega,
    nInforme,
    faena,
  } = req.body;

  const update = await PRESUPUESTO.findOneAndUpdate(
    { _id: req.params.id },
    {
      agent,
      brand,
      discount,
      modelo,
      observation,
      patent,
      service,
      date,
      formaDePago,
      plazoEntrega,
      nInforme,
      faena,
    }
  );

  res.json({
    message: 'ok',
    update,
  });
};
module.exports = ctrls;
