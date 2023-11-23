const PRESUPUESTO = require('../../model/presupuesto/presupuesto');
const moment = require('moment');
const ctrls = {};
const hoy = moment().format('YYYY-MM-DD');


ctrls.createPresupuesto = async (req, res) => {
  try {
    // Obtener el último presupuesto ordenado por número descendente
    const latestPresupuesto = await PRESUPUESTO.findOne({}, {}, { sort: { 'number': -1 } });

    // Obtener la última versión para el número dado, si se proporciona un id
    let lastversionforNumber = null;
    let nextNumero 
    let nextVersion 

    if (req.params.id) {
      lastversionforNumber = await PRESUPUESTO.findOne({ _id: req.params.id });
     nextNumero = lastversionforNumber ? lastversionforNumber.number  : 1;
      nextVersion = lastversionforNumber ? lastversionforNumber.version + 1 : 1;
    }

    // Calcular el siguiente número y versión
    

    // Si no se proporciona un id, ajustar el número y la versión
    if (!req.params.id) {
    
      nextNumero = latestPresupuesto ? latestPresupuesto.number + 1 : 1;
      nextVersion = lastversionforNumber ? lastversionforNumber.version + 1 : 1;
    }
     
    // Crear un nuevo presupuesto con el número y la versión calculados
    const data = new PRESUPUESTO({
      version: nextVersion,
      number: nextNumero,
      agent: req.body.agent,
      brand: req.body.brand,
      discount: req.body.discount,
      client: req.body.client,
      faena: req.body.faena,
      rev_nro: req.body.rev_nro,
      materialList: req.body.materialList,
      modelo: req.body.modelo,
      observation: req.body.observation,
      patent: req.body.patent,
      service: req.body.service,
      state: req.body.state,
      date: moment().format('YYYY-MM-DD'),
      user: req.body.user,
      taskList: req.body.taskList,
      totalHours: req.body.totalHours,
      state: false,
      encargado: req.body.encargado,
    });

    // Guardar el nuevo presupuesto
    await data.save();

    // Devolver la respuesta
    res.json({
      message: 'success',
      body: data,
    });
  } catch (error) {
    res.json({
      message: 'error',
      body: error,
    });
  }
};

ctrls.allPresupuestos = async (req, res) => {
  try {
    const data = await PRESUPUESTO.aggregate([
      { $sort: { number: -1, version: -1 } },
      {
        $group: {
          _id: '$number',
          latestVersion: { $first: '$$ROOT' },
        },
      },
      {
        $replaceRoot: { newRoot: '$latestVersion' },
      },
      { $sort: { number: -1 } },
    ]);

    // Obtener la información del cliente para cada presupuesto
    const populatedData = await PRESUPUESTO.populate(data, { path: 'client' });
    res.json({
      message: 'Success',
      body: populatedData ? populatedData : [],
    });
  } catch (error) {
    
    res.json({
      message: 'error',
      body: [],
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

ctrls.updateAllPresupuesto = async(req, res)=>{
    console.log("id a update", req.body)
    const { agent, brand, rev_nro, discount,taskList,  modelo, observation, patent, service, date,  formaDePago,
        plazoEntrega,
        nInforme,
        faena, } = req.body

    const update = await PRESUPUESTO.findOneAndUpdate({ _id:req.params.id},{
         agent, brand, rev_nro, discount,taskList,  modelo, observation, patent, service, date, formaDePago,
        plazoEntrega,
        nInforme,
        faena,

    })

  res.json({
    message: 'ok',
    update,
  });
};
module.exports = ctrls;
