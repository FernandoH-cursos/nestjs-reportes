import { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections';

const styles: StyleDictionary = {
  header: {
    fontSize: 22,
    bold: true,
    alignment: 'center',
    margin: [0, 20, 0, 60],
  },
  body: {
    alignment: 'justify',
    margin: [0, 0, 0, 50],
  },
  signature: {
    fontSize: 14,
    bold: true,
  },
  footer: {
    fontSize: 10,
    italics: true,
    alignment: 'center',
    margin: [0, 20, 0, 0],
  },
};

interface ReportValues {
  employerName: string;
  employerPosition: string;
  employeeName: string;
  employeePosition: string;
  employeeStartDate: string;
  employeeHours: number;
  employeeWorkSchedule: string;
  employerCompany: string;
}

export const getEmploymentLetterByIdReport = (
  values: ReportValues,
): TDocumentDefinitions => {
  const {
    employerName,
    employerPosition,
    employeeName,
    employeePosition,
    employeeStartDate,
    employeeHours,
    employeeWorkSchedule,
    employerCompany,
  } = values;

  const docDefinition: TDocumentDefinitions = {
    //* Estilos de PDF
    styles: styles,
    pageMargins: [40, 60, 40, 60], // Left, Top, Right, Bottom
    //* Header del PDF
    header: headerSection({}),
    //* Contenido del PDF estructurado en un array
    content: [
      {
        text: 'CONSTANCIA DE EMPLEO',
        //* Referencia a los estilo definido(como una clase)
        style: 'header',
      },
      {
        text: `
        Yo, ${employerName}, en mi calidad de ${employerPosition} de ${employerCompany}, por medio de la presente certifico que ${employeeName} ha sido empleado en nuestra empresa desde el ${employeeStartDate}. \n\n
        Durante su empleo, el Sr./Sra. ${employeeName} ha desempeñado el cargo de ${employeePosition}, demostrando responsabilidad, compromiso y habilidades profesionales en sus labores.\n\n
        La jornada laboral del Sr./ Sra. ${employeeName} es de ${employeeHours} horas semanales, con un horario de ${employeeWorkSchedule}, cumpliendo con las políticas y procedimientos establecidos por la empresa.\n\n
        Esta constancia se expide a solicitud del interesado para los fines que considere conveniente. \n\n
        `,
        style: 'body',
      },
      {
        text: employerName,
        style: 'signature',
      },
      {
        text: employerPosition,
        style: 'signature',
      },
      {
        text: employerCompany,
        style: 'signature',
      },
      {
        text: employeeStartDate,
        style: 'signature',
      },
    ],
    footer: {
      text: 'Este documento es una constancia de empleo y no representa un compromiso laboral.',
      style: 'footer',
    },
  };

  return docDefinition;
};
