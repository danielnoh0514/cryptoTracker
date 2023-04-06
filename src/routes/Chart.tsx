import { useQuery } from "react-query";
import { fetchCoinChart } from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";

interface ChartProps {
  coinId: string;
}

interface IData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: number;
  volume: string;
  market_cap: number;
}

const Span = styled.span`
  display: block;
  text-align: center;
  font-size: 20px;
  font-weight: 800;
`;

function Chart({ coinId }: ChartProps) {
  const { data } = useQuery<IData[]>(["priceChart", coinId], () =>
    fetchCoinChart(coinId)
  );

  const exceptData = data ?? [];
  let chartData = null;
  if (Array.isArray(data)) {
    chartData = exceptData?.map((i) => {
      console.log(i.time_close);

      // Converting epoch to human-readable date

      let epochTime = i.time_close;
      let date = new Date(epochTime * 1000);
      let options = { month: "short", day: "numeric" };
      let humanDate = date.toLocaleDateString(undefined, options as any);

      return {
        x: humanDate,
        y: [i.open, i.high, i.low, i.close],
      };
    });
  }

  return (
    <div>
      {chartData ? (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: chartData,
            },
          ]}
          options={{
            colors: ["white"],

            chart: { height: "350" },
            xaxis: {
              type: "datetime",
              labels: {
                style: {
                  colors: "black",
                },
              },
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
              labels: {
                style: {
                  colors: "black",
                },
              },
            },
          }}
        />
      ) : (
        <Span>Data Not Found</Span>
      )}
    </div>
  );
}

export default Chart;
