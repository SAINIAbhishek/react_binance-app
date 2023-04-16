import React from 'react';
import {Formik} from "formik";
import {Error, FormLabel} from "../../styles/Typogragphy.styles";
import {Select} from "../../styles/Form.styles";
import {SymbolType} from "../../types/Symbol";
import {Loader} from "../../shared/loader/Loader";
import {ButtonStyles} from "../../styles/Button.styles";
import {BINANCE_BASE_API_URL} from "../../apis/binance";
import {CurrencyPairs} from "../../types/CurrencyPairs";
import {SelectWrapper} from "../../styles/Wrappers.styles";
import {CURRENCIES} from "../../utils/currencies";
import {useQuery} from "react-query";
import axios from "axios";

type Props = {
  handleFormSubmit: (values: CurrencyPairs) => void;
}

export const SelectCurrency = ({handleFormSubmit}: Props) => {

  const { isLoading, error, data } = useQuery(
    "currencyPairs",
    async () => await axios(`${BINANCE_BASE_API_URL}exchangeInfo`)
  );;

  const cryptoPairs: string[] = data?.data.symbols.map((symbol: SymbolType) => symbol.baseAsset) || [];

  const initialValues: CurrencyPairs = {
    crypto: cryptoPairs.length ? cryptoPairs[0] : "",
    currency: CURRENCIES[0]
  };

  return (
    <>
      { isLoading ? <Loader /> : error
        ? <Error>
          We are having difficulty while fetching the currency paris for  Binance public API.
          Please try to reload the page again...
        </Error>
        : <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
          { ({
               handleSubmit,
               setFieldValue
             }) => (
            <form onSubmit={handleSubmit}>
              <SelectWrapper>
                <div>
                  <FormLabel>Select the crypto currency</FormLabel>
                  <Select
                    id="crypto"
                    onChange={(e) => setFieldValue("crypto", e.target.value)}>
                    {cryptoPairs.map((crypto: string, i: number) => {
                      return <option key={`${crypto}-${i}`} value={crypto}>{crypto}</option>
                    })}
                  </Select>
                </div>
                <div>
                  <FormLabel>Select the currency</FormLabel>
                  <Select
                    id="currency"
                    onChange={(e) => setFieldValue("currency", e.target.value)}>
                    {CURRENCIES.map((currency: string, i: number) => {
                      return <option key={`${currency}-${i}`} value={currency}>{currency}</option>
                    })}
                  </Select>
                </div>
              </SelectWrapper>
              <div style={{ "marginTop": "15px" }}><ButtonStyles type="submit">Submit</ButtonStyles></div>
            </form>
          ) }
        </Formik>
      }
    </>
  )
}
