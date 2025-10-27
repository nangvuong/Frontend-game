import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWebSocket } from '../../../composables/useWebSocket';

export const useMatchWebSocket = (user) => {
  const navigate = useNavigate();
  const { connect, disconnect, subscribe, unsubscribe } = useWebSocket();

  const [showReadyPopup, setShowReadyPopup] = useState(false);
  const [currentMatch, setCurrentMatch] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [opponentReady, setOpponentReady] = useState(false);
  const [opponentInfo, setOpponentInfo] = useState(null);

  // Handle match notification
  const handleMatchNotification = (message) => {
    console.log('📨 Match notification:', message);

    switch (message.type) {
      case 'MATCH_CREATED':
        const matchData = message.data;
        setCurrentMatch(matchData);

        const opponent =
          matchData.player1.id === user.id ? matchData.player2 : matchData.player1;

        setOpponentInfo(opponent);
        setShowReadyPopup(true);
        setIsReady(false);
        setOpponentReady(false);

        console.log('✅ Ready popup opened');
        break;

      case 'OPPONENT_READY':
        setOpponentReady(true);
        break;
    }
  };

  // Connect WebSocket
  useEffect(() => {
    if (!user?.id) return;

    connect(() => {
      console.log('🔌 Match WebSocket connected');
      subscribe(`/queue/matches/${user.id}`, handleMatchNotification);
    });

    return () => {
      unsubscribe(`/queue/matches/${user.id}`);
      disconnect();
    };
  }, [user?.id]);

  // Subscribe to match topic when match created
  useEffect(() => {
    if (!currentMatch?.id) return;

    const destination = `/topic/match/${currentMatch.id}`;

    subscribe(destination, (message) => {
      console.log('📨 Match topic message:', message);

      if (message.type === 'MATCH_START') {
        console.log('🚀 Match started! Navigating to game...');

        setTimeout(() => {
          navigate('/game', {
            state: {
              matchId: currentMatch.id,
              currentUser: user,
              opponent: opponentInfo,
            },
          });
        }, 1500);
      }
    });

    return () => {
      unsubscribe(destination);
    };
  }, [currentMatch?.id]);

  return {
    showReadyPopup,
    currentMatch,
    isReady,
    setIsReady,
    opponentReady,
    opponentInfo,
    setShowReadyPopup,
  };
};