const {Schema, model} = require("mongoose")

const schemaSale = new Schema({
    date:String,
    numero:Number,
    supervisor:String,
    trabajadores:[], 
    progress:String,  
    fechaEnd:String,
    presupuesto:{ type: Schema.Types.ObjectId, ref: 'presupuestos' },
    gastos:[]
})


module.exports = model("trabajos", schemaSale)