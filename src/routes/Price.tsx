import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinChart } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";
import { type } from "os";
import styled from "styled-components";

interface ChartProps {
  coinId: string;
}

interface IData {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: string;
  close: number;
  volume: string;
  market_cap: number;
}

const Minji = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.accentColor};
  border-radius: 20px;
  height: 100px;
`;

const MinjiItem = styled.span`
  margin-top: 10px;
  font-weight: 800;
`;

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);

  const { isLoading, data } = useQuery<IData[]>(["priceChart", coinId], () =>
    fetchCoinChart(coinId)
  );
  const startPrice = data?.slice(0, 1).map((p) => p.open);
  const endPrice = data?.slice(0, 1).map((p) => p.open - p.close);
  const result = endPrice
    ?.reduce((total, currentValue) => (total = currentValue), 0)
    .toFixed(2);

  return (
    <Minji>
      <span>Today's Result</span>
      <MinjiItem>${result}</MinjiItem>
    </Minji>
  );
}

export default Chart;
