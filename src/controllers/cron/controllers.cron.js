
const cron = require('node-cron')
const {createMailPresupuesto}=require("../../controllers/mail/mail")
const PRESUPUESTO   = require("../../model/presupuesto/presupuesto")
const moment =require("moment")
require ('moment/locale/es');
const ctrls = {}

var fecha = new Date();



 const hoy=moment()

const sumardias = 3

const nuevaFecha = hoy.add(sumardias, 'days');
const hoyMasTres=nuevaFecha.format('YYYY-MM-DD')
console.log(hoyMasTres)
//const hoyMenosUno = moment().subtract(1, 'days').format('YYYY-MM-DD');


ctrls.cronn =()=>{ cron.schedule('42 21 * * * ', async ()=>{ // esta linea permite la auto ejecucion de la funcion de cron
        console.log("cron funcioando ")

        const Presupuesto = await PRESUPUESTO.find({"dateVencimientoOC" : hoyMasTres}).where({state:true}).populate('client')
        console.log(Presupuesto)
        
        Presupuesto.map(async(e)=>{
            createMailPresupuesto(e)
            console.log()
             
            }

    
        )
}
)
}


module.exports = ctrls
