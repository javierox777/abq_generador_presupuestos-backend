const PRESUPUESTO = require('../../model/presupuesto/presupuesto');
const OC = require('../../model/ordendeCompra/ordenCompra');
const moment = require('moment');
const ctrls = {};
const hoy = moment().format('YYYY-MM-DD');

ctrls.createOC = async (req, res) => {
  try {
    console.log('presupuesto', req.body);

    const {
      tableData,
      agent,
      client,
      Observaciones,
      state,
      solicitante,
      proyecto,
      adquisiciones,
      gerencia,
      paymentOption,
      admin,
    } = req.body;

    const data = new OC({
      tableData,
      agent,
      client,
      Observaciones,
      state,
      solicitante,
      proyecto,
      adquisiciones,
      gerencia,
      admin,
      paymentOption,

      date: moment().format('YYYY-MM-DD'),
    });

    await data.save();

    res.json({
      message: 'success',
      body: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'error',
      body: error,
    });
  }
};

ctrls.allOC = async (req, res) => {
  try {
    const data = await OC.find().sort({ numero: -1 });
    res.json({
      mmessage: 'success',
      body: data,
    });
  } catch (error) {
    console.log(error);
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

ctrls.updateOC = async (req, res) => {
  try {
    console.log('id a update', req.params.id);
    const {
      tableData,
      agent,
      client,
      Observaciones,
      state,
      solicitante,
      proyecto,
      user,
    } = req.body;

    const data = await OC.findOneAndUpdate(
      { _id: req.params.id },
      {
        tableData,
        agent,
        client,
        Observaciones,
        state,
        solicitante,
        proyecto,
        user,
      },
      { new: true } // Agregué esta opción para devolver el documento actualizado
    );

    res.status(200).json({
      message: 'ok',
      body: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'error',
      body: error,
    });
  }
};

ctrls.updateStateOC = async (req, res) => {
  try {
    console.log('id a update', req.params.id);
    const { state, admin, gerencia } = req.body;

    const data = await OC.findOneAndUpdate(
      { _id: req.params.id },
      {
        state,
        admin,
        gerencia,
      },
      { new: true } // Agregué esta opción para devolver el documento actualizado
    );

    res.status(200).json({
      message: 'ok',
      body: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'error',
      body: error,
    });
  }
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
    state,
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
      state,
    }
  );

  res.json({
    message: 'ok',
    update,
  });
};

ctrls.updateAllOC = async (req, res) => {
  const {
    tableData,
    agent,
    client,
    Observaciones,
    state,
    solicitante,
    proyecto,
    adquisiciones,
    gerencia,
    admin,
    paymentOption,
  } = req.body;

  const update = await OC.findOneAndUpdate(
    { _id: req.params.id },
    {
      tableData,
      agent,
      client,
      Observaciones,
      state,
      solicitante,
      proyecto,
      adquisiciones,
      gerencia,
      admin,
      paymentOption,
    }
  );

  res.json({
    message: 'ok',
    body: update,
  });
};

module.exports = ctrls;
