import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';

import { PrinterService } from 'src/printer/printer.service';
import { orderByIdReport } from 'src/reports';

import { PrismaClient } from '@prisma/client';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
  constructor(private readonly printerService: PrinterService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    // console.log('Connected to the database');
  }

  async getOrderByIdReport(orderId: number) {
    const order = await this.orders.findUnique({
      where: { order_id: orderId },
      include: {
        customers: true,
        order_details: {
          include: {
            products: true,
          },
        },
      },
    });

    console.log(JSON.stringify(order, null, 2));

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    const docDefinition = orderByIdReport({
      data: order as any,
    });

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }
}
