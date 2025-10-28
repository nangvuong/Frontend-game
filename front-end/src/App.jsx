import "./App.css";
import TopBar from "./components/TopBar/TopBar";
import ProtectedRoute from "./components/ProtectedRoute";
import Game from "./components/Game/Game";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import History from "./components/History/History";
import Rank from "./components/Rank/Rank";
import Admin from "./components/Admin/AdminWordManagement";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { userAPI, authAPI } from "./composables/useAPI";
import { CircularProgress, Box } from "@mui/material";

function AppContent({ isLoggedIn, user, handleLogin, handleLogout }) {
  const location = useLocation();

  // Ẩn TopBar khi ở trang game, login, register
  const hideTopBar = ["/game", "/login", "/register"].includes(
    location.pathname
  );

  return (
    <>
      {!hideTopBar && <TopBar user={user} onLogout={handleLogout} />}
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={handleLogin} />} />

        <Route
          path="/game"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Game user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              {user?.role === "admin" ? <Admin user={user} /> : <Home user={user} />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <History user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rank"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Rank user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ⚠️ RESTORE SESSION KHI APP KHỞI ĐỘNG (F5)
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        
        // Gọi API để lấy thông tin user hiện tại từ token
        const response = await userAPI.profile();

        if (response.success && response.data) {
          setUser(response.data);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("❌ Failed to restore session:", error);
        
        // Token hết hạn hoặc invalid → xóa và redirect về login
        localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  // ⚠️ HANDLE LOGIN
  const handleLogin = (status, userData = null) => {
    setIsLoggedIn(status);
    if (userData) {
      setUser(userData);
    }
  };

  // ⚠️ HANDLE LOGOUT - GỌI API VÀ XÓA STATE
  const handleLogout = async () => {
    try {
      
      // Gọi API logout
      await authAPI.logout();
      
    } catch (error) {
      console.error("❌ Logout API error:", error);
      // Vẫn tiếp tục logout ở frontend dù API lỗi
    } finally {
      // Xóa token và state
      localStorage.removeItem("accessToken");
      setIsLoggedIn(false);
      setUser(null);
      
    }
  };

  // ⚠️ HIỂN THỊ LOADING KHI ĐANG RESTORE SESSION
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CircularProgress size={60} sx={{ color: "#4b2edc" }} />
        <Box sx={{ fontSize: "1.2rem", color: "#666" }}>Đang tải...</Box>
      </Box>
    );
  }

  return (
    <Router>
      <AppContent
        isLoggedIn={isLoggedIn}
        user={user}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
    </Router>
  );
}

export default App;