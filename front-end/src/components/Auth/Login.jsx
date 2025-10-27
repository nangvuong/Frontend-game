import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../Auth/AuthLayout";
import { authAPI } from "../../composables/useAPI";
import "./AuthForm.css";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setUsernameError("");
    setPasswordError("");

    // Validation
    if (!username.trim()) {
      setUsernameError("Vui lòng nhập tên đăng nhập");
      return;
    }
    if (!password.trim()) {
      setPasswordError("Vui lòng nhập mật khẩu");
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.login({
        username: username.trim(),
        password: password.trim(),
      });
      // Lưu token vào localStorage
      if (response.data.token) {
        localStorage.setItem("accessToken", response.data.token);
      }
      // Lưu thông tin user
      const userData = response.data.user;
      await new Promise((resolve) => setTimeout(resolve, 1500));
      userData.avatar = "👨";
      onLogin(true, userData);
      navigate("/");
    } catch (err) {
      setUsernameError("Đăng nhập thất bại. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const handleSignupClick = () => {
    navigate("/register");
  };

  return (
    <AuthLayout>
      {/* Right Side - Login Form */}
      <Box className="auth-right">
        <Paper elevation={12} className="auth-form-wrapper">
          <form onSubmit={handleLogin} className="auth-form">
            {/* Username Field */}
            <TextField
              fullWidth
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              variant="outlined"
              size="medium"
              error={!!usernameError}
              helperText={usernameError}
            />

            {/* Password Field */}
            <TextField
              fullWidth
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              variant="outlined"
              size="medium"
              error={!!passwordError}
              helperText={passwordError}
            />

            {/* Login Button */}
            <Button
              fullWidth
              type="submit"
              disabled={loading}
              className="auth-button"
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "#4b2edc" }} />
              ) : (
                "Đăng nhập"
              )}
            </Button>

            {/* Divider */}
            <Box className="auth-divider">
              <Typography variant="body2">Hoặc</Typography>
            </Box>

            {/* Signup Link */}
            <Button
              fullWidth
              className="auth-secondary-button"
              onClick={handleSignupClick}
              disabled={loading}
            >
              Tạo tài khoản mới
            </Button>
          </form>
        </Paper>
      </Box>
    </AuthLayout>
  );
}
