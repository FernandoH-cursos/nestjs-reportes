import { getBarChart, getDonutChart, getLineChart } from './charts';

import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { footerSection, headerSection } from './sections';

interface TopCountry {
  country: string;
  customers: number;
}

interface ReportOptions {
  title?: string;
  subTitle?: string;
  topCountries: TopCountry[];
}

export const getStatisticsReport = async (options: ReportOptions) => {
  const [donutChart, lineChart, barChart1, barChart2] = await Promise.all([
    getDonutChart({
      entries: options.topCountries.map((country) => ({
        label: country.country,
        value: country.customers,
      })),
      position: 'left',
    }),
    getLineChart(),
    getBarChart(),
    getBarChart(),
  ]);

  const docDefinition: TDocumentDefinitions = {
    pageMargins: [40, 100, 40, 60],
    header: headerSection({
      title: options.title || 'Estadísticas de Clientes',
      subTitle: options.subTitle || 'Top 10 Países con más Clientes',
    }),
    footer: footerSection,
    content: [
      {
        columns: [
          {
            stack: [
              {
                text: '10 países con más clientes',
                alignment: 'center',
                margin: [0, 0, 0, 10],
                bold: true,
              },
              {
                image: donutChart,
                width: 300,
              },
            ],
          },
          {
            layout: 'lightHorizontalLines',
            width: 'auto',
            table: {
              headerRows: 1,
              widths: [100, '*'],
              body: [
                ['País', 'Clientes'],
                ...options.topCountries.map((country) => [
                  country.country,
                  country.customers,
                ]),
              ],
            },
          },
        ],
      },
      {
        image: lineChart,
        width: 500,
        margin: [0, 20],
      },
      {
        columnGap: 10,
        columns: [
          {
            image: barChart1,
            width: 250,
          },
          {
            image: barChart2,
            width: 250,
          },
        ],
      },
    ],
  };

  return docDefinition;
};
