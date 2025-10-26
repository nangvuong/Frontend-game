import { 
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Stack,
} from '@mui/material';
import {
  EditOutlined,
  EmojiEventsOutlined,
  LocalFireDepartmentOutlined,
  HandshakeOutlined,
  TrendingUpOutlined,
} from '@mui/icons-material';
import { useState } from 'react';
import EditProfile from './EditProfile';
import './Profile.css';

export default function Profile({ user }) {
  // Use user data from props if available, otherwise use demo data
  const [userData, setUserData] = useState(user || {
    id: 1,
    name: 'Vương',
    avatar: '👨',
    rating: 2450,
    totalGames: 156,
    wins: 98,
    losses: 58,
    streak: 7,
  });

  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
  };

  const handleSave = (formData) => {
    setUserData({
      ...userData,
      name: formData.name,
      avatar: formData.avatar,
    });
    setIsEditOpen(false);
  };

  return (
    <Box className="profile-container">
      {/* Header Section */}
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
                    }
                  }}
                >
                  {userData.avatar}
                </Avatar>
              </Box>

              <Box className="profile-center">
                <Typography className="profile-name">
                  {userData.name}
                </Typography>
                <Typography className="rating-value">
                  {userData.rating}
                </Typography>
              </Box>

              <Box className="profile-right">
                <Button
                  variant="contained"
                  startIcon={<EditOutlined />}
                  onClick={handleEditClick}
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
                    }
                  }}
                >
                  Chỉnh sửa
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ marginTop: '40px' }}>
        <Stack direction="row" spacing={2} className="stats-grid" sx={{ justifyContent: 'space-between' }}>
          <Card className="stat-card" sx={{ flex: 1 }}>
            <CardContent className="stat-content">
              <HandshakeOutlined sx={{ fontSize: '2rem', color: '#4b2edc' }} />
              <Typography className="stat-value">{userData.totalGames}</Typography>
              <Typography className="stat-label">Tổng trận</Typography>
            </CardContent>
          </Card>
          
          <Card className="stat-card" sx={{ flex: 1 }}>
            <CardContent className="stat-content">
              <EmojiEventsOutlined sx={{ fontSize: '2rem', color: '#10b981' }} />
              <Typography className="stat-value">{userData.wins}</Typography>
              <Typography className="stat-label">Chiến thắng</Typography>
            </CardContent>
          </Card>
          
          <Card className="stat-card" sx={{ flex: 1 }}>
            <CardContent className="stat-content">
              <LocalFireDepartmentOutlined sx={{ fontSize: '2rem', color: '#f59e0b' }} />
              <Typography className="stat-value">{userData.streak}</Typography>
              <Typography className="stat-label">Chuỗi hiện tại</Typography>
            </CardContent>
          </Card>
          
          <Card className="stat-card" sx={{ flex: 1 }}>
            <CardContent className="stat-content">
              <TrendingUpOutlined sx={{ fontSize: '2rem', color: '#059669' }} />
              <Typography className="stat-value">{Math.round((userData.wins / userData.totalGames) * 100)}%</Typography>
              <Typography className="stat-label">Tỷ lệ thắng</Typography>
            </CardContent>
          </Card>
        </Stack>
      </Container>

      {/* Edit Profile Modal */}
      {isEditOpen && (
        <EditProfile 
          userData={userData} 
          onClose={handleEditClose}
          onSave={handleSave}
        />
      )}
    </Box>
  );
}
