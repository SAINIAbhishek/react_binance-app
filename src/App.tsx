import React, {useState} from 'react';
import {GlobalStyles} from "./styles/Global.styles";
import {Error, Title} from "./styles/Typogragphy.styles";
import {FlexCenteredWrapper, MainWrapper, SectionWrapper} from "./styles/Wrappers.styles";
import {SelectCurrency} from "./components/SelectCurrency/SelectCurrency";
import {CurrencyPairs} from "./types/CurrencyPairs";
import {Ticker} from "./components/Ticker/Ticker";
import {TickerType} from "./types/Ticker";
import {BINANCE_BASE_API_URL} from "./apis/binance";
import {TradeType} from "./types/Trade";
import {Loader} from "./shared/loader/Loader";
import {Trades} from "./components/Trades/Trades";
import axios from "axios";

function App() {
  const [ticker, setTicker] = useState<TickerType>({} as TickerType);
  const [ticker24h, setTicker24h] = useState<TickerType>({} as TickerType);
  const [trades, setTrades] = useState<TradeType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleFormSubmit = (values: CurrencyPairs) => {
    const {currency, crypto} = values;

    if (currency && crypto) {
      setIsLoading(true);
      setError("");

      Promise.all([
        axios.get(`${BINANCE_BASE_API_URL}ticker?symbol=${crypto}${currency}`),
        axios.get(`${BINANCE_BASE_API_URL}ticker/24hr?symbol=${crypto}${currency}`),
        axios.get(`${BINANCE_BASE_API_URL}trades?symbol=${crypto}${currency}`)
      ])
        .then(([tickerResponse, ticker24Response, tradesResponse]) => {
          setTicker(tickerResponse.data);
          setTicker24h(ticker24Response.data);
          setTrades(tradesResponse.data);
        })
        .catch((error) => {
          setError(error.message);
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        })
    }
  };

  return (
    <>
      <GlobalStyles />
      <div className="app">
        <MainWrapper>
          <Title>GOALS</Title>
          <p>Retrieve and display market data for a selected pair from Binance public API.</p>
          <SectionWrapper>
            <Title>SPECIFICATIONS</Title>
            <p>- Users should be able to use a form to select the currency pair to query.</p>
            <p>- Upon submitting the form, fetch public market data (ticker, 24h ticker, recent trades) for
              the selected pair from Binance public REST api.</p>
            <p>- Users should be able to sort the trades data by time, price & quantity.</p>
          </SectionWrapper>
          <SectionWrapper>
            <SelectCurrency handleFormSubmit={handleFormSubmit}/>
          </SectionWrapper>
          { isLoading
            ? <SectionWrapper><FlexCenteredWrapper><Loader /></FlexCenteredWrapper></SectionWrapper>
            : error
              ?
              <SectionWrapper>
                <FlexCenteredWrapper>
                  <Error>Error has Occurred: {error}. Please try again with different currency pairs.</Error>
                </FlexCenteredWrapper>
              </SectionWrapper>
              : !!ticker && !!ticker24h && !!trades.length
                ?
                <>
                <SectionWrapper><Ticker ticker={ticker} title="Ticker" /></SectionWrapper>
                <SectionWrapper><Ticker ticker={ticker24h} title="24h Ticker" /></SectionWrapper>
                <SectionWrapper><Trades trades={trades} title="Trades" /></SectionWrapper>
                </>
                : ""
          }
        </MainWrapper>
      </div>
    </>
  );
}

export default App;
