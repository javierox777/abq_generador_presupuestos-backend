const {Router} = require("express")
const router = Router()
const {allInvoices, createInvoice, deleteInvoice, getSellerId} = require("../../controllers/invoice/controllers.invoices")
const { create } = require("../../model/client/client")





router.get("/allinvoices", allInvoices)
router.get("/allinvoicesid/:id", getSellerId)
router.post("/createinvoice", createInvoice)
router.delete("/deleteinvoice/:id", deleteInvoice)



module.exports  = router