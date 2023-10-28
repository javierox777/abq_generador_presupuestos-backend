const {Router} = require("express")
const router = Router()
const {createTask, allTask, updateTask, deleteTask} = require("../../controllers/task/controllers.task")




router.post("/createtask", createTask)
router.get("/alltasks", allTask)
router.put("/updatetask/:id", updateTask)
router.delete("/deletetask/:id", deleteTask)



module.exports = router