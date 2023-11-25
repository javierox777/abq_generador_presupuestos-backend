const { Router } = require("express");
const router = Router();
const {
  createPresupuesto,
  allPresupuestosforNumber,
  allPresupuestos,
  deletePresupuesto,
  getPresupuestoId,
  updatePresupuesto,
  updateAllPresupuesto
} = require("../../controllers/presupuesto/controllers.presupesto");
 const Auth = require("../../helper/auth");

router.put("/updatepresupuesto/:id", updatePresupuesto);
router.put("/updateallpresupuesto/:id", updateAllPresupuesto);
router.get("/allpresupuestosfornumber", allPresupuestosforNumber);
router.get("/allpresupuestos", allPresupuestos);
router.post("/createpresupuesto/:id?", createPresupuesto);
router.delete("/deletepresupuesto/:id", deletePresupuesto);
router.get("/getpresupuestoid/:id", getPresupuestoId);

// router.put("/updateproductimage/:id", updateProductImage)Auth.verificartoken,

module.exports = router;
