import React from "react";
import { Box } from "@mui/material";
import WordLettersDisplay from "../shared/WordLettersDisplay";
import "./AuthSidebar.css";

export default function AuthSidebar() {
  return (
    <Box className="auth-left">
      {/* Word Letters Display - Reused component with custom slogan */}
      <WordLettersDisplay 
        slogan="Cùng bạn bè bắt đầu trận đấu chữ đỉnh cao!"
      />
    </Box>
  );
}
