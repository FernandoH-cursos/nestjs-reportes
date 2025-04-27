import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DateFormatter } from 'src/helpers';

import { PrinterService } from 'src/printer/printer.service';
import {
  getEmploymentLetterByIdReport,
  getEmploymentLetterReport,
  getHelloWorldReport,
} from 'src/reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  constructor(private readonly printerService: PrinterService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    console.log('Connected to the database');
  }

  hello() {
    const docDefinition = getHelloWorldReport({
      name: 'Moises prado',
    });

    //* Generar el el documento PDF
    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  employmentLetter() {
    const docDefinition = getEmploymentLetterReport();

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  async employmentLetterById(employeeId: number) {
    const employee = await this.employees.findUnique({
      where: {
        id: employeeId,
      },
    });
    if (!employee) {
      throw new NotFoundException(`Employee with id ${employeeId} not found`);
    }

    const docDefinition = getEmploymentLetterByIdReport({
      employerName: 'Fernando Herrera',
      employerPosition: 'Gerente de RRHH',
      employerCompany: 'Tucan Code Corp.',
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeHours: employee.hours_per_day,
      employeeStartDate: DateFormatter.getDDMMMMYYYY(employee.start_date),
      employeeWorkSchedule: employee.work_schedule,
    });

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }
}
