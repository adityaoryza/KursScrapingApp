import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CurrencyExchangeRates = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date('2023-05-29'));
  const [endDate, setEndDate] = useState(new Date('2023-07-24'));
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);

    axios
      .get(
        `https://typescript-api-alpha.vercel.app/api/v1/kurs?startdate=${formatDate(
          startDate
        )}&enddate=${formatDate(endDate)}`
      )
      .then((response) => {
        const responseData = response.data;
        if (responseData.error) {
          setError(responseData.error);
          setData([]);
        } else {
          setData(responseData);
          setError(null);
        }
      })
      .catch((error) => {
        console.error('No records found for the specified date range:', error);
        setLoading(false);
        setError(
          'No records found for the specified date range. Please try again later.'
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [startDate, endDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getRowColorClass = (data) => {
    if (data.symbol === 'USD') {
      return 'bg-yellow-200';
    } else if (data.e_rate.beli > 10000) {
      return 'bg-green-200';
    } else if (data.tt_counter.jual < 14000) {
      return 'bg-red-200';
    }
    return '';
  };

  return (
    <div className='container mx-auto px-4 mt-8'>
      <h1 className='text-3xl mb-4'>Currency Exchange Rates</h1>
      <div className='mb-4'>
        <div className='flex items-center'>
          <span className='mr-2'>Start Date:</span>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className='border rounded px-2 py-1'
          />
        </div>
        <div className='flex items-center mt-2'>
          <span className='mr-2'>End Date:</span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className='border rounded px-2 py-1'
          />
        </div>
        <button
          onClick={fetchData}
          className='mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'
        >
          Fetch Data
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className='text-red-600 mb-4'>
          {error === 'No records found for the specified date range' ? (
            <p>{error}</p>
          ) : (
            <>
              Error: {error}
              <button
                onClick={fetchData}
                className='ml-4 px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600'
              >
                Try Again
              </button>
            </>
          )}
        </div>
      ) : (
        <div className='overflow-x-auto mt-8'>
          <div className='min-w-full'>
            <table className='min-w-full divide-y divide-gray-200 border border-gray-300'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='border px-4 py-3 text-left'>Symbol</th>
                  <th className='border px-4 py-3 text-left'>E-Rate (Buy)</th>
                  <th className='border px-4 py-3 text-left'>E-Rate (Sell)</th>
                  <th className='border px-4 py-3 text-left'>
                    TT Counter (Buy)
                  </th>
                  <th className='border px-4 py-3 text-left'>
                    TT Counter (Sell)
                  </th>
                  <th className='border px-4 py-3 text-left'>
                    Bank Notes (Buy)
                  </th>
                  <th className='border px-4 py-3 text-left'>
                    Bank Notes (Sell)
                  </th>
                  <th className='border px-4 py-3 text-left'>Date</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className={`${getRowColorClass(item)} ${
                      index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                    }`}
                  >
                    <td className='border px-4 py-3'>{item.symbol}</td>
                    <td className='border px-4 py-3'>{item.e_rate.beli}</td>
                    <td className='border px-4 py-3'>{item.e_rate.jual}</td>
                    <td className='border px-4 py-3'>{item.tt_counter.beli}</td>
                    <td className='border px-4 py-3'>{item.tt_counter.jual}</td>
                    <td className='border px-4 py-3'>{item.bank_notes.beli}</td>
                    <td className='border px-4 py-3'>{item.bank_notes.jual}</td>
                    <td className='border px-4 py-3'>
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
        </div>
      )}
    </div>
  );
};

export default CurrencyExchangeRates;
