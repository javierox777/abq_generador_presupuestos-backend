const USER = require("../../model/user/user");
const INVOICE = require("../../model/invoice/invoice");
const ctrls = {};
const moment = require("moment");
require("moment/locale/es");

const hoy = moment().format("YYYY-MM-DD h:mm:ss");

ctrls.deleteInvoice = async (req, res) => {
  try {
    await INVOICE.findByIdAndDelete({ _id: req.params.id });
    res.json({
    message: "success",
  });
  } catch (error) {
      res.json({
          message:"error",
          body:error
      })
      
  }
  
};



ctrls.allInvoices = async (req, res) => {
  const data = await INVOICE.find();
  res.json({ data });
};


ctrls.createInvoice = async (req, res) => {
  const body = req.body;
  let algo = [];
  // console.log("invoice items ", req.body)
  // console.log("invoice  solo items", req.body)
 

  // suma de total producto
  const suma = body.items.map((e, index, array) => {
    return algo.push(e.quantity * e.subtotal)
  });
  console.log("suma ", suma)

   
  const totale = algo.reduce(function (previus, valor) {
    return previus + valor;
  });
  // fin suma de total producto
  // console.log("total ", totale)
  try {
 
    const data1 = new INVOICE(req.body);

    await data1.save();
    const data = await INVOICE.findById({ _id: data1._id }).populate("seller");
    res.json({
      message: "success",
      body: data,
    });
  } catch (error) {
    res.json({
      message: "error",
      body: error,
    });
  }
};


ctrls.getSellerId = async(req, res)=>{
  try {
    const data = await INVOICE.find().where({"seller":req.params.id})
    res.json({
        data
    })
  } catch (error) {
    res.json({
      message:"error",
      body:error
  })
  }
}


module.exports = ctrls;