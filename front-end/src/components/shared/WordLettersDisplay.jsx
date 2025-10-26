import { Box, Typography } from '@mui/material';

/**
 * Reusable component to display Word Scramble letters and optional slogan
 * Uses GameStart styling for word letters + Auth styling for slogan
 * Used in: Home, GameStart, AuthSidebar
 */
export default function WordLettersDisplay({ slogan = null }) {
  return (
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

      {/* Slogan (Optional) - Using Auth styling */}
      {slogan && (
        <Typography className="auth-slogan">
          {slogan}
        </Typography>
      )}
    </Box>
  );
}
