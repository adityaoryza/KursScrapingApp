import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get('https://typescript-api-alpha.vercel.app/api/v1/')
      .then((response) => setMessage(response.data.message))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    color: '#333',
  };

  const headingStyle = {
    fontSize: '32px',
    marginBottom: '20px',
  };

  const messageStyle = {
    fontSize: '18px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Welcome to My Awesome App!</h1>
      <p style={messageStyle}>{message}</p>
    </div>
  );
};

export default Home;
