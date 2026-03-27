import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CardInquiry from './pages/CardInquiry';
import ReceiptCreate from './pages/ReceiptCreate';
import ReceiptInquiry from './pages/ReceiptInquiry';
import ResolutionCreate from './pages/ResolutionCreate';
import VendorInquiry from './pages/VendorInquiry';
import MyInfo from './pages/MyInfo';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing / Intro */}
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* App (authenticated) */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/card-inquiry" element={<CardInquiry />} />
        <Route path="/receipt-create" element={<ReceiptCreate />} />
        <Route path="/receipt-inquiry" element={<ReceiptInquiry />} />
        <Route path="/resolution-create" element={<ResolutionCreate />} />
        <Route path="/vendor-inquiry" element={<VendorInquiry />} />
        <Route path="/my-info" element={<MyInfo />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
