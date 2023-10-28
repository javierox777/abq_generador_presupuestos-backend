const {Router} = require("express")
const router = Router()
const {allSale, createSale, allProductM, allsalesId, deleteSale} = require("../../controllers/sale/controlles.sales")
const {allSalesMonth} = require("../../controllers/chart/chartSalesMonth")


router.get("/allsalesm", allProductM)
router.get("/chart/allsalesmonth", allSalesMonth)
router.get("/allsalesid/:id", allsalesId)
router.get("/allsales", allSale)
router.post("/createsale", createSale)
router.delete("/deletesale/:id", deleteSale)





module.exports = router