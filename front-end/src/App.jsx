import './App.css'  
import TopBar from './components/TopBar/TopBar'
import Game from './components/Game/Game';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  const handleRegister = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <Router>
      {isLoggedIn}
      <Routes>
          <Route path="/" element={isLoggedIn ? <Game /> : <Login onLogin={handleLogin} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />
      </Routes>
    </Router>
  )
}

export default App
