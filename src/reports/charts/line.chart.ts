import * as Utils from 'src/helpers';

export const getLineChart = async (): Promise<string> => {
  const data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
    datasets: [
      {
        label: 'Movimiento de inventario',
        data: Utils.numbers({ count: 6, min: -100, max: 100 }),
        borderColor: Utils.NAMED_COLORS.blue,
        backgroundColor: Utils.transparentize(Utils.NAMED_COLORS.blue, 0.5),
        pointStyle: 'circle',
        pointRadius: 5,
      },
    ],
  };

  const chartConfig = {
    type: 'line',
    data: data,
  };

  const chartImage = await Utils.chartJsToImage(chartConfig, {
    width: 500,
    height: 200,
  });

  return chartImage;
};
