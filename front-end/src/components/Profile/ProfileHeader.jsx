import { Box, Container, Card, CardContent, Typography, Avatar, Button } from '@mui/material';
import { EditOutlined } from '@mui/icons-material';

export default function ProfileHeader({ userData, onEditClick }) {
  return (
    <Box className="profile-header">
      <Container maxWidth="lg">
        <Card className="profile-card-header">
          <CardContent className="profile-header-content">
            <Box className="profile-left">
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  fontSize: '2.8rem',
                  background: 'linear-gradient(135deg, #4b2edc 0%, #6a4cf3 100%)',
                  boxShadow: '0 8px 24px rgba(75, 46, 220, 0.3)',
                  border: '3px solid white',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.08)',
                    boxShadow: '0 12px 32px rgba(75, 46, 220, 0.4)',
                  },
                }}
              >
                {userData.avatar || '👤'}
              </Avatar>
            </Box>

            <Box className="profile-center">
              <Typography className="profile-name">
                {userData.fullName || userData.username}
              </Typography>
              <Typography className="rating-value">{userData.totalScore || 0}</Typography>
              <Typography
                sx={{
                  color: userData.status === 'ONLINE' ? '#10b981' : '#6b7280',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                }}
              >
                {userData.status === 'ONLINE' ? '🟢 Đang online' : '⚫ Offline'}
              </Typography>
            </Box>

            <Box className="profile-right">
              <Button
                variant="contained"
                startIcon={<EditOutlined />}
                onClick={onEditClick}
                sx={{
                  background: 'linear-gradient(135deg, #4b2edc 0%, #6a4cf3 100%)',
                  textTransform: 'none',
                  borderRadius: '12px',
                  padding: '14px 32px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  boxShadow: '0 8px 20px rgba(75, 46, 220, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 12px 32px rgba(75, 46, 220, 0.4)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Chỉnh sửa
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}