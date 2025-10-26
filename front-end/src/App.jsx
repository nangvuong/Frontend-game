import './App.css'  
import TopBar from './components/TopBar/TopBar'
import ProtectedRoute from './components/ProtectedRoute'
import Game from './components/Game/Game';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import History from './components/History/History';
import Rank from './components/Rank/Rank';
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from 'react';

function AppContent({ isLoggedIn, user, handleLogin, handleRegister }) {
  const location = useLocation();
  
  // Ẩn TopBar khi ở trang game, login, register
  const hideTopBar = ['/game', '/login', '/register'].includes(location.pathname);

  return (
    <>
      {!hideTopBar && <TopBar onLogout={handleLogin} />}
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={handleRegister} />} />
        
        <Route path="/game" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Game />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Profile user={user} />
          </ProtectedRoute>
        } />
        <Route path="/" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Home user={user} />
          </ProtectedRoute>
        } />
        <Route path="/history" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <History />
          </ProtectedRoute>
        } />
        <Route path="/rank" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Rank />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  
  const handleLogin = (status, userData = null) => {
    setIsLoggedIn(status);
    if (userData) {
      setUser({
    id: 1,
    name: 'Vương',
    avatar: '👨',
    rating: 2450,
    totalGames: 156,
    wins: 98,
    losses: 58,
    streak: 7,
  });
    }
  };

  const handleRegister = (status, userData = null) => {
    setIsLoggedIn(status);
    if (userData) {
      setUser(userData);
    }
  };

  return (
    <Router>
      <AppContent isLoggedIn={isLoggedIn} user={user} handleLogin={handleLogin} handleRegister={handleRegister} />
    </Router>
  );
}

export default App