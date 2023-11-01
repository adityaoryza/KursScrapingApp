import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CurrencyExchangeRates = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    if (!startDate || !endDate) {
      setError('Please select start and end dates.');
      return;
    }

    setError(null);
    setLoading(true);

    axios
      .get(
        `https://typescript-scraping-api.vercel.app/api/v1/kurs?startdate=${formatDate(
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
        setError(
          'No records found for the specified date range. Please try again later.'
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
    <div className='container mt-5'>
      <h1 className='text-3xl mb-4'>Currency Exchange Rates</h1>
      <div className='mb-4'>
        <div className='d-flex align-items-center'>
          <span className='mr-2'>Start Date:</span>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className='form-control'
            isClearable
            placeholderText='Select Start Date'
          />
        </div>
        <div className='d-flex align-items-center mt-2'>
          <span className='mr-2'>End Date:</span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className='form-control'
            isClearable
            placeholderText='Select End Date'
          />
        </div>
        <button onClick={fetchData} className='mt-4 btn btn-success'>
          Fetch Data
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className='text-danger mb-4'>
          {error === 'No records found for the specified date range' ? (
            <p>{error}</p>
          ) : (
            <>
              Error: {error}
              <button onClick={fetchData} className='ml-4 btn btn-primary'>
                Try Again
              </button>
            </>
          )}
        </div>
      ) : (
        <div className='table-responsive'>
          <table className='table table-bordered table-striped'>
            <thead className='bg-light'>
              <tr>
                <th className='px-4 py-2'>Symbol</th>
                <th className='px-4 py-2'>E-Rate (Buy)</th>
                <th className='px-4 py-2'>E-Rate (Sell)</th>
                <th className='px-4 py-2'>TT Counter (Buy)</th>
                <th className='px-4 py-2'>TT Counter (Sell)</th>
                <th className='px-4 py-2'>Bank Notes (Buy)</th>
                <th className='px-4 py-2'>Bank Notes (Sell)</th>
                <th className='px-4 py-2'>Date</th>
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
      )}
    </div>
  );
};

export default CurrencyExchangeRates;
