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

export default function Register({ onRegister }) {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setUsernameError("");
    setFullNameError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Validation
    if (!username.trim()) {
      setUsernameError("Vui lòng nhập tên đăng nhập");
      return;
    }
    if (username.trim().length < 3) {
      setUsernameError("Tên đăng nhập phải có ít nhất 3 ký tự");
      return;
    }
    if (!fullName.trim()) {
      setFullNameError("Vui lòng nhập họ và tên");
      return;
    }
    if (!password.trim()) {
      setPasswordError("Vui lòng nhập mật khẩu");
      return;
    }
    if (password.trim().length < 6) {
      setPasswordError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }
    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Vui lòng xác nhận mật khẩu");
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Mật khẩu không khớp");
      return;
    }

    setLoading(true);
    try {
      // Gọi API register
      const response = await authAPI.register({
        username: username.trim(),
        fullName: fullName.trim(),
        password: password.trim(),
      });

      // Lưu token vào localStorage
      if (response.data.token) {
        localStorage.setItem("accessToken", response.data.token);
      }

      // Lưu thông tin user
      const userData = response.data.user;

      // Gọi callback onRegister với thông tin user
      onRegister?.(true, userData);
      
      // Chuyển hướng về trang chủ
      navigate("/");
    } catch (err) {
      console.error("Register error:", err);
      
      // Xử lý lỗi từ backend
      const errorMessage = err.message || "Đăng ký thất bại. Vui lòng thử lại!";
      
      // Nếu lỗi về username đã tồn tại
      if (errorMessage.includes("Username") || errorMessage.includes("tồn tại")) {
        setUsernameError(errorMessage);
      } else {
        setUsernameError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <AuthLayout>
      {/* Right Side - Register Form */}
      <Box className="auth-right">
        <Paper elevation={12} className="auth-form-wrapper">
          <form onSubmit={handleRegister} className="auth-form">
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

            {/* Full Name Field */}
            <TextField
              fullWidth
              placeholder="Họ và tên"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={loading}
              variant="outlined"
              size="medium"
              error={!!fullNameError}
              helperText={fullNameError}
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

            {/* Confirm Password Field */}
            <TextField
              fullWidth
              type="password"
              placeholder="Xác nhận mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              variant="outlined"
              size="medium"
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
            />

            {/* Register Button */}
            <Button
              fullWidth
              type="submit"
              disabled={loading}
              className="auth-button"
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "#4b2edc" }} />
              ) : (
                "Đăng ký"
              )}
            </Button>

            {/* Divider */}
            <Box className="auth-divider">
              <Typography variant="body2">Hoặc</Typography>
            </Box>

            {/* Login Link */}
            <Button
              fullWidth
              className="auth-secondary-button"
              onClick={handleLoginClick}
              disabled={loading}
            >
              Quay lại đăng nhập
            </Button>
          </form>
        </Paper>
      </Box>
    </AuthLayout>
  );
}