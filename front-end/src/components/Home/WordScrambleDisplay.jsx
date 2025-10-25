import { Box, Typography } from '@mui/material';

export default function WordScrambleDisplay() {
  return (
    <Box className="word-scramble-display">
      {/* Word Letters */}
      <Box className="word-letters-container">
        <Box className="word-letters">
          <span className="word-letter">W</span>
          <span className="word-letter">O</span>
          <span className="word-letter">R</span>
          <span className="word-letter">D</span>
        </Box>
      </Box>

      {/* Scramble Letters */}
      <Box className="scramble-letters-container">
        <Box className="scramble-letters">
          <span className="scramble-letter">S</span>
          <span className="scramble-letter">C</span>
          <span className="scramble-letter">R</span>
          <span className="scramble-letter">A</span>
          <span className="scramble-letter">M</span>
          <span className="scramble-letter">B</span>
          <span className="scramble-letter">L</span>
          <span className="scramble-letter">E</span>
        </Box>
      </Box>

      {/* Slogan */}
      <Typography className="word-slogan">
        Chiến thắng qua từng vòng bằng cách sắp xếp các ký tự đúng!
      </Typography>
    </Box>
  );
}
