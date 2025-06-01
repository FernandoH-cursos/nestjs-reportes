import * as Utils from 'src/helpers';

interface DonutEntry {
  label: string;
  value: number;
}

interface DonutOptions {
  position?: 'left' | 'right' | 'top' | 'bottom';
  entries: DonutEntry[];
}

export const getDonutChart = async (options: DonutOptions): Promise<string> => {
  const { position = 'top' } = options;

  const data = {
    labels: options.entries.map((entry) => entry.label),
    datasets: [
      {
        label: 'Dataset 1',
        data: options.entries.map((entry) => entry.value),
        backgroundColor: Object.values(Utils.CHART_COLORS),
      },
    ],
  };

  /*
   * 'type' es el tipo de gráfico que se va a generar.
   * 'data' contiene los datos que se van a mostrar en el gráfico.
   * 'options' contiene las opciones de configuración del gráfico.
   * 'legend' define la posición de la leyenda del gráfico.
   * 'title' define el título del gráfico.
   * 'plugins' permite configurar los plugins del gráfico, en este caso, 'datalabels' para mostrar etiquetas de datos.
   * 'datalabels' configura el color, peso y tamaño de la fuente de las etiquetas de datos.
   */
  const chartConfig = {
    type: 'doughnut',
    data: data,
    options: {
      legend: {
        position: position,
      },
      /* title: {
        display: true,
        text: 'Top 10 Países con más Clientes',
      }, */
      plugins: {
        datalabels: {
          color: 'white',
          font: {
            weight: 'bold',
            size: 14,
          },
        },
      },
    },
  };

  const chartImage = await Utils.chartJsToImage(chartConfig);

  return chartImage;
};
