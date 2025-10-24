import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";

export default function GameOverModal({ isOpen, correctCount, onNextRound, currentRound }) {
  useEffect(() => {
    if (isOpen) {
      // Auto transition after 2 seconds
      const transitionTimer = setTimeout(() => {
        onNextRound();
      }, 2000);

      return () => {
        clearTimeout(transitionTimer);
      };
    }
  }, [isOpen, onNextRound]);

  if (!isOpen) return null;

  const points = correctCount * 10;

  return (
    <>
        <Box className="star-points">
            <Typography className="star-points-text" sx={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                +{points}
            </Typography>
        </Box>
        <div></div>
    </>
  );
}
