const FAENA = require('../../model/faena/faena');
const ctrls = {};

ctrls.allFaenas = async (req, res) => {
  try {
    const data = await FAENA.find().populate('company');
    if (!data) {
      res.status(404).json({
        message: 'error',
        body: 'Not found',
      });
    }
    res.status(200).json({
      message: 'success',
      body: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      body: error,
    });
  }
};

module.exports = ctrls;
