import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  Avatar,
  CircularProgress,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function ReadyPopup({ 
  open, 
  matchData, 
  currentUser, 
  opponent,
  onReady,
  isReady,
  opponentReady 
}) {
  const [loading, setLoading] = useState(false);

  const handleReady = async () => {
    setLoading(true);
    try {
      await onReady();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          padding: 2,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
      }}
    >
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
          }}
        >
          {/* Title */}
          <Typography
            variant="h4"
            fontWeight="bold"
            color="white"
            textAlign="center"
          >
            🎮 Trận đấu sắp bắt đầu!
          </Typography>

          {/* Players Display */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: '100%',
              padding: 3,
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 3,
              backdropFilter: 'blur(10px)',
            }}
          >
            {/* Current User */}
            <Box sx={{ textAlign: 'center', position: 'relative' }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  fontSize: '2.5rem',
                  bgcolor: '#4b2edc',
                  border: '4px solid white',
                  margin: '0 auto',
                }}
              >
                {currentUser?.avatar || currentUser?.fullName?.charAt(0) || '👤'}
              </Avatar>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="white"
                mt={1}
              >
                {currentUser?.fullName || currentUser?.username}
              </Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.8)">
                {currentUser?.totalScore || 0} điểm
              </Typography>
              
              {/* Ready Status */}
              {isReady && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: -10,
                    right: -10,
                    bgcolor: '#10b981',
                    borderRadius: '50%',
                    padding: '4px',
                  }}
                >
                  <CheckCircleIcon sx={{ color: 'white', fontSize: '1.5rem' }} />
                </Box>
              )}
            </Box>

            {/* VS */}
            <Typography
              variant="h3"
              fontWeight="bold"
              color="white"
              sx={{
                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
              }}
            >
              VS
            </Typography>

            {/* Opponent */}
            <Box sx={{ textAlign: 'center', position: 'relative' }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  fontSize: '2.5rem',
                  bgcolor: '#ef4444',
                  border: '4px solid white',
                  margin: '0 auto',
                }}
              >
                {opponent?.avatar || opponent?.name?.charAt(0) || '👤'}
              </Avatar>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="white"
                mt={1}
              >
                {opponent?.name || opponent?.username}
              </Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.8)">
                {opponent?.rating || 0} điểm
              </Typography>

              {/* Ready Status */}
              {opponentReady && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: -10,
                    right: -10,
                    bgcolor: '#10b981',
                    borderRadius: '50%',
                    padding: '4px',
                  }}
                >
                  <CheckCircleIcon sx={{ color: 'white', fontSize: '1.5rem' }} />
                </Box>
              )}
            </Box>
          </Box>

          {/* Ready Status Text */}
          <Box sx={{ textAlign: 'center' }}>
            {isReady && opponentReady ? (
              <Typography variant="h6" color="#10b981" fontWeight="bold">
                ✅ Cả hai đã sẵn sàng! Trận đấu sắp bắt đầu...
              </Typography>
            ) : isReady ? (
              <Typography variant="h6" color="white">
                ⏳ Đang chờ đối thủ sẵn sàng...
              </Typography>
            ) : opponentReady ? (
              <Typography variant="h6" color="white">
                ⚠️ Đối thủ đã sẵn sàng! Bạn chưa ready.
              </Typography>
            ) : (
              <Typography variant="h6" color="white">
                💡 Nhấn "Sẵn sàng" để bắt đầu!
              </Typography>
            )}
          </Box>

          {/* Ready Button */}
          {!isReady && (
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleReady}
              disabled={loading}
              sx={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                padding: '16px',
                borderRadius: 3,
                textTransform: 'none',
                boxShadow: '0 8px 20px rgba(16, 185, 129, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  transform: 'translateY(-2px)',
                },
                '&:disabled': {
                  opacity: 0.6,
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : (
                '✓ Sẵn sàng'
              )}
            </Button>
          )}

          {/* Waiting Message */}
          {isReady && !opponentReady && (
            <Box sx={{ textAlign: 'center' }}>
              <CircularProgress sx={{ color: 'white', mb: 2 }} />
              <Typography variant="body1" color="white">
                Đang chờ {opponent?.name}...
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}