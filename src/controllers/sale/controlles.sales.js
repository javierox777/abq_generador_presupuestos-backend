const SALE = require("../../model/sale/sale");
const PRODUCT = require("../../model/producto/producto");
const ctrls = {};
const bcrypt = require("bcryptjs");
const USER = require("../../model/user/user");
const moment = require("moment");
require("moment/locale/es");

const hoy = moment().format("YYYY-MM-DD h:mm:ss");

ctrls.deleteSale = async (req, res) => {
  const { password } = req.body;

  const usuario = await USER.findOne().where({ role: "admin" });
 
  const hash = await bcrypt.compare(password, usuario.password);
  if (!hash) {
    return res.json({ message: "error", body: "auth/wrong-password" });
  }


  
  const body = req.body;
  let algo = [];
  let namesP = [];

  // suma de total producto
  const suma = body.sale.products.map((e, index, array) => {
    return algo.push(e.quantity * e.subtotal), (namesP = e.name), e.quantity;
  });

  const restar = body.sale.products.map(async (e) => {
    const hola = await PRODUCT.findById({ _id: e._id });
    const r = hola.stock;
    const o = e.quantity;
    const g = r + o;
    const updateStock = await PRODUCT.findByIdAndUpdate(
      { _id: e._id },
      {
        stock: g,
      }
    );
  });

  // fin suma de total producto
  try {
    await SALE.findByIdAndDelete({ _id: req.params.id });
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

ctrls.allsalesId = async (req, res) => {
  const data = await SALE.find()
    .where({ seller: req.params.id })
    .sort({ date: 1 });
  res.json({ data });
};

ctrls.allProductM = async (req, res) => {
  const data = await PRODUCT.find({ stock: { $gt: 0 } });
  res.json({ data });
};

ctrls.allSale = async (req, res) => {
  const data = await SALE.find().populate("seller").sort({ date: 1 });
  res.json({
    data,
  });
};

ctrls.createSale = async (req, res) => {
  const body = req.body;
  let algo = [];
  let namesP = [];

  // suma de total producto
  const suma = body.products.map((e, index, array) => {
    return algo.push(e.quantity * e.subtotal), (namesP = e.name), e.quantity;
  });

  const restar = body.products.map(async (e) => {
    const hola = await PRODUCT.findById({ _id: e._id });
    const r = hola.stock;
    const o = e.quantity;
    const g = r - o;
    const updateStock = await PRODUCT.findByIdAndUpdate(
      { _id: e._id },
      {
        stock: g,
      }
    );
  });

  const totale = algo.reduce(function (previus, valor) {
    return previus + valor;
  });
  // fin suma de total producto

  try {
    const data1 = new SALE({
      date: hoy,
      total: totale,
      products: body.products,
      seller: body.seller,
    });

    await data1.save();
    const data = await SALE.findById({ _id: data1._id }).populate("seller");
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

module.exports = ctrls;
