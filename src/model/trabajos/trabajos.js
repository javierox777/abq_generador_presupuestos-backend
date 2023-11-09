const {Schema, model} = require("mongoose")

const schemaSale = new Schema({
    date:String,
    numero:Number,
    supervisor:String,
    trabajadores:[], 
    progress:Number,  
    fechaEnd:String,
    ordencompra:{ type: Schema.Types.ObjectId, ref: 'ordencompras' },
    presupuesto:{ type: Schema.Types.ObjectId, ref: 'presupuestos' },
    gastos:[]
    
})


module.exports = model("trabajos", schemaSale)