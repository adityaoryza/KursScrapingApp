import React, { useState } from 'react';
import axios from 'axios';

const IndexingPage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleScrapeAndIndex = () => {
    setLoading(true);
    setError(null);

    axios
      .get('https://typescript-api-alpha.vercel.app/api/v1/indexing')
      .then((response) => {
        setLoading(false);
        if (
          response.data.message === 'Data for the current date already exists'
        ) {
          setSuccess(true);
        } else {
          setSuccess(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        setError('An error occurred while scraping and indexing.');
      });
  };

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-6 text-center'>
          <h1 className='mb-4'>Scraping and Indexing</h1>
          <button
            onClick={handleScrapeAndIndex}
            className='btn btn-primary'
            disabled={loading}
          >
            {loading
              ? 'Loading...'
              : success
              ? 'Scraping Success!'
              : 'Start Scraping'}
          </button>
          {success && (
            <p className='text-success mt-3'>
              Scraping and indexing succeeded!
            </p>
          )}
          {error && <p className='text-danger mt-3'>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default IndexingPage;
