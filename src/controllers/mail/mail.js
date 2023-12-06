const nodemailer = require('nodemailer')
const PRESUPUESTO = require("../../model/presupuesto/presupuesto")
const moment = require("moment")
require('moment/locale/es');

var ctrl = {};

const hoy=moment()

const sumardias = 3

const nuevaFecha = hoy.add(sumardias, 'days');
const hoyMasTres=nuevaFecha.format('YYYY-MM-DD')


ctrl.createMailPresupuesto = async (data) => {
    console.log("mail data por aca");
    const Presupuesto = data;
   console.log("data opr aca",data)

    const contentHTML = `
        Presupuesto que se vencen hoy
    
        Junto con saludar se informa que el  siguientes trabajo con fecha de termino ${hoyMasTres} esta por vencer 
        Numero de presupuesto : ${Presupuesto.number}  
        Empresa               : ${Presupuesto.client.name}    
    
   
    `;

    let transporter = await nodemailer.createTransport({
        host: 'mail.abqlimitada.cl',
        port: 465,
        secure: true,
        auth: {
            user: 'gerencia@abqlimitada.cl',
            pass: 'vicente.2023'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let info = await transporter.sendMail({
        from: '"ABQ gerencia" <gerencia@abqlimitada.cl>',
        to: 'chimen.chiang@abqlimitada.cl, vicente.chiang@abqlimitada.cl, tomas.aguayo@abqlimitada.cl, patricio.aguayo@abqlimitada.cl, juan.jorquera@abqlimitada.cl, jenny.cisternas@abqlimitada.cl, gerencia@abqlimitada.cl',
        subject: 'Trabajo por vencer',
        text: 'reporte' + contentHTML
    });

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};

module.exports = ctrl;
