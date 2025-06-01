import fs from 'fs';

import * as Utils from 'src/helpers';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

//* Se obtiene un string con el contenido del SVG
const svgContent = fs.readFileSync('src/assets/ford.svg', 'utf-8');

export const generateChartImage = async (): Promise<string> => {
  //* Se define la configuración del gráfico utilizando ChartJS Generando un gráfico de barras simple.
  const chartConfig = {
    type: 'bar',
    data: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
      datasets: [
        {
          label: 'Mi primer gráfico',
          data: [65, 59, 80, 81, 56, 55, 10],
          backgroundColor: 'rgba(93, 75, 192, 0.2)',
          borderColor: 'rgb(81, 75, 192)',
          borderWidth: 1,
        },
      ],
    },
  };

  const chartImage = await Utils.chartJsToImage(chartConfig);

  return chartImage;
};

export const generateChartDonut = async (): Promise<string> => {
  const DATA_COUNT = 5;
  const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

  const data = {
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    datasets: [
      {
        label: 'Dataset 1',
        data: Utils.numbers(NUMBER_CFG),
        backgroundColor: Object.values(Utils.CHART_COLORS),
      },
    ],
  };

  //* Generando un gráfico de dona simple.
  const chartConfig = {
    type: 'doughnut',
    data: data,
    options: {
      title: {
        display: true,
        text: 'Chart.js Doughnut Chart',
      },
    },
  };

  const chartImage = await Utils.chartJsToImage(chartConfig, {
    width: 500,
    height: 500,
  });

  return chartImage;
};

export const getBasicChartSvgReport =
  async (): Promise<TDocumentDefinitions> => {
    const [chart, chartDonut] = await Promise.all([
      generateChartImage(),
      generateChartDonut(),
    ]);

    return {
      content: [
        {
          //* Se define el tipo de contenido como SVG
          svg: svgContent,
          //* Se define el ancho del SVG
          width: 100,
          //* 'fit' se usa para ajustar el SVG al ancho y alto especificados. El SVG se escalará para que quepa en el espacio definido.
          fit: [100, 100],
        },
        {
          //* Se define el tipo de contenido como imagen
          image: chart,
          //* Se define el ancho de la imagen
          width: 500,
          //* Se define el alto de la imagen
          height: 500,
        },
        {
          image: chartDonut,
          width: 500,
          height: 500,
        },
      ],
    };
  };
