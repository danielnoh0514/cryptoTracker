import { useQuery } from "react-query";
import { fetchCoinChart } from "../api";
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

const PriceInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.accentColor};
  border-radius: 20px;
  height: 100px;
`;

const PriceInfoItem = styled.span`
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
  const { isLoading, data } = useQuery<IData[]>(["priceChart", coinId], () =>
    fetchCoinChart(coinId)
  );

  const result = data ?? [];
  let priceInfo = null;
  if (Array.isArray(data)) {
    priceInfo = result
      .reduce((start, current) => {
        return +start + (+current.close - +current.open);
      }, 0)
      .toFixed(2);
  }

  return (
    <div>
      {priceInfo ? (
        isLoading ? (
          "Chart Loading..."
        ) : (
          <PriceInfo>
            <span>Result Over Last 20 Days</span>
            <PriceInfoItem>
              $ {+priceInfo > 0 ? "+" + priceInfo : priceInfo}
            </PriceInfoItem>
          </PriceInfo>
        )
      ) : (
        <Span>Data Not Found</Span>
      )}
    </div>
  );
}

export default Price;
