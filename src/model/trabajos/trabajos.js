const {Schema, model} = require("mongoose")

const schemaSale = new Schema({
    date:String,
    numero:Number,
    supervisor:String,
    trabajadores:[], 
    comentarios: [
        {
          paso: Number,
          comentario: String,
        },
      ],
    progress:Number,  
    fechaEnd:String,
    ordencompra:{ type: Schema.Types.ObjectId, ref: 'ordencompras' },
    presupuesto:{ type: Schema.Types.ObjectId, ref: 'presupuestos' },
    gastos:[{numero:Number, nombre:String, descripcion:String, cantidad:Number, precioUnitario:Number,  total:Number}]
    
})


module.exports = model("trabajos", schemaSale)