import React from "react";
import { Box } from "@mui/material";
import AuthSidebar from "./AuthSidebar";
import "./AuthLayout.css";

export default function AuthLayout({ children }) {
  return (
    <Box className="auth-container">
      <Box className="auth-content">
        {/* Left Side - Letter Display + Slogan */}
        <AuthSidebar />

        {/* Right Side - Form */}
        {children}
      </Box>
    </Box>
  );
}
