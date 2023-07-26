import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CurrencyExchangeRates from './components/CurrencyExchangeRates';
import IndexingPage from './components/IndexingPage';
import HomePage from './components/Home';
import DeleteDataByDate from './components/DeleteDataByDate';

const App = () => {
  return (
    <Router>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className='container'>
          <Link to='/' className='navbar-brand'>
            Scraping App
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav ms-auto'>
              <li className='nav-item'>
                <Link to='/api/v1/kurs' className='nav-link'>
                  Currency Exchange Rates
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/indexing' className='nav-link'>
                  Scraping and Indexing
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/delete-data' className='nav-link'>
                  Delete Data by Date
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className='container p-4'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/indexing' element={<IndexingPage />} />
          <Route path='/api/v1/kurs' element={<CurrencyExchangeRates />} />
          <Route path='/delete-data' element={<DeleteDataByDate />} />
          {/* Add other routes for other API endpoints if needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
