import React, { useState } from "react";
import { Box, Typography, Paper, Stack, LinearProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useTimer } from "react-timer-hook";
import { shuffleArray } from "../../utils/shuffle";

const MOCK_WORD = "safe".split("");

export default function GameBoard({ onGameOver, progressValue }) {
  const [scrambled, setScrambled] = useState(shuffleArray(MOCK_WORD));
  const [selected, setSelected] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const expiry = new Date();
  expiry.setSeconds(expiry.getSeconds() + 20);
  const { seconds, restart } = useTimer({
    expiryTimestamp: expiry,
    onExpire: () => {
      setIsGameOver(true);
      // Check correct positions
      let correct = 0;
      for (let i = 0; i < MOCK_WORD.length; i++) {
        if (selected[i] === MOCK_WORD[i]) {
          correct++;
        }
      }
      setCorrectCount(correct);
      // Notify parent
      onGameOver && onGameOver(true, correct);
    },
  });


  const handleSelect = (ch, i) => {
    if (selected.length < MOCK_WORD.length) {
      const newSelected = [...selected, ch];
      setSelected(newSelected);
      setScrambled(scrambled.map((c, idx) => (idx === i ? null : c)));
      
      // Check if all positions are filled
      if (newSelected.length === MOCK_WORD.length) {
        setIsGameOver(true);
        // Count correct positions
        let correct = 0;
        for (let i = 0; i < MOCK_WORD.length; i++) {
          if (newSelected[i] === MOCK_WORD[i]) {
            correct++;
          }
        }
        setCorrectCount(correct);
        // Notify parent
        onGameOver && onGameOver(true, correct);
      }
    }
  };

  const handleUndo = (index) => {
    const removed = selected[index];
    setSelected(selected.filter((_, i) => i !== index));
    const emptyIndex = scrambled.indexOf(null);
    if (emptyIndex !== -1) {
      scrambled[emptyIndex] = removed;
      setScrambled([...scrambled]);
    } else {
      setScrambled([...scrambled, removed]);
    }
  };

  return (
    <>
        <Box className="letters-section">
        {/* --- Ảnh gợi ý --- */}
            <Box className="hint-box">
                <img src="vite.svg" alt="developer" />
            </Box>

            <Stack direction="row" spacing={1.5} mb={3} justifyContent="center" flexWrap="wrap">
                {Array.from({ length: MOCK_WORD.length }).map((_, i) => {
                let boxClass = `result-box`;
                if (selected[i]) {
                    boxClass += ` filled`;
                    if (isGameOver) {
                    boxClass += selected[i] === MOCK_WORD[i] ? ` correct` : ` incorrect`;
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
                    <motion.div key={i} whileHover={{ scale: 1.05 }}>
                    <Paper elevation={3} onClick={() => !isGameOver && handleSelect(ch, i)} className="char-box">
                        <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: '1.5rem' }}>
                        {ch}
                        </Typography>
                    </Paper>
                    </motion.div>
                ) : (
                    <Paper key={i} className="char-box disabled" elevation={0}>
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
