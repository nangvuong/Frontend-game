import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { FaPlay, FaQuestionCircle } from "react-icons/fa";
import Instructions from "./Instructions";
import "./Game.css";

export default function GameStart({ onStart, onHome }) {
  const [showInstructions, setShowInstructions] = useState(false);

  const handleManualOpen = () => {
    setShowInstructions(true);
  };

  const handleManualClose = () => {
    setShowInstructions(false);
  };

  return (
    <Box className="game-start-hero">
      {/* Word/Scramble Display */}
      <Box className="start-words-display">
        <Box className="start-word-title">
          <Box className="start-word-letters">
            <span className="start-letter">W</span>
            <span className="start-letter">O</span>
            <span className="start-letter">R</span>
            <span className="start-letter">D</span>
          </Box>
          <Box className="start-scramble-letters">
            <span className="start-letter">S</span>
            <span className="start-letter">C</span>
            <span className="start-letter">R</span>
            <span className="start-letter">A</span>
            <span className="start-letter">M</span>
            <span className="start-letter">B</span>
            <span className="start-letter">L</span>
            <span className="start-letter">E</span>
          </Box>
        </Box>
      </Box>

      {/* Description */}
      <Typography fontWeight="bold" className="start-description">
        Sắp xếp các ký tự để tạo thành từ tiếng Anh đúng trong 20 giây. Hoàn thành 10 vòng để chiến thắng!
      </Typography>

      {/* How to Play Link */}
      <Box className="start-how-to-play">
        <Button
          startIcon={<FaQuestionCircle />}
          onClick={handleManualOpen}
          className="start-help-link"
        >
          Cách chơi
        </Button>
      </Box>

      {/* Play Button */}
      <Box className="start-play-button-container">
        <Button
          className="start-play-button-large"
          onClick={onStart}
        >
          <FaPlay size={30} />
        </Button>
      </Box>

      {/* Instructions Component */}
      <Instructions isOpen={showInstructions} onClose={handleManualClose} />
    </Box>
  );
}

