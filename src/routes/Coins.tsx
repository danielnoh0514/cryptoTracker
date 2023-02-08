import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";

const Container = styled.div`
  padding: 0px 15px;
  max-width: 480px;
  margin: 0px auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;

  border-radius: 20px;

  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }

  a {
    display: flex;
    transition: color 0.2s ease-in;
    padding: 15px;
    align-items: center;
  }
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 40px;
  color: ${(props) => props.theme.accentColor};
`;

const Loading = styled.span`
  font-weight: 600;
  font-size: 25px;
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const setterFn = useSetRecoilState(isDarkAtom);
  const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>Crypto Currency</title>
      </Helmet>
      <Header>
        <Title>Crypto Currency</Title>
        <button onClick={() => setterFn((prev) => !prev)}>Mode</button>
      </Header>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;{" "}
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;
