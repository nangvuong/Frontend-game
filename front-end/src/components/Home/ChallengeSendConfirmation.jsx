import { Box, Button, Typography, CircularProgress } from '@mui/material';

export default function ChallengeSendConfirmation({ player, isWaiting, onConfirm, onCancel }) {
  return (
    <Box className="challenge-response-container">
      {isWaiting ? (
        // Waiting for response
        <Box className="challenge-waiting">
          <Box className="challenge-waiting-spinner">
            <CircularProgress
              size={60}
              sx={{
                color: '#4b2edc',
              }}
            />
          </Box>
          <Typography className="challenge-waiting-title">
            Đang chờ phản hồi...
          </Typography>
          <Typography className="challenge-waiting-subtitle">
            từ {player.name}
          </Typography>
          <Box className="challenge-waiting-info">
            <span>⏱️ Chờ tối đa 30 giây</span>
          </Box>
        </Box>
      ) : (
        // Confirmation before sending
        <Box className="challenge-message">
          <Box className="challenge-avatar-large">
            {player.avatar}
          </Box>
          <Box className="challenge-text">
            <p className="challenge-title">
              Thách đấu {player.name}?
            </p>
            <p className="challenge-rating">
              Rating: {player.rating}
            </p>
          </Box>
        </Box>
      )}

      {!isWaiting && (
        <Box className="challenge-buttons">
          <Button
            variant="contained"
            fullWidth
            onClick={onConfirm}
            className="btn-accept"
            sx={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              fontWeight: '700',
              fontSize: '1rem',
              padding: '12px 24px',
              borderRadius: '10px',
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                boxShadow: '0 8px 20px rgba(16, 185, 129, 0.4)',
                transform: 'translateY(-2px)',
              },
              '&:active': {
                transform: 'translateY(0)',
              },
            }}
          >
            ✓ Gửi thách đấu
          </Button>

          <Button
            variant="outlined"
            fullWidth
            onClick={onCancel}
            className="btn-reject"
            sx={{
              borderColor: '#ef4444',
              color: '#ef4444',
              fontWeight: '700',
              fontSize: '1rem',
              padding: '12px 24px',
              borderRadius: '10px',
              textTransform: 'none',
              border: '2px solid #ef4444',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                background: 'rgba(239, 68, 68, 0.08)',
                borderColor: '#dc2626',
                color: '#dc2626',
              },
            }}
          >
            ✕ Hủy
          </Button>
        </Box>
      )}
    </Box>
  );
}
