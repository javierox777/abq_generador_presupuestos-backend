const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

const ctrs = {};

ctrs.CrearPDF = async (req, res) => {
  try {
    const NombreProyecto = req.query.NameProyect;
    const codework = req.query.Codework;
    const tasks = req.query.Task;

    console.log("Estoy aquí. Nombre del proyecto:", NombreProyecto, "Código:", codework, "Tareas:", tasks);

    // Leer el archivo PDF existente
    const existingPdfPath = path.join(__dirname, '../../public/Presupuesto.pdf');
    const existingPdfBytes = fs.readFileSync(existingPdfPath);

    // Cargar el PDF existente
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Obtener el formulario del PDF
    const form = pdfDoc.getForm();

    // Rellenar campos fijos
    const NombreField = form.getTextField("NombreProyecto");
    NombreField.setText(NombreProyecto);

    const CodigoField = form.getTextField('Codigo');
    CodigoField.setText(codework);

    // Obtener la página del formulario (ajusta el número de página según tu PDF)


    
    
    

    // Guardar el PDF modificado en un archivo con nombre único
    const modifiedPdfBytes = await pdfDoc.save();
    const filename = `Presupuesto_${Date.now()}.pdf`;
    const outputPath = path.join(__dirname, '../../public', filename);
    fs.writeFileSync(outputPath, modifiedPdfBytes);

    const filePath = path.join(__dirname, '../../public', filename);
    fs.writeFileSync(filePath, modifiedPdfBytes);

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

  } catch (error) {
    console.log('Error al generar el documento PDF:', error);
    throw new Error('Ocurrió un error al generar el documento PDF');
  }
};

module.exports = ctrs;