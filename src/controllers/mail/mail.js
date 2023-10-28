const nodemailer = require('nodemailer')
const PRESUPUESTO   = require("../../model/presupuesto/presupuesto")
const moment =require("moment")
require ('moment/locale/es');

var ctrl ={}


const hoy=moment().format('YYYY-MM-DD')

ctrl.createMailPresupuesto= async (data) => {
    console.log("mail data por aca")
    const Presupuesto = await PRESUPUESTO.findById({_id : data._id})
    console.log(Presupuesto)
 contentHTML = `
    Presupuesto que se vencen hoy

         Junto con saludar informo los siguientes trabajos estan con  fecha de hoy para su cobro
         Numero de presupuesto : ${Presupuesto.number}  
         Empresa               : ${Presupuesto.client.name}  



     </ul>

 `;

 let transporter =await nodemailer.createTransport({
     host: 'mail.cycmaquinarias.cl',
     port: 587,
     secure: false,
     auth: {
         user: 'c.cuadros@cycmaquinarias.cl',
         pass: 'cuadros.2021'
     },
     tls: {
         rejectUnauthorized: false
     }
 });

 let info = await transporter.sendMail({
     from: '"CyC gerencia" <c.cuadros@cycmaquinarias.cl>', // sender address,
     to: `c.cuadros@cycmaquinarias.cl`,
     subject: 'Cobrar orden de compra',
     text: 'reporte'+
     contentHTML
 })





 console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));



};




module.exports = ctrl
