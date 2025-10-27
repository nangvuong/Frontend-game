import { useState, useEffect } from 'react';
import { userAPI } from '../../../composables/useAPI';

export const useProfileData = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await userAPI.profile();

      if (response.success) {
        setUserData(response.data);
      }
    } catch (err) {
      console.error('Lỗi khi tải thông tin profile:', err);
      setError('Không thể tải thông tin profile. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const updateProfile = async (formData) => {
    try {
      const response = await userAPI.updateProfile({
        fullName: formData.name,
        avatar: formData.avatar,
      });

      if (response.success) {
        setUserData(response.data);
        return { success: true };
      }
    } catch (err) {
      console.error('Lỗi khi cập nhật profile:', err);
      return { success: false, error: 'Cập nhật thất bại. Vui lòng thử lại!' };
    }
  };

  // Calculate win rate
  const getWinRate = () => {
    if (!userData) return 0;
    return userData.totalMatches > 0
      ? Math.round((userData.totalWins / userData.totalMatches) * 100)
      : 0;
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return {
    userData,
    loading,
    error,
    winRate: getWinRate(),
    refetch: fetchUserProfile,
    updateProfile,
  };
};