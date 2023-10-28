const app = require("./app")
require("./database")
const {cronn}= require("./controllers/cron/controllers.cron")



function main(){
    app.listen(app.get("port"))
    console.log("el servidor esta en el puerto :", app.get("port"))
    cronn()
}



main()