import { Injectable } from '@nestjs/common';

import PdfPrinter from 'pdfmake';
import {
  BufferOptions,
  CustomTableLayout,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';

//* Servicio para generar PDFs

const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalicts: 'fonts/Roboto-MediumItalic.ttf',
  },
};

//* Layout de tabla personalizada para diseño de tablas de PDF se ocupan con la propiedad 'layout' de la definicion de la tabla de PDF
const customTableLayouts: Record<string, CustomTableLayout> = {
  customLayout01: {
    // Ancho horizontal de las lineas de la tabla
    hLineWidth: function (i, node) {
      if (i === 0 || i === node.table.body.length) {
        return 0;
      }
      return i === node.table.headerRows ? 2 : 1;
    },
    // Ancho vertical de las lineas de la tabla
    vLineWidth: function () {
      return 0;
    },
    // Colores de las lineas horizontales
    hLineColor: function (i) {
      return i === 1 ? 'black' : '#bbb';
    },
    // padding izquierdo de las celdas
    paddingLeft: function (i) {
      return i === 0 ? 0 : 8;
    },
    // padding derecho de las celdas
    paddingRight: function (i, node) {
      return i === node.table.widths.length - 1 ? 0 : 8;
    },
    // color de fondo de las celdas
    // i = indice de la fila, node = nodo de la tabla
    // node.table.body = cuerpo de la tabla, node.table.body.length = longitud del cuerpo de la tabla
    fillColor: function (i, node) {
      if (i === 0) return '#000';
      if (i === node.table.body.length - 1) return '#ccc';

      return i % 2 === 0 ? '#f3f3f3' : null;
    },
  },
};

@Injectable()
export class PrinterService {
  //* Configurar PdfMake y fuentes de PDF
  private printer = new PdfPrinter(fonts);

  createPdf(
    docDefinition: TDocumentDefinitions,
    options: BufferOptions = { tableLayouts: customTableLayouts },
  ) {
    return this.printer.createPdfKitDocument(docDefinition, options);
  }
}
