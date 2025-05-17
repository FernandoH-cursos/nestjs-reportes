import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { StoreReportsService } from './store-reports.service';
import { Response } from 'express';

@Controller('store-reports')
export class StoreReportsController {
  constructor(private readonly storeReportsService: StoreReportsService) {}

  @Get('orders/:orderId')
  async getOrderReport(
    @Res() response: Response,
    @Param('orderId', ParseIntPipe) orderId: number,
  ) {
    const pdfDoc = await this.storeReportsService.getOrderByIdReport(orderId);

    response.setHeader('Content-Type', 'application/pdf');

    pdfDoc.info.Title = `Order-Report`;

    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
