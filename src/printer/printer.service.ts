import { Injectable } from '@nestjs/common';

import PdfPrinter from 'pdfmake';
import { BufferOptions, TDocumentDefinitions } from 'pdfmake/interfaces';

//* Servicio para generar PDFs

const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalicts: 'fonts/Roboto-MediumItalic.ttf',
  },
};

@Injectable()
export class PrinterService {
  //* Configurar PdfMake y fuentes de PDF
  private printer = new PdfPrinter(fonts);

  createPdf(docDefinition: TDocumentDefinitions, options?: BufferOptions) {
    return this.printer.createPdfKitDocument(docDefinition, options);
  }
}
