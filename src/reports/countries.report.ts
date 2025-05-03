import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { footerSection, headerSection } from './sections';
import { countries as Country } from '@prisma/client';

interface ReportValues {
  title?: string;
  subTitle?: string;
  countries: Country[];
}

export const getCountriesReport = (
  values: ReportValues,
): TDocumentDefinitions => {
  const { title, subTitle, countries } = values;

  const docDefinition: TDocumentDefinitions = {
    //* 'pageOrientation' puede ser 'landscape' o 'portrait' que sirve para cambiar la orientacion de la pagina del PDF
    pageOrientation: 'landscape',
    header: headerSection({
      title,
      subTitle,
    }),
    footer: footerSection,
    pageMargins: [40, 110, 40, 60], // left, top, right, bottom
    content: [
      {
        /*
         * 'layout' es el diseño de la tabla:
         * - 'lightHorizontalLines' es un diseño predefinido que tiene lineas horizontales ligeras.
         * - 'noBorders' es un diseño predefinido que no tiene bordes.
         * - 'headerLineOnly' es un diseño predefinido que solo tiene lineas en la cabecera.
         * - 'customLayout01' es un diseño personalizado que se define en el archivo printer.service.ts
         */
        // layout: 'lightHorizontalLines',
        layout: 'customLayout01',
        table: {
          //* 'headerRows' indica cuantas filas de la tabla son cabeceras, en este caso 1.
          headerRows: 1,
          //* 'widths' indica el ancho de cada columna, '*' indica que la columna ocupa el espacio restante, 'auto' indica que la columna
          //* ocupa el espacio necesario y '100' indica que la columna ocupa 100 puntos de ancho.
          widths: [50, 50, 70, '*', 'auto', '*'],
          body: [
            //* Columnas de la tabla, en este caso son 6 columnas.
            ['ID', 'ISO2', 'ISO3', 'Name', 'Continent', 'Local Name'].map(
              (header) => ({
                text: header,
                color: 'white',
              }),
            ),
            //* Filas de la tabla, en este caso son 6 filas formateadas para que se vean bien.
            ...countries.map((country) => [
              String(country.id),
              country.iso2,
              country.iso3,
              country.name,
              { text: country.continent, bold: true },
              country.local_name,
            ]),
            ['', '', '', '', '', ''],
            [
              '',
              '',
              '',
              '',
              'Total',
              {
                text: `${countries.length} paises`,
                bold: true,
              },
            ],
          ],
        },
      },
      //* Tabla de totales
      {
        text: 'Totales',
        style: {
          fontSize: 18,
          bold: true,
          margin: [0, 40, 0, 10],
        },
      },
      {
        layout: 'noBorders',
        table: {
          headerRows: 1,
          widths: [50, 50, 70, '*', 'auto', '*'],
          body: [
            [
              {
                text: 'Total de paises',
                colSpan: 2,
                bold: true,
              },
              {},
              {
                text: `${countries.length} paises`,
                bold: true,
              },
              {},
              {},
              {},
            ],
          ],
        },
      },
    ],
  };

  return docDefinition;
};
