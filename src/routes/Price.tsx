import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinChart } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";
import { type } from "os";
import styled from "styled-components";
import { useState } from "react";

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

interface IError {
  error: string;
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

const Span = styled.span`
  display: block;
  text-align: center;
  font-size: 20px;
  font-weight: 800;
`;

function Price({ coinId }: ChartProps) {
  const [info, setInfo] = useState(false);
  const { isLoading, data } = useQuery<IData[]>(["priceChart", coinId], () =>
    fetchCoinChart(coinId)
  );

  const result = data ?? [];
  let minji = null;
  if (Array.isArray(data)) {
    minji = result
      .reduce((start, current) => {
        return +start + (+current.open - +current.close);
      }, 0)
      .toFixed(2);
  }

  return (
    <div>
      {minji ? (
        isLoading ? (
          "Chart Loading..."
        ) : (
          <Minji>
            <span>Current Value</span>
            <MinjiItem>$ {+minji > 0 ? "+" + minji : minji}</MinjiItem>
          </Minji>
        )
      ) : (
        <Span>Data Not Found</Span>
      )}
    </div>
  );
}

export default Price;
