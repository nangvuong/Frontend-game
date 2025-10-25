import React, { useState } from "react";
import { Box } from "@mui/material";
import TopBar from "./TopBar";
import GameBoard from "./GameBoard";
import GameOverModal from "./GameOverModal";
import GameEnd from "./GameEnd";
import "./Game.css";

export default function Game() {
  const [word, setWord] = useState("vite");
  const [isGameOver, setIsGameOver] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [gameKey, setGameKey] = useState(0);

  const [myPoint, setMyPoint] = useState(0);
  const [opponentPoints, setOpponentPoints] = useState(100);
  const [pointRound, setPointRound] = useState(0);
  const [isGameEnded, setIsGameEnded] = useState(false);

  const handleGameOver = (isOver, correct) => {
    setIsGameOver(isOver);
    setCorrectCount(correct);
  };

  const handleNextRound = () => {
    // Reset game state for next round
    setIsGameOver(false);
    setCorrectCount(0);
    
    // Check if game has reached 10 rounds
    if (currentRound >= 10) {
      setIsGameEnded(true);
      return;
    }
    
    setCurrentRound(currentRound + 1);
    // Force GameBoard to remount by changing key (resets timer)
    setGameKey(gameKey + 1);
    setMyPoint(myPoint + pointRound);
  };

  const handleRestart = () => {
    setIsGameEnded(false);
    setIsGameOver(false);
    setCorrectCount(0);
    setCurrentRound(1);
    setGameKey(gameKey + 1);
    setMyPoint(0);
    setOpponentPoints(0);
    setPointRound(0);
  };

  const handleHome = () => {
    // Navigate to home page
    window.location.href = "/";
  };

  return (
    <>
      {isGameEnded ? (
        <GameEnd 
          myPoint={myPoint} 
          opponentPoints={opponentPoints}
          onRestart={handleRestart}
          onHome={handleHome}
        />
      ) : (
        <Box className="game-container">
          <TopBar currentRound={currentRound} myPoint={myPoint} opponentPoints={opponentPoints} />

          {/* --- Khu vực sắp xếp chữ + Game Over Modal --- */}
          {!isGameOver ? (
            <GameBoard key={gameKey} onGameOver={handleGameOver} word={word} />
          ) : (
            <GameOverModal 
              isOpen={isGameOver}
              correctCount={correctCount}
              onNextRound={handleNextRound}
              setPointRound={setPointRound}
            />
          )}
        </Box>
      )}
    </>
  );
}
