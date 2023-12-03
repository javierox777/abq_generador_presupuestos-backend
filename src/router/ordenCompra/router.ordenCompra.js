const { Router } = require("express");
const router = Router();
const {
  createOC,
  allOC,
  updateOC,
  updateStateOC
 
} = require("../../controllers/ordenDeCompra/controllers.OrdenCompra");
 const Auth = require("../../helper/auth");

 router.put("/updatealloc/:id", updateOC);
 router.put("/updatestateoc/:id", updateStateOC);
// router.put("/updateallpresupuesto/:id", updateAllPresupuesto);
router.get("/alloc", allOC);
router.post("/createoc", createOC);
// router.delete("/deletepresupuesto/:id", deletePresupuesto);
// router.get("/getpresupuestoid/:id", getPresupuestoId);

// router.put("/updateproductimage/:id", updateProductImage)Auth.verificartoken,

module.exports = router;
