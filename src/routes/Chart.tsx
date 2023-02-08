import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinChart } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";
import { type } from "os";

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

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);

  const { isLoading, data } = useQuery<IData[]>(["priceChart", coinId], () =>
    fetchCoinChart(coinId)
  );
  console.log(data);
  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: [
                {
                  x: data?.slice(0, 1).map((p) => p.time_close),
                  y: [
                    data?.slice(0, 1).map((p) => p.open),
                    data?.slice(0, 1).map((p) => p.high),
                    data?.slice(0, 1).map((p) => p.low),
                    data?.slice(0, 1).map((p) => p.close),
                  ],
                },
                {
                  x: data?.slice(1, 2).map((p) => p.time_close),
                  y: [
                    data?.slice(1, 2).map((p) => p.open),
                    data?.slice(1, 2).map((p) => p.high),
                    data?.slice(1, 2).map((p) => p.low),
                    data?.slice(1, 2).map((p) => p.close),
                  ],
                },
                {
                  x: data?.slice(2, 3).map((p) => p.time_close),
                  y: [
                    data?.slice(2, 3).map((p) => p.open),
                    data?.slice(2, 3).map((p) => p.high),
                    data?.slice(2, 3).map((p) => p.low),
                    data?.slice(2, 3).map((p) => p.close),
                  ],
                },
                {
                  x: data?.slice(4, 5).map((p) => p.time_close),
                  y: [
                    data?.slice(4, 5).map((p) => p.open),
                    data?.slice(4, 5).map((p) => p.high),
                    data?.slice(4, 5).map((p) => p.low),
                    data?.slice(4, 5).map((p) => p.close),
                  ],
                },
                {
                  x: data?.slice(5, 6).map((p) => p.time_close),
                  y: [
                    data?.slice(5, 6).map((p) => p.open),
                    data?.slice(5, 6).map((p) => p.high),
                    data?.slice(5, 6).map((p) => p.low),
                    data?.slice(5, 6).map((p) => p.close),
                  ],
                },
                {
                  x: data?.slice(6, 7).map((p) => p.time_close),
                  y: [
                    data?.slice(6, 7).map((p) => p.open),
                    data?.slice(6, 7).map((p) => p.high),
                    data?.slice(6, 7).map((p) => p.low),
                    data?.slice(6, 7).map((p) => p.close),
                  ],
                },
                {
                  x: data?.slice(7, 8).map((p) => p.time_close),
                  y: [
                    data?.slice(7, 8).map((p) => p.open),
                    data?.slice(7, 8).map((p) => p.high),
                    data?.slice(7, 8).map((p) => p.low),
                    data?.slice(7, 8).map((p) => p.close),
                  ],
                },
                {
                  x: data?.slice(8, 9).map((p) => p.time_close),
                  y: [
                    data?.slice(8, 9).map((p) => p.open),
                    data?.slice(8, 9).map((p) => p.high),
                    data?.slice(8, 9).map((p) => p.low),
                    data?.slice(8, 9).map((p) => p.close),
                  ],
                },
                {
                  x: data?.slice(9, 10).map((p) => p.time_close),
                  y: [
                    data?.slice(9, 10).map((p) => p.open),
                    data?.slice(9, 10).map((p) => p.high),
                    data?.slice(9, 10).map((p) => p.low),
                    data?.slice(9, 10).map((p) => p.close),
                  ],
                },
                {
                  x: data?.slice(10, 11).map((p) => p.time_close),
                  y: [
                    data?.slice(10, 11).map((p) => p.open),
                    data?.slice(10, 11).map((p) => p.high),
                    data?.slice(10, 11).map((p) => p.low),
                    data?.slice(10, 11).map((p) => p.close),
                  ],
                },
                {
                  x: data?.slice(11, 12).map((p) => p.time_close),
                  y: [
                    data?.slice(11, 12).map((p) => p.open),
                    data?.slice(11, 12).map((p) => p.high),
                    data?.slice(11, 12).map((p) => p.low),
                    data?.slice(11, 12).map((p) => p.close),
                  ],
                },
              ],
            },
          ]}
          options={{
            chart: { height: "350" },
            xaxis: {
              type: "datetime",
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
