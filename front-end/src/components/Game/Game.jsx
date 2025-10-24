import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTimer } from "react-timer-hook";
import GameBoard from "./GameBoard";
import GameOverModal from "./GameOverModal";
import "./Game.css";

const MOCK_WORD = "safe".split("");

export default function Game() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [currentRound, setCurrentRound] = useState(3);

  const expiry = new Date();
  expiry.setSeconds(expiry.getSeconds() + 20);
  const { seconds, restart } = useTimer({
    expiryTimestamp: expiry,
    onExpire: () => console.log("Hết giờ!"),
  });

  const progressValue = (seconds / 20) * 100;

  const handleGameOver = (isOver, correct) => {
    setIsGameOver(isOver);
    setCorrectCount(correct);
  };

  const handleNextRound = () => {
    // Reset game state for next round
    setIsGameOver(false);
    setCorrectCount(0);
    setCurrentRound(currentRound + 1);
    // Reset timer would be needed here if you want to continue with a new timer
  };

  return (
    <Box className="game-container">
      {/* --- Thanh thông tin trên cùng --- */}
      <Box className="top-bar">
        <Typography className="player-info">
          Vương ⚡ <span className="highlight">5</span>
        </Typography>
        <Typography className="round-info">Round 3/10</Typography>
        <Typography className="opponent-info">
          Đối thủ ⚡ <span className="highlight">7</span>
        </Typography>
      </Box>

      {/* --- Khu vực sắp xếp chữ + Game Over Modal --- */}
      {!isGameOver ? (
        <GameBoard onGameOver={handleGameOver} progressValue={progressValue} />
      ) : (
        <GameOverModal 
          isOpen={isGameOver}
          correctCount={correctCount}
          currentRound={currentRound + 1}
          onNextRound={handleNextRound}
        />
      )}
    </Box>
  );
}
