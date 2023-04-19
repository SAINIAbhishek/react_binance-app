import React from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Error } from '../../styles/Typogragphy.styles';
import { SymbolType } from '../../types/Symbol';
import { Loader } from '../../shared/loader/Loader';
import { ButtonStyles } from '../../styles/Button.styles';
import { BINANCE_BASE_API_URL } from '../../apis/binance';
import { CurrencyPairs } from '../../types/CurrencyPairs';
import { SelectWrapper } from '../../styles/Wrappers.styles';
import { CURRENCIES } from '../../utils/currencies';
import { SelectField } from "../../shared/SelectField/SelectField";

type SelectCurrencyProps = {
  handleFormSubmit: (values: CurrencyPairs) => void;
};

export const SelectCurrency = ({ handleFormSubmit }: SelectCurrencyProps) => {

  const { isLoading, error, data } = useQuery('currencyPairs', async () => {
    const response = await axios(`${BINANCE_BASE_API_URL}exchangeInfo`);
    return response.data;
  });

  const cryptoPairs = data?.symbols.map((symbol: SymbolType) => symbol.baseAsset) || [];

  const initialValues: CurrencyPairs = {
    crypto: cryptoPairs[0] || '',
    currency: CURRENCIES[0],
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error>
          We are having difficulty while fetching the currency pairs for the Binance public API.
          Please try to reload the page again...
        </Error>
      ) : (
        <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
          {({ handleSubmit, setFieldValue, values }) => (
            <form onSubmit={handleSubmit}>
              <SelectWrapper>
                <SelectField
                  id="crypto"
                  label="Select the crypto currency"
                  options={cryptoPairs}
                  value={values.crypto}
                  onChange={(e) => setFieldValue('crypto', e.target.value)}
                />
                <SelectField
                  id="currency"
                  label="Select the currency"
                  options={CURRENCIES}
                  value={values.currency}
                  onChange={(e) => setFieldValue('currency', e.target.value)}
                />
              </SelectWrapper>
              <div style={{ marginTop: '15px' }}>
                <ButtonStyles type="submit">Submit</ButtonStyles>
              </div>
            </form>
          )}
        </Formik>
      )}
    </>
  );
};
