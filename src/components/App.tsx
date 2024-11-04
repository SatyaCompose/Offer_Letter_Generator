import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OfferLetterForm from './offerLetterForm';
import PdfGenerator from './pdfGenerator';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OfferLetterForm />} />
        <Route path="/offer-letter" element={<PdfGenerator />} />
      </Routes>
    </Router>
  );
};

export default App;
