import fs from 'fs';

import { Injectable } from '@nestjs/common';

import { PrinterService } from 'src/printer/printer.service';
import { getHtmlContent } from 'src/helpers';

import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { footerSection, headerSection } from 'src/reports';

@Injectable()
export class ExtraReportsService {
  constructor(private readonly printerService: PrinterService) {}

  getHtmlReport() {
    //* Leemos el archivo HTML que contiene el reporte
    const html = fs.readFileSync('src/reports/html/basic-03.html', 'utf-8');
    // console.log(html);

    const content = getHtmlContent(html, {
      client: 'Fernando Herrera',
      title: 'Curso de Node.js',
    });

    const docDefinition: TDocumentDefinitions = {
      pageMargins: [40, 110, 40, 60],
      header: headerSection({
        title: 'HTML to PDFMake',
        subTitle: 'Convertir HTML a PDFMake',
      }),
      footer: footerSection,
      content: content,
    };

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }
}
