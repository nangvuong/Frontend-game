import React, { useState } from "react";
import { Box, Typography, Divider, IconButton } from "@mui/material";
import { FaStar, FaTrophy, FaVolumeUp, FaVolumeMute, FaGamepad, FaRedoAlt, FaSignOutAlt } from "react-icons/fa";
import Instructions from "./Instructions";
import ExitGameDialog from "./ExitGameDialog";
import { 
  clickCardSound, 
  startRoundSound, 
  wrongAnswerSound, 
  correctAnswerSound, 
  winGameSound, 
  loseGameSound 
} from "../../utils/soundManager";

export default function TopBar({ currentRound, myPoint, opponentPoints, currentUser, opponent, onRefresh, onExit, isGameOver, correctCount }) {
  const [isMuted, setIsMuted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);

  // Get player names from user/opponent objects, fallback to defaults
  const myName = currentUser?.name || 'Bạn';
  const opponentName = opponent?.name || 'Đối thủ';

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    // Toggle mute for all sounds
    const allSounds = [clickCardSound, startRoundSound, wrongAnswerSound, correctAnswerSound, winGameSound, loseGameSound];
    allSounds.forEach(sound => {
      if (!isMuted) {
        sound.mute(true);
      } else {
        sound.mute(false);
      }
    });
  };

  const handleManualOpen = () => {
    setShowInstructions(true);
  };

  const handleManualClose = () => {
    setShowInstructions(false);
  };

  const handleExitClick = () => {
    setShowExitDialog(true);
  };

  const handleExitConfirm = () => {
    setShowExitDialog(false);
    onExit();
  };

  const handleExitCancel = () => {
    setShowExitDialog(false);
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
            
            <IconButton
                className="topbar-button refresh-button"
                onClick={onRefresh}
                title="Làm mới ký tự"
                sx={{
                    color: "#ffd700",
                    fontSize: "1.2rem",
                    "&:hover": {
                    backgroundColor: "rgba(255, 215, 0, 0.2)",
                    },
                }}
            >
                <FaRedoAlt />
            </IconButton>
        </Box>

        <Divider orientation="vertical" variant="middle" flexItem />

        <Box className="player-card">
            <Typography className="player-label">{myName}</Typography>
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
            <Typography className="opponent-label">{opponentName}</Typography>
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
            
            <IconButton
                className="topbar-button exit-button"
                onClick={handleExitClick}
                title="Thoát"
                sx={{
                    color: "#ffd700",
                    fontSize: "1.2rem",
                    "&:hover": {
                    backgroundColor: "rgba(255, 215, 0, 0.2)",
                    },
                }}
            >
                <FaSignOutAlt />
            </IconButton>
        </Box>

        <Instructions isOpen={showInstructions} onClose={handleManualClose} />

        <ExitGameDialog
          isOpen={showExitDialog}
          onClose={handleExitCancel}
          onConfirm={handleExitConfirm}
        />
    </Box>
  );
}
