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
        if (responseData.length === 0) {
          // If no records found, clear the data and show the error message
          setData([]);
          setError('No records found for the specified date range.');
        } else {
          setData(responseData);
          setError(null);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
        setError('Error fetching data. Please try again later.');
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

  return (
    <div className='container mt-4'>
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
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
        >
          Fetch Data
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className='text-red-600 mb-4'>
          {error}
          <button
            onClick={fetchData}
            className='ml-4 px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600'
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className='overflow-x-auto'>
          <div className='min-w-full'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-4 py-2 text-left'>Symbol</th>
                  <th className='px-4 py-2 text-left'>E-Rate (Buy)</th>
                  <th className='px-4 py-2 text-left'>E-Rate (Sell)</th>
                  <th className='px-4 py-2 text-left'>TT Counter (Buy)</th>
                  <th className='px-4 py-2 text-left'>TT Counter (Sell)</th>
                  <th className='px-4 py-2 text-left'>Bank Notes (Buy)</th>
                  <th className='px-4 py-2 text-left'>Bank Notes (Sell)</th>
                  <th className='px-4 py-2 text-left'>Date</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td className='px-4 py-2'>{item.symbol}</td>
                    <td className='px-4 py-2'>{item.e_rate.beli}</td>
                    <td className='px-4 py-2'>{item.e_rate.jual}</td>
                    <td className='px-4 py-2'>{item.tt_counter.beli}</td>
                    <td className='px-4 py-2'>{item.tt_counter.jual}</td>
                    <td className='px-4 py-2'>{item.bank_notes.beli}</td>
                    <td className='px-4 py-2'>{item.bank_notes.jual}</td>
                    <td className='px-4 py-2'>
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
