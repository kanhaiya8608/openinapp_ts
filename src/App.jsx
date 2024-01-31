import React, { useState, useEffect } from 'react';
import { SignUp, Login, Homepage } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  // Check if token is present in localStorage during initial load
  const initialToken = JSON.parse(localStorage.getItem('token')) || false;

  const [token, setToken] = useState(initialToken);

  // Update localStorage whenever token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', JSON.stringify(token));
    }
  }, [token]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={'/signup'} element={<SignUp />} />
          <Route path={'/'} element={<Login setToken={setToken} />} />
          {token ? <Route path={'/homepage'} element={<Homepage token={token} />} /> : null}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
