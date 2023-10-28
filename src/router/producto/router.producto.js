const {Router} = require("express")
const router = Router()
const {allProductos, createProduct, deleteProduct, updateProduct,updateProductStock, updateProductImage} = require("../../controllers/producto/controllers.productos")



router.get("/allproducts", allProductos)
router.post("/createproduct", createProduct)
router.delete("/deleteproduct/:id", deleteProduct)
router.put("/updateproduct/:id", updateProduct)
router.put("/updateproductstock/:id", updateProductStock)
router.put("/updateproductimage/:id", updateProductImage)




module.exports = router


