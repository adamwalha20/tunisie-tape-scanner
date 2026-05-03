import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import ScanQR from './pages/ScanQR';
import ScanCard from './pages/ScanCard';
import ManualEntry from './pages/ManualEntry';
import ContactDetails from './pages/ContactDetails';
import Profile from './pages/Profile';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/scan/qr" element={<ScanQR />} />
          <Route path="/scan/card" element={<ScanCard />} />
          <Route path="/manual" element={<ManualEntry />} />
          <Route path="/contact/:id" element={<ContactDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
