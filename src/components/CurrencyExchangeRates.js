import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyExchangeRates = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        'https://typescript-api-alpha.vercel.app/api/v1/kurs?startdate=2023-05-29&enddate=2023-07-24'
      )
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container mt-4'>
      <h1>Currency Exchange Rates</h1>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>E-Rate (Buy)</th>
            <th>E-Rate (Sell)</th>
            <th>TT Counter (Buy)</th>
            <th>TT Counter (Sell)</th>
            <th>Bank Notes (Buy)</th>
            <th>Bank Notes (Sell)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.symbol}</td>
              <td>{item.e_rate.beli}</td>
              <td>{item.e_rate.jual}</td>
              <td>{item.tt_counter.beli}</td>
              <td>{item.tt_counter.jual}</td>
              <td>{item.bank_notes.beli}</td>
              <td>{item.bank_notes.jual}</td>
              <td>
                {new Date(item.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyExchangeRates;
