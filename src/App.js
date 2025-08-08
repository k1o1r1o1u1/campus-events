// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventFeed from './EventFeed';
import SubmitEvent from './SubmitEvent';
import Login from './Login';
import './styles.css'; // ✅ Import your custom CSS

function App() {
  return (
    <Router>
      <div className="container">
        <h1>Campus Pulse</h1>

        {/* No navigation links shown */}

        <Routes>
          <Route path="/" element={<EventFeed />} />
          <Route path="/submit" element={<SubmitEvent />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
