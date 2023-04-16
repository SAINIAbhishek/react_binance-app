import React from "react";
import {TickerType} from "../../types/Ticker";
import {TickerWrapper} from "./Ticker.styles";
import {Title} from "../../styles/Typogragphy.styles";
import {FlexCenteredWrapper} from "../../styles/Wrappers.styles";
import moment from "moment";
import {convertToEntries} from "../../utils/object";

type Props = {
  ticker: TickerType;
  title: string;
}

type TickerEntries = {
  key: string;
  value: string | number;
}

export const Ticker = ({ticker, title}: Props) => {

  const entries: TickerEntries[] = convertToEntries(ticker);

  return (
    <>
      <FlexCenteredWrapper><Title>{title}</Title></FlexCenteredWrapper>
      <TickerWrapper>
        <div className="ticker_content">
          {entries.map(({ key, value }) => (
            <div key={key + ticker.firstId} className="ticker_item">
              {key.replace(/([A-Z])/g, " $1")}: {(key === "openTime" || key === "closeTime") ? moment(value).format("DD-MM-YYYY LTS") : value}
            </div>
          ))}
        </div>
      </TickerWrapper>
    </>
  )
}
