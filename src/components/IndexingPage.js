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
        setSuccess(true);
      })
      .catch((error) => {
        setLoading(false);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          const errorMessage = error.response.data.error;
          if (errorMessage === 'Data for the current date already exists') {
            setError(
              'Data for the current date already exists. Try again tomorrow.'
            );
          } else {
            setError('An error occurred while scraping and indexing.');
          }
        } else {
          setError('An error occurred while scraping and indexing.');
        }
      });
  };

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-6 text-center'>
          <h1 className='mb-4'>Scraping and Indexing</h1>
          {!loading && !success && (
            <button onClick={handleScrapeAndIndex} className='btn btn-primary'>
              Start Scraping
            </button>
          )}
          {loading && <p>Loading...</p>}
          {success && <p className='text-success'>Scraping Success!</p>}
          {error && <p className='text-danger mt-3'>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default IndexingPage;
