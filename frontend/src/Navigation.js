import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Showmodel from './Showmodel';
import CreateCarModel from './CreateModel';
import EditPage from './Editpage';

const Navigation = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Showmodel />} />
        <Route path="/create-car" element={<CreateCarModel />} />
        <Route path="/edit-car" element={<EditPage />} />
      </Routes>
    </Router>
  );
};

export default Navigation;
