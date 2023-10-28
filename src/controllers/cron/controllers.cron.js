
const cron = require('node-cron')
const {createMailPresupuesto}=require("../../controllers/mail/mail")
const PRESUPUESTO   = require("../../model/presupuesto/presupuesto")
const moment =require("moment")
require ('moment/locale/es');
const ctrls = {}

var fecha = new Date();
let dia = (fecha.getDay())

// const hoy=moment().format('YYYY/MM/DD')
const hoy=moment().format('YYYY-MM-DD')
//const hoyMenosUno = moment().subtract(1, 'days').format('YYYY-MM-DD');


ctrls.cronn =()=>{ cron.schedule('00 08 * * * ',async ()=>{ // esta linea permite la auto ejecucion de la funcion de cron
        console.log("cron funcioando ")

        const Presupuesto = await PRESUPUESTO.find({"dateVencimientoOC" : hoy})
        
        Presupuesto.map(async(e)=>{
            createMailPresupuesto(e._id)
              console.log("mandando id de user", e._id)
            }

    
        )
}
)
}


module.exports = ctrls
