import { useState } from 'react';
import { Box, Container, Alert } from '@mui/material';
import ProfileHeader from './ProfileHeader';
import ProfileStats from './ProfileStats';
import ProfileLoading from './ProfileLoading';
import ProfileError from './ProfileError';
import EditProfile from './EditProfile';
import { useProfileData } from './hooks/useProfileData';
import './Profile.css';

export default function Profile() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { userData, loading, error, winRate, refetch, updateProfile } = useProfileData();

  // Handlers
  const handleEditClick = () => {
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
  };

  const handleSave = async (formData) => {
    const result = await updateProfile(formData);
    
    if (result.success) {
      setIsEditOpen(false);
    } else {
      alert(result.error);
    }
  };

  // Loading state
  if (loading) {
    return <ProfileLoading />;
  }

  // Error state
  if (error) {
    return <ProfileError error={error} onRetry={refetch} />;
  }

  // No data state
  if (!userData) {
    return (
      <Container maxWidth="lg" sx={{ marginTop: '40px' }}>
        <Alert severity="warning">Không tìm thấy thông tin người dùng</Alert>
      </Container>
    );
  }

  return (
    <Box className="profile-container">
      {/* Header Section */}
      <ProfileHeader userData={userData} onEditClick={handleEditClick} />

      {/* Stats Section */}
      <ProfileStats userData={userData} winRate={winRate} />

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