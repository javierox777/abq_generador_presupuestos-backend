const PRODUCTO = require("../../model/producto/producto");
const moment = require("moment");
require("moment/locale/es");
const ctrls = {};
const fs = require("fs")

const hoy = moment().format("YYYY-MM-DD");

ctrls.allProductos = async (req, res) => {
  const data = await PRODUCTO.find().sort({date:1})
  res.json({ data });
};

ctrls.createProduct = async (req, res) => {
  try {
    const { name, price, description, sku, stock } = req.body;
    console.log("name : ", name);
    const newName = await PRODUCTO.findOne({ name: name });
    console.log("new name : ", newName);
    if (newName) {
      return res.json({
        message: "error",
        body: "product/name-already-in-use",
      });
    }
    console.log("sku : ", sku);
    const newSku = await PRODUCTO.findOne({ sku: sku });
    console.log("new sku : ", newSku);
    if (newSku) {
      return res.json({
        message: "error",
        body: "product/sku-already-in-use",
      });
    }

    const data = new PRODUCTO({
      name,
      filename: req.file.filename,
      path: "/products/" + req.file.filename,
      price,
      description,
      sku,
      stock,
      date: hoy,
    });
    await data.save();
    return res.json({
      message: "success",
      body: data,
    });
  } catch (error) {
    return res.json({
      message: "error",
      body: error,
    });
  }
};

ctrls.findForCode = async (req, res) => {
  try {
    const data = await PRODUCTO.findOne({ code: req.params.code });
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

ctrls.deleteProduct = async (req, res) => {
  try {
   const deletes =  await PRODUCTO.findByIdAndDelete({ _id: req.params.id }).where({stock:0});
   if(deletes){
    return res.json({
      message: "success",
    })
  }else{
    return res.json({
      message: "error",
      body:"error/with-stock"
    })
  };
  } catch (error) {
    return res.json({
      message: "error",
      body: error,
    });
  }
};

ctrls.updateProduct = async (req, res) => {
  const { name, price, description, sku, notify } = req.body;
  if (notify == "sku_name") {
    console.log("entrando en sku_name");
    const skus = await PRODUCTO.findOne({ sku: sku });
    if (skus) {
      return res.json({
        message: "error",
        body: "product/sku-already-in-use",
      });
    }

    const names = await PRODUCTO.findOne({ name: name });
    if (names) {
      return res.json({
        message: "error",
        body: "product/name-already-in-use",
      });
    }
  }

  if (notify == "sku") {
    console.log("entrando en sku");
    const skus = await PRODUCTO.findOne({ sku: sku });
    if (skus) {
      return res.json({
        message: "error",
        body: "product/sku-already-in-use",
      });
    }
  }

  if (notify == "name") {
    console.log("entrando en name");
    const names = await PRODUCTO.findOne({ name: name });
    if (names) {
      return res.json({
        message: "error",
        body: "product/name-already-in-use",
      });
    }
  }
  try {
    const data = await PRODUCTO.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name,
        price,
        description,
        sku,
      },
      { new: true }
    );

    return res.json({
      message: "success",
      body: data,
    });
  } catch (error) {
    return res.json({
      message: "error",
      body: error,
    });
  }
  
};


ctrls.updateProductStock = async (req, res) => {
  try {
    const { stock } = req.body;

    const data = await PRODUCTO.findByIdAndUpdate(
      { _id: req.params.id },
      {
        stock,
      },
      { new: true }
    );

    return res.json({
      message: "success",
      body: data,
    });
  } catch (error) {
    return res.json({
      message: "error",
      body: error,
    });
  }
};

ctrls.updateProductImage = async (req, res) => {
  try {
    // const imageaa = await PRODUCTO.findOne({ _id: req.params.id})
    // const a = imageaa.path
    //  fs.unlinkSync(a[0])
    const data = await PRODUCTO.findByIdAndUpdate(
      { _id: req.params.id },
      
      {
        filename: req.file.filename,
        path: "/products/" + req.file.filename,
      },
      { new: true }
    );

    return res.json({
      message: "success",
      body: data,
    });
  } catch (error) {
    return res.json({
      message: "error",
      body: error,
    });
  }
};
module.exports = ctrls;
