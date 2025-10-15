import './App.css'
import TopBar from './components/TopBar/TopBar'
import Game from './components/Game/Game';
import { Container, Toolbar } from '@mui/material'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Ứng dụng gốc: cấu hình router và bao bọc layout với thanh điều hướng cố định ở trên cùng

function App() {
  return (
    <Router>
      <TopBar />
      <Toolbar />
      <Container fixed>
        <Routes>
            <Route path="/" element={<Game />} />
        </Routes>   
      </Container>
    </Router>
  )
}

export default App
