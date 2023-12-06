const TRABAJO = require('../../model/trabajos/trabajos');
const ctrls = {};

try {
  ctrls.createJob = async (req, res) => {
    const {
      date,
      nOrdenCompra,
      trabajadores,
      supervisor,
      faena,
      fechaEnd,
      comentarios,
      presupuesto,
      cloudFileId,
      cloudReportId,
    } = req.body;
    const data = new TRABAJO({
      date,
      nOrdenCompra,
      trabajadores,
      supervisor,
      faena,
      progress: 0,
      comentarios,
      fechaEnd,
      gastos: [],
      presupuesto,
      cloudFileId,
      cloudReportId,
    });
    await data.save();
    res.json({
      message: 'success',
      body: data,
    });
  };
} catch (error) {
  res.json({
    message: 'error',
    body: error,
  });
}

ctrls.findJobById = async (req, res) => {
  try {
    const data = await TRABAJO.findById({ _id: req.params.id }).populate([
      { path: 'presupuesto' },
      { path: 'faena' },
    ]);
    if (!data) {
      res.status(404).json({
        message: 'error',
        body: 'not found',
      });
    }

    res.status(200).json({
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

ctrls.allJobs = async (req, res) => {
  try {
    const data = await TRABAJO.find().populate([
      {
        path: 'presupuesto',
        populate: [
          {
            path: 'client',
            model: 'clients',
          },
          {
            path: 'faena',
            model: 'faenas',
          },
        ],
      },
    ]);
    if (!data) {
      res.status(404).json({
        message: 'error',
        body: 'not found',
      });
    }

    res.status(200).json({
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

ctrls.alljobforRole = async (req, res) => {
  console.log(req.params.company)
  try {
    const datas = await TRABAJO.find()
      .populate({
        path: 'presupuesto',
        populate: {
          path: 'client',
          model: 'clients',
        },
      });

    const data = datas.filter(i => i.presupuesto.client._id == req.params.company);
    console.log(data)

    if (!data || data.length === 0) {
      res.status(404).json({
        message: 'error',
        body: 'not found',
      });
    }

    // Resto del código para enviar la respuesta exitosa
    res.status(200).json({
      message: 'success',
      body: data,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'error',
      body: 'internal server error',
    });
  }
};

ctrls.allJobsForIdCliend = async (req, res) => {
  try {
    const data = await TRABAJO.find().populate([
      {
        path: 'presupuesto',
        populate: [
          {
            path: 'client',
            model: 'clients',
          },
          { path: 'faena', model: 'faenas' },
        ],
      },
    ]);

    const filteredData = data.filter((element) => {
      return (
        element.presupuesto &&
        element.presupuesto.client &&
        element.presupuesto.client._id &&
        element.presupuesto.client._id.toString() === req.params.id
      );
    });

    console.log('Filtered Data:', filteredData);
    if (!filteredData.length) {
      return res.status(404).json({
        message: 'error',
        body: 'not found',
      });
    }

    res.status(200).json({
      message: 'success',
      body: filteredData,
    });
  } catch (error) {
    res.status(500).json({
      message: 'error',
      body: error,
    });
  }
};

ctrls.deleteJob = async (req, res) => {
  try {
    const data = await TRABAJO.findByIdAndDelete({ _id: req.params.id });
    if (!data) {
      res.status(404).json({
        message: 'error',
        body: 'not found',
      });
    }

    res.status(200).json({
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

ctrls.updateJob = async (req, res) => {
  try {
    const {
      date,
      nOrdenCompra,
      trabajadores,
      supervisor,
      progress,
      faena,
      fechaEnd,
      comentarios,
      gastos,
      presupuesto,
      cloudFileId,
      cloudReportId,
    } = req.body;

    const updateFields = {
      date,
      nOrdenCompra,
      trabajadores,
      supervisor,
      faena,
      progress,
      fechaEnd,
      comentarios,
      gastos,
      presupuesto,
      cloudFileId,
      cloudReportId,
    };

    Object.keys(updateFields).forEach(
      (key) => updateFields[key] === undefined && delete updateFields[key]
    );

    const data = await TRABAJO.findOneAndUpdate(
      { _id: req.params.id },
      updateFields,
      { new: true }
    );

    if (!data) {
      return res.status(404).json({
        message: 'error',
        body: 'not found',
      });
    }
    console.log(data);
    return res.status(200).json({
      message: 'success',
      body: data,
    });
  } catch (error) {
    console.error('Error en el servidor:', error);
    return res.status(500).json({
      message: 'error',
      body: error,
    });
  }
};

module.exports = ctrls;
