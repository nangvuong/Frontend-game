import React, { useState } from "react";
import { Box, Typography, Divider, IconButton } from "@mui/material";
import { FaStar, FaTrophy, FaVolumeUp, FaVolumeMute, FaGamepad } from "react-icons/fa";
import Instructions from "./Instructions";

export default function TopBar({ currentRound, myPoint, opponentPoints }) {
  const [isMuted, setIsMuted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleManualOpen = () => {
    setShowInstructions(true);
  };

  const handleManualClose = () => {
    setShowInstructions(false);
  };

  return (
    <Box className="top-bar">
        <Box className="topbar-actions">
            <IconButton
                className="topbar-button manual-button"
                onClick={handleManualOpen}
                title="Mode manual"
                sx={{
                    color: "#ffd700",
                    fontSize: "1.2rem",
                    "&:hover": {
                    backgroundColor: "rgba(255, 215, 0, 0.2)",
                    },
                }}
            >
                <FaGamepad />
            </IconButton>
        </Box>

        <Divider orientation="vertical" variant="middle" flexItem />

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

        <Divider orientation="vertical" variant="middle" flexItem />

        <Box className="topbar-actions">
            <IconButton
                className="topbar-button mute-button"
                onClick={handleMuteToggle}
                title={isMuted ? "Unmute" : "Mute"}
                sx={{
                    color: "#ffd700",
                    fontSize: "1.2rem",
                    "&:hover": {
                    backgroundColor: "rgba(255, 215, 0, 0.2)",
                    },
                }}
            >
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </IconButton>
        </Box>

        <Instructions isOpen={showInstructions} onClose={handleManualClose} />
    </Box>
  );
}
