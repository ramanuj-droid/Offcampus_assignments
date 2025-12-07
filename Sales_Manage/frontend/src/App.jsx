import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SalesListPage from './pages/SalesListPage';
import UploadPage from './pages/UploadPage';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="p-4 shadow bg-white">
        <div className="container mx-auto flex gap-4">
          <Link className="font-semibold text-blue-600" to="/">Sales</Link>
          <Link className="font-semibold text-blue-600" to="/upload">Upload</Link>
        </div>
      </nav>

      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<SalesListPage />} />
          <Route path="/upload" element={<UploadPage />} />
        </Routes>
      </main>
    </div>
  );
}
