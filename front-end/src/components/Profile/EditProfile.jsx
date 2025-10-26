import { 
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  TextField,
  IconButton,
} from '@mui/material';
import {
  Close,
  CameraAltOutlined,
  CheckOutlined,
} from '@mui/icons-material';
import { useState } from 'react';
import './Profile.css';

export default function EditProfile({ userData, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: userData.name,
    avatar: userData.avatar,
  });

  const handleNameChange = (e) => {
    setFormData({
      ...formData,
      name: e.target.value,
    });
  };

  const handleAvatarChange = (newAvatar) => {
    setFormData({
      ...formData,
      avatar: newAvatar,
    });
  };

  const handleSave = () => {
    onSave(formData);
  };

  const commonEmojis = ['👨', '👩', '🧔', '👴', '👵', '🧑', '👨‍💼', '👩‍💼', '🤵', '👰'];

  return (
    <Box className="edit-profile-overlay">
      <Box className="edit-profile-container">
        <Card className="edit-profile-card">
          <Box className="edit-profile-header">
            <Typography variant="h5" className="edit-profile-title">
              Chỉnh sửa hồ sơ
            </Typography>
            <IconButton 
              onClick={onClose}
              sx={{
                color: '#6b7280',
                '&:hover': {
                  color: '#4b2edc',
                }
              }}
            >
              <Close />
            </IconButton>
          </Box>

          <CardContent className="edit-profile-content">
            {/* Avatar Section */}
            <Box className="edit-avatar-section">
              <Typography className="edit-section-label">Ảnh đại diện</Typography>
              <Box className="edit-avatar-container">
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    fontSize: '3rem',
                    background: 'linear-gradient(135deg, #4b2edc 0%, #6a4cf3 100%)',
                    boxShadow: '0 8px 24px rgba(75, 46, 220, 0.3)',
                    border: '3px solid white',
                  }}
                >
                  {formData.avatar}
                </Avatar>
              </Box>
              <Box className="emoji-picker">
                {commonEmojis.map((emoji, index) => (
                  <Button
                    key={index}
                    className={`emoji-button ${formData.avatar === emoji ? 'active' : ''}`}
                    onClick={() => handleAvatarChange(emoji)}
                    sx={{
                      fontSize: '2rem',
                      padding: '8px',
                      minWidth: '50px',
                      height: '50px',
                      border: formData.avatar === emoji ? '2px solid #4b2edc' : '1px solid #e5e7eb',
                      borderRadius: '8px',
                      backgroundColor: formData.avatar === emoji ? 'rgba(75, 46, 220, 0.1)' : 'transparent',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: '#4b2edc',
                        backgroundColor: 'rgba(75, 46, 220, 0.05)',
                      }
                    }}
                  >
                    {emoji}
                  </Button>
                ))}
              </Box>
            </Box>

            {/* Name Section */}
            <Box className="edit-name-section">
              <Typography className="edit-section-label">Tên người dùng</Typography>
              <TextField
                fullWidth
                value={formData.name}
                onChange={handleNameChange}
                placeholder="Nhập tên của bạn"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    '& fieldset': {
                      borderColor: '#e5e7eb',
                    },
                    '&:hover fieldset': {
                      borderColor: '#4b2edc',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4b2edc',
                      borderWidth: '2px',
                    }
                  },
                  '& .MuiOutlinedInput-input': {
                    fontSize: '1rem',
                    padding: '12px 16px',
                    fontWeight: 600,
                  }
                }}
              />
            </Box>

            {/* Action Buttons */}
            <Box className="edit-actions">
              <Button
                variant="outlined"
                onClick={onClose}
                sx={{
                  borderColor: '#e5e7eb',
                  color: '#6b7280',
                  textTransform: 'none',
                  borderRadius: '10px',
                  padding: '10px 32px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: '#9ca3af',
                    backgroundColor: '#f9fafb',
                  }
                }}
              >
                Hủy
              </Button>
              <Button
                variant="contained"
                startIcon={<CheckOutlined />}
                onClick={handleSave}
                sx={{
                  background: 'linear-gradient(135deg, #4b2edc 0%, #6a4cf3 100%)',
                  textTransform: 'none',
                  borderRadius: '10px',
                  padding: '10px 32px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  boxShadow: '0 6px 16px rgba(75, 46, 220, 0.25)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    boxShadow: '0 10px 24px rgba(75, 46, 220, 0.35)',
                  }
                }}
              >
                Xác nhận
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
