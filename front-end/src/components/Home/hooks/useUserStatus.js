import { useState, useEffect } from 'react';
import { useWebSocket } from '../../../composables/useWebSocket';
import { userAPI } from '../../../composables/useAPI';

export const useUserStatus = () => {
  const { connect, disconnect, subscribe, unsubscribe } = useWebSocket();

  const [allPlayers, setAllPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch online users
  const fetchOnlineUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await userAPI.getUsers();

      if (response.success && response.data) {
        const players = response.data.map((user) => ({
          id: user.id,
          name: user.fullName || user.username,
          avatar: user.avatar || '👤',
          status: user.status,
          rating: user.totalScore || 0,
          username: user.username,
        }));

        setAllPlayers(players);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.message || 'Không thể tải danh sách người chơi');
    } finally {
      setLoading(false);
    }
  };

  // Handle user status change
  const handleUserStatusChange = (message) => {
    if (message.type === 'USER_STATUS_CHANGED') {
      const { userId, status } = message;

      setAllPlayers((prev) =>
        prev.map((player) => (player.id === userId ? { ...player, status } : player))
      );
    }
  };

  // Connect WebSocket
  useEffect(() => {
    fetchOnlineUsers();

    connect(() => {
      subscribe('/topic/users/status', handleUserStatusChange);
    });

    return () => {
      unsubscribe('/topic/users/status');
      disconnect();
    };
  }, []);

  return {
    allPlayers,
    loading,
    error,
    setError,
    refetch: fetchOnlineUsers,
  };
};