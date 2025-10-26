import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import GameStart from "./GameStart";
import TopBar from "./TopBar";
import GameBoard from "./GameBoard";
import GameOverModal from "./GameOverModal";
import GameEnd from "./GameEnd";
import "./Game.css";
import { nav } from "framer-motion/client";

// Array of 10 words with their hint images for each round
const GAME_WORDS = [
  { word: "VITE", image: "https://vitejs.dev/logo.svg" },
  { word: "REACT", image: "https://react.dev/images/og-home.png" },
  { word: "JAVASCRIPT", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png" },
  { word: "DESIGN", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400" },
  { word: "CREATE", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400" },
  { word: "PUZZLE", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400" },
  { word: "GAMING", image: "https://images.unsplash.com/photo-1538481143235-5d8333846fbb?w=400" },
  { word: "PLAYER", image: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400" },
  { word: "WINNER", image: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400" },
  { word: "BATTLE", image: "https://images.unsplash.com/photo-1538481143235-5d8333846fbb?w=400" }
];

export default function Game() {
  const navigate = useNavigate();
  const { currentUser, opponent } = location.state || {};
  
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [gameKey, setGameKey] = useState(0);

  const [myPoint, setMyPoint] = useState(0);
  const [opponentPoints, setOpponentPoints] = useState(100);
  const [pointRound, setPointRound] = useState(0);
  const [isGameEnded, setIsGameEnded] = useState(false);

  const gameBoardRef = useRef(null);

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

  const handleStart = () => {
    setIsGameStarted(true);
    handleRestart();
  };

  const handleHome = () => {
    // Navigate to home page
    navigate('/') ;
  };

  const handleRefreshCharacters = () => {
    // Call refresh on GameBoard without resetting timer
    if (gameBoardRef.current) {
      gameBoardRef.current.refreshCharacters();
    }
  };

  const handleExitGame = () => {
    // End game and go to GameEnd screen (without calculating current round points)
    setIsGameEnded(true);
  };

  return (
    <>
      {!isGameStarted ? (
        <GameStart onStart={handleStart} onHome={handleHome} />
      ) : isGameEnded ? (
        <GameEnd 
          myPoint={myPoint} 
          opponentPoints={opponentPoints}
          onRestart={handleStart}
          onHome={handleHome}
        />
      ) : (
        <Box className="game-container">
          <TopBar 
            currentRound={currentRound} 
            myPoint={myPoint} 
            opponentPoints={opponentPoints}
            currentUser={currentUser}
            opponent={opponent}
            onRefresh={handleRefreshCharacters}
            onExit={handleExitGame}
            isGameOver={isGameOver}
            correctCount={correctCount}
          />

          {/* --- Khu vực sắp xếp chữ + Game Over Modal --- */}
          {!isGameOver ? (
            <GameBoard 
              ref={gameBoardRef} 
              key={gameKey} 
              onGameOver={handleGameOver} 
              word={GAME_WORDS[currentRound - 1].word.toLowerCase()} 
              imageHint={GAME_WORDS[currentRound - 1].image}
            />
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
