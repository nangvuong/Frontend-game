import { 
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Stack,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  EditOutlined,
  EmojiEventsOutlined,
  HandshakeOutlined,
  TrendingUpOutlined,
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import EditProfile from './EditProfile';
import { userAPI } from '../../composables/useAPI';
import './Profile.css';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Fetch user profile khi component mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await userAPI.profile();
      
      if (response.success) {
        setUserData(response.data);
      }
    } catch (err) {
      console.log(err);
      console.error('Lỗi khi tải thông tin profile:', err);
      setError('Không thể tải thông tin profile. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
  };

  const handleSave = async (formData) => {
    try {
      const response = await userAPI.updateProfile({
        fullName: formData.name,
        avatar: formData.avatar,
      });

      if (response.success) {
        setUserData(response.data);
        setIsEditOpen(false);
      }
    } catch (err) {
      console.error('Lỗi khi cập nhật profile:', err);
      alert('Cập nhật thất bại. Vui lòng thử lại!');
    }
  };

  // Loading state
  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh' 
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ marginTop: '40px' }}>
        <Alert severity="error">{error}</Alert>
        <Button 
          variant="contained" 
          onClick={fetchUserProfile}
          sx={{ marginTop: 2 }}
        >
          Thử lại
        </Button>
      </Container>
    );
  }

  // No data state
  if (!userData) {
    return (
      <Container maxWidth="lg" sx={{ marginTop: '40px' }}>
        <Alert severity="warning">Không tìm thấy thông tin người dùng</Alert>
      </Container>
    );
  }

  // Calculate win rate
  const winRate = userData.totalMatches > 0 
    ? Math.round((userData.totalWins / userData.totalMatches) * 100) 
    : 0;

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
                  {userData.avatar || '👤'}
                </Avatar>
              </Box>

              <Box className="profile-center">
                <Typography className="profile-name">
                  {userData.fullName || userData.username}
                </Typography>
                <Typography className="rating-value">
                  {userData.totalScore || 0}
                </Typography>
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
              <Typography className="stat-value">{userData.totalMatches || 0}</Typography>
              <Typography className="stat-label">Tổng trận</Typography>
            </CardContent>
          </Card>
          
          <Card className="stat-card" sx={{ flex: 1 }}>
            <CardContent className="stat-content">
              <EmojiEventsOutlined sx={{ fontSize: '2rem', color: '#10b981' }} />
              <Typography className="stat-value">{userData.totalWins || 0}</Typography>
              <Typography className="stat-label">Chiến thắng</Typography>
            </CardContent>
          </Card>
          
          <Card className="stat-card" sx={{ flex: 1 }}>
            <CardContent className="stat-content">
              <TrendingUpOutlined sx={{ fontSize: '2rem', color: '#059669' }} />
              <Typography className="stat-value">{winRate}%</Typography>
              <Typography className="stat-label">Tỷ lệ thắng</Typography>
            </CardContent>
          </Card>
        </Stack>
      </Container>

      {/* Edit Profile Modal */}
      {isEditOpen && (
        <EditProfile 
          userData={{
            id: userData.id,
            name: userData.fullName || userData.username,
            avatar: userData.avatar || '👤',
          }}
          onClose={handleEditClose}
          onSave={handleSave}
        />
      )}
    </Box>
  );
}