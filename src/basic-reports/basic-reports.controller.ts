import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';

import { Response } from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  async hello(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.hello();

    //* Header para que se descargue el PDF
    response.setHeader('Content-Type', 'application/pdf');

    pdfDoc.info.Title = 'Hola-Mundo';

    //* pipe() permite enviar el PDF al cliente y end() cierra el flujo de datos
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter')
  employmentLetter(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.employmentLetter();

    response.setHeader('Content-Type', 'application/pdf');

    pdfDoc.info.Title = 'Employment Letter';

    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter/:employeeId')
  async employmentLetterById(
    @Res() response: Response,
    @Param('employeeId', ParseIntPipe) employeeId: number,
  ) {
    const pdfDoc =
      await this.basicReportsService.employmentLetterById(employeeId);

    response.setHeader('Content-Type', 'application/pdf');

    pdfDoc.info.Title = `Employment Letter ${employeeId}`;

    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('countries')
  async getContriesReport(@Res() response: Response) {
    const pdfDoc = await this.basicReportsService.getCountries();

    response.setHeader('Content-Type', 'application/pdf');

    pdfDoc.info.Title = 'Countries-Report';

    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
