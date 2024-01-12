import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const generatePDF = ({name, data, columns}) => {
    // Crea una instancia de jsPDF
    const doc = new jsPDF();
  
    // Define la data para la tabla
    // [
    //   { id: 1, name: 'John Doe', email: 'john@example.com' },
    //   { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    //   // Agrega más filas de acuerdo a tu data
    // ];
  
    // Define las columnas de la tabla
    
    // [
    //   { header: 'ID', dataKey: 'id' },
    //   { header: 'Nombre', dataKey: 'name' },
    //   { header: 'Email', dataKey: 'email' },
    //   // Agrega más columnas de acuerdo a tu data
    // ];
  
    // Agrega la tabla al PDF utilizando jspdf-autotable
    doc.autoTable({
      head: [columns.map((column) => column.header)],
      body: data.map((row) => columns.map((column) => row[column.dataKey])),
    });
  
    // Guarda el PDF
    doc.save(`${name}.pdf`);
  };

  export default generatePDF;