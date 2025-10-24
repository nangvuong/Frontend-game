// import './App.css' 
import TopBar from './components/TopBar/TopBar'
import Game from './components/Game/Game';
import Login from './components/Login/Login';
import { Container, Toolbar } from '@mui/material'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';

// Ứng dụng gốc: cấu hình router và bao bọc layout với thanh điều hướng cố định ở trên cùng

function App() {
  const [login, setLogin] = useState(false);
  return (
    <Router>
      {login && <TopBar />}
      <Container fixed>
        <Routes>
            <Route path="/" element={<Game />} />
            <Route path="/login" element={<Login onLogin={login} />} />
        </Routes>   
      </Container>
    </Router>
  )
}

export default App
