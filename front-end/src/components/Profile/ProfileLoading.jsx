import { Box, CircularProgress } from '@mui/material';

export default function ProfileLoading() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <CircularProgress size={60} sx={{ color: '#4b2edc' }} />
    </Box>
  );
}