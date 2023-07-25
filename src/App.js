import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CurrencyExchangeRates from './components/CurrencyExchangeRates';
import IndexingPage from './components/IndexingPage';
import HomePage from './components/Home';

const App = () => {
  return (
    <Router>
      <div>
        <nav className='bg-gray-800 p-4'>
          <ul className='flex space-x-4 text-white'>
            <li>
              <Link to='/api/v1/kurs' className='hover:text-gray-200'>
                Currency Exchange Rates
              </Link>
            </li>
            <li>
              <Link to='/indexing' className='hover:text-gray-200'>
                Scraping and Indexing
              </Link>
            </li>
            <li>
              <Link to='/' className='hover:text-gray-200'>
                Home Page
              </Link>
            </li>
          </ul>
        </nav>
        <div className='p-4'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/indexing' element={<IndexingPage />} />
            <Route path='/api/v1/kurs' element={<CurrencyExchangeRates />} />
            {/* Add other routes for other API endpoints if needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
