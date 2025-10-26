import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { FaPlay, FaQuestionCircle } from "react-icons/fa";
import WordLettersDisplay from "../shared/WordLettersDisplay";
import Instructions from "./Instructions";
import "./Game.css";
import "../Auth/AuthSidebar.css";

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
      <WordLettersDisplay 
        slogan="Sắp xếp các ký tự để tạo thành từ tiếng Anh đúng trong 20 giây. Hoàn thành 10 vòng để chiến thắng!"
      />

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

