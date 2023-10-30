const { Router } = require("express");
const router = Router();
const {
  createOC,
  allOC
 
} = require("../../controllers/ordenDeCompra/controllers.OrdenCompra");
 const Auth = require("../../helper/auth");

// router.put("/updatepresupuesto/:id", updatePresupuesto);
// router.put("/updateallpresupuesto/:id", updateAllPresupuesto);
router.get("/alloc", allOC);
router.post("/createoc", createOC);
// router.delete("/deletepresupuesto/:id", deletePresupuesto);
// router.get("/getpresupuestoid/:id", getPresupuestoId);

// router.put("/updateproductimage/:id", updateProductImage)Auth.verificartoken,

module.exports = router;
