import { Box, Button } from '@mui/material';

export default function ChallengeResponse({ challenge, onAccept, onReject }) {
  return (
    <Box className="challenge-response-container">
      <Box className="challenge-message">
        <Box className="challenge-avatar-large">
          {challenge.avatar}
        </Box>
        <Box className="challenge-text">
          <p className="challenge-title">
            {challenge.name} muốn thách đấu với bạn!
          </p>
          <p className="challenge-rating">
            Rating: {challenge.rating}
          </p>
        </Box>
      </Box>

      <Box className="challenge-buttons">
        <Button
          variant="contained"
          fullWidth
          onClick={onAccept}
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
          ✓ Chấp nhận
        </Button>

        <Button
          variant="outlined"
          fullWidth
          onClick={onReject}
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
          ✕ Từ chối
        </Button>
      </Box>
    </Box>
  );
}
