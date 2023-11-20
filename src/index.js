const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
require("./database")
const {cronn}= require("./controllers/cron/controllers.cron")

//setting
app.set('port', process.env.PORT || 3005);

//multer
app.use(express.urlencoded({ extended: false }));
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/products'),
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});
// end multer

app.use(
  multer({
    storage: storage,
    dest: path.join(__dirname, 'public/products'),
  }).single('image')
); // filena
//middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//router

//user
app.use('/api/user/', require('./router/user/router.user'));
//productos
app.use('/api/product', require('./router/producto/router.producto'));
//sale
app.use('/api/sale', require('./router/sale/router.sale'));
//client
app.use('/api/client', require('./router/client/router.client'));
//task
app.use('/api/task', require('./router/task/router.task'));
//presupuesto
app.use(
  '/api/presupuesto/',
  require('./router/presupuesto/router.presupuesto')
);
//orden de compra
app.use(
  '/api/ordencompra/',
  require('./router/ordenCompra/router.ordenCompra')
);
//supplies
app.use('/api/supplies', require('./router/supplies/router.supplies'));
//trabajo
app.use('/api/trabajo', require('./router/trabajo/router.trabajos'));
//client users(customers)
app.use('/api/clientusers', require('./router/clientUser/router.clientUser'));

//static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get("port"), ()=>{
  console.log("el servidor esta en el puerto :", app.get("port"))
    cronn()
})
module.exports = app;
