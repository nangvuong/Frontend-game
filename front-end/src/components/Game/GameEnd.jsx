import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { FaTrophy, FaRedo, FaHome } from "react-icons/fa";
import { playWinGameSound, playLoseGameSound } from "../../utils/soundManager";

export default function GameEnd({ myPoint, opponentPoints, onRestart, onHome }) {
  const determinWinner = () => {
    if (myPoint > opponentPoints) {
      return { winner: "Bạn", message: "CHIẾN THẮNG! 🎉", color: "#6ee7b7" };
    } else if (myPoint < opponentPoints) {
      return { winner: "Đối thủ", message: "BẠN THUA RỒI! 😢", color: "#ff6b6b" };
    } else {
      return { winner: "Hoà", message: "HOÀ NHAU! 🤝", color: "#ffd700" };
    }
  };

  const result = determinWinner();

  // Play sound based on result
  useEffect(() => {
    if (myPoint > opponentPoints) {
      playWinGameSound();
    } else if (myPoint < opponentPoints) {
      playLoseGameSound();
    }
  }, [myPoint, opponentPoints]);

  return (
    <Box className="game-end-container">
      <Box className="game-end-content">
        <FaTrophy className="trophy-icon-large" style={{ color: result.color }} />
        
        <Typography className="game-end-message" style={{ color: result.color }}>
          {result.message}
        </Typography>

        <Box className="final-scores">
          <Box className="final-score-item">
            <Typography className="final-label">Bạn</Typography>
            <Typography className="final-points">{myPoint}</Typography>
          </Box>

          <Typography className="vs-text">VS</Typography>

          <Box className="final-score-item">
            <Typography className="final-label">Đối thủ</Typography>
            <Typography className="final-points">{opponentPoints}</Typography>
          </Box>
        </Box>

        <Box className="game-end-actions">
          <Button
            variant="contained"
            onClick={onRestart}
            className="restart-button"
            sx={{
              background: "linear-gradient(135deg, #6ee7b7 0%, #5ad9a4 100%)",
              color: "#ffffff",
              fontWeight: "bold",
              padding: "0",
              borderRadius: "50%",
              fontSize: "2rem",
              boxShadow: "0 6px 20px rgba(110, 231, 183, 0.35)",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80px",
              height: "80px",
              border: "3px solid rgba(255, 255, 255, 0.2)",
              "&:hover": {
                background: "linear-gradient(135deg, #5ad9a4 0%, #4ac991 100%)",
                transform: "translateY(-4px) scale(1.08)",
                boxShadow: "0 10px 30px rgba(110, 231, 183, 0.5)",
                border: "3px solid rgba(255, 255, 255, 0.3)",
              },
              "&:active": {
                transform: "translateY(-2px) scale(1.03)",
              },
            }}
          >
            <FaRedo />
          </Button>

          <Button
            variant="contained"
            onClick={onHome}
            className="home-button"
            sx={{
              background: "linear-gradient(135deg, #7c5cff 0%, #6a4cf3 100%)",
              color: "#ffffff",
              fontWeight: "bold",
              padding: "0",
              borderRadius: "50%",
              fontSize: "2rem",
              boxShadow: "0 6px 20px rgba(124, 92, 255, 0.35)",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80px",
              height: "80px",
              border: "3px solid rgba(255, 255, 255, 0.2)",
              "&:hover": {
                background: "linear-gradient(135deg, #6a4cf3 0%, #5a3cb3 100%)",
                transform: "translateY(-4px) scale(1.08)",
                boxShadow: "0 10px 30px rgba(124, 92, 255, 0.5)",
                border: "3px solid rgba(255, 255, 255, 0.3)",
              },
              "&:active": {
                transform: "translateY(-2px) scale(1.03)",
              },
            }}
          >
            <FaHome />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
