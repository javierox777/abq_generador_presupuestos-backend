const app = require("./app")
require("./database")
const {cronn}= require("./controllers/cron/controllers.cron")



function main (){
  app.listen(app.get("port"))
  console.log("server is on port :", app.get("port"))
  cronn()
}


main()