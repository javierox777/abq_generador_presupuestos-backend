const {createSupplie, getSuplies, deleteSupplies} = require("../../controllers/supplies/supplies")
const {Router} = require("express")
const router = Router()




router.post("/createsupplie", createSupplie)
router.get("/allsupplies", getSuplies)
router.delete("/deletesupplies/:id", deleteSupplies)







module.exports = router