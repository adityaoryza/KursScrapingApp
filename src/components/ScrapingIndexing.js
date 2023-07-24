// src/components/ScrapingIndexing.js
import React, { useState } from 'react';
import axios from 'axios';

const ScrapingIndexing = () => {
  const [status, setStatus] = useState('');

  const handleScrapeIndex = () => {
    axios
      .get('https://typescript-api-alpha.vercel.app/api/v1/indexing')
      .then((response) => setStatus(response.data.message))
      .catch((error) => console.error('Error scraping and indexing:', error));
  };

  return (
    <div>
      <h1>Scraping and Indexing</h1>
      <button onClick={handleScrapeIndex}>Scrape and Index</button>
      <p>{status}</p>
    </div>
  );
};

export default ScrapingIndexing;
