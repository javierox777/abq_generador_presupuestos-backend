const {Router} = require("express")
const router = Router()
const {signup, login, allSeller, updateUser, deleteUser, allUser} = require("../../controllers/user/controllers.user")
const {verify} = require("../../controllers/user/userInit")



router.post("/signup", signup)
router.post("/signin", login)
router.get('/init', verify )
router.get('/allsellers', allSeller )
router.get('/allusers', allUser )
router.put('/updateseller/:id', updateUser )
router.delete('/deleteseller/:id', deleteUser )


module.exports = router