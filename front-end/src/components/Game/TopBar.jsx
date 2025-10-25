import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { FaStar, FaTrophy } from "react-icons/fa";

export default function TopBar({ currentRound, myPoint, opponentPoints }) {
  return (
    <Box className="top-bar">
      <Box className="player-card">
        <Typography className="player-label">Bạn</Typography>
        <Box className="player-stats">
          <FaStar className="star-icon" />
          <Typography className="points">{myPoint}</Typography>
        </Box>
      </Box>

      <Divider orientation="vertical" variant="middle" flexItem />

      <Box className="round-card">
        <FaTrophy className="trophy-icon" />
        <Typography  className="round-text">Round {currentRound}/10</Typography>
      </Box>

      <Divider orientation="vertical" variant="middle" flexItem />

      <Box className="opponent-card">
        <Typography className="opponent-label">Đối thủ</Typography>
        <Box className="opponent-stats">
          <FaStar className="star-icon" />
          <Typography className="points">{opponentPoints}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
