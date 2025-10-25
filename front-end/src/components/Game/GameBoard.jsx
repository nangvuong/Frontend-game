import React, { useState } from "react";
import { Box, Typography, Paper, Stack, LinearProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useTimer } from "react-timer-hook";
import { shuffleArray } from "../../utils/shuffle";



export default function GameBoard({ onGameOver, word }) {
  const [scrambled, setScrambled] = useState(shuffleArray(word.split("")));
  const [selected, setSelected] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const expiry = new Date();
  expiry.setSeconds(expiry.getSeconds() + 20);
  const { seconds } = useTimer({
    expiryTimestamp: expiry,
    onExpire: () => {
      // Check correct positions when time runs out
      let correct = 0;
      for (let i = 0; i < word.length; i++) {
        if (selected[i] === word[i]) {
          correct++;
        }
      }
      setIsGameOver(true);
      onGameOver && onGameOver(true, correct);
    },
  });

  const progressValue = (seconds / 20) * 100;


  const handleSelect = (ch, i) => {
    if (selected.length < word.length && !isGameOver) {
      const newSelected = [...selected, ch];
      setSelected(newSelected);
      setScrambled(scrambled.map((c, idx) => (idx === i ? null : c)));
      
      // Check if all positions are filled
      if (newSelected.length === word.length) {
        // Count correct positions
        let correct = 0;
        for (let i = 0; i < word.length; i++) {
          if (newSelected[i] === word[i]) {
            correct++;
          }
        }
        setIsGameOver(true);
        // Notify parent to trigger GameOverModal
        onGameOver && onGameOver(true, correct);
      }
    }
  };

  const handleUndo = (index) => {
    const removed = selected[index];
    const newSelected = selected.filter((_, i) => i !== index);
    setSelected(newSelected);
    
    const newScrambled = [...scrambled];
    const emptyIndex = newScrambled.indexOf(null);
    if (emptyIndex !== -1) {
      newScrambled[emptyIndex] = removed;
    } else {
      newScrambled.push(removed);
    }
    setScrambled(newScrambled);
  };

  return (
    <>
      <Box className="letters-section">
        {/* --- Ảnh gợi ý --- */}
        <Box className="hint-box">
            <img src="vite.svg" alt="developer" />
        </Box>

        {/* --- Thẻ ký tự --- */}
        <Stack direction="row" spacing={1.5} mb={3} justifyContent="center" flexWrap="wrap">
            {Array.from({ length: word.length }).map((_, i) => {
            let boxClass = `result-box`;
            if (selected[i]) {
                boxClass += ` filled`;
                if (isGameOver) {
                boxClass += selected[i] === word[i] ? ` correct` : ` incorrect`;
                }
            }
            return (
                <Paper
                key={i}
                onClick={() => selected[i] && !isGameOver && handleUndo(i)}
                className={boxClass}
                >
                <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: '1.5rem' }}>
                    {selected[i] || ""}
                </Typography>
                </Paper>
            );
            })}
        </Stack>

        <Stack direction="row" spacing={1.5} justifyContent="center" flexWrap="wrap">
            {scrambled.map((ch, i) =>
            ch ? (
                <motion.div key={`char-${i}-${ch}`} whileHover={{ scale: 1.05 }}>
                <Paper elevation={3} onClick={() => !isGameOver && handleSelect(ch, i)} className="char-box">
                    <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: '1.5rem' }}>
                    {ch}
                    </Typography>
                </Paper>
                </motion.div>
            ) : (
                <Paper key={`empty-${i}`} className="char-box disabled" elevation={0}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}></Typography>
                </Paper>
            )
            )}
        </Stack>
      </Box>
      {/* --- Thanh tiến trình thời gian --- */}
      <Box sx={{ width: '100%', marginTop: 3, paddingX: 2, boxSizing: 'border-box' }}>
          <LinearProgress 
              variant="determinate" 
              value={progressValue}
              sx={{
                  height: 16,
                  borderRadius: 0,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '& .MuiLinearProgress-bar': {
                  backgroundColor: progressValue > 30 ? '#6ee7b7' : progressValue > 10 ? '#f48c06' : '#ff6b6b',
                  borderRadius: 0,
                  }
              }}
          />
      </Box>
    </>
  );
}
