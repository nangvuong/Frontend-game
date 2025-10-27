import { Container, Alert, Button } from '@mui/material';

export default function ProfileError({ error, onRetry }) {
  return (
    <Container maxWidth="lg" sx={{ marginTop: '40px' }}>
      <Alert severity="error">{error}</Alert>
      <Button
        variant="contained"
        onClick={onRetry}
        sx={{
          marginTop: 2,
          background: 'linear-gradient(135deg, #4b2edc 0%, #6a4cf3 100%)',
        }}
      >
        Thử lại
      </Button>
    </Container>
  );
}