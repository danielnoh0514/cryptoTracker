import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

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

const Mode = styled.button`
  padding: 5px;
  border-radius: 10px;
  background-color: transparent;
  border: none;
  font-size: 25px;

  &:hover {
    color: ${(props) => props.theme.accentColor};
    transition: 0.3s color ease-in-out;
  }
`;

function Coins() {
  const [isDark, setterFn] = useRecoilState(isDarkAtom);
  const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>Crypto Currency</title>
      </Helmet>
      <Header>
        <Title>Crypto Currency</Title>
        <Mode onClick={() => setterFn((prev) => !prev)}>
          {isDark ? (
            <FontAwesomeIcon icon={faMoon} />
          ) : (
            <FontAwesomeIcon icon={faSun} />
          )}
        </Mode>
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
                  src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
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
