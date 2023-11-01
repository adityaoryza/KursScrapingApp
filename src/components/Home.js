import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get('https://typescript-scraping-api.vercel.app/api/v1/')
      .then((response) => setMessage(response.data.message))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-8 text-center'>
          <h1 className='mb-4'>Welcome to My Awesome App!</h1>
          <p className='lead mb-4'>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
