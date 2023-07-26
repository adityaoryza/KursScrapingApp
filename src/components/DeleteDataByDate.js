import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DeleteDataByDate = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleDeleteData = () => {
    if (!selectedDate) {
      setError('Please select a date.');
      return;
    }

    setLoading(true);
    setError(null);

    axios
      .delete(
        `https://typescript-api-alpha.vercel.app/api/v1/kurs/${formatDate(
          selectedDate
        )}`
      )
      .then((response) => {
        setLoading(false);
        setSuccess(true);
      })
      .catch((error) => {
        setLoading(false);
        setError('An error occurred while deleting the data.');
      });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSuccess(false); // Reset the success state when a new date is selected
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-6 text-center'>
          <h1 className='mb-4'>Delete Data by Date</h1>
          <div className='form-group'>
            <label>Select Date:</label>
            <br />
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange} // Use the handleDateChange function to update the selected date
              className='form-control'
            />
          </div>
          <button
            onClick={handleDeleteData}
            className='btn btn-danger mt-3'
            disabled={!selectedDate || loading || success}
          >
            {loading
              ? 'Deleting...'
              : success
              ? 'Data Deleted!'
              : 'Delete Data'}
          </button>
          {error && <p className='text-danger mt-3'>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default DeleteDataByDate;
