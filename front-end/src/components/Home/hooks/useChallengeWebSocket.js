import { useState, useEffect } from 'react';
import { useWebSocket } from '../../../composables/useWebSocket';

export const useChallengeWebSocket = (user) => {
  const { connect, disconnect, subscribe, unsubscribe } = useWebSocket();

  const [incomingChallenge, setIncomingChallenge] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '' });

  // Handle challenge notification
  const handleChallengeNotification = (message) => {
    console.log('📨 Challenge notification:', message);

    switch (message.type) {
      case 'NEW_CHALLENGE':
        const challengeData = message.data;
        setIncomingChallenge({
          id: challengeData.id,
          name: challengeData.challenger.fullName || challengeData.challenger.username,
          avatar: challengeData.challenger.avatar || '👤',
          rating: challengeData.challenger.totalScore || 0,
          username: challengeData.challenger.username,
          message: challengeData.message,
        });
        setNotification({
          open: true,
          message: message.message,
        });
        break;

      case 'CHALLENGE_ACCEPTED':
        setNotification({
          open: true,
          message: message.message,
        });
        break;

      case 'CHALLENGE_REJECTED':
        setNotification({
          open: true,
          message: message.message,
        });
        break;

      case 'CHALLENGE_CANCELLED':
        setIncomingChallenge(null);
        setNotification({
          open: true,
          message: message.message,
        });
        break;
    }
  };

  // Connect WebSocket
  useEffect(() => {
    if (!user?.id) return;

    connect(() => {
      console.log('🔌 Challenge WebSocket connected');
      subscribe(`/queue/challenges/${user.id}`, handleChallengeNotification);
    });

    return () => {
      unsubscribe(`/queue/challenges/${user.id}`);
      disconnect();
    };
  }, [user?.id]);

  return {
    incomingChallenge,
    setIncomingChallenge,
    notification,
    setNotification,
  };
};