import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import DailyChallenge from './components/DailyChallenge';
import Gallery from './components/Gallery';
import Achievements from './components/Achievements';
import Profile from './components/Profile';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<DailyChallenge />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <ToastContainer position="bottom-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;