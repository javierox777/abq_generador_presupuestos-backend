const {Router} = require("express")
const router  = Router()
const {allClients, createClient, updateClient, deleteClient} = require("../../controllers/client/controllers.clients")



router.get("/allclients", allClients)
router.post("/createclient", createClient)
router.put("/updateclient/:id", updateClient)
router.delete("/deleteclient/:id", deleteClient)


module.exports = router