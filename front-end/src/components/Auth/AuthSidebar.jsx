import React from "react";
import { Box, Typography } from "@mui/material";
import "./AuthSidebar.css";

export default function AuthSidebar() {
  return (
    <Box className="auth-left">
      {/* Letter Display */}
      <Box className="auth-word-display">
        <Box className="auth-word-letters">
          <span className="auth-letter">W</span>
          <span className="auth-letter">O</span>
          <span className="auth-letter">R</span>
          <span className="auth-letter">D</span>
        </Box>
        <Box className="auth-scramble-letters">
          <span className="auth-letter">S</span>
          <span className="auth-letter">C</span>
          <span className="auth-letter">R</span>
          <span className="auth-letter">A</span>
          <span className="auth-letter">M</span>
          <span className="auth-letter">B</span>
          <span className="auth-letter">L</span>
          <span className="auth-letter">E</span>
        </Box>
      </Box>

      {/* Slogan */}
      <Typography className="auth-slogan">
        Cùng bạn bè bắt đầu trận đấu chữ đỉnh cao!
      </Typography>
    </Box>
  );
}
